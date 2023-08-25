import request from '@/utils/request'

enum API {
    // 获取全部角色
    ALL_ROLE = '/admin/acl/role',
    // 根据角色获取菜单
    ROLE_MENU = '/admin/acl/permission/toAssign',
    // 获取全部菜单
    PEIMISSION = '/admin/acl/permission'
}
// 获取全部角色
export const reqAllRole = (data: any) => request.get(`${API.ALL_ROLE}/${data.page}/${data.limit}?roleName=${data.roleName}`)

// 根据角色获取菜单
export const reqRoleMenu = (roleId: number) => request.get(`${API.ROLE_MENU}/${roleId}`)

// 获取全部菜单
export const reqPermission = () => request.get(`${API.PEIMISSION}`)
