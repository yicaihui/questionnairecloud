const express = require('express')
const router = express.Router()
const { createAnswerData } = require('../db/models/Answer')


router.post('/create', async (req, res) => {
    console.log(req.body)
    const { answer } = req.body
    const { questionId, answerList } = answer

    const answerData = await createAnswerData({ questionId, answerList })

    res.send({
        code: 200,
        message: "答案提交成功"
    });
})

module.exports = router  