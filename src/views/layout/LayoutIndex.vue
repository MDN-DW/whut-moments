<script setup>
import { useNoticeStore } from '@/stores';

const noticeStore = useNoticeStore()
// 正式
// 获取通知总数
/* const noticeStore = useNoticeStore()
const getCount = async () => {
    const { data: data } = await getNoticeCount()
    noticeStore.setCount(data.count)
}
getCount() */

// 测试
noticeStore.noticeCount = 6
</script>

<template>
    <div class="content">
        <router-view></router-view>
    </div>
    <div class="footer">
        <van-tabbar route inactive-color="#b8b8b8">
            <van-tabbar-item icon="friends-o" to="/friends">朋友圈</van-tabbar-item>
            <van-tabbar-item icon="bullhorn-o" to="/task">任务</van-tabbar-item>
            <van-tabbar-item icon="chat-o" to="/message" :badge="noticeStore.noticeCount">消息</van-tabbar-item>
            <van-tabbar-item icon="user-circle-o" to="/me">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<style lang="less" scoped></style>
