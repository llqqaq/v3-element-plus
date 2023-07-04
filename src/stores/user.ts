import { ref } from 'vue'
import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'

import type { LoginParams } from '@/api/user/type'
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
export const useUserStore = defineStore('user', () => {
    const token = ref(GET_TOKEN())
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
    return { token, userLogin }
})
