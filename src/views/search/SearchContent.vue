<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getSearchList } from '@/api/search'

const router = useRouter()
const key = ref('')
const onSearch = () => {
    if (key.value.trim() === '') {
        showToast('搜索内容不能为空')
        return
    }
}

</script>

<template>
    <div class="container">
        <van-nav-bar title="帖子搜索" />
        <van-search v-model="key" placeholder="请输入搜索关键词" show-action>
            <template #action>
                <div @click="onSearch">搜索</div>
            </template>
        </van-search>
    </div>
</template>

<style lang="less" scoped></style>
