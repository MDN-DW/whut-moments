<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { publishTask, editTask, getTaskDetail } from '@/api/task'

const route = useRoute()
const router = useRouter()

// 判断当前是编辑还是新增
const isEdit = computed(() => !!route.params.id)

const form = ref({
    title: '',
    content: '',
    reward: '',
    visibility: 'PUBLIC',
    expire_at: null,
    file_ids: [],
    tag_ids: []
})

// 回显
onMounted(async () => {
    if (isEdit.value) {
        const { data: { data } } = await getTaskDetail(route.params.id)
        form.value = {
            title: data.title,
            content: data.content,
            reward: data.reward,
            visibility: data.visibility,
            expire_at: data.expire_at,
            file_ids: data.file_ids,
            tag_ids: data.tag_ids
        }
    }
})

// 提交：区分新增 修改
const onSubmit = async () => {
    const fd = new FormData()
    for (const key in form.value) {
        fd.append(key, form.value[key])
    }
    if (isEdit.value) {
        await editTask(route.params.id, fd)
        await router.back()
        showSuccessToast('修改成功')
    } else {
        await publishTask(fd)
        await router.back()
        showSuccessToast('发布成功')
    }
}

const showDate = ref(false)
const dateResult = ref('')
const currentDate = ref([
    new Date().getFullYear().toString(),
    (new Date().getMonth() + 1).toString().padStart(2, '0'),
    new Date().getDate().toString().padStart(2, '0')
])
const minDate = new Date(1900, 0, 1)
const maxDate = new Date(2100, 11, 31)
const onConfirmDate = ({ selectedValues }) => {
    dateResult.value = selectedValues.join('-')
    showDate.value = false
}

const showTime = ref(false)
const timeResult = ref('')
const columnsType = ['hour', 'minute', 'second'];
const currentTime = ref([
    new Date().getHours().toString().padStart(2, '0'),
    new Date().getMinutes().toString().padStart(2, '0'),
    new Date().getSeconds().toString().padStart(2, '0')
])
const onTimeConfirm = ({ selectedValues }) => {
    timeResult.value = selectedValues.join(':')
    showTime.value = false
}


const privacy = ref([
    { text: '所有人可见', value: 'PUBLIC' },
    { text: '仅好友可见', value: 'FRIEND' },
    { text: '同校区可见', value: 'CAMPUS' }
])
const showPrivacy = ref(false)
const privacyResult = ref('')
const onConfirmPrivacy = ({ selectedOptions }) => {
    privacyResult.value = selectedOptions[0]?.text
    form.value.visibility = privacyResult.value
    showPrivacy.value = false
}

// 正式
/* const taskTags = ref([])
onMounted(async () => {
    const { data: { data } } = await getAllTaskTag()
    taskTags.value = data.list.filter(item => item.name !== '全部')
}) */

const selectTag = (id) => {
    if (form.value.tag_ids.includes(id)) {
        form.value.tag_ids.splice(form.value.tag_ids.indexOf(id), 1)
    } else {
        form.value.tag_ids.push(id)
    }
}

// 测试
const taskTags = ref([
    {
        "id": 2,
        "name": "校园生活",
        "category": "POST",
        "weight": 100,
        "is_hot": 1
    },
    {
        "id": 3,
        "name": "校园生活",
        "category": "POST",
        "weight": 100,
        "is_hot": 1
    },
    {
        "id": 4,
        "name": "校园生活",
        "category": "POST",
        "weight": 100,
        "is_hot": 1
    },
    {
        "id": 5,
        "name": "校园生活",
        "category": "POST",
        "weight": 100,
        "is_hot": 1
    },
    {
        "id": 6,
        "name": "校园生活",
        "category": "POST",
        "weight": 100,
        "is_hot": 1
    },
    {
        "id": 7,
        "name": "校园生活",
        "category": "POST",
        "weight": 100,
        "is_hot": 1
    },
])

const viewUrls = ref([])
const afterRead = (files) => {
    // 处理单个文件或多个文件
    const fileList = Array.isArray(files) ? files : [files]

    // 提取原始文件对象并添加到 form.file_ids 中
    fileList.forEach(file => {
        if (file.file) {
            form.value.file_ids.push(file.file) // 只保存原始File对象
        }
    })
}

