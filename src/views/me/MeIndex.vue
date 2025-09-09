<script setup>
import { ref, onMounted } from 'vue'
import defaultAvatar from "@/assets/image/default.png"
import { useRouter } from 'vue-router';
import { getUserInfo } from '@/api/user'
import { useUserStore } from '@/stores';

const router = useRouter()


const formModel = ref({})

onMounted(async () => {
    /* const { data: { data } } = await getUserInfo()
    formModel.value = data */
    formModel.value = { "id": 1001, "nickname": "用户昵称", "avatar_url": "https://oss.example.com/avatar.jpg", "birthday": "1990-01-01", "gender": 1, "campus_id": 1, "campus_name": "北京大学", "qq_openid": "xxx", "mobile": "13800138000", "real_name": "张三", "id_card_no": "110101199001011234", "is_real_name": 1, "privacy_mobile": 1, "privacy_birthday": 0, "privacy_fans": 1, "status": 0, "created_at": "2023-01-01T00:00:00Z", "updated_at": "2023-01-01T00:00:00Z" }
})
const avatarUrl = formModel.value.avatar_url

const userStore = useUserStore()
const logout = async () => {
    userStore.setToken('')
    await router.push('/login')
    showSuccessToast('退出成功')
}
</script>

<template>
    <div class="me">
        <div class="header">
            <van-nav-bar title="我的" />
        </div>
        <div class="container">
            <div class="avatar-baseinfo">
                <van-image v-if="avatarUrl" :src="avatarUrl" round fit="cover" />
                <van-image v-else :src="defaultAvatar" round fit="cover" />
                <div class="nickname">
                    {{ formModel.nickname || '未填写' }}
                </div>
                <div class="campus">
                    {{ formModel.campus_name || '未填写' }}
                </div>
                <div class="edit">
                    <van-button color="#84b0ed" to="/mecontent">编辑资料</van-button>
                </div>
            </div>
            <div class="info">
                <div class="verify" @click="router.push('/verify')">
                    <div class="verify-label">
                        <van-icon name="manager" />
                        实名认证
                    </div>
                    <van-icon name="arrow" />
                </div>
                <div class="my-posts">
                    <div class="posts-label">
                        <van-icon name="wechat-moments" />
                        我的帖子
                    </div>
                    <van-icon name="arrow" />
                </div>
                <div class="my-collection">
                    <div class="collection-label" @click="router.push('/collection')">
                        <van-icon name="star" />
                        我的收藏
                    </div>
                    <van-icon name="arrow" />
                </div>
                <div class="black" @click="router.push('/black')">
                    <div class="black-label">
                        <van-icon name="delete" />
                        黑名单
                    </div>
                    <van-icon name="arrow" />
                </div>
            </div>
            <van-button type="danger" plain replace class="logout-button" @click="logout">退出登录</van-button>
        </div>
    </div>
</template>

<style lang="less" scoped>
.me {

    :deep(.van-image) {
        width: 50px;
        height: 50px;
    }

    height: 100vh;
    background-color: #f6f6f6;

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;

        .avatar-baseinfo {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #84b0ed;
            margin-bottom: 10px;

            div {
                color: white;
                font-size: 16px;
                margin-bottom: 10px;
            }

            .campus {
                font-size: 14px;
            }

            :deep(.van-button) {
                border: .5px solid white !important;
                width: 100px;
                height: 30px;
            }
        }

        .info {
            width: 90%;
        }

        .info div {
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;
            margin-top: 5px;
            background: white;
            text-align: center;
            font-size: 14px;
        }

        .logout-button {
            margin-top: 90px;
        }
    }
}
</style>
