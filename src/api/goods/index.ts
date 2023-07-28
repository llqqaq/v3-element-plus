import request from '@/utils/request'
import type {
    BrandListRes,
    BrandListParams,
    CommonRes,
    ListItem,
    Category,
    AttrRes,
    DeteleAttrRes,
    SaveAttrParams
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
    UPLOAD_IMAGE = '/admin/product/fileUpload',
    // 商品分类
    GOOD_CATEGORY = '/admin/product/getCategory1',
    // 二级分类
    GOOD_CATEGORY2 = '/admin/product/getCategory2',
    // 三级分类
    GOOD_CATEGORY3 = '/admin/product/getCategory3',
    // 基础属性
    GOOD_ATTR = '/admin/product/attrInfoList',
    // 删除基础属性
    DELETE_ATTR = '/admin/product/deleteAttr',
    // 添加/编辑基本属性
    SAVE_ATTR = '/admin/product/saveAttrInfo'
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

// 商品分类
export const getCategory1 = () => request.get<any, Category>(API.GOOD_CATEGORY)

// 获取二级分类
export const getCategory2 = (id: number) => request.get<any, Category>(`${API.GOOD_CATEGORY2}/${id}`)

// 获取三级分类
export const getCategory3 = (id: number) => request.get<any, Category>(`${API.GOOD_CATEGORY3}/${id}`)

// 获取基础属性
export const getAttr = (arr: number[]) => request.get<any, AttrRes>(`${API.GOOD_ATTR}/${arr[0]}/${arr[1]}/${arr[2]}`)

// 删除属性
export const deleteAttrItem = (id: number) => request.delete<any, DeteleAttrRes>(`${API.DELETE_ATTR}/${id}`)

// 添加/编辑基本属性
export const saveAttr = (data: SaveAttrParams) => request.post<any, any>(`${API.SAVE_ATTR}`, data)