import axios from 'axios'
import { ElMessage } from 'element-plus'

let request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000
})

request.interceptors.request.use(config => {
    config.headers.token = '2323'
    return config
})


request.interceptors.response.use(responent => {
    // 成功回调
    return responent.data
}, error => {
    // 失败回调
    console.log(error)
    let message = ''
    let status = error.response.status
    switch (status) {
        case 401: 
            message = 'TOKEN 过期'
            break
        case 403:
            message = '无权访问'
            break
        case 404:
            message = '请求地址错误'
            break
        case 500:
            message = '服务器出现问题'
            break
        default:
            message = '网络出现问题'
            break
    }
    ElMessage.error(message)
    throw new Error(message)
})

export default request