<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

</script>

<template>
    <van-nav-bar left-arrow title="我的帖子" @click-left="router.back()" />
    <van-tabs v-model:active="active">
        <van-tab title="全部">全部</van-tab>
        <van-tab title="已发布">已发布</van-tab>
        <van-tab title="草稿">草稿</van-tab>
        <van-tab title="审核中">审核中</van-tab>
        <van-tab title="不允许发布">不允许发布</van-tab>
        <van-tab title="隐藏">隐藏</van-tab>
    </van-tabs>
</template>

<style lang="less" scoped></style>
