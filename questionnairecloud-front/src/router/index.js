import { createRouter, createWebHashHistory } from "vue-router";
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Manage from '@/views/Manage.vue'
import Edit from '@/views/Edit.vue'
// import To from '@/views/To.vue'
import { getCookie, delCookie } from "../utils/cookie";
import api from "../utils/api";
import EditResults from "../views/EditResults.vue";
import EditCreate from "../views/EditCreate.vue";
import EditInsights from "../views/EditInsights.vue";
import EditSummary from "../views/EditSummary.vue";
import ForgetPassword from "../views/ForgetPassword.vue";
import PasswordReset from "../views/PasswordReset.vue";
import VerifyEmail from "../views/VerifyEmail.vue";
import EditLogic from "../views/EditLogic.vue";

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/verify-email/:token', name: 'verify-email', component: VerifyEmail },
    { path: '/forget-password', name: 'forget-password', component: ForgetPassword },
    { path: '/reset-password/:token', name: 'reset-password', component: PasswordReset },
    { path: '/manage', name: 'manage', component: Manage, meta: { requiresAuth: true } },
    {
        path: '/edit', name: 'edit', component: Edit, meta: { requiresAuth: true }, children: [
            {
                path: '',
                name: 'edit_home',
                component: EditCreate,
            },
            {
                path: 'create',
                name: "create",
                redirect: { name: 'edit_home' },
            },
            {
                path: 'logic',
                name: "logic",
                component: EditLogic,
            },
            {
                path: 'results',
                name: "results",
                component: EditResults,
                children: [
                    { path: "", component: EditInsights },
                    { path: "insights", component: EditInsights },
                    { path: "summary", component: EditSummary },
                ]
            },

        ]
    },
    // { path: '/to/:id', name: 'to', component: To },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})
// 全局路由守卫
router.beforeEach((to, from, next) => {
    // 如果是跳转到登录和注册页面，不检验token
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    if (!requiresAuth) {
        next()
    } else {
        // 先检验是否存在token，这里token是存在cookie中
        if (getCookie('token')) {
            // 检验token是否过期
            api.isExpire().then(res => {
                if (res.message == 'token过期') {
                    console.log('token过期了');
                    delCookie("token")
                    next('/login')
                } else {
                    console.log('token正常');
                    next()
                }
            })
        } else {
            console.log('token不存在');
            next("login")
        }
    }
})

export default router
