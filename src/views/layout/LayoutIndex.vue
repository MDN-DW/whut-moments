<script setup>
import { ref } from 'vue'

</script>

<template>
    <div class="content">
        <router-view></router-view>
    </div>
    <div class="footer">
        <van-tabbar route active-color="#ff9211" inactive-color="#b8b8b8">
            <van-tabbar-item icon="friends-o" to="/friends">朋友圈</van-tabbar-item>
            <van-tabbar-item icon="bullhorn-o" to="/task">任务</van-tabbar-item>
            <van-tabbar-item icon="chat-o" to="/message">消息</van-tabbar-item>
            <van-tabbar-item icon="user-circle-o" to="/me">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<style lang="less" scoped></style>
