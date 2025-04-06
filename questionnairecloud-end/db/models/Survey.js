
const mongoose = require('../db')
const Schema = mongoose.Schema
const dayjs = require('dayjs')
const { Workspace } = require('./Workspace')

const SurveySchema = Schema({
    userId: {
        type: String,
        required: true,
    },
    workspaceId: {
        type: String,
        required: true,
    },
    //published unpublish finished
    status: {
        type: String,
        default: 'unpublish',
    },
    title: {
        type: String,
        default: '我的新问卷',
    },
    createdAt: {
        type: String,
        //node.js解决MongoDB有时差的问题8小时
        default: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
    },
    updatedAt: {
        type: String,
        //node.js解决MongoDB有时差的问题8小时
        default: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
    },
    questions: {
        type: Array,
        default: []
    },
    response: {
        type: Number,
        default: 0
    }
}, {
    versionKey: false,
    timestamps: true  // 启用时间戳选项

})

const Survey = mongoose.model('survey', SurveySchema)

//创建新调查问卷
const createSurveyData = async (questionInfo) => {
    const newSurvey = new Survey(questionInfo)
    const res = await newSurvey.save()
    await Workspace.updateOne({ _id: questionInfo.workspaceId }, { $push: { questionsId: res._id.toString() } })
    return res
}

//获取问卷
const getSurveyData = async ({ userId, keyword, workspaceId }) => {
    let params = { userId, workspaceId, title: { $regex: keyword, $options: 'i' } }
    let lists = await Survey.find(params).sort({ createdAt: -1 })
    return { lists }
}

const updateSurveyData = async (questionInfo) => {
    const { userId, surveyId, ...args } = questionInfo
    console.log(userId, surveyId, args)
    let res = Survey.updateOne({ userId, _id: surveyId }, { $set: { ...args } })
    return res
}

const delQuestionData = async ({ userId, ids }) => {
    const res = await Question.deleteMany({ userId, _id: { $in: ids } })
    return res
}

const getSurveyById = async ({ _id }) => {
    const data = await Survey.findOne({ _id })
    return data
}

module.exports = {
    createSurveyData,
    getSurveyData,
    updateSurveyData,
    Survey,
    delQuestionData,
    getSurveyById
}