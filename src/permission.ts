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
                next()
            } else {
                // 获取用户信息
                try {
                    await user.userInfo()
                    // 这里刷新，获取完用户信息后就直接跳转，这样异步路由还没挂载上去，会白屏，所以通过 next({ ...to }),确保挂载后再跳转
                    next({ ...to })
                } catch (error) {
                    await user.userSignOut()
                    next({ path: '/login', query: { redirect: to.path } })
                }
            }
        }
    } else {
        if (to.path === '/login') {
            console.log('未登录 to login',)
            next()
        } else if (to.path === '/screen') {
            next()
        } 
        else {
            console.log(`未登录 to ${to.path}`)
            next({ path: '/login', query: { redirect: to.path }})
        }
    }
})

router.afterEach((to) => {
    (document.title as any) = to.meta.title
    nprogress.done()
}) 
