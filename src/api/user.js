import request from "@/utils/request"

// 获取当前用户信息
export const getUserInfo = () => {
    return request.get('/api/users/me')
}

// 登录
export const login = ({ account, password }) => {
    return request.post('/api/auth/login', {
        account,
        password
    })
}

// 注册
export const register = (account, password) => {
    return request.post('/api/auth/register', {
        account,
        password
    })
}

// 退出登录
export const logout = () => {
    return request.post('/api/auth/logout')
}

// 更新用户信息
export const updateUerInfo = ({ nickName = '匿名用户', avatarUrl, birthday, gender, campusId, privacyMobile, privacyBirthday, privacyFans }) => {
    return request.put('/api/users/profile', {
        nickName,
        avatarUrl,
        birthday,
        gender,
        campusId,
        privacyMobile,
        privacyBirthday,
        privacyFans
    }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
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

// 获取用户信息
export const getUserDetail = (user_id) => {
    return request.get(`/api/users/${user_id}`)
}