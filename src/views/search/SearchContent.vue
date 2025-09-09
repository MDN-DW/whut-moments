<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getSearchList } from '@/api/search'

const router = useRouter()
const onCancel = () => {
    router.back()
}
</script>

<template>
    <div class="container">
        <van-nav-bar title="帖子搜索" />
        <van-search v-model="value" show-action placeholder="请输入搜索关键词" @cancel="onCancel" />
    </div>
</template>

<style lang="less" scoped></style>
