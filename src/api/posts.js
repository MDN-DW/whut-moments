import request from "@/utils/request";

// 获取所有动态列表
export const getAllPost = ({ page, size }) => {
    return request.get('/api/posts', {
        params: {
            page,
            size
        }
    })
}

// 获取评论列表
export const getCommentList = (post_id, { page, size }) => {
    return request.get(`/api/comments/${post_id}`, {
        params: {
            page,
            size
        }
    })
}

// 点赞动态
export const likePost = (post_id) => {
    return request.post(`api/posts/${post_id}/like`)
}

// 取消点赞动态
export const cancelLikePost = (post_id) => {
    return request.delete(`/api/posts/${post_id}`)
}

// 收藏动态
export const collectPost = (post_id) => {
    return request.post(`/api/posts/${post_id}/favorite`)
}

// 取消收藏动态
export const cancelCollectPost = (post_id) => {
    return request.delete(`/api/posts/${post_id}/favorite`)
}

// 分享动态
export const sharePost = (post_id) => {
    return request.post(`/api/posts/${post_id}/share`)
}

// 点赞评论
export const likeComment = (comment_id) => {
    return request.post(`/api/comments/${comment_id}/like`)
}

// 取消点赞评论
export const cancelLikeComment = (comment_id) => {
    return request.delete(`/api/comments/${comment_id}/like`)
}

// 发布评论
export const publishComment = (post_id, { content, parentId, atUsers }) => {
    return request.post(`/api/comments/${post_id}`, {
        content,
        parentId,
        atUsers
    })
}

// 发布动态
export const publishPost = ({ content, visibility, poi_lat, poi_lng, poi_name, file_ids, topic_names }) => {
    return request.post('/api/posts', {
        content,
        visibility,
        poi_lat,
        poi_lng,
        poi_name,
        file_ids,
        topic_names
    }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

// 删除评论
export const deleteComment = (comment_id) => {
    return request.delete(`/api/comments/${comment_id}`)
}

// 获取动态详情
export const getPostDetail = (post_id) => {
    return request.get(`/api/posts/${post_id}`)
}

// 获取话题下的动态列表
export const getTopicPostList = (topic_id, page, size) => {
    return request.get(`api/topics/${topic_id}/posts`, {
        params: {
            page,
            size
        }
    })
}

// 获取他人动态列表
export const getUserPostList = (user_id, page, size) => {
    return request.get(`api/users/${user_id}/`, {
        params: {
            page,
            size
        }
    })
}