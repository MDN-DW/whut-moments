import request from "@/utils/request";

// 获取热门搜索
export const getHotSearch = (limit) => {
    return request.get(`/api/search/hotwords?${limit}`)
}

// 获取搜索结果
export const getSearchList = (keyword, type, page, size) => {
    return request.get('/api/search', {
        params: {
            keyword,
            type,
            page,
            size
        }
    })
}