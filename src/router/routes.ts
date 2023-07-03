// 对外暴露配置路由(常量路由)
export const constantRoute = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login/index.vue')
    },
    {
        path: '/',
        name: 'Layout',
        component: () => import('@/views/Home/index.vue')
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/404/index.vue')
    },
    // 匹配不到转到404
    {
        path: '/:pathMatch(.*)*',
        name: 'Any',
        redirect: '/404'
    }
]