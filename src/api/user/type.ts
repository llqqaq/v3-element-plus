export interface LoginParams {
    username: string,
    password: string
}
interface LoginResonseData {
    token?: string,
    message?: string
}
export interface LoginResponse {
    code: number,
    data: LoginResonseData
}
export interface UserInfoRes {
    code: number,
    data: UserInfoResponseData
}

interface UserInfoResponseData {
    userId: number;
    avatar: string;
    username: string;
    password: string;
    desc: string;
    roles: string[];
    buttons: string[];
    routes: string[];
    token: string;
}