import axios from "axios";
import { useUserStore } from "@/stores";
import { showLoadingToast, closeToast, showFailToast } from 'vant';

const request = axios.create({
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 携带token
    const userStore = useUserStore()
    if (userStore.token) {
        config.headers.token = userStore.token
    }
    // 开启加载
    showLoadingToast({
        message: '加载中...',
        forbidClick: true,
    });
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // 关闭加载
    closeToast()
    if (response.data.code === 200) {
        return response
    }
    showFailToast(response.data.message)
    return Promise.reject(response.data.message)
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    showFailToast(error.response.data.message)
    return Promise.reject(error);
})

export default request