import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { useUserStore } from '@/stores/user'
import pinia from '@/stores'
nprogress.configure({ showSpinner: false }) // 关闭右上角的loading效果

const user = useUserStore(pinia)

router.beforeEach(async (to, from, next) => {
    const token = user.token
    const username = user.username
    nprogress.start()
    if (token) {
        // 登录成功 不能回login
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            if (username) {
                console.log('存在用户信息')
                next()
            } else {
                // 获取用户信息
                console.log('不存在用户信息')
                try {
                    await user.userInfo()
                    next()
                } catch (error) {
                    console.log('获取用户信息失败, 清除token')
                    user.userSignOut()
                    next({ path: '/login', query: { redirect: to.path } })
                }
            }
        }
    } else {
        if (to.path === '/login') {
            console.log('未登录 to login',)
            next()
        } else {
            console.log(`未登录 to ${to.path}`)
            next({ path: '/login', query: { redirect: to.path }})
        }
    }
})

router.afterEach((to) => {
    document.title = to.meta.title
    nprogress.done()
    console.log('after')
}) 