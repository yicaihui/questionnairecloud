const mongoose = require('../db')
const Schema = mongoose.Schema

const userSchema = Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    resetToken: String,
    resetTokenExpiry: Date,
    registerToken: String,
    registerTokenExpiry: Date,
    loginAttempts: {
        type: Number,
        dafault: 0
    },
    loginAttemptLockedUntil: Date
})

const User = mongoose.model('User', userSchema)


const existsUser = async (userInfo) => {
    const res = await User.findOne(userInfo)
    return res
}

const insertUser = async (userInfo) => {
    const newUser = new User(userInfo)
    const res = await newUser.save()
    return res
}
const searchUser = async (name) => {
    const res = await User.find({ username: { $regex: name, $options: 'i' } }, { username: true })
    return res
}


module.exports = {
    User,
    existsUser,
    insertUser,
    searchUser
}