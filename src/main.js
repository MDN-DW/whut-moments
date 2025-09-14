import './assets/css/main.css'

import { createApp } from 'vue'
import pinia from './stores'

import App from './App.vue'
import router from './router'

import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useSocketStore } from '@/stores'
import { showNotify, Notify } from 'vant'
import { h } from 'vue'
import 'vant/es/notify/style'
import MessageDialogAvatar from './components/MessageDialogAvatar.vue'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(Notify)

// 全局只连一次
useSocketStore().connect()

const { latest } = storeToRefs(useSocketStore())

/* 只要来新消息就弹窗（列表已在 Store 自动追加） */
watch(latest, (msg) => {
    /* 
        msg:{
            user_id,
            notification_id,
            type:CHAT|SYSTEM|INTERACTION,
            status:READ|UNREAD,
            nickname,
            avatar_url,
            text,
            time,
            count
        }
    */

    if (!msg) return
    showNotify({
        type: 'primary',
        duration: 3000,
        message: h('div', { style: 'display:flex;align-items:center;' }, [
            h(MessageDialogAvatar, { type: msg.type, avatar_url: msg.avatar_url }),
            h('div', {}, [
                h('div', { style: 'font-weight:bold;' }, msg.nickname),
                h('div', { style: 'font-size:12px;color:#666;' }, msg.text)
            ])
        ])
    })
}
)

app.mount('#app')
