<script setup>
import defaulotAvatar from '@/assets/image/default.png'

defineProps({
    type: String,
    avatar_url: String
})

const avatar = avatar_url || defaulotAvatar
</script>

<template>
    <img v-if="type === 'CHAT'" :src="avatar" class="avatar" />
    <van-icon name="setting" v-else-if="type === 'SYSTEM'" class="system-icon"> </van-icon>
    <van-icon name="bell" v-else-if="type === 'INTERACTION'" class="interaction-icon"></van-icon>
</template>

<style lang="less" scoped>
.avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 8px;
}

.system-icon {
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    font-size: 20px;
    margin-right: 8px;
}
</style>
