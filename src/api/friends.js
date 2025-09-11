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

// 获取通知列表
export const getNoticeList = ({ page, size }) => {
    return request.get('/api/notifications', {
        params: {
            page,
            size
        }
    })
}

// 已读通知
export const readNotice = (notification_id) => {
    return request.put(`/api/notifications/${notification_id}/read`)
}