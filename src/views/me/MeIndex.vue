<script setup>
import { ref, onMounted } from 'vue'
import defaultAvatar from "@/assets/image/default.png"
import { useRouter } from 'vue-router';
import { getUserInfo, logout } from '@/api/user'
import { useUserStore } from '@/stores';

const router = useRouter()


const formModel = ref({})

const userStore = useUserStore()

onMounted(async () => {
    /* const { data: { data } } = await getUserInfo()
    formModel.value = data */

    formModel.value = { "id": 1001, "nickname": "WHUT", "avatar_url": "", "birthday": "1990-01-01", "gender": 1, "campus_id": 1, "campus_name": "北京大学", "qq_openid": "xxx", "mobile": "13800138000", "real_name": "张三", "id_card_no": "110101199001011234", "is_real_name": 0, "privacy_mobile": 1, "privacy_birthday": 0, "privacy_fans": 1, "status": 0, "created_at": "2023-01-01T00:00:00Z", "updated_at": "2023-01-01T00:00:00Z" }
    userStore.setUserInfo({ id: formModel.value.id, nickname: formModel.value.nickname, avatar: formModel.value.avatar_url })
})

const avatarUrl = formModel.value.avatar_url

const Logout = async () => {
    await logout()
    userStore.setToken('')
    await router.push('/login')
    showSuccessToast('退出成功')
}
</script>

<template>
    <div class="me"><!-- v-if="userStore.token" -->
        <div class="header">
            <van-nav-bar title="我的" />
        </div>
        <div class="container">
            <div class="avatar-baseinfo">
                <van-image :src="avatarUrl || defaultAvatar" round fit="cover" />
                <div class="nickname">
                    {{ formModel.nickname || '匿名用户' }}
                </div>
                <div class="campus">
                    {{ formModel.campus_name || '未填写' }}
                </div>
                <div class="edit">
                    <van-button color="#84b0ed" to="/me/content">编辑资料</van-button>
                </div>
            </div>
            <div class="info">
                <div class="verify" @click="router.push('/verify')">
                    <div class="verify-label">
                        <van-icon name="manager" color="#51afef" />
                        <span class="tip">实名认证</span>
                        <van-tag type="primary" v-if="formModel.is_real_name">已实名</van-tag>
                        <van-tag type="danger" v-else>未实名</van-tag>
                    </div>
                    <van-icon name="arrow" />
                </div>
                <div class="my-posts" @click="router.push('/posts/list')">
                    <div class="posts-label">
                        <van-icon name="wechat-moments" color="#ff9900" />
                        <span class="tip">我的帖子</span>
                    </div>
                    <van-icon name="arrow" />
                </div>
                <div class="likes" @click="router.push('/likes')">
                    <div class="likes-label">
                        <van-icon name="like" color="#ff0000" />
                        <span class="tip">我的喜欢</span>
                    </div>
                    <van-icon name="arrow" />
                </div>
                <div class="my-collection">
                    <div class="collection-label" @click="router.push('/collection')">
                        <van-icon name="star" color="#f4dd0d" />
                        <span class="tip">我的收藏</span>
                    </div>
                    <van-icon name="arrow" />
                </div>
                <div class="black" @click="router.push('/black')">
                    <div class="black-label">
                        <van-icon name="delete" color="#ff0000" />
                        <span class="tip">黑名单</span>
                    </div>
                    <van-icon name="arrow" />
                </div>
            </div>
            <van-button type="danger" plain replace class="logout-button" @click="Logout">退出登录</van-button>
        </div>
    </div>
    <!-- <div v-else class="un-login">
        <strong>请先登录</strong>
        <p>登录后即可使用全部功能</p>
        <van-button type="primary" @click="router.push('/login')" class="go-login-button">
            <van-icon name="guide-o" />
            去登录
        </van-button>
    </div> -->
</template>

<style lang="less" scoped>
.me {
    position: relative;
    height: 100vh;

    :deep(.van-image) {
        width: 50px;
        height: 50px;
    }

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

            .verify,
            .my-posts,
            .likes,
            .my-collection,
            .black {
                .tip {
                    margin-left: 5px;
                    margin-right: 10px;
                }

                :deep(.van-icon) {
                    margin-left: 5px;
                    font-size: 16px;
                }
            }
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
            position: absolute;
            top: 82%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
}

.un-login {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        margin-top: 10px;
        font-size: 14px;
        color: #999;
    }

    strong {
        font-size: 24px;
    }

    .go-login-button {
        width: 200px;
        height: 40px;
        margin-top: 20px;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;

        .van-icon {
            font-size: 16px;
        }
    }
}
</style>
