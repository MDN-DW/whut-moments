export const timeAgo = (timeString) => {
    // 将时间字符串解析为 Date 对象
    const pastTime = new Date(timeString)

    // 获取当前时间
    const currentTime = new Date()

    // 计算时间差（毫秒）
    const diffInMs = currentTime - pastTime

    // 转换为秒
    const diffInSeconds = Math.floor(diffInMs / 1000)

    // 不到1分钟显示刚刚
    if (diffInSeconds < 60) {
        return '刚刚'
    }

    // 转换为分钟
    const diffInMinutes = Math.floor(diffInSeconds / 60)

    // 不到1小时显示分钟
    if (diffInMinutes < 60) {
        return `${diffInMinutes}分钟前`
    }

    // 转换为小时
    const diffInHours = Math.floor(diffInMinutes / 60)

    // 不到1天显示小时
    if (diffInHours < 24) {
        return `${diffInHours}小时前`
    }

    // 转换为天
    const diffInDays = Math.floor(diffInHours / 24)

    // 不到1年显示天
    if (diffInDays < 365) {
        return `${diffInDays}天前`
    }

    // 超过1年显示年
    const diffInYears = Math.floor(diffInDays / 365)
    return `${diffInYears}年前`
}