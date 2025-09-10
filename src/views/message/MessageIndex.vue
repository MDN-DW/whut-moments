<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue'
import defaultAvatar from '@/assets/image/default.png'
import { getFriendsList } from '@/api/friends'

const isOpen = ref(false)

const router = useRouter()

// 测试
const data = ref({
    "list": [
        {
            "id": 1,
            "friend_id": 1002,
            "is_receiver": 0,
            "friend": {
                "id": 1002,
                "nickname": "好友昵称",
                "avatar_url": "",
                "campus_name": "北京大学"
            },
            "last_chat": '最后一条消息',
            "status": "ACCEPTED",
            "created_at": "2023-01-01T00:00:00Z"
        },
        {
            "id": 2,
            "friend_id": 1002,
            "is_receiver": 0,
            "friend": {
                "id": 1002,
                "nickname": "好友昵称",
                "avatar_url": "",
                "campus_name": "北京大学"
            },
            "last_chat": '最后一条消息',
            "status": "ACCEPTED",
            "created_at": "2023-01-01T00:00:00Z"
        },
        {
            "id": 3,
            "friend_id": 1002,
            "is_receiver": 0,
            "friend": {
                "id": 1002,
                "nickname": "好友昵称",
                "avatar_url": "",
                "campus_name": "北京大学"
            },
            "last_chat": '最后一条消息',
            "status": "ACCEPTED",
            "created_at": "2023-01-01T00:00:00Z"
        },
        {
            "id": 4,
            "friend_id": 1002,
            "is_receiver": 0,
            "friend": {
                "id": 1002,
                "nickname": "好友昵称",
                "avatar_url": "",
                "campus_name": "北京大学"
            },
            "last_chat": '最后一条消息',
            "status": "ACCEPTED",
            "created_at": "2023-01-01T00:00:00Z"
        },
        {
            "id": 5,
            "friend_id": 1002,
            "is_receiver": 0,
            "friend": {
                "id": 1002,
                "nickname": "好友昵称",
                "avatar_url": "",
                "campus_name": "北京大学"
            },
            "last_chat": '最后一条消息',
            "status": "ACCEPTED",
            "created_at": "2023-01-01T00:00:00Z"
        },
        {
            "id": 6,
            "friend_id": 1002,
            "is_receiver": 0,
            "friend": {
                "id": 1002,
                "nickname": "好友昵称",
                "avatar_url": "",
                "campus_name": "北京大学"
            },
            "last_chat": '最后一条消息',
            "status": "ACCEPTED",
            "created_at": "2023-01-01T00:00:00Z"
        },
        {
            "id": 7,
            "friend_id": 1002,
            "is_receiver": 0,
            "friend": {
                "id": 1002,
                "nickname": "好友昵称",
                "avatar_url": "",
                "campus_name": "北京大学"
            },
            "last_chat": '最后一条消息',
            "status": "ACCEPTED",
            "created_at": "2023-01-01T00:00:00Z"
        },
        {
            "id": 8,
            "friend_id": 1002,
            "is_receiver": 0,
            "friend": {
                "id": 1002,
                "nickname": "好友昵称",
                "avatar_url": "",
                "campus_name": "北京大学"
            },
            "last_chat": '最后一条消息',
            "status": "ACCEPTED",
            "created_at": "2023-01-01T00:00:00Z"
        },
        {
            "id": 9,
            "friend_id": 1002,
            "is_receiver": 0,
            "friend": {
                "id": 1002,
                "nickname": "好友昵称",
                "avatar_url": "",
                "campus_name": "北京大学"
            },
            "last_chat": '最后一条消息',
            "status": "ACCEPTED",
            "created_at": "2023-01-01T00:00:00Z"
        },
        {
            "id": 10,
            "friend_id": 1002,
            "is_receiver": 0,
            "friend": {
                "id": 1002,
                "nickname": "好友昵称",
                "avatar_url": "",
                "campus_name": "北京大学"
            },
            "last_chat": '最后一条消息',
            "status": "ACCEPTED",
            "created_at": "2023-01-01T00:00:00Z"
        },
        {
            "id": 11,
            "friend_id": 1002,
            "is_receiver": 0,
            "friend": {
                "id": 1002,
                "nickname": "好友昵称",
                "avatar_url": "",
                "campus_name": "北京大学"
            },
            "last_chat": '最后一条消息',
            "status": "ACCEPTED",
            "created_at": "2023-01-01T00:00:00Z"
        },
        {
            "id": 12,
            "friend_id": 1002,
            "is_receiver": 0,
            "friend": {
                "id": 1002,
                "nickname": "好友昵称",
                "avatar_url": "",
                "campus_name": "北京大学"
            },
            "last_chat": '最后一条消息',
            "status": "ACCEPTED",
            "created_at": "2023-01-01T00:00:00Z"
        },
        {
            "id": 13,
            "friend_id": 1002,
            "is_receiver": 0,
            "friend": {
                "id": 1002,
                "nickname": "好友昵称",
                "avatar_url": "",
                "campus_name": "北京大学"
            },
            "last_chat": '最后一条消息',
            "status": "ACCEPTED",
            "created_at": "2023-01-01T00:00:00Z"
        },
        {
            "id": 14,
            "friend_id": 1002,
            "is_receiver": 0,
            "friend": {
                "id": 1002,
                "nickname": "好友昵称",
                "avatar_url": "",
                "campus_name": "北京大学"
            },
            "last_chat": '最后一条消息',
            "status": "ACCEPTED",
            "created_at": "2023-01-01T00:00:00Z"
        },
        {
            "id": 15,
            "friend_id": 1002,
            "is_receiver": 0,
            "friend": {
                "id": 1002,
                "nickname": "好友昵称",
                "avatar_url": "",
                "campus_name": "北京大学"
            },
            "last_chat": '最后一条消息',
            "status": "ACCEPTED",
            "created_at": "2023-01-01T00:00:00Z"
        }
    ],
    "pagination": {
        "page": 1,
        "size": 20,
        "total": 15,
        "pages": 3
    },
})
const friendsList = ref(data.value.list)
// 正式
/* const friendsList = ref([])
const total = ref(0)
const getList = async () => {
    const { data: { data } } = await getFriendsList({ page: 0, size: 0, status: 'ACCEPTED' })
    friendsList.value = data.list
}
getList()
*/

