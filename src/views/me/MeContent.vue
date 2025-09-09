<script setup>
import { useRouter } from 'vue-router';
import { onMounted, ref, computed } from 'vue'
import { updateUerInfo } from '@/api/user'

const formModel = ref({})

onMounted(async () => {
    /* const { data: { data } } = await getUserInfo()
    formModel.value = data */
    formModel.value = { "id": 1001, "nickname": "WHUT", "avatar_url": '', "birthday": "1990-01-01", "gender": 1, "campus_id": 1, "campus_name": "北京大学", "qq_openid": "xxx", "mobile": "13800138000", "real_name": "张三", "id_card_no": "110101199001011234", "is_real_name": 1, "privacy_mobile": 1, "privacy_birthday": 0, "privacy_fans": 1, "status": 0, "created_at": "2023-01-01T00:00:00Z", "updated_at": "2023-01-01T00:00:00Z" }
})

const router = useRouter()

const showPicker = ref(false)
const genders = ref([
    { text: '男', value: 1 },
    { text: '女', value: 2 },
])
const showGender = computed(() => formModel.value.gender === 1 ? '男' : '女')
const onConfirm = ({ selectedOptions }) => {
    formModel.value.gender = selectedOptions[0]?.text === '男' ? 1 : 2
    showPicker.value = false
}

const currentDate = ref([
    new Date().getFullYear().toString(),
    (new Date().getMonth() + 1).toString().padStart(2, '0'),
    new Date().getDate().toString().padStart(2, '0')
])
const minDate = new Date(1900, 0, 1)
const maxDate = new Date(2100, 11, 31)
const showDatePicker = ref(false)
const onDateConfirm = ({ selectedValues }) => {
    formModel.value.birthday = selectedValues.join('-')
    showDatePicker.value = false
}

const newAvatar = ref([])

const onSubmit = async () => {
    const fd = new FormData()
    if (newAvatar.value && newAvatar.value.length > 0) {
        fd.append('avatar_url', newAvatar.value[0].file)
    }
    for (const key in formModel.value) {
        if (key !== 'avatar_url') {
            fd.append(key, formModel.value[key])
        }
    }
    await updateUerInfo(fd)
    await router.push('/me')
    showSuccessToast('修改成功')
}
</script>

<template>
    <van-nav-bar title="资料修改" left-arrow @click-left="router.back()" />
    <van-form @submit="onSubmit">
        <van-field name="uploader" label="头像">
            <template #input>
                <van-uploader v-model="newAvatar" :max-count="1" class="avatar-uploader">
                    <!-- 只在没有选择新图片时显示当前头像 -->
                    <template v-if="(!newAvatar || newAvatar.length === 0) && formModel.avatar_url" #default>
                        <van-image :src="formModel.avatar_url" round fit="cover" class="avatar" />
                    </template>
                </van-uploader>
            </template>
        </van-field>

        <van-field v-model="formModel.nickname" name="昵称" label="昵称" placeholder="请输入昵称" :rules="[{ required: true, message: '请填写昵称' },
        { pattern: /^.{1,30}$/, message: '昵称长度为1-30个字符' }
        ]" />

        <van-field v-model="showGender" is-link readonly name="picker" label="性别" placeholder="点击选择性别"
            @click="showPicker = true" />
        <van-popup v-model:show="showPicker" position="bottom">
            <van-picker :columns="genders" @confirm="onConfirm" @cancel="showPicker = false" />
        </van-popup>

        <van-field v-model="formModel.birthday" is-link readonly name="datePicker" label="生日" placeholder="点击选择日期"
            @click="showDatePicker = true" />
        <van-popup v-model:show="showDatePicker" position="bottom">
            <van-date-picker @confirm="onDateConfirm" @cancel="showDatePicker = false" :min-date="minDate"
                :max-date="maxDate" v-model="currentDate" />
        </van-popup>

        <van-field v-model="formModel.campus_name" name="大学" label="大学" placeholder="请输入学校名称"
            :rules="[{ required: true, message: '请填写校名' }]" />

        <van-field name="privacy_mobile" label="手机号可见范围">
            <template #input>
                <van-radio-group v-model="formModel.privacy_mobile">
                    <van-radio :name="0">公开</van-radio>
                    <van-radio :name="1">好友可见</van-radio>
                    <van-radio :name="2">仅自己可见</van-radio>
                </van-radio-group>
            </template>
        </van-field>

        <van-field name="privacy_birthday" label="生日可见范围 ">
            <template #input>
                <van-radio-group v-model="formModel.privacy_birthday">
                    <van-radio :name="0">公开</van-radio>
                    <van-radio :name="1">好友可见</van-radio>
                    <van-radio :name="2">仅自己可见</van-radio>
                </van-radio-group>
            </template>
        </van-field>

        <van-field name="privacy_fans" label="粉丝列表可见范围">
            <template #input>
                <van-radio-group v-model="formModel.privacy_fans">
                    <van-radio :name="0">公开</van-radio>
                    <van-radio :name="1">好友可见</van-radio>
                    <van-radio :name="2">仅自己可见</van-radio>
                </van-radio-group>
            </template>
        </van-field>

        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>

</template>

<style lang="less" scoped>
:deep(.van-uploader__upload) {
    border-radius: 50%;
    border: 1px dashed #ccc;
    overflow: hidden;
    width: 60px;
    height: 60px;
}

:deep(.van-uploader__preview-image) {
    border-radius: 50%;
    overflow: hidden;
    width: 60px;
    height: 60px;
}
</style>
