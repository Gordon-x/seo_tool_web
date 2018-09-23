import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import {get_api} from "../env";

Vue.use(VueAxios, axios);

export const baseApi = get_api(process.env.NODE_ENV);

const request = axios.create({
    baseURL: baseApi.config.api,
    timeout: 25000,
});

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 非 api 域名下的请求，均不拦截
    if (config.url.indexOf('http') !== 0) {
        config.emulateJSON = true;
        config.withCredentials = true;
        config.headers['X-TOKEN'] = localStorage.getItem('x-token');
        config.headers['Content-Type'] = 'application/json';
    }

    return config;
}, function (error) {
    console.error(error);
    return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 用户未登陆 或者 用户被禁用，重定向到登录页面
    if (+response.data.code === 10003) {
        localStorage.removeItem('x-token');
        location.reload();
    }

    // 返回结果code编码不为0时，显示错误信息
    if (+response.data.code !== 0) {
        Promise.reject(response.data.message);
    }
    if (!response.data.data) {
        response.data.data = [];
    }
    return response;
}, function (error) {
    console.error(error);
    Vue.prototype.$notify(
        {
            title: '错误',
            message: '请求失败',
            type: 'error',
            duration: 3000,
        }
    );
    return Promise.reject('网络错误，请稍后再试');
});

// 创建 API 实例
export const createAPI = (url, method, config = {}) => {
    return request({
        url,
        method,
        ...config
    });
};