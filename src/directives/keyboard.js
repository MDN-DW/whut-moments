export default {
    mounted(el, binding) {
        const ua = navigator.userAgent
        const iOS = /iPad|iPhone|iPod/.test(ua)

        const handleFocus = () => {
            setTimeout(() => {
                if (iOS) {
                    if (!/OS 11_[0-3]\D/.test(ua)) {
                        document.body.scrollTop = document.body.scrollHeight
                    }
                } else {
                    el.scrollIntoView(false)
                }
            }, 300)
        }

        // 保存处理函数引用
        el._keyboardFocusHandler = handleFocus
        el.addEventListener('focus', handleFocus)
    },

    unmounted(el) {
        // 清理事件监听器
        if (el._keyboardFocusHandler) {
            el.removeEventListener('focus', el._keyboardFocusHandler)
            el._keyboardFocusHandler = null
        }
    }
}