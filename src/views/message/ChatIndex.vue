<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import defaultAvatar from '@/assets/image/default.png'
import { getChatRecord } from '@/api/friends'
import { timeAgo } from '@/utils/timeFormat'
import { useUserStore } from '@/stores'

const userStore = useUserStore()

const route = useRoute()
const router = useRouter()

const nickName = route.query.nickName
const friendAvatarUrl = route.query.avatarUrl
const friendId = route.query.userId

const chatRecord = ref([])
const page = ref(1)
const size = ref(10)

onMounted(async () => {
    const { data: { data } } = await getChatRecord({
        page: page.value,
        size: size.value,
        friendId: friendId
    })
    chatRecord.value = data.list
})

/* chatRecord.value = [
    {
        "id": 1001,
        "fromId": 1001,
        "toId": 1002,
        "content": "消息内容",
        "createdAt": "2023-01-01T00:00:00Z"
    },
    {
        "id": 1002,
        "fromId": 1002,
        "toId": 1001,
        "content": "消息内容",
        "createdAt": "2023-01-01T00:00:00Z"
    },
    {
        "id": 1003,
        "fromId": 1002,
        "toId": 1001,
        "content": "消息内容",
        "createdAt": "2023-01-01T00:00:00Z"
    }
] */
</script>

<template>
    <van-nav-bar fixed>
        <template #left>
            <van-icon name="arrow-left" @click="router.back()" />
            <div class="info">
                <div class="avatar">
                    <van-image :src="friendAvatarUrl || defaultAvatar" class="avatar-image" />
                </div>
                <div class="nickname-status">
                    <div class="nickname">
                        {{ nickName }}
                    </div>
                    <div class="status">
                        正在输入...
                    </div>
                </div>
            </div>
        </template>
    </van-nav-bar>

    <div class="container">
        <div class="item" v-for="item in chatRecord">
            <div class="avatar">
                <van-image :src="friendAvatarUrl || defaultAvatar" class="avatar-image" />
            </div>

            <div class="content">
                <div class="text">{{ item.content }}</div>
            </div>

            <div class="time">
                {{ timeAgo(item.createdAt) }}
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.info {
    display: flex;
    align-items: center;

    .avatar-image {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        margin-left: 10px;
        margin-right: 10px;
    }
}

.container {
    margin-top: 50px;

    .item {
        display: flex;

        .avatar-image {
            width: 30px;
            height: 30px;
        }
    }
}
</style>