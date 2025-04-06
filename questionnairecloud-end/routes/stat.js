const express = require('express')
const router = express.Router()
const { getAnswerData } = require('../db/models/Answer')
const { Survey } = require('../db/models/Survey')

router.get('/getdata/:id', async (req, res) => {
    const { id } = req.params
    const { list, total } = await getAnswerData({ questionId: id })
    const { componentLists } = await Survey.findOne({ _id: id })
    const resultData = {}
    list.map(item => {
        const { answerList } = item
        answerList.forEach(a => {
            const { answer, componentId } = a
            const { type, props } = componentLists.find(item => item.id == componentId)
            switch (type) {
                case 'mutiplechoice':
                case 'dropdown':
                    if (!resultData[componentId]) resultData[componentId] = {}
                    for (let an of answer) {
                        resultData[componentId][an] = (resultData[componentId][an] || 0) + 1
                    }
                    break
                default:
                    if (!resultData[componentId]) resultData[componentId] = []
                    if (answer) resultData[componentId].push(answer)
            }
        })
    })
    res.send({
        resultData,
        code: 200
    })
})

module.exports = router