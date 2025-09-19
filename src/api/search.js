import request from "@/utils/request";

// 获取热门话题
export const getHotTopics = () => {
    return request.get('/api/topis/hot')
}

// 获取热门动态
export const getHotPosts = () => {
    return request.get('/api/search/hotposts')
}

// 根据关键词获取话题搜索结果
export const getSearchKeyList = (keyword, page, size) => {
    return request.get('/api/search', {
        params: {
            keyword,
            page,
            size
        }
    })
}