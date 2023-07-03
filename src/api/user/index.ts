import request from '@/utils/request'
import type { LoginParams, LoginResponse, UserInfoRes } from './type'
enum API {
    LOGIN_URL = '/user/login',
    USERINFO_URL = '/user/info'
}


// 登录
export const reqLogin = (data: LoginParams) => request.post<any, LoginResponse>(API.LOGIN_URL, data) 

// 用户信息
export const reqUserInfo = () => request.get<any, UserInfoRes>(API.USERINFO_URL) 