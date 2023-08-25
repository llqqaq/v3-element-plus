import request from '@/utils/request'

enum API {
    ACL_USER = '/admin/acl/user',
    USER_ROLE = '/admin/acl/user/toAssign'
}

// 用户接口
export const UserList = (data: any) => request.get(`${API.ACL_USER}/${data.page}/${data.limit}`)

// 根据用户获取角色数据
export const ToAssign = (id: number) => request.get(`${API.USER_ROLE}/${id}/`)