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