import { defineStore } from 'pinia'
import { io } from 'socket.io-client'
import { ref, computed } from 'vue'

export const useSocketStore = defineStore('socket', () => {
    /* 
        payload:{
            user_id,
            notification_id,
            type:CHAT|SYSTEM|INTERACTION,
            status:READ|UNREAD,
            nickname,
            avatar_url,
            text,
            count
        }
    */

    let socket = null

    /* 三段存储 */
    const system = ref([]) // 系统
    const interactive = ref([]) // 互动
    const chatMap = new Map() // 好友（同一人覆盖）

    /* 计算属性：按「系统→互动→好友」拼死顺序 */
    const displayList = computed(() => [
        ...system.value,
        ...interactive.value,
        ...chatMap.values()
    ])

    const connect = () => {
        if (socket) return


        socket = io('http://192.168.43.1:8080', {
            transports: ['websocket'], // 强制走 WS
            reconnection: true,
            reconnectionDelay: 2000
        })

        socket.on('connect', () => {
            console.log('Socket.IO 已连接')
        })

        socket.on('chat', (payload) => {
            payload.time = payload.time || Date.now()
            switch (payload.type) {
                case 'SYSTEM':
                    system.value.unshift(payload)
                    break
                case 'INTERACTION':
                    interactive.value.unshift(payload)
                    break
                case 'CHAT':
                    chatMap.set(payload.user_id, payload)
                    break
            }
            latest.value = payload   // 给弹窗用
        })
    }

    const latest = ref(null)
    const send = (payload) => {
        socket.emit('chat', payload)
    }

    return { connect, chatMap, displayList, latest, send }
})