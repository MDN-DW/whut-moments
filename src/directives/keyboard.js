import { onMounted } from 'vue'

export default {
    mounted(el, binding) {
        const ua = navigator.userAgent
        const iOS = /iPad|iPhone|iPod/.test(ua)

        // 添加 focus 事件监听器
        el.addEventListener('focus', () => {
            setTimeout(() => {
                if (iOS) {
                    // iOS 设备特殊处理
                    if (!/OS 11_[0-3]\D/.test(ua)) {
                        document.body.scrollTop = document.body.scrollHeight
                    }
                } else {
                    // 非 iOS 设备
                    el.scrollIntoView(false)
                }
            }, 300)
        })
    },
    updated(el, binding) {
        // 如果绑定值发生变化，重新设置事件
        if (binding.value !== binding.oldValue) {
            el.removeEventListener('focus', handleFocus)
            el.addEventListener('focus', handleFocus)
        }
    },
    unmounted(el) {
        // 组件销毁时移除事件监听
        el.removeEventListener('focus', handleFocus)
    }
}