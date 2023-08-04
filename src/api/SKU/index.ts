import request from '@/utils/request'

enum API {
    // 获取SPU信息
    BRAND_SPU = '/admin/product',
    // 获取所有品牌
    BRAND_NAME = '/admin/product/baseTrademark/getTrademarkList',
    // 获取某个SPU下的全部售卖图片
    BRAND_IMAGE = '/admin/product/spuImageList',
    // 获取某个SPU下的销售属性
    BRAND_ATTR = '/admin/product/spuSaleAttrList',
    // 获取整个项目全部的销售属性[颜色、版本、尺码]
    ALL_ATTRS = '/admin/product/baseSaleAttrList',
    // 新增SPU
    SAVE_SPU = '/admin/product/saveSpuInfo',
    // 更新SPU
    UPDATE_SPU = '/admin/product/updateSpuInfo'
}

// 获取SPU信息
export const getSPU = (data: any) => request.get(`${API.BRAND_SPU}/${data.page}/${data.limit}`, {
    params: {
        category3Id: data.id
    }
})

// 获取所有品牌
export const getTrademarkList = () => request.get(`${API.BRAND_NAME}`)

// 获取某个SPU下的全部售卖图片
export const getSpuImageList = (spuId: number) => request.get<any, any>(`${API.BRAND_IMAGE}/${spuId}`)

// 获取某个SPU下的销售属性
export const getSpuSaleAttrList = (spuId: number) => request.get<any, any>(`${API.BRAND_ATTR}/${spuId}`)

// 获取所有品牌
export const getBaseSaleAttrList = () => request.get(`${API.ALL_ATTRS}`)

// 新增/编辑SPU
export const saveOrUpdateSpu = (data: any) => {
    if (data.id) {
        return request.post<any, any>(API.UPDATE_SPU)
    }
    return request.post<any, any>(API.SAVE_SPU)
}
