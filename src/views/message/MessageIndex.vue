<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue'
import defaultAvatar from '@/assets/image/default.png'
import { getFriendsList, getNoticeList, readNotice } from '@/api/friends'
import { get } from 'vant/lib/utils';

const isOpen = ref(false)

const router = useRouter()

// 正式
/* const friendsList = ref([])
const getList = async () => {
    const { data: { data } } = await getFriendsList({ page: 0, size: 0, status: 'ACCEPTED' })
    friendsList.value = data.list
}
getList()
*/

const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
const page = ref(1)
const size = ref(10)
const total = ref(0)

// 正式
/* // 好友消息列表
const chatList = ref([])
// 互动列表
const interactionList = ref([])
// 系统消息列表
const systemList = ref([])

// 判断是否已经有了这个好友的消息
const isExistChat = (frind_id) => {
    return chatList.value.some(item => item.from_user.id === frind_id)
}

// 查找具有指定 id 的好友消息索引
const findChat = (id) => {
    return chatList.value.findIndex(item => item.from_user.id === id)
}

const getNotice = async () => {
    const { data: { data } } = await getNoticeList({ page: page.value, size: size.value })
    total.value = data.pagination.total
    for (let i = 0; i < data.list.length; ++i) {
        if (data.list[i].type === 'CHAT') {
            if (isExistChat(data.list[i].from_user.id)) {
                const ind = findChat(data.list[i].from_user.id)
                chatList.value[ind].content = data.list[i].content
            } else {
                chatList.value.push(data.list[i])
            }
        } else if (data.list[i].type === 'INTERACTION') {
            interactionList.value.push(data.list[i])
        } else if (data.list[i].type === 'SYSTEM') {
            systemList.value.push(data.list[i])
        }
    }
}
getNotice() */

// 正式
/* const onLoad = async () => {
    if (refreshing.value) {
        chatList.value = []
        interactionList.value = []
        systemList.value = []
        page.value = 1
        refreshing.value = false
    }

    getNotice()

    loading.value = false
    ++page.value
    // 待定 不知道返回的总数是什么
    if (chatList.value.length + interactionList.length + systemList.length >= total.value) {
        finished.value = true
    }
} */

// 测试
const friendsList = ref([
    {
        "id": 1,
        "friend_id": 1002,
        "friend": {
            "id": 1002,
            "nickname": "好友昵称",
            "avatar_url": "",
            "campus_name": "北京大学"
        },
        "status": "ACCEPTED",
        "created_at": "2023-01-01T00:00:00Z"
    }, {
        "id": 2,
        "friend_id": 1002,
        "friend": {
            "id": 1002,
            "nickname": "好友昵称",
            "avatar_url": "",
            "campus_name": "北京大学"
        },
        "status": "ACCEPTED",
        "created_at": "2023-01-01T00:00:00Z"
    }, {
        "id": 3,
        "friend_id": 1002,
        "friend": {
            "id": 1002,
            "nickname": "好友昵称",
            "avatar_url": "",
            "campus_name": "北京大学"
        },
        "status": "ACCEPTED",
        "created_at": "2023-01-01T00:00:00Z"
    },
    {
        "id": 4,
        "friend_id": 1002,
        "friend": {
            "id": 1002,
            "nickname": "好友昵称",
            "avatar_url": "",
            "campus_name": "北京大学"
        },
        "status": "ACCEPTED",
        "created_at": "2023-01-01T00:00:00Z"
    },
    {
        "id": 5,
        "friend_id": 1002,
        "friend": {
            "id": 1002,
            "nickname": "好友昵称",
            "avatar_url": "",
            "campus_name": "北京大学"
        },
        "status": "ACCEPTED",
        "created_at": "2023-01-01T00:00:00Z"
    },
    {
        "id": 6,
        "friend_id": 1002,
        "friend": {
            "id": 1002,
            "nickname": "好友昵称",
            "avatar_url": "",
            "campus_name": "北京大学"
        },
        "status": "ACCEPTED",
        "created_at": "2023-01-01T00:00:00Z"
    }
])

