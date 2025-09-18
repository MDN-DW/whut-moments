import request from "@/utils/request";

// 获取所有任务标签
export const getAllTaskTag = () => {
    return request.get('/api/tags')
}

// 获取任务列表
export const getTaskList = ({ page, size, tag_id, status, keyword }) => {
    return request.get('/api/tasks', {
        params: {
            page,
            size,
            tag_id,
            status,
            keyword
        }
    })
}

// 获取我发布的任务列表
export const getMyTaskList = ({ page, size, tag_id, status, keyword }) => {
    return request.get('/api/tasks/my-published', {
        params: {
            page,
            size,
            tag_id,
            status,
            keyword
        }
    })
}

// 领取任务
export const takeTask = (task_id) => {
    return request.post(`/api/task_orders/${task_id}`)
}

// 收藏任务
export const collectTask = (task_id) => {
    return request.post(`/api/tasks/${task_id}/favorite`)
}

// 取消收藏任务
export const cancelCollectTask = (task_id) => {
    return request.delete(`/api/tasks/${task_id}/favorite`)
}

// 发布任务
export const publishTask = ({ title, content, reward, visibility, expire_at, file_ids, tag_ids }) => {
    return request.post('/api/tasks', {
        title,
        content,
        reward,
        visibility,
        expire_at,
        file_ids,
        tag_ids
    })
}

// 编辑任务
export const editTask = (task_id, { title, content, reward, visibility, expire_at, file_ids, tag_ids }) => {
    return request.put(`/api/tasks/${task_id}`, {
        title,
        content,
        reward,
        visibility,
        expire_at,
        file_ids,
        tag_ids
    })
}

// 获取任务详情
export const getTaskDetail = (task_id) => {
    return request.get(`/api/tasks/${task_id}`)
}