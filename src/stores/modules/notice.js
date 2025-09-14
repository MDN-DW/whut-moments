import { defineStore } from "pinia";
import { ref } from "vue";

export const useNoticeStore = defineStore("notice", () => {
    const noticeCount = ref(0)
    const setCount = (newCount) => {
        noticeCount.value = newCount
    }
    return { noticeCount, setCount }
}, {
    persist: [
        {
            key: 'notice-count',
            paths: ['noticeCount'],
            storage: localStorage,
            serializer: {
                serialize: (state) => {
                    // 只序列化指定的字段
                    return JSON.stringify({ noticeCount: state.noticeCount })
                },
                deserialize: (value) => {
                    return JSON.parse(value || '{}')
                }
            }
        }
    ]
})