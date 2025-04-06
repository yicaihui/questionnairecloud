const jwt = require('jsonwebtoken');
const secretKey = 'yhcvf'

function sign_token(newInfo) {
    console.log('newInfo', newInfo)
    return jwt.sign(
        newInfo, // 除了密码
        secretKey,
        { expiresIn: '5d' } // 定义失效时间
    )
}
function verify_token(token) {
    let res = true
    jwt.verify(token, secretKey, (err, payload) => {
        if (err) {
            res = false
        }
    })
    return res
}
function decode_token(token) {
    return jwt.decode(token, secretKey)
}
module.exports = {
    sign_token,
    verify_token,
    decode_token
}