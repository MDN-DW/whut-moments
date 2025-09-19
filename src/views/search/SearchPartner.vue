<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const value = ref('')

const onSearch = () => {
}
</script>

<template>
    <van-search v-model="value" show-action placeholder="搜索好友" @search="onSearch" @cancel="router.back()" />
</template>

<style lang="less" scoped></style>