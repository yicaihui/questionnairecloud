//封装api路由地址
import http from "./http";
function get_publickey(data) {
    return http.get("/user/publickey", data);
}
// 登陆
function login(data) {
    return http.post("/user/login", data);
}
//注册-邮箱验证
function verify_email(data) {
    return http.post("/user/verify-email", data);
}
//注册
function register(data) {
    return http.post('/user/register', data)
}
//找回密码
function forget_password(email) {
    return http.post('/user/forgot-password', { email })
}
//重置密码
function reset_password(token, password) {
    return http.post('/user/reset-password/' + token, { password })
}
//搜索用户名
function searchUsername(val) {
    return http.get('/user/search?name=' + val)
}
//存在token登录
export function hasToken() {
    return http.post('/user/hasToken')
}
// 检测token是否过期
export function isExpire() {
    return http.post('/user/isExpire')
}
//获取工作空间
export function workspace_get() {
    return http.get('/workspace/get')
}
export function workspace_detail(id) {
    return http.get('/workspace/getdetail?workspaceId=' + id)
}
//添加管理员
export function workspace_addcopartners(workspaceId, ids) {
    // console.log(workspaceId, ids)
    return http.post('/workspace/addcopartners', { workspaceId, ids: JSON.stringify(ids) })
}
//survey
//获取toolbar
function toolbar_get() {
    return http.get('/survey/toolbar')
}
//获取问卷
export function question_get(id) {
    return http.get('/survey/get?workspaceId=' + id)
}
//获取某个问卷
export function detail_survey_get(id) {
    return http.get('/survey/get/' + id)
}
//创建问卷
export function question_create(id) {
    return http.post('/survey/create', { workspaceId: id })
}
//更新问卷
export function question_update(id, surveyInfo) {
    return http.patch('/survey/update/' + id, surveyInfo)
}
//上传问卷答案
export function answer_create(questionId, answerList) {
    return http.post('/answer/create', { answer: { questionId, answerList } })
}
//获取答案统计结果
export function stat_getdata(questionId) {
    return http.get('/stat/getdata/' + questionId)
}
export default {
    login,
    register,
    hasToken,
    isExpire,
    question_get,
    question_create,
    detail_survey_get,
    question_update,
    answer_create,
    stat_getdata,
    workspace_get,
    workspace_detail,
    workspace_addcopartners,
    searchUsername,
    forget_password,
    reset_password,
    toolbar_get,
    verify_email,
    get_publickey
}

