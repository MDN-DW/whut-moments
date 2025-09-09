import { defineStore } from "pinia"
import { getUserInfo } from '@/api/user'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const token = ref('')
    const setToken = (newToken) => {
        token.value = newToken
    }

    return { token, setToken }
}, {
    persist: [
        {
            key: 'user-token',
            paths: ['token'],
            storage: localStorage,
            serializer: {
                serialize: (state) => {
                    // 只序列化指定的字段
                    return JSON.stringify({ token: state.token })
                },
                deserialize: (value) => {
                    return JSON.parse(value || '{}')
                }
            }
        }
    ]
})