import request from "@/utils/request"

// 获取当前用户信息
export const getUserInfo = () => {
    return request.get('/api/users/me')
}

// 获取验证码
export const getCode = () => {
    return request.post('/api/auth/mobile/send-code', {

    })
}

// 登录
export const login = ({ mobile, code }) => {
    return request.post('/api/auth/mobile/login', {
        mobile,
        code
    })
}

// 更新用户信息
export const updateUerInfo = ({ nickname, avatar_url, birthday, gender, campus_id, privacy_mobile, privacy_birthday, privacy_fans }) => {
    return request.put('/api/users/profile', {
        nickname,
        avatar_url,
        birthday,
        gender,
        campus_id,
        privacy_mobile,
        privacy_birthday,
        privacy_fans
    })
}

// 获取黑名单列表
export const getBlackList = ({ page, size }) => {
    return request.get('/api/users/blacklist', {
        params: {
            page,
            size
        }
    })
}

// 去除黑名单
export const delBlack = (target_id) => {
    return request.delete(`/api/users/blacklist/${target_id}`)
}