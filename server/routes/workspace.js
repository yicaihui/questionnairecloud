const express = require('express');
const router = express.Router()
const { getWorkspace, getWorkspaceDetail, insertWorkspace, addCopartners } = require('../db/models/Workspace')
const { decode_token } = require("../utils/token")

//获取工作空间
router.get('/get', async (req, res) => {
    let { userId } = decode_token(req.headers.authorization)
    let { personal, copartner } = await getWorkspace({ userId })
    res.send({
        personal,
        copartner,
        code: 200
    });
});
//获取某个工作空间
router.get('/getdetail', async (req, res) => {
    let { userId } = decode_token(req.headers.authorization)
    const { workspaceId } = req.query
    let { lists } = await getWorkspaceDetail({ workspaceId })
    res.send({
        lists,
        code: 200
    });
});
//创建工作空间
router.post('/create', async (req, res) => {
    let { userId } = decode_token(req.headers.authorization)
    let name = req.body.name;
    try {
        await insertWorkspace({ name, createdUserId: userId })
        res.send({
            message: 'ok',
            code: 200
        });
        return
    } catch (error) {
        console.log(error)
    }
});
//添加管理员
router.post('/addcopartners', async (req, res) => {
    console.log(req.body)
    let ids = JSON.parse(req.body.ids);
    let workspaceId = req.body.workspaceId;
    console.log('id', workspaceId, ids)
    try {
        await addCopartners(workspaceId, ids)
        res.send({
            message: 'ok',
            code: 200
        });
        return
    } catch (error) {
        console.log(error)
    }
});


module.exports = router