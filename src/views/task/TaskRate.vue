<script setup>
import { useRoute, useRouter } from 'vue-router'
import { submitTaskComment } from '@/api/task'
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()

const taskId = route.query.taskId
const orderId = route.query.orderId
const revieweeId = route.query.revieweeId
const roleType = route.query.roleType

const score = ref(1)
const content = ref('')
const tags = ref([
    { id: 1, name: '沟通及时', selected: false },
    { id: 2, name: '配合积极', selected: false },
    { id: 3, name: '责任心强', selected: false },
    { id: 4, name: '有时间观念', selected: false },
    { id: 5, name: '其他', selected: false }
])
const selectedTags = ref([])
const selectId = (item) => {
    item.selected = !item.selected
    if (item.selected) {
        selectedTags.value.push(item.name)
    } else {
        selectedTags.value = selectedTags.value.filter(tag => tag !== item.name)
    }
}

const onSubmit = async () => {
    await submitTaskComment(taskId, orderId, revieweeId, roleType, score.value, selectedTags.value, content.value)
    await router.back()
    showSuccessToast('评价成功')
}

</script>

<template>
    <van-nav-bar title="任务评价" left-arrow @click-left="router.back()" />

    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field name="rate" label="评分">
                <template #input>
                    <van-rate v-model="score" color="#ffd21e" />
                </template>
            </van-field>
        </van-cell-group>

        <van-cell-group inset>
            <div class="title">
                <p class="text">选择评价标签</p>
                <div class="tags-scroll-container">
                    <div class="tags-scroll-wrapper">
                        <div v-for="item in tags" :key="item.id" class="tags-item" @click="selectId(item)"
                            :class="{ 'tag-active': item.selected }">
                            <div class="tags-name">{{ item.name }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <van-field v-model="content" rows="5" autosize label="评价" type="textarea" maxlength="500"
                placeholder="请输入评价" show-word-limit />
        </van-cell-group>

        <van-button round block type="primary" native-type="submit">
            提交
        </van-button>
    </van-form>
</template>

<style lang="less" scoped>
.title {
    font-size: 14px;
    padding-left: 16px;

    .tags-scroll-container {
        width: 100%;
        // 这个属性，表示当内容宽度超过容器宽度时，自动显示水平滚动条
        overflow-x: auto;
        overflow-y: hidden;
        // 防止内容换行
        white-space: nowrap;
        background-color: #fff;

        // 隐藏WebKit浏览器（如Chrome、Safari）的滚动条
        &::-webkit-scrollbar {
            display: none;
        }

        // 隐藏IE/Edge浏览器的滚动条
        -ms-overflow-style: none;
        // 隐藏Firefox浏览器的滚动条
        scrollbar-width: none;
    }

    .tags-scroll-wrapper {
        display: inline-block;
    }

    .tags-item {
        display: inline-block;
        text-align: center;
        margin-right: 20px;
        margin-right: 8px;
        margin-bottom: 8px;
        padding: 4px 8px;
        background-color: #f2f2f2;
        border-radius: 5px;

        &.tag-active {
            background-color: #60a5fa;
            color: white;
        }

        &:last-child {
            margin-right: 0;
        }

        .tags-name {
            max-width: 70px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
</style>