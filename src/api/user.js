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
