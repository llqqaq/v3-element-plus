export interface LoginParams {
    username: string
    password: string
}

interface ResponseData {
    code: number
    message: string 
    ok: boolean
}

export interface loginResponseData extends ResponseData {
    data: string
}

export interface userInfoResponseData extends ResponseData {
    data: Data
}

interface Data {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
}