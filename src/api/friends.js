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