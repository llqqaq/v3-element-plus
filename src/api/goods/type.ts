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