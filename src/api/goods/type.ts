export interface BrandListParams {
    page: number;
    limit: number;
}
export interface BrandListRes extends ResponseData{
    data: List
}

interface ResponseData {
    code: number
    message: string 
    ok: boolean
}

export interface CommonRes extends ResponseData {
    data?: string
}

interface List {
    records: ListItem[];
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
}

export interface ListItem {
    id?: number;
    tmName: string;
    logoUrl: string;
}

export interface Category extends ResponseData {
    data: CategoryItem[]
}

export interface CategoryItem {
    id: number
    name: string
}

export interface AttrRes extends ResponseData {
    data: Datum[]
}

export interface DeteleAttrRes extends ResponseData {
    data: object | string
}
  
export interface Datum {
    id: number;
    createTime?: any;
    updateTime?: any;
    attrName: string;
    categoryId: number;
    categoryLevel: number;
    attrValueList: AttrValueList[];
}

interface AttrValueList {
    id: number;
    createTime?: any;
    updateTime?: any;
    valueName: string;
    attrId: number;
}

export interface SaveAttrParams {
    attrName: string;
    attrValueList: AttrValueList1[];
    categoryId: number;
    categoryLevel: number;
    id?: number;
}

interface AttrValueList1 {
    attrId?: number;
    id?: number;
    valueName: string;
}