import { ref } from 'vue'
import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import type { LoginParams } from '@/api/user/type'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import { constantRoute, asyncRoute, anyRoute } from '@/router/routes'
import router from '@/router' // 这里直接不能使用useRouter
import type { Token, Route } from './type'
// @ts-ignore
import cloneDeep from 'loadsh/cloneDeep'

const filterAsyncRoutes = (asyncRoute: any[], routes: any[]) => {
    const result = asyncRoute.filter(item => {
        if (item.children && item.children.length) {
            item.children = filterAsyncRoutes(item.children, routes)
        }
        if (routes.includes(item.name)) return true
    })
    return result
}

export const useUserStore = defineStore('user', () => {
    const token = ref<Token>(GET_TOKEN())
    const route = ref<Route>(constantRoute)
    const avatar = ref<string>('')
    const username = ref<string>('')
    // 用户登录
    const userLogin = async (data: LoginParams) => {
        const result = await reqLogin(data)
        if (result.code === 200) {
            token.value = result.data
            SET_TOKEN(token.value)
            return
        }
        return Promise.reject(result.data)
    }
    // 获取用户信息
    const userInfo = async () => {
        const result = await reqUserInfo()
        if (result.code === 200) {
            avatar.value = result.data.avatar
            username.value = result.data.name
            const asyncFilterRoute = filterAsyncRoutes(cloneDeep(asyncRoute), result.data.routes)
            const needAddAsync = [ ...asyncFilterRoute, ...anyRoute]
            route.value = [...constantRoute, ...needAddAsync]
            // 挂载到路由上
            needAddAsync.forEach(route => {
                router.addRoute(route)
            })
            console.log(router.getRoutes())
            return
        }
        return Promise.reject(result.message)
    }
    // 退出登录
    const userSignOut = async () => {
        const result = await reqLogout()
        if (result.code === 200) {
            token.value = ''
            username.value = ''
            avatar.value = ''
            REMOVE_TOKEN()
            return
        }
        return Promise.reject(result.message)
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
