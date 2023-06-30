// 用户信息数据
function createUserList () {
    return [
        {
            userId: 1,
            avatar: 
                'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fae175b96-62b4-4c48-ae36-a278a8a27e2c%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1690621686&t=92564c97bccb5860a1abb9bcf71f4ac8',
            username: 'admin',
            password: '111111',
            desc: '平台管理员',
            roles: ['平台管理员'],
            buttons: ['cuser.detail'], // 按钮权限标识
            routes: ['home'], // 路由权限标识
            token: 'Admin Token'
        },
        {
            userId: 2,
            avatar: 
                'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fa18d2b69-6105-4eb5-bab3-6190591fcbc0%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1690621686&t=fabe36ad43d7ee148e71401ce611c213',
            username: 'system',
            password: '111111',
            desc: '系统管理员',
            roles: ['系统管理员'],
            buttons: ['cuser.detail', 'cuser.user'], // 按钮权限标识
            routes: ['home'], // 路由权限标识
            token: 'System Token'
        }
    ]
}

export default [
    // 用户登录接口
    {
        url: '/api/user/login',
        method: 'post',
        response: ({ body }) => {
            const { username, password } = body
            const checkUser = createUserList().find(item => (
                item.username === username && item.password === password
            ))
            if (!checkUser) {
                return { code: 201, data: { message: '账号或者密码不正确' } }
            }
            const { token } = checkUser
            return { code: 200, data: { token } }
        }
    },
    // 获取用户信息
    {
        url: '/api/user/info',
        method: 'get',
        response: (request) => {
           const token = request.headers.token
           const checkUser = createUserList().find(item => item.token === token)
           if (!checkUser) {
               return { code: 201, data: { message: '获取用户信息失败' } }
           }
           return { code: 200, data: { checkUser } }
        }
    }
]