// 对外暴露配置路由(常量路由)
export const constantRoute = [
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录',
            icon: 'Aim',
            hidden: true
        },
        component: () => import('@/views/Login/index.vue')
    },
    {
        path: '/',
        name: 'Layout',
        component: () => import('@/Layout/index.vue'),
        meta: {
            title: '',
            icon: '',
            hidden: false
        },
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'Home',
                meta: {
                    title: '首页',
                    icon: 'HomeFilled'
                },
                component: () => import('@/views/Home/index.vue')
            }
        ]
    },
    {
        path: '/screen',
        name: 'Screen',
        component: () => import('@/views/Screen/index.vue'),
        meta: {
            title: '数据大屏',
            icon: 'Platform',
            hidden: false
        }
    },
    {
        path: '/acl',
        name: 'Acl',
        component: () => import('@/Layout/index.vue'),
        meta: {
            title: '权限管理',
            icon: 'Lock'
        },
        redirect: '/acl/user',
        children: [
            {
                path: '/acl/user',
                name: 'User',
                component: () => import('@/views/acl/user/index.vue'),
                meta: {
                    title: '用户管理',
                    icon: 'User'
                }
            },
            {
                path: '/acl/role',
                name: 'Role',
                component: () => import('@/views/acl/role/index.vue'),
                meta: {
                    title: '角色管理',
                    icon: 'UserFilled',
                }
            },
            {
                path: '/acl/permission',
                name: 'Permission',
                component: () => import('@/views/acl/permission/index.vue'),
                meta: {
                    title: '权限管理',
                    icon: 'Monitor'
                }
            }
        ]
    },
    {
        path: '/product',
        name: 'Product',
        component: () => import('@/Layout/index.vue'),
        meta: {
            title: '商品管理',
            icon: 'Goods',
        },
        redirect: '/product/trademark',
        children: [
            {
                path: '/product/trademark',
                name: 'Trademark',
                meta: {
                    title: '品牌管理',
                    icon: 'ShoppingCartFull'
                },
                component: () => import('@/views/Product/trademark/index.vue')
            },
            {
                path: '/product/attr',
                name: 'Attr',
                meta: {
                    title: '属性管理',
                    icon: 'ChromeFilled'
                },
                component: () => import('@/views/Product/attr/index.vue')
            },
            {
                path: '/product/sku',
                name: 'SKU',
                meta: {
                    title: 'SKU管理',
                    icon: 'Orange'
                },
                component: () => import('@/views/Product/sku/index.vue')
            },
            {
                path: '/product/spu',
                name: 'SPU',
                meta: {
                    title: 'SPU管理',
                    icon: 'Calendar'
                },
                component: () => import('@/views/Product/spu/index.vue')
            }
        ]
    },
    {
        path: '/404',
        name: '404',
        meta: {
            title: '404',
            icon: 'DeleteFilled',
            hidden: true
        },
        component: () => import('@/views/404/index.vue')
    },
    // 匹配不到转到404
    {
        path: '/:pathMatch(.*)*',
        name: 'Any',
        meta: {
            title: '任意路由',
            icon: 'DeleteFilled',
            hidden: true
        },
        redirect: '/404'
    }
]