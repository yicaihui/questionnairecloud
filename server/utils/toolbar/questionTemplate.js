
const QuMultiFillblank = require("./Question/QuMultiFillblank")
const Question = require("./Question/Question")
const QuCheckbox = require("./Question/QuCheckbox")
const QuRadio = require("./Question/QuRadio")
const QuOrderby = require("./Question/QuOrderby")
//Contact Info
function getContactInfoQuestion() {
    let contactInfoQuestion = new Question('contactInfo', '联系信息');
    let quMultiFillblanks = [];
    quMultiFillblanks.push(new QuMultiFillblank('姓名', ''));
    quMultiFillblanks.push(new QuMultiFillblank('电话', ''));
    quMultiFillblanks.push(new QuMultiFillblank('邮箱', 'name@example.com'));
    contactInfoQuestion.setQuMultiFillblanks(quMultiFillblanks);
    return contactInfoQuestion;
}
function getEmailQuestion() {
    let emailQuestion = new Question('email', '邮箱');
    let quMultiFillblanks = [];
    quMultiFillblanks.push(new QuMultiFillblank('', 'name@example.com'));
    emailQuestion.setQuMultiFillblanks(quMultiFillblanks);
    return emailQuestion;
}
function getPhoneNumberQuestion() {
    let phoneNumberQuestion = new Question('phoneNumber', '电话号码');
    let quMultiFillblanks = [];
    quMultiFillblanks.push(new QuMultiFillblank('', ''));
    phoneNumberQuestion.setQuMultiFillblanks(quMultiFillblanks);
    return phoneNumberQuestion;
}
function getAddressQuestion() {
    let addressQuestion = new Question('address', '邮寄地址');
    let quMultiFillblanks = [];
    quMultiFillblanks.push(new QuMultiFillblank('姓名', ''));
    quMultiFillblanks.push(new QuMultiFillblank('所在地区', '省市区'));
    quMultiFillblanks.push(new QuMultiFillblank('街道地址', ''));
    quMultiFillblanks.push(new QuMultiFillblank('邮政编码：', ''));
    quMultiFillblanks.push(new QuMultiFillblank('手机或固话', ''));
    addressQuestion.setQuMultiFillblanks(quMultiFillblanks);
    return addressQuestion;
}
function getIdNumberQuestion() {
    let idNumberQuestion = new Question('idNumber', '身份证号');
    let quMultiFillblanks = [];
    quMultiFillblanks.push(new QuMultiFillblank('', '身份证号'));
    idNumberQuestion.setQuMultiFillblanks(quMultiFillblanks);
    return idNumberQuestion;
}
//Choice
function getMultipleChoiceQuestion() {
    let multipleChoiceQuestion = new Question('multipleChoice', '多选题');
    let quCheckboxs = [];
    quCheckboxs.push(new QuCheckbox('选项一'));
    multipleChoiceQuestion.setQuCheckboxs(quCheckboxs);
    return multipleChoiceQuestion;
}
function getSingleChoiceQuestion() {
    let singleChoiceQuestion = new Question('singleChoice', '单选题');
    let quRadios = [];
    quRadios.push(new QuRadio('选项一'));
    singleChoiceQuestion.setQuRadios(quRadios);
    return singleChoiceQuestion;
}
function getDropdownQuestion() {
    let dropdownQuestion = new Question('dropdown', '下拉列表');
    let quRadios = [];
    quRadios.push(new QuRadio('选项一'));
    dropdownQuestion.setQuRadios(quRadios);
    return dropdownQuestion;
}
function getPictureChoiceQuestion() {
    let pictureChoiceQuestion = new Question('pictureChoice', '图片选择');
    let quRadios = [];
    quRadios.push(new QuRadio(''));
    pictureChoiceQuestion.setQuRadios(quRadios);
    return pictureChoiceQuestion;
}
function getYesNoQuestion() {
    let yesNoQuestion = new Question('yesNo', 'yes/no');
    let quRadios = [];
    quRadios.push(new QuRadio('是的'));
    quRadios.push(new QuRadio('不'));
    yesNoQuestion.setQuRadios(quRadios);
    return yesNoQuestion;
}
//Rating Ranking
function getOpinionScaleQuestion() {
    return new Question('opinionScale', '量表题');
}
function getRatingQuestion() {
    return new Question('rating', '评分题');
}
function getSliderQuestion() {
    return new Question('slider', '滑块题');
}
function getRankingQuestion() {
    let rankingQuestion = new Question('ranking', '排序题');
    let quOrderbys = []
    quOrderbys.push(new QuOrderby("选项1"));
    rankingQuestion.setQuOrderbys(quOrderbys);
    return rankingQuestion;
}
function getMatrixQuestion() {
    let matrixQuestion = new Question('matrix', '矩阵');
    let quRows = ['第一行']
    let quCols = ['第一列']
    matrixQuestion.setQuRows(quRows)
    matrixQuestion.setQuCols(quCols)
    return matrixQuestion;
}
//Text Video
function getShortTextQuestion() {
    let shortTextQuestion = new Question('shortText', '单项填空题');;
    let quMultiFillblanks = [];
    quMultiFillblanks.push(new QuMultiFillblank('', ''));
    shortTextQuestion.setQuMultiFillblanks(quMultiFillblanks);
    return shortTextQuestion;
}
function getMultipleTextQuestion() {
    let multipleTextQuestion = new Question('multipleText', '多项填空题');
    let quMultiFillblanks = [];
    quMultiFillblanks.push(new QuMultiFillblank('问题1', ''));
    quMultiFillblanks.push(new QuMultiFillblank('问题2', ''));
    multipleTextQuestion.setQuMultiFillblanks(quMultiFillblanks);
    return multipleTextQuestion;
}
//Other
function getNumberQuestion() {
    return new Question('number', '数字');
}
function getDateQuestion() {
    return new Question('date', '日期');
}
function getFileUpdateQuestion() {
    return new Question('fileUpdate', '文件上传');
}
function getQuestionGroupQuestion() {
    return new Question('questionGroup', '问题组');
}
function getMultiQuestionPageQuestion() {
    let MultiQuestionPage = new Question('multiQuestionPage', '多问题页面');
    MultiQuestionPage.isMultiPage = true
    let quQuestions = [];
    quQuestions.push(getShortTextQuestion());
    MultiQuestionPage.setQuquestions(quQuestions);
    return MultiQuestionPage;
}
//Start End
function getWelcomeScreenQuestion() {
    let welcomeScreenQu = new Question('welcomeScreen', '欢迎屏幕');
    welcomeScreenQu.isFullScreen = true
    welcomeScreenQu.quTitle = ''
    return welcomeScreenQu;
}
function getEndScreenQuestion() {
    let endScreenQu = new Question('endScreen', '结束屏幕')
    endScreenQu.isFullScreen = true
    endScreenQu.quTitle = '您的答卷已经提交，感谢您的参与！'
    return endScreenQu;
}


module.exports = {
    getContactInfoQuestion,
    getEmailQuestion,
    getPhoneNumberQuestion,
    getAddressQuestion,
    getIdNumberQuestion,
    getMultipleChoiceQuestion,
    getDropdownQuestion,
    getPictureChoiceQuestion,
    getYesNoQuestion,
    getOpinionScaleQuestion,
    getRatingQuestion,
    getRankingQuestion,
    getMatrixQuestion,
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
}