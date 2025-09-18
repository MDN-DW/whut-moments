<script setup>
import { ref, onMounted } from 'vue'
import { getHotTopics, getHotPosts } from '@/api/search'
import { useRouter } from 'vue-router'

const router = useRouter()

const key = ref('')
const hotTopicList = ref([])
const hotPostList = ref([])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)

onMounted(async () => {
    const { data: { data } } = await getHotTopics()
    hotTopicList.value = data.list
})

onMounted(async () => {
    const { data: { data } } = await getHotPosts()
    hotPostList.value = data.list
})

const onLoad = async () => {
    if (refreshing.value) {
        hotTopicList.value = []
        hotPostList.value = []
        refreshing.value = false
    }

    // 正式
    /* const { data: { data } } = await getHotTopics()
    hotTopicList.value = data.list
    const { data: { data: d } } = await getHotPosts()
    hotPostList.value = d.list */

    // 测试
    hotTopicList.value = [
        {
            "id": 1,
            "name": "#校园新鲜事#",
            "description": "分享校园里发生的新奇有趣的事情",
            "post_cnt": 1500
        },
        {
            "id": 2,
            "name": "#期末复习挑战#",
            "description": "一起挑战期末复习，互相监督打卡",
            "post_cnt": 800
        }
    ]

    hotPostList.value = [
        { "title": "校园兼职", "search_cnt": 1200, "id": 1 },
        { "title": "期末资料", "search_cnt": 800, "id": 2 }
    ]
    loading.value = false
    finished.value = true
}

const onRefresh = () => {
    // 清空列表数据
    hotTopicList.value = []
    hotPostList.value = []
    finished.value = false
    // 重新加载数据
    // 将 loading 设置为 true，表示处于加载状态
    loading.value = true
    onLoad()
}

const onSearch = () => {
    if (key.value.trim() === '') {
        showToast('搜索内容不能为空')
        return
    }
    router.push({
        path: '/search/result',
        query: {
            key: key.value
        }
    })
}
</script>

<template>
    <van-nav-bar title="帖子搜索" left-arrow @click-left="router.back()" fixed />
    <div class="container">
        <van-search v-model="key" placeholder="请输入搜索关键词" show-action class="search-bar">
            <template #action>
                <van-button class="search-btn" @click="onSearch" type="primary" color="#60a5fa">搜索</van-button>
            </template>
        </van-search>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <div class="hot-posts-topics">
                <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                    <div class="hot-posts">
                        <strong><van-icon name="fire" color="#ee0a24" />文章围观TOP10</strong>
                        <van-cell v-for="(item, index) in hotPostList" :key="item.id"
                            @click="router.push(`/posts/detail/${item.id}`)" class="hot-post-item">
                            <template #title>
                                <div class="content">
                                    <div class="rank">
                                        {{ index + 1 }}
                                    </div>
                                    <div class="title">
                                        {{ item.title }}
                                    </div>
                                </div>
                            </template>
                            <template #value>
                                {{ `${item.search_cnt}人围观` }}
                            </template>
                        </van-cell>
                    </div>

                    <div class="hot-topics">
                        <strong><van-icon name="fire" color="#ee0a24" />话题讨论TOP10</strong>
                        <van-cell v-for="(item, index) in hotTopicList" :key="item.id" :value="item.post_cnt"
                            class="hot-topic-item">
                            <template #title>
                                <div class="content">
                                    <div class="rank">
                                        {{ index + 1 }}
                                    </div>
                                    <div class="title">
                                        {{ item.name }}
                                    </div>
                                </div>
                            </template>
                            <template #value>
                                {{ `${item.post_cnt}人讨论` }}
                            </template>
                        </van-cell>
                    </div>

                </van-list>
            </div>
        </van-pull-refresh>
    </div>
</template>

<style lang="less" scoped>
.container {
    width: 96%;
    /* 左边距自动 右边距自动 居中 */
    margin-left: auto;
    margin-right: auto;
}

.van-pull-refresh {
    strong {
        display: block;
        font-size: 18px;
        margin-bottom: 5px;
    }

    .hot-posts-topics {
        margin-top: 20px;

        .hot-posts,
        .hot-topics {
            margin-bottom: 10px;
        }

        .hot-post-item,
        .hot-topic-item {
            .content {
                display: flex;
                align-items: center;
                color: #4f5b6a;
                font-size: 14px;
                font-weight: 600;

                .rank {
                    width: 20px;
                    height: 20px;
                    background-color: #f3f4f6;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-right: 10px;
                }
            }

            &:nth-of-type(1) .rank {
                background-color: #ffc107;
                font-weight: bold;
            }

            &:nth-of-type(2) .rank {
                background-color: #e0e0e0;
                font-weight: bold;
            }

            &:nth-of-type(3) .rank {
                background-color: #b87333;
                font-weight: bold;
            }

            &:active {
                background-color: #dbdbdc;
            }
        }
    }
}

:deep(.van-list) {
    height: 100vh;
}

:deep(.van-cell) {
    background-color: #fafafc;
}


.search-bar {
    margin-top: 60px;
    margin-bottom: 10px;
    padding: 5px;
    border-radius: 10px;

    :deep(.van-field__body) {
        border-radius: 20px;
    }

    :deep(.van-search__action) {
        display: flex;
        align-items: center;
    }

    .search-btn {
        width: 60px;
        height: 30px;
        border-radius: 10px;
    }
}
</style>
