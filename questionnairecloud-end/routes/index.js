const express = require('express')
const userRouter = require('./user')
const surveyRouter = require('./survey')
const answerRouter = require('./answer')
const StatRouter = require('./stat')
const WorkspaceRouter = require('./workspace')

const router = express.Router()

router.use('/user', userRouter)
router.use('/survey', surveyRouter)
router.use('/answer', answerRouter)
router.use('/stat', StatRouter)
router.use('/workspace', WorkspaceRouter)


module.exports = router