watch([() => dateResult.value, () => timeResult.value], () => {
    const dateTimeString = `${dateResult.value}T${timeResult.value}`
    form.value.expire_at = new Date(dateTimeString) // 这就是 ISO 8601 格式的 Date 对象
})
</script>
<template>
    <div class="container">
        <van-nav-bar :title="isEdit ? '编辑任务' : '发布任务'" left-arrow @click-left="router.back()" fixed />
        <van-form @submit="onSubmit" class="form">
            <van-field class="title" name="title" v-model="form.title" label="任务标题"
                :rules="[{ required: true, message: '请填写标题' }]" />

            <van-field v-model="form.content" autosize label="任务内容" type="textarea" />

            <van-field name="uploader" label="文件上传">
                <template #input>
                    <van-uploader multiple :after-read="afterRead" v-model="viewUrls" />
                </template>
            </van-field>

            <van-field class="reward" v-model="form.reward" label="悬赏金额" type="number"
                :rules="[{ required: true, message: '请填写金额' }]" />

            <div class="tags">
                <div class="label">
                    标签
                </div>
                <div class="tag-scroll-container">
                    <div class="tag-scroll-wrapper">
                        <div v-for="item in taskTags" :key="item.id" class="tag-item" @click="selectTag(item.id)"
                            :class="{ 'tag-item-active': form.tag_ids.includes(item.id) }">
                            <div class="tag-name">{{ item.name }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <van-field v-model="privacyResult" is-link readonly name="picker3" label="权限" placeholder="点击设置权限"
                @click="showPrivacy = true" />
            <van-popup v-model:show="showPrivacy" position="bottom">
                <van-picker :columns="privacy" @confirm="onConfirmPrivacy" @cancel="showPrivacy = false" />
            </van-popup>

            <van-field v-model="dateResult" is-link readonly name="picker1" label="选择截止日期" placeholder="点击选择日期"
                @click="showDate = true" />
            <van-popup v-model:show="showDate" :style="{ padding: '64px' }" round position="bottom">
                <van-date-picker v-model="currentDate" title="选择日期" :min-date="minDate" :max-date="maxDate"
                    @confirm="onConfirmDate" @cancel="showDate = false" />
            </van-popup>

            <van-field v-model="timeResult" is-link readonly name="picker2" label="选择截止时间" placeholder="点击选择时间"
                @click="showTime = true" />
            <van-popup v-model:show="showTime" :style="{ padding: '64px' }" round position="bottom">
                <van-time-picker v-model="currentTime" title="选择时间" :columns-type="columnsType" @confirm="onTimeConfirm"
                    @cancel="showTime = false" />
            </van-popup>

            <van-button round block type="primary" native-type="submit" class="submit-btn">
                {{ isEdit ? '保存修改' : '立即发布' }}
            </van-button>
        </van-form>
    </div>
</template>

<style scoped lang="less">
.container {
    height: 100vh;
    background-color: white;
    position: relative;

    .form {
        height: 100%;
        margin-top: 45px;
    }

    :deep(.van-field__control) {
        max-height: 100px;
        overflow-y: auto;

        // 自定义滚动条样式（可选）
        &::-webkit-scrollbar {
            width: 5px;
        }

        &::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
        }

        &::-webkit-scrollbar-thumb {
            background: #dcdada;
            border-radius: 10px;
        }

        &::-webkit-scrollbar-thumb:hover {
            background: #dcdada;
        }
    }

    .title,
    .reward {
        height: 68px;
    }

    .tags {
        display: flex;
        align-items: center;
        background-color: white;

        .label {
            font-size: 14px;
            width: 50px;
            margin-left: 15px;
        }

        .tag-scroll-container {
            width: 100%;
            // 这个属性，表示当内容宽度超过容器宽度时，自动显示水平滚动条
            overflow-x: auto;
            overflow-y: hidden;
            // 防止内容换行
            white-space: nowrap;
            padding: 10px 0;
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

        .tag-scroll-wrapper {
            :deep(.van-image) {
                width: 50px;
                height: 50px;
            }

            display: inline-block;
            padding: 0 15px;
        }

        .tag-item {
            display: inline-block;

            &:last-child {
                margin-right: 0;
            }

            .tag-name {
                width: 58px;
                height: 30px;
                margin-right: 10px;
                border-radius: 5px;
                text-align: center;
                line-height: 30px;
                font-size: 12px;
                margin-top: 5px;
                color: #666;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }

        .tag-item-active {

            .tag-name {
                background-color: #fef6fb;
                color: #f9b5df;
                font-weight: bold;
            }
        }
    }

    .submit-btn {
        position: absolute;
        bottom: 3%;
        left: 50%;
        transform: translateX(-50%);
        width: 280px;
    }
}
</style>