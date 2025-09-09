<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<template>
    <van-nav-bar title="校遇" />
    <van-search v-model="key" placeholder="请输入搜索关键词" @focus="router.push('/search')">
    </van-search>
</template>

<style lang="less" scoped></style>
