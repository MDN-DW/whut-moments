<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue'
import defaultAvatar from '@/assets/image/default.png'
import { getFriendsList, readNotice, getNoticeCount } from '@/api/friends'
import { useNoticeStore, useSocketStore } from '@/stores'
import { storeToRefs } from 'pinia'

const { displayList, chatMap } = storeToRefs(useSocketStore())

const isOpen = ref(false)

const router = useRouter()

// 正式
const friendsList = ref([])
const getList = async () => {
    const { data: { data } } = await getFriendsList({ page: 0, size: 0, status: 'ACCEPTED' })
    friendsList.value = data.list
}
getList()


const loading = ref(false)
const finished = ref(false)

// 测试
/* const friendsList = ref([
    {
        "id": 1,
        "friendId": 1002,
        "friend": {
            "id": 1002,
            "nickName": "好友昵称",
            "avatarUrl": "",
            "campusName": "北京大学"
        },
        "status": "ACCEPTED",
        "createdAt": "2023-01-01T00:00:00Z"
    },
    {
        "id": 2,
        "friendId": 1002,
        "friend": {
            "id": 1002,
            "nickName": "好友昵称",
            "avatarUrl": "",
            "campusName": "北京大学"
        },
        "status": "ACCEPTED",
        "createdAt": "2023-01-01T00:00:00Z"
    },
    {
        "id": 3,
        "friendId": 1002,
        "friend": {
            "id": 1002,
            "nickName": "好友昵称",
            "avatarUrl": "",
            "campusName": "北京大学"
        },
        "status": "ACCEPTED",
        "createdAt": "2023-01-01T00:00:00Z"
    },
    {
        "id": 4,
        "friendId": 1002,
        "friend": {
            "id": 1002,
            "nickName": "好友昵称",
            "avatarUrl": "",
            "campusName": "北京大学"
        },
        "status": "ACCEPTED",
        "createdAt": "2023-01-01T00:00:00Z"
    },
    {
        "id": 5,
        "friendId": 1002,
        "friend": {
            "id": 1002,
            "nickName": "好友昵称",
            "avatarUrl": "",
            "campusName": "北京大学"
        },
        "status": "ACCEPTED",
        "createdAt": "2023-01-01T00:00:00Z"
    },
    {
        "id": 6,
        "friendId": 1002,
        "friend": {
            "id": 1002,
            "nickName": "好友昵称",
            "avatarUrl": "",
            "campusName": "北京大学"
        },
        "status": "ACCEPTED",
        "createdAt": "2023-01-01T00:00:00Z"
    }
])

const displayList = ref([
    {
        "userId": 1001,
        "nickName": "好友昵称",
        "avatarUrl": "",
        "text": "你好",
        "status": "UNREAD",
        "count": 1,
        "type": "CHAT",
        "notificationId": 1
    },
    {
        "userId": 1002,
        "nickName": "好友昵称",
        "avatarUrl": "",
        "text": "你好",
        "status": "UNREAD",
        "count": 1,
        "type": "CHAT",
        "notificationId": 1
    }, {
        "userId": 1003,
        "nickName": "好友昵称",
        "avatarUrl": "",
        "text": "你好",
        "status": "UNREAD",
        "count": 1,
        "type": "CHAT",
        "notificationId": 1
    }, {
        "userId": 1004,
        "nickName": "好友昵称",
        "avatarUrl": "",
        "text": "你好",
        "status": "UNREAD",
        "count": 1,
        "type": "CHAT",
        "notificationId": 1
    }, {
        "userId": 1005,
        "nickName": "好友昵称",
        "avatarUrl": "",
        "text": "你好",
        "status": "UNREAD",
        "count": 1,
        "type": "CHAT",
        "notificationId": 1
    }, {
        "userId": 1006,
        "nickName": "好友昵称",
        "avatarUrl": "",
        "text": "你好",
        "status": "UNREAD",
        "count": 1,
        "type": "CHAT",
        "notificationId": 1
    }
]) */

const dleChat = (friendId) => {
    // 有computered 自动更新
    chatMap.value.delete(friendId)
}

const findValueByNotificationId = (targetNotificationId) => {
    for (const value of chatMap.value.values()) {
        if (value.notificationId === targetNotificationId) {
            return value
        }
    }
    return null
}
const read = async (notificationId) => {
    await readNotice(notificationId)
    const value = findValueByNotificationId(notificationId)
    if (value) {
        value.status = 'READ'
    }
    chatMap.value.set(value.userId, value)
}
</script>

