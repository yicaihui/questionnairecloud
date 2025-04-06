const express = require('express');
const router = express.Router()
const { createSurveyData, updateSurveyData, getSurveyData, getSurveyById } = require('../db/models/Survey')
const { decode_token } = require("../utils/token");
const { getSurveyToolbar } = require('../utils/toolbar/toolbar');

//获取问卷列表
router.get('/get', async (req, res) => {
    let { userId } = decode_token(req.headers.authorization)
    const { keyword = '', workspaceId } = req.query
    let { lists } = await getSurveyData({ workspaceId, userId, keyword })
    res.send({
        lists,
        code: 200
    });
});
//获取某个问卷
router.get('/get/:id', async (req, res) => {
    const { id: _id } = req.params
    const data = await getSurveyById({ _id })
    res.send({
        data,
        code: 200
    });
});

//创建问卷
router.post('/create', async (req, res) => {
    let { userId } = decode_token(req.headers.authorization)
    let workspaceId = req.body.workspaceId;
    const question = await createSurveyData({ userId, workspaceId })
    res.send({
        id: question._id.toString(),
        code: 200
    });
});
//更新问卷
router.patch('/update/:id', async (req, res) => {
    let { userId } = decode_token(req.headers.authorization)
    const { id: surveyId } = req.params
    const { title, questions } = req.body
    try {
        const { acknowledged } = await updateSurveyData({ userId, surveyId, title, questions: JSON.parse(questions) })
        if (acknowledged) {
            res.send({
                message: '更新成功',
                code: 200,
            });
        } else {
            res.send({
                message: '更新失败',
                code: 201
            });
        }
        return
    } catch (error) {
        res.send({
            message: error,
            code: 201
        });
    }
})
//获取tab列表
router.get('/toolbar', async (req, res) => {
    const lists = getSurveyToolbar()
    res.send({
        lists,
        code: 200
    });
});



module.exports = router
