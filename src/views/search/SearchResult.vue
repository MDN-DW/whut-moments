<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getSearchList } from '@/api/search'
import defaultAvatar from "@/assets/image/default.png"
import { timeAgo } from '@/utils/timeFormat'

const router = useRouter()
const route = useRoute()

const resultList = ref([])
const page = ref(1)
const size = ref(10)

// 正式
/* onMounted(async () => {
    const { data: { data } } = await getSearchList(route.query.key, page.value, size.value)
    resultList.value = data.list
}) */

// 测试
onMounted(() => {
    resultList.value = [
        {
            "id": 2001,
            "user": {
                "id": 1002, "nickname": "匿名用户", "avatar_url": ""
            },
            "content": "寻找志同道合的朋友...",
            "created_at": "2023-01-01T00:00:00Z"
        },
        {
            "id": 2001,
            "user": {
                "id": 1002, "nickname": "匿名用户", "avatar_url": ""
            },
            "content": "寻找志同道合的朋友...",
            "created_at": "2023-01-01T00:00:00Z"
        },
        {
            "id": 2001,
            "user": {
                "id": 1002, "nickname": "匿名用户", "avatar_url": ""
            },
            "content": "寻找志同道合的朋友...",
            "created_at": "2023-01-01T00:00:00Z"
        }
    ]
})

const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const onLoad = async () => {
    if (refreshing.value) {
        resultList.value = []
        refreshing.value = false
    }

    // 正式
    /* const { data: { data } } = await getSearchList(route.query.key, page.value, size.value)
      
    if (page.value === 1) {
         resultList.value = data.list
     } else {
         resultList.value.push(...data.list)
     } */

    // 测试
    resultList.value = [
        {
            "id": 2001,
            "user": {
                "id": 1002, "nickname": "匿名用户", "avatar_url": ""
            },
            "content": "寻找志同道合的朋友...",
            "created_at": "2023-01-01T00:00:00Z"
        },
        {
            "id": 2001,
            "user": {
                "id": 1002, "nickname": "匿名用户", "avatar_url": ""
            },
            "content": "寻找志同道合的朋友...",
            "created_at": "2023-01-01T00:00:00Z"
        },
        {
            "id": 2001,
            "user": {
                "id": 1002, "nickname": "匿名用户", "avatar_url": ""
            },
            "content": "寻找志同道合的朋友...",
            "created_at": "2023-01-01T00:00:00Z"
        }
    ]

    ++page.value
    loading.value = false

    if (resultList.value.length >= data.pagination.total) {
        finished.value = true;
    }
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

        <van-search v-model="route.query.key" placeholder="请输入搜索关键词" show-action @cancel="router.back()">
        </van-search>

        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" class="list">
                <div class="item" v-for="item in resultList" :key="item.id"
                    @click="router.push(`/posts/detail/${item.id}`)">
                    <div class="item-info">
                        <div class="avatar">
                            <van-image :src="item.user.avatar_url || defaultAvatar" class="avatar-image"></van-image>
                        </div>
                        <div class="nickname-time">
                            <div class="nickname">
                                {{ item.user.nickname }}
                            </div>
                            <div class="time">
                                {{ timeAgo(item.created_at) }}
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