<template>
    <van-nav-bar title="消息" background="#f1f0f0" fixed>
        <template #right>
            <van-icon name="search" color="black" class="search-icon" @click="router.push('/search/partner')" />
            <van-icon name="add-o" color="black" class="add-icon" @click="isOpen = !isOpen" />
        </template>
    </van-nav-bar>

    <div class=" content" v-if="isOpen">
        <div class="add-friend" @click="router.push('/search/user')">添加好友</div>
        <div class="new-friend">新朋友</div>
    </div>

    <div class="has-friends" v-if="friendsList.length">
        <div class="avatar-scroll-container">
            <div class="avatar-scroll-wrapper">
                <div v-for="item in friendsList" :key="item.id" class="avatar-item"
                    @click="router.push(`/user/${item.friend.id}`)">
                    <van-image :src="item.friend.avatarUrl || defaultAvatar" round />
                    <div class="avatar-name">{{ item.friend.nickName }}</div>
                </div>
            </div>
        </div>

        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell-group border>
                <van-swipe-cell v-for="item in displayList" :key="item.userId">
                    <van-cell v-if="item.type === 'CHAT'" @click="router.push({
                        path: '/chat',
                        query: {
                            userId: item.userId,
                            nickName: item.nickName,
                            avatarUrl: item.avatarUrl
                        }
                    })">
                        <template #title>
                            <div class="avatar-nickname">
                                <van-image class="custom-image" :src="item.avatarUrl || defaultAvatar" />
                                <div class="text">
                                    <p class="custom-title">{{ item.nickName || '匿名用户' }}</p>
                                    <p class="custom-last-chat">{{ item.text }}</p>
                                </div>
                            </div>
                        </template>
                        <template #right-icon>
                            <div class="un-read" v-if="item.status === 'UNREAD'">
                                {{ item.count }}
                            </div>
                        </template>
                    </van-cell>
                    <van-cell v-else-if="item.type === 'SYSTEM'">
                        <template #title>
                            <div class="sys">
                                <van-icon name="setting" class="system-icon" />
                                <div class="text">
                                    <p class="custom-title">系统消息</p>
                                    <p class="custom-last-chat">{{ item.text }}</p>
                                </div>
                            </div>
                        </template>
                        <template #right-icon>
                            <div class="un-read" v-if="item.status === 'UNREAD'">
                                {{ item.count }}
                            </div>
                        </template>
                    </van-cell>

                    <van-cell v-else-if="item.type === 'INTERACTION'">
                        <template #title>
                            <div class="interaction">
                                <van-icon name="bell" class="interaction-icon" />
                                <div class="text">
                                    <p class="custom-title">互动消息</p>
                                    <p class="custom-last-chat">{{ item.text }}</p>
                                </div>
                            </div>
                        </template>
                        <template #right-icon>
                            <div class="un-read" v-if="item.status === 'UNREAD'">
                                {{ item.count }}
                            </div>
                        </template>
                    </van-cell>
                    <template #right>
                        <van-button square text="已读" color="#c4c0c0" class="read-button" @click="read(item.id)"
                            v-if="item.status === 'UNREAD' && item.type === 'CHAT'" />
                        <van-button square text="删除" type="danger" class="delete-button"
                            @click="dleChat(item.friendId)" />
                    </template>
                </van-swipe-cell>
            </van-cell-group>
        </van-list>
    </div>
    <div class="no-friends" v-else>
        <van-empty description="暂无好友" />
    </div>
</template>

<style lang="less" scoped>
.un-read {
    background-color: red;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    color: white;
    font-size: 16px;
    text-align: center;
    line-height: 20px;
    position: absolute;
    right: 18px;
    top: 28px;
}

.search-icon,
.add-icon {
    font-size: 18px;
    margin-right: 10px;
}

:deep(.van-cell) {
    height: 65px;
}

.content {
    width: 120px;
    background-color: white;
    position: absolute;
    z-index: 999;
    top: 6%;
    left: 66%;
    border-radius: 5px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15), 0 0 10px rgba(0, 0, 0, 0.1);
    font-size: 14px;
    text-align: center;

    .add-friend,
    .new-friend {
        height: 50px;
        line-height: 50px;
        ;
        border-bottom: 1px solid #eeecec
    }

    &::before {
        content: '';
        position: absolute;
        top: -10px;
        right: 6px;
        right: 6px;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid white;
    }
}

.avatar-scroll-container {
    width: 100%;
    // 这个属性，表示当内容宽度超过容器宽度时，自动显示水平滚动条
    overflow-x: auto;
    overflow-y: hidden;
    // 防止内容换行
    white-space: nowrap;
    padding: 10px 0;
    background-color: #fff;
    margin-top: 45px;

    // 隐藏WebKit浏览器（如Chrome、Safari）的滚动条
    &::-webkit-scrollbar {
        display: none;
    }

    // 隐藏IE/Edge浏览器的滚动条
    -ms-overflow-style: none;
    // 隐藏Firefox浏览器的滚动条
    scrollbar-width: none;
}

.avatar-scroll-wrapper {
    :deep(.van-image) {
        width: 50px;
        height: 50px;
    }

    display: inline-block;
    padding: 0 15px;
}

.avatar-item {
    display: inline-block;
    text-align: center;
    margin-right: 20px;
    cursor: pointer;

    &:last-child {
        margin-right: 0;
    }

    .avatar-name {
        font-size: 12px;
        margin-top: 5px;
        color: #666;
        max-width: 50px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

:deep(.van-cell) {
    width: 100%;
}

:deep(.van-list) {
    height: 100vh;
}

.avatar-nickname {

    .custom-image {
        border-radius: 50%;
        width: 40px;
        height: 40px;
    }

    .text {

        p {
            margin: 0;
        }

        .custom-title,
        .custom-last-chat {
            margin-left: 10px;
            font-size: 16px;
        }

        .custom-last-chat {
            font-size: 12px;
            color: #999;
        }
    }
}

.sys,
.interaction {
    display: flex;
    align-items: center;


    .system-icon,
    .interaction-icon {
        color: #409eff;
        margin-right: 2px;
        font-size: 40px;
    }

    .interaction-icon {
        color: #67c23a;
    }

    .text {

        p {
            margin: 0;
        }

        .custom-title,
        .custom-last-chat {
            margin-left: 10px;
            font-size: 16px;
        }

        .custom-last-chat {
            font-size: 12px;
            color: #999;
        }
    }
}

.avatar-nickname,
.user-info {
    display: flex;
    align-items: center;
    margin-top: 10px;
}

.read-button,
.delete-button {
    width: 80px;
    height: 100%;
}
</style>