<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getSearchKeyList } from '@/api/search'
import { getTopicPostList } from '@/api/posts'
import defaultAvatar from "@/assets/image/default.png"
import { timeAgo } from '@/utils/timeFormat'

const router = useRouter()
const route = useRoute()

const keyword = ref(route.query.key || route.query.topicName)

const resultList = ref([])
const page = ref(1)
const size = ref(10)

onMounted(async () => {
    let response
    if (route.query.key) {
        response = await getSearchKeyList(route.query.key, page.value, size.value)
    } else {
        response = await getTopicPostList(route.query.topicId, page.value, size.value)
    }
    resultList.value = response.data.data.list
})

// 测试
/* onMounted(() => {
    if (route.query.key) {
        resultList.value = [
            {
                "id": 2001,
                "user": {
                    "id": 1002, "nickName": "匿名用户", "avatarUrl": ""
                },
                "content": "关键词 寻找志同道合的朋友...",
                "createdAt": "2023-01-01T00:00:00Z"
            },
            {
                "id": 2001,
                "user": {
                    "id": 1002, "nickName": "匿名用户", "avatarUrl": ""
                },
                "content": "寻找志同道合的朋友...",
                "createdAt": "2023-01-01T00:00:00Z"
            },
            {
                "id": 2001,
                "user": {
                    "id": 1002, "nickName": "匿名用户", "avatarUrl": ""
                },
                "content": "寻找志同道合的朋友...",
                "createdAt": "2023-01-01T00:00:00Z"
            }
        ]
    } else {
        resultList.value = [
            {
                "id": 2001,
                "user": {
                    "id": 1002, "nickName": "匿名用户", "avatarUrl": ""
                },
                "content": "话题 寻找志同道合的朋友...",
                "createdAt": "2023-01-01T00:00:00Z"
            },
            {
                "id": 2001,
                "user": {
                    "id": 1002, "nickName": "匿名用户", "avatarUrl": ""
                },
                "content": "寻找志同道合的朋友...",
                "createdAt": "2023-01-01T00:00:00Z"
            },
            {
                "id": 2001,
                "user": {
                    "id": 1002, "nickName": "匿名用户", "avatarUrl": ""
                },
                "content": "寻找志同道合的朋友...",
                "createdAt": "2023-01-01T00:00:00Z"
            }
        ]
    }
}) */

const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const onLoad = async () => {
    if (refreshing.value) {
        resultList.value = []
        refreshing.value = false
        page.value = 1
    }

    let response

    if (route.query.key) {
        response = await getSearchKeyList(route.query.key, page.value, size.value)
    } else {
        response = await getTopicPostList(route.query.topicId, page.value, size.value)
    }

    if (page.value === 1) {
        resultList.value = response.data.data.list
    } else {
        resultList.value.push(...response.data.data.list)
    }

    ++page.value
    loading.value = false

    if (resultList.value.length >= response.data.data.pagination.total) {
        finished.value = true;
    }

    // 测试
    /* if (route.query.key) {
        resultList.value = [
            {
                "id": 2001,
                "user": {
                    "id": 1002, "nickName": "匿名用户", "avatarUrl": ""
                },
                "content": "关键词 寻找志同道合的朋友...",
                "createdAt": "2023-01-01T00:00:00Z"
            },
            {
                "id": 2001,
                "user": {
                    "id": 1002, "nickName": "匿名用户", "avatarUrl": ""
                },
                "content": "寻找志同道合的朋友...",
                "createdAt": "2023-01-01T00:00:00Z"
            },
            {
                "id": 2001,
                "user": {
                    "id": 1002, "nickName": "匿名用户", "avatarUrl": ""
                },
                "content": "寻找志同道合的朋友...",
                "createdAt": "2023-01-01T00:00:00Z"
            }
        ]
    } else {
        resultList.value = [
            {
                "id": 2001,
                "user": {
                    "id": 1002, "nickName": "匿名用户", "avatarUrl": ""
                },
                "content": "话题 寻找志同道合的朋友...",
                "createdAt": "2023-01-01T00:00:00Z"
            },
            {
                "id": 2001,
                "user": {
                    "id": 1002, "nickName": "匿名用户", "avatarUrl": ""
                },
                "content": "寻找志同道合的朋友...",
                "createdAt": "2023-01-01T00:00:00Z"
            },
            {
                "id": 2001,
                "user": {
                    "id": 1002, "nickName": "匿名用户", "avatarUrl": ""
                },
                "content": "寻找志同道合的朋友...",
                "createdAt": "2023-01-01T00:00:00Z"
            }
        ]
    } */
}

const onRefresh = () => {
    // 清空列表数据
    finished.value = false
    resultList.value = []
    // 重新加载数据
    // 将 loading 设置为 true，表示处于加载状态
    loading.value = true
    onLoad()
}
</script>

<template>
    <div class="container">
        <van-nav-bar title="帖子搜索" />

        <van-search v-model="keyword" placeholder="请输入搜索关键词" show-action @cancel="router.back()">
        </van-search>

        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" class="list">
                <div class="item" v-for="item in resultList" :key="item.id"
                    @click="router.push(`/posts/detail/${item.id}`)">
                    <div class="item-info">
                        <div class="avatar">
                            <van-image :src="item.user.avatarUrl || defaultAvatar" class="avatar-image"></van-image>
                        </div>
                        <div class="nickname-time">
                            <div class="nickname">
                                {{ item.user.nickName }}
                            </div>
                            <div class="time">
                                {{ timeAgo(item.createdAt) }}
                            </div>
                        </div>
                    </div>

                    <div class="content">
                        {{ item.content }}
                    </div>

                </div>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<style lang="less" scoped>
.list {
    height: 100vh;

    .item {
        margin-top: 7px;
        padding: 10px;
        background-color: white;

        :deep(.van-image) {
            width: 40px;
            height: 40px;
            margin-right: 10px;
        }

        .item-info {
            display: flex;
            align-items: center;

            .nickname-time {

                .nickname {
                    font-size: 16px;
                }

                .time {
                    font-size: 12px;
                    color: #999;
                }
            }
        }

        .content {
            margin-top: 8px;
            font-size: 16px;
        }
    }
}
</style>