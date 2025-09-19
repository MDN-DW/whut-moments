import request from "@/utils/request";

// 获取好友列表
export const getFriendsList = ({ page, size, status }) => {
    return request.get('/api/friends', {
        params: {
            page,
            size,
            status
        }
    })
}

// 已读通知
export const readNotice = (notification_id) => {
    return request.put(`/api/notifications/${notification_id}/read`)
}

// 获取通知总数
export const getNoticeCount = () => {
    return request.get('/api/notifications/unread_count')
}

// 获取聊天记录
export const getChatRecord = ({ page, size, friendId }) => {
    return request.get('/api/friends/messages', {
        params: {
            page,
            size,
            friendId
        }
    })
}