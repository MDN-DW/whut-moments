<script setup>
import { onMounted, computed, ref } from 'vue'
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
    if (isEdit.value) {
        await editTask(form)
        await router.back()
        showSuccessToast('修改成功')
    } else {
        await publishTask(form)
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
    showPrivacy.value = false
}
</script>
<template>
    <div class="container">
        <van-nav-bar :title="isEdit ? '编辑任务' : '发布任务'" left-arrow @click-left="router.back()" />
        <van-form @submit="onSubmit" class="form">
            <van-field v-model="form.title" label="任务标题" :rules="[{ required: true, message: '请填写标题' }]" />

            <van-field v-model="form.content" rows="3" autosize label="任务内容" type="textarea" />

            <van-field name="uploader" label="文件上传">
                <template #input>
                    <van-uploader multiple v-model="form.file_ids" />
                </template>
            </van-field>

            <van-field v-model="form.reward" label="悬赏金额" type="number"
                :rules="[{ required: true, message: '请填写金额' }]" />

            <van-field>
                <van-checkbox-group v-model="checked">
                    <van-cell-group inset>
                        <van-cell v-for="(item, index) in list" clickable :key="item" :title="`复选框 ${item}`"
                            @click="toggle(index)">
                            <template #right-icon>
                                <van-checkbox :name="item" :ref="el => checkboxRefs[index] = el" @click.stop />
                            </template>
                        </van-cell>
                    </van-cell-group>
                </van-checkbox-group>
            </van-field>

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



            <van-button round block type="primary" native-type="submit">
                {{ isEdit ? '保存修改' : '立即发布' }}
            </van-button>
        </van-form>
    </div>
</template>

<style scoped lang="less">
.container {
    height: 100vh;

    .form {
        height: 100%;
    }
}
</style>