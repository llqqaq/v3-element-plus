import request from '@/utils/request'
import type {
    BrandListRes,
    BrandListParams,
    CommonRes,
    ListItem
} from './type'

enum API {
    // 获取已有品牌接口
    BRAND_LIST = '/admin/product/baseTrademark',
    // 删除品牌接口
    DELETE_BRAND = '/admin/product/baseTrademark/remove',
    // 修改已有品牌
    UPDADE_BRAND = '/admin/product/baseTrademark/update',
    // 上传品牌
    UPLOAD_BRAND = '/admin/product/baseTrademark/save',
    // 上传图片
    UPLOAD_IMAGE = '/admin/product/fileUpload'
}

// 获取品牌列表
export const getBrandList = (data: BrandListParams) => request.get<any, BrandListRes>(`${API.BRAND_LIST}/${data.page}/${data.limit}`) 

// 删除品牌
export const deleteBrand = (id: number) => request.delete<any, CommonRes>(`${API.DELETE_BRAND}/${id}`)

// 修改品牌
export const updateOrSaveBrand = (data: ListItem) => {
    if (data.id) return request.put<any, any>(API.UPDADE_BRAND, data)
    return request.post<any, any>(API.UPLOAD_BRAND, data)
}

// 上传图片
export const uploadImage = (data: any) => request.post(API.UPLOAD_IMAGE, data)