const chatList = ref([
    {
        "id": 7001,
        "user_id": 1001,
        "type": "CHAT",
        "title": "您的动态收到了新的赞",
        "content": "用户昵称 赞了您的动态 “今天天气真好”",
        "ref_id": 2001,
        "ref_type": "POST",
        "status": "UNREAD",
        "created_at": "2023-01-01T00:00:00Z",
        "from_user": { // 如果是用户互动类通知，可包含来源用户信息
            "id": 1002,
            "nickname": "用户昵称",
            "avatar_url": ""
        }
    },
    {
        "id": 7002,
        "user_id": 1001,
        "type": "CHAT",
        "title": "您的动态收到了新的赞",
        "content": "用户昵称 赞了您的动态 “今天天气真好”",
        "ref_id": 2001,
        "ref_type": "POST",
        "status": "UNREAD",
        "created_at": "2023-01-01T00:00:00Z",
        "from_user": { // 如果是用户互动类通知，可包含来源用户信息
            "id": 1002,
            "nickname": "用户昵称",
            "avatar_url": ""
        }
    },
    {
        "id": 7003,
        "user_id": 1001,
        "type": "CHAT",
        "title": "您的动态收到了新的赞",
        "content": "用户昵称 赞了您的动态 “今天天气真好”",
        "ref_id": 2001,
        "ref_type": "POST",
        "status": "UNREAD",
        "created_at": "2023-01-01T00:00:00Z",
        "from_user": { // 如果是用户互动类通知，可包含来源用户信息
            "id": 1002,
            "nickname": "用户昵称",
            "avatar_url": ""
        }
    }
])
const interactionList = ref([
    {
        "id": 7003,
        "user_id": 1001,
        "type": "Interaction",
        "title": "您的动态收到了新的赞",
        "content": "用户昵称 赞了您的动态 “今天天气真好”",
        "ref_id": 2001,
        "ref_type": "POST",
        "status": "UNREAD",
        "created_at": "2023-01-01T00:00:00Z",
        "from_user": { // 如果是用户互动类通知，可包含来源用户信息
            "id": 1002,
            "nickname": "用户昵称",
            "avatar_url": ""
        }
    }
])
const systemList = ref([
    {
        "id": 7003,
        "user_id": 1001,
        "type": "SYSTEM",
        "title": "您的动态收到了新的赞",
        "content": "用户昵称 赞了您的动态 “今天天气真好”",
        "ref_id": 2001,
        "ref_type": "POST",
        "status": "UNREAD",
        "created_at": "2023-01-01T00:00:00Z",
        "from_user": { // 如果是用户互动类通知，可包含来源用户信息
            "id": 1002,
            "nickname": "用户昵称",
            "avatar_url": ""
        }
    }
])

const onRefresh = () => {
    finished.value = false
    // 重新加载数据
    chatList.value = []
    interactionList.value = []
    systemList.value = []
    // 将 loading 设置为 true，表示处于加载状态
    loading.value = true
    onLoad()
}

const dleChat = (friend_id) => {
    for (let i = 0; i < chatList.value.length; ++i) {
        if (chatList.value[i].friend_id === friend_id) {
            chatList.value.splice(i, 1)
            break
        }
    }
}

// 找到这个好友消息的索引
const findIndexById = (list, id) => {
    return list.findIndex(item => item.id === id)
}
const read = async (list, notification_id) => {
    await readNotice(notification_id)
    const ind = findIndexById(list.value, notification_id)
    list.value[ind].status = 'READ'
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
                <div v-for="item in friendsList" :key="item.id" class="avatar-item">
                    <van-image :src="item.friend.avatar_url || defaultAvatar" round />
                    <div class="avatar-name">{{ item.friend.nickname }}</div>
                </div>
            </div>
        </div>

        <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="pull-refresh-container">

            <div class="sys-iteraction">
                <van-cell-group border>
                    <van-cell @click="read(systemList, systemList[systemList.length - 1].id)">
                        <template #title>
                            <div class="sys">
                                <van-icon name="setting" class="system-icon" />
                                <div class="text">
                                    <p class="custom-title">系统消息</p>
                                    <p class="custom-last-chat">{{ systemList[systemList.length - 1].content }}</p>
                                </div>
                            </div>
                        </template>
                        <template #right-icon>
                            <div class="un-read" v-if="systemList[systemList.length - 1].status === 'UNREAD'"></div>
                        </template>
                    </van-cell>
                    <van-cell @click="read(interactionList, interactionList[interactionList.length - 1].id)">
                        <template #title>
                            <div class="interaction">
                                <van-icon name="bell" class="interaction-icon" />
                                <div class="text">
                                    <p class="custom-title">互动消息</p>
                                    <p class="custom-last-chat">{{ interactionList[interactionList.length - 1].content
                                    }}
                                    </p>
                                </div>
                            </div>
                        </template>
                        <template #right-icon>
                            <div class="un-read" v-if="interactionList[interactionList.length - 1].status === 'UNREAD'">
                            </div>
                        </template>
                    </van-cell>
                </van-cell-group>
            </div>

            <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <van-cell-group border>
                    <van-swipe-cell v-for="item in chatList" :key="item.id">
                        <van-cell @click="router.push('/login')">
                            <template #title>
                                <div class="avatar-nickname">
                                    <van-image class="custom-image" :src="item.from_user.avatar_url || defaultAvatar" />
                                    <div class="text">
                                        <p class="custom-title">{{ item.from_user.nickname || '匿名用户' }}</p>
                                        <p class="custom-last-chat">{{ item.content }}</p>
                                    </div>
                                </div>
                            </template>
                            <template #right-icon>
                                <div class="un-read" v-if="chatList[chatList.length - 1].status === 'UNREAD'"></div>
                            </template>
                        </van-cell>
                        <template #right>
                            <van-button square text="已读" color="#c4c0c0" class="read-button"
                                @click="read(chatList, item.id)" />
                            <van-button square text="删除" type="danger" class="delete-button"
                                @click="dleChat(item.friend_id)" />
                        </template>
                    </van-swipe-cell>
                </van-cell-group>
            </van-list>
        </van-pull-refresh>
    </div>
    <div class="no-friends" v-else>
        <van-empty description="暂无好友" />
    </div>
</template>

<style lang="less" scoped>
.un-read {
    background-color: red;
    width: 10px;
    height: 10px;
    border-radius: 50%;
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