const list = ref([])
const loading = ref(false)
const finished = ref(false)
const page = ref(0)
const size = ref(10)
const onLoad = () => {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    setTimeout(() => {
        for (let i = 0; i < size.value; ++i) {
            if (page.value * size.value + i < friendsList.value.length) {
                list.value.push(friendsList.value[page.value * size.value + i])
            } else {
                // 数据全部加载完成
                finished.value = true
                break
            }
        }
        // 加载状态结束
        loading.value = false
        ++page.value
    }, 3)
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
        <div class="add-friend">添加好友</div>
        <div class="new-friend">新朋友</div>
    </div>

    <div class="has-friends" v-if="friendsList.length">
        <div class="avatar-scroll-container">
            <div class="avatar-scroll-wrapper">
                <div v-for="item in friendsList" :key="item.id" class="avatar-item">
                    <van-image :src="item.friend.avatar_url || defaultAvatar" round width="50px" height="50px" />
                    <div class="avatar-name">{{ item.friend.nickname }}</div>
                </div>
            </div>
        </div>

        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell-group border>
                <van-swipe-cell v-for="item in list" :key="item.id">
                    <van-cell>
                        <template #title>
                            <div class="avatar-nickname">
                                <van-image class="custom-image" :src="item.friend.avatar_url || defaultAvatar" />
                                <div class="text">
                                    <p class="custom-title">{{ item.friend.nickname || '匿名用户' }}</p>
                                    <p class="custom-last-chat">{{ item.last_chat }}</p>
                                </div>
                            </div>
                        </template>
                    </van-cell>
                    <template #right>
                        <van-button square text="已读" color="#c4c0c0" class="read-button" />
                        <van-button square text="删除" type="danger" class="delete-button" />
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
        border-bottom: 1px solid #eeecec;
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