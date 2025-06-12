const nodemailer = require('nodemailer');
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
const mail_user = '924487359@qq.com'

module.exports = {
    transporter,
    mail_user
}