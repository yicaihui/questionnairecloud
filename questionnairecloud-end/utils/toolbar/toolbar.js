const {
    getMatrixQuestion,
    getRankingQuestion,
    getRatingQuestion,
    getOpinionScaleQuestion,
    getYesNoQuestion,
    getPictureChoiceQuestion,
    getDropdownQuestion,
    getMultipleChoiceQuestion,
    getAddressQuestion,
    getContactInfoQuestion,
    getEmailQuestion,
    getIdNumberQuestion,
    getPhoneNumberQuestion,
    getMultipleTextQuestion,
    getShortTextQuestion,
    getNumberQuestion,
    getDateQuestion,
    getFileUpdateQuestion,
    getQuestionGroupQuestion,
    getMultiQuestionPageQuestion,
    getWelcomeScreenQuestion,
    getEndScreenQuestion,
    getSingleChoiceQuestion,
    getSliderQuestion
} = require("./questionTemplate")
function getSurveyToolbar() {
    const lists = []
    //ContactInfo
    lists.push(new DesignSurveyToolbarTab('联系信息', contactInfoToolbar()))
    lists.push(new DesignSurveyToolbarTab('选择题', choiceToolbar()))
    lists.push(new DesignSurveyToolbarTab('评分和排名', ratingRankingToolbar()))
    lists.push(new DesignSurveyToolbarTab('文本和视频', textVideoToolbar()))
    lists.push(new DesignSurveyToolbarTab('其他', otherToolbar()))
    lists.push(new DesignSurveyToolbarTab('开始和结束', startEndToolbar()))

    return lists
}

class DesignSurveyToolbarTab {
    constructor(name, tabQus) {
        this.tabName = name
        this.tabQus = tabQus
    }
}

function contactInfoToolbar() {
    const contactInfoTab = []
    contactInfoTab.push(getContactInfoQuestion())
    contactInfoTab.push(getIdNumberQuestion())
    contactInfoTab.push(getEmailQuestion())
    contactInfoTab.push(getPhoneNumberQuestion())
    contactInfoTab.push(getAddressQuestion())
    return contactInfoTab
}
function choiceToolbar() {
    const choiceTab = []
    choiceTab.push(getSingleChoiceQuestion())
    choiceTab.push(getMultipleChoiceQuestion())
    choiceTab.push(getDropdownQuestion())
    choiceTab.push(getPictureChoiceQuestion())
    choiceTab.push(getYesNoQuestion())
    return choiceTab
}
function ratingRankingToolbar() {
    const ratingRankingTab = []
    ratingRankingTab.push(getOpinionScaleQuestion())
    ratingRankingTab.push(getRatingQuestion())
    ratingRankingTab.push(getSliderQuestion())
    ratingRankingTab.push(getRankingQuestion())
    ratingRankingTab.push(getMatrixQuestion())
    return ratingRankingTab
}
function textVideoToolbar() {
    const textVideoTab = []
    textVideoTab.push(getShortTextQuestion())
    textVideoTab.push(getMultipleTextQuestion())
    return textVideoTab
}
function otherToolbar() {
    const otherTab = []
    otherTab.push(getNumberQuestion())
    otherTab.push(getDateQuestion())
    otherTab.push(getFileUpdateQuestion())
    otherTab.push(getQuestionGroupQuestion())
    otherTab.push(getMultiQuestionPageQuestion())
    return otherTab
}
function startEndToolbar() {
    const startEndTab = []
    startEndTab.push(getWelcomeScreenQuestion())
    startEndTab.push(getEndScreenQuestion())
    return startEndTab
}

module.exports = {
    getSurveyToolbar
}