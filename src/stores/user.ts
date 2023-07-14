import { ref } from 'vue'
import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '@/api/user'
import type { LoginParams } from '@/api/user/type'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import { constantRoute } from '@/router/routes'
import type { Token, Route } from './type'

export const useUserStore = defineStore('user', () => {
    const token = ref<Token>(GET_TOKEN())
    const route = ref<Route>(constantRoute)
    const avatar = ref<string>('')
    const username = ref<string>('')
    // 用户登录
    const userLogin = async (data: LoginParams) => {
        const result = await reqLogin(data)
        if (result.code === 200) {
            token.value = (result.data.token as string) 
            SET_TOKEN(result.data.token as string)
            return
        }
        return Promise.reject(result.data.message)
    }
    // 获取用户信息
    const userInfo = async () => {
        const result = await reqUserInfo()
        if (result.code === 200) {
            avatar.value = result.data.avatar
            username.value = result.data.username
            return
        }
        return Promise.reject(result.data.message)
    }
    // 退出登录
    const userSignOut = () => {
        token.value = ''
        username.value = ''
        avatar.value = ''
        REMOVE_TOKEN()
    }
    return {
        token,
        route,
        avatar,
        username,
        userLogin,
        userInfo,
        userSignOut
    }
})
