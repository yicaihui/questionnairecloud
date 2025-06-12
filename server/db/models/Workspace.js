const mongoose = require('../db')
const { User } = require('./User')
const Schema = mongoose.Schema
const dayjs = require('dayjs')


const workspaceSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    createdUserId: {
        type: String,
        required: true,
    },
    copartnersId: {
        type: Array,
    },
    questionsId: {
        type: Array,
    },
    createdAt: {
        type: String,
        //node.js解决MongoDB有时差的问题8小时
        default: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
    },
})

const Workspace = mongoose.model('Workspace', workspaceSchema)

const insertWorkspace = async (workspaceInfo) => {
    const newWorkspace = new Workspace(workspaceInfo)
    const res = await newWorkspace.save()
    return res
}
const getWorkspace = async ({ userId }) => {
    let p_lists = await Workspace.find({ createdUserId: userId }, { name: true }).sort({ createdAt: -1 })
    let co_lists = await Workspace.find({ copartnersId: { $in: [userId] } }, { name: 1 }).sort({ createdAt: -1 })
    return { personal: p_lists, copartner: co_lists }
}
const getWorkspaceDetail = async ({ workspaceId }) => {
    let space = await Workspace.findOne({ _id: workspaceId })
    let res = []
    for (let id of space.copartnersId) {
        let r = await User.findOne({ _id: id }, { username: true, _id: false })
        res.push(r.username)
    }
    return { lists: res }
}
const addCopartners = async (workspaceId, ids) => {
    let res = await Workspace.updateOne({ _id: workspaceId }, { $push: { copartnersId: { $each: ids } } })
    return res
}



module.exports = {
    Workspace,
    insertWorkspace,
    getWorkspace,
    getWorkspaceDetail,
    addCopartners
}