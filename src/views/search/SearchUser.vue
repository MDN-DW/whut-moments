<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

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
    <van-nav-bar title="找人" left-arrow @click-left="router.back()" />
    <van-search v-model="key" placeholder="请输入搜索关键词" show-action>
        <template #action>
            <div @click="onSearch">搜索</div>
        </template>
    </van-search>
</template>

<style lang="less" scoped></style>