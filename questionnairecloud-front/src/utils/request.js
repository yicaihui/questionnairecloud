import axios from 'axios'//引入
import { getCookie } from './cookie';

const baseURL = "http://localhost:3000/";
const service = axios.create({
    // 配置项
    baseURL: baseURL,
    withCredentials: true,
    timeout: 50000,
});

// 拦截器
service.interceptors.request.use(
    (config) => {
        // config.data = JSON.stringify(config.data); //数据转化,也可以使用qs转换
        let token = getCookie('token')
        if (token) {
            config.headers.authorization = token
        }
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded' //配置请求头
        return config;
    },
    (err) => Promise.reject(err)
);

service.interceptors.response.use(
    (response) => {
        if (response.status === 200) {
            return Promise.resolve(response.data);
        } else {
            return Promise.reject(response);
        }
    },
    (error) => {
        if (error.response.status) {
            switch (error.response.status) {
                case 400:
                    error.message = "错误请求";
                    break;
                case 401:
                    error.message = "未授权，请重新登录";
                    break;
                case 403:
                    error.message = "拒绝访问";
                    break;
                case 404:
                    error.message = "请求错误,未找到该资源";
                    window.location.href = "/NotFound";
                    break;
                case 405:
                    error.message = "请求方法未允许";
                    break;
                case 408:
                    error.message = "请求超时";
                    break;
                case 500:
                    error.message = "服务器端出错";
                    break;
                case 501:
                    error.message = "网络未实现";
                    break;
                case 502:
                    error.message = "网络错误";
                    break;
                case 503:
                    error.message = "服务不可用";
                    break;
                case 504:
                    error.message = "网络超时";
                    break;
                case 505:
                    error.message = "http版本不支持该请求";
                    break;
                default:
                    error.message = `连接错误${error.response.status}`;
            }
        } else {
            // 超时处理
            if (JSON.stringify(error).includes("timeout")) {
            }
            error.message("连接服务器失败");
        }


        /***** 处理结束 *****/
        //如果不需要错误处理，以上的处理过程都可省略
        return Promise.resolve(error.response);
    }
);

export default service;
