const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { insertUser, existsUser, searchUser } = require('../db/models/User')
const { insertWorkspace } = require('../db/models/Workspace')
const { sign_token, verify_token, decode_token } = require("../utils/token")
const { mail_user, transporter } = require('../config/mail.config');
const cron = require('node-cron')



const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
    }
})

// 生成密钥
const pub = publicKey.toString()
const pri = privateKey.toString()
router.get('/publickey', async (req, res) => {
    res.send({
        publickey: pub,
        code: 200
    });
    return
})

//注册
router.post('/register', async (req, res) => {
    //获取用户名和密码信息
    let { email, username, password } = req.body;
    const existingUser = await existsUser({ email });
    //检查用户是否已存在
    if (existingUser) {
        res.send({
            message: 'User already exists',
            code: 400
        });
        return
    }
    try {
        //创建新用户
        const passwordHash = await bcrypt.hash(password, 12);
        let user = await insertUser({ username, email, password: passwordHash })
        await insertWorkspace({ createdUserId: user.id, name: "我的工作区" })

        // 发送验证邮件
        const registerToken = crypto.randomBytes(32).toString('hex');
        const registerTokenExpiry = Date.now() + 3600000; // 1h有效期
        user.registerToken = registerToken;
        user.registerTokenExpiry = registerTokenExpiry;
        await user.save();

        const mailOptions = {
            from: mail_user,
            to: email,
            subject: 'Email Verification',
            html: `
              Click the link below to verify your email:
              <a href="http://localhost:5173/#/verify-email/${registerToken}">Verify Email</a>
            `,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Error sending email:', err);
                return res.status(500).json({ error: 'Failed to send verification email' });
            }

            res.status(200).json({ message: 'User registered successfully. Please check your email to verify.' });
        });
    } catch (error) {
        console.log(error)
    }
});
//注册-邮箱验证
router.post('/verify-email', async (req, res) => {
    //获取用户名和密码信息
    try {
        const { token } = req.params;
        // 查找有效用户
        const user = await existsUser({
            registerToken: token,
            registerTokenExpiry: { $gt: Date.now() }
        });
        if (!user) {
            return res.status(400).json({ message: 'Invalid verification token' });
        }
        res.json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Invalid verification token' });
    }
});

//登录
router.post('/login', async (req, res) => {
    //获取用户名和密码信息
    let { email, password } = req.body;

    const user = await existsUser({ email })

    if (!user) {
        res.send({
            message: 'login failed',
            code: 400
        });
        return
    }
    if (user.loginAttemptLockedUntil && user.loginAttemptLockedUntil > new Date()) {
        return res.status(400).send({ message: '账户已被锁定，请稍后再试', error: 'ExcessiveAttemptsException' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        //密码验证失败
        user.loginAttempts++
        if (user.loginAttempts >= 5) {
            user.loginAttemptLockedUntil = new Date(Date.now() + 20 * 60 * 1000)
        }
        await user.save()
        return res.status(400).send({ message: `密码输错${user.loginAttempts}次，连续输错5次账户将被锁定`, error: 'InvalidCredentials' });
    }
    user.loginAttempts = 0
    user.loginAttemptLockedUntil = null
    await user.save()
    var newInfo = { username: user.username, email: user.email, userId: user._id.toString() }
    // 用户登陆成功后跳转到其它页面时，无须再次输入用户名及密码等了，所以此处理服务器会生成并发送给用户一个token
    const token = sign_token(newInfo)
    res.send({
        userInfo: newInfo, token, message: 'login success',
        code: 200
    })
    setTimeout(async () => {
        user.loginAttempts = 0
        user.loginAttemptLockedUntil = null
        await user.save()
    }, 20 * 60 * 1000);
    return
});


//忘记密码
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await existsUser({ email });

        if (!user) {
            res.send({
                message: 'User not found',
                code: 400
            });
            return
        }

        // 3. 生成重置令牌
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // 1h有效期

        user.resetToken = resetToken;
        user.resetTokenExpiry = resetTokenExpiry;
        await user.save();

        // 发送邮件（需配置邮件服务）
        const transporter = nodemailer.createTransport({
            host: "smtp.qq.com",
            port: 465,
            secure: true,
            auth: {
                // 发件人邮箱账号
                user: '924487359@qq.com',
                //发件人邮箱的授权码 需要在自己的邮箱设置中生成,并不是邮件的登录密码
                pass: 'ersoqpvyillsbdid'
            }
        });

        const resetUrl = `http://localhost:5173/#/reset-password/${resetToken}`;
        await transporter.sendMail({
            from: "924487359@qq.com",
            to: email,
            subject: 'Password Reset',
            html: `
                    <p>Click to reset password: <a href="${resetUrl}">${resetUrl}</a></p>
                    <p>Link expires in 10 minutes</p>
                `
        });

        res.send({
            message: 'Password reset email sent',
            code: 200
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
//重置密码
router.post('/reset-password/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        // 查找有效用户
        const user = await existsUser({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // 更新密码
        user.password = await bcrypt.hash(password, 12);
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        res.send({
            message: 'Password has been reset',
            code: 200
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// 验证token是否过期
router.post('/isExpire', function (req, res) {
    let token = req.headers.authorization
    //全局验证token是否过期
    if (verify_token(token)) {
        console.log('token认证成功');
        res.json({ message: '认证成功', code: 200 })
    } else {
        console.log('token过期');
        res.json({ message: 'token过期', code: 201 })
    }
})

// 存在token时登录 
router.post('/hasToken', function (req, res) {
    let userInfo = decode_token(req.headers.authorization)
    res.send({ userInfo, code: 200 })
});
//搜索用户名
router.get('/search', async (req, res) => {
    let name = req.query.name
    const lists = await searchUser(name)
    res.send({
        lists,
        code: 200
    });
});

module.exports = router
