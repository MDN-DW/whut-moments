<script setup>
import { ref } from 'vue'
import { getHotSearch } from '@/api/search'
import { useRouter } from 'vue-router'

const router = useRouter()

const key = ref('')
const list = ref([])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
const onSearch = () => {
    if (key.value.trim() === '') {
        showToast('搜索内容不能为空')
        return
    }
    router.push({
        path: '/search/content',
        query: {
            key: key.value
        }
    })
}

const hotLimit = 5
const onLoad = async () => {
    if (refreshing.value) {
        list.value = []
        refreshing.value = false
    }
    /* const { data: data } = await getHotSearch(hotLimit)
    list.value = data.list */
    list.value = [
        { "keyword": "校园兼职", "search_cnt": 1200 },
        { "keyword": "期末资料", "search_cnt": 800 }
    ]
    loading.value = false
    finished.value = true
}

const onRefresh = () => {
    // 清空列表数据
    list.value = []
    finished.value = false
    // 重新加载数据
    // 将 loading 设置为 true，表示处于加载状态
    loading.value = true
    onLoad()
}
</script>

<template>
    <div class="container">
        <van-nav-bar title="帖子搜索" left-arrow @click-left="router.back()" fixed />
        <van-search v-model="key" placeholder="请输入搜索关键词" show-action class="search-bar">
            <template #action>
                <div @click="onSearch">搜索</div>
            </template>
        </van-search>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <strong><van-icon name="fire" color="#ee0a24" />24小时火文</strong>
            <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <van-cell v-for="item in list" :key="item.keyword" :title="item.keyword" :value="item.search_cnt" />
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<style lang="less" scoped>
.van-pull-refresh {
    strong {
        font-size: 18px;
    }
}

:deep(.van-list) {
    height: 100vh;
}

.search-bar {
    margin-top: 45px;
    margin-bottom: 10px;
}
</style>
