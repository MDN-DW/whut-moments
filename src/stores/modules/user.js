import { defineStore } from "pinia";
import { getUserInfo } from '@/api/user'

export const useUserStore = defineStore('user', () => {
    const token = ref('')
    const setToken = (newToken) => {
        token.value = newToken
    }

    const userInfo = ref({})
    const getUser = async () => {
        const { data: data } = await getUserInfo()
        userInfo.value = data
    }
    const setUser = (newUser) => {
        userInfo.value = newUser
    }
    return { token, setToken, userInfo, getUser, setUser }
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
        },
        {
            key: 'user-info',
            paths: ['userInfo'],
            storage: localStorage,
            serializer: {
                serialize: (state) => {
                    // 只序列化指定的字段
                    return JSON.stringify({ info: state.userInfo })
                },
                deserialize: (value) => {
                    return JSON.parse(value || '{}')
                }
            }
        }
    ]
})