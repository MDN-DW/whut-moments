<script setup>
import { ref } from 'vue'
import { login, register } from '@/api/user';
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores'

const showLogin = ref(false)
const showRigister = ref(false)
const account = ref('')
const password = ref('')
const repassword = ref('')

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const Login = async () => {
    const { data: data } = await login({ account: account.value, password: password.value })
    userStore.setToken(data.access_token)
    userStore.setUserInfo({ id: data.user.id, nickname: data.user.nickname, avatar: data.user.avatar_url, })
    show.value = false
    account.value = ''
    password.value = ''
    showSuccessToast('登录成功')
    const url = route.query.backUrl || '/'
    router.replace(url)
}

const validator = (val) => val === password.value

const Register = async () => {
    await register({ account: account.value, password: password.value })
    showSuccessToast('注册成功')
    showRigister.value = false
    account.value = ''
    password.value = ''
    repassword.value = ''
}

</script>

<template>
    <div class="login">
        <div class="container">
            <div class="slogan-container">
                <p class="slogan-brand">校遇</p>
                <p class="slogan-text">让校园里的每一次遇见都有意义</p>
            </div>
            <div class="btn">
                <div class="login-btn" @click="showLogin = true">登录</div>
                <div class="register-btn" @click="showRigister = true">注册 </div>
            </div>
            <van-dialog v-model:show="showLogin" title="登录" :show-confirm-button="false">
                <van-form @submit="Login">
                    <van-cell-group inset>
                        <van-field v-model="account" name="账号" label="账号" placeholder="账号"
                            :rules="[{ required: true, message: '请填写账号' }]" class="account" />
                        <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
                            :rules="[{ required: true, message: '请填写密码' }]" class="password" />
                    </van-cell-group>
                    <div style="margin: 16px;">
                        <van-button round block type="primary" native-type="submit" class="submit-btn">
                            登录
                        </van-button>
                        <van-button round block type="primary" @click="showLogin = false" class="cancle-btn"
                            color="white">
                            取消
                        </van-button>
                    </div>
                </van-form>
            </van-dialog>
            <van-dialog v-model:show="showRigister" title="注册" :show-confirm-button="false">
                <van-form @submit="Register">
                    <van-cell-group inset>
                        <van-field v-model="account" name="账号" label="账号" placeholder="账号"
                            :rules="[{ required: true, message: '请填写账号' }]" class="account" />
                        <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
                            :rules="[{ required: true, message: '请填写密码' }]" class="password" />
                        <van-field v-model="repassword" type="password" name="密码" label="确认密码" placeholder="确认密码"
                            :rules="[{ required: true, message: '请再次填写密码' }, { validator, message: '密码与第一次不一致' }]"
                            class="repassword" />
                    </van-cell-group>
                    <div style="margin: 16px;">
                        <van-button round block type="primary" native-type="submit" class="submit-btn">
                            注册
                        </van-button>
                        <van-button round block type="primary" @click="showRigister = false" class="cancle-btn"
                            color="white">
                            取消
                        </van-button>
                    </div>
                </van-form>
            </van-dialog>
        </div>
    </div>
</template>

<style lang="less" scoped>
.login {

    background: linear-gradient(to bottom, #ffcce6, #b3d9ff, #ffffff 80%);

    .container {
        height: 100vh;
        padding: 49px 29px;
        position: relative;

        .account,
        .password,
        .repassword {
            height: 60px;
        }

        .submit-btn,
        .cancle-btn {
            border-radius: 15px;
            margin-top: 10px;
        }

        .cancle-btn {
            :deep(.van-button__text) {
                color: black !important;
            }
        }

        .slogan-container {

            /* 品牌名“校遇”样式 */
            .slogan-brand {
                font-family: "PingFang SC", "Helvetica Neue", Arial, sans-serif;
                font-size: 30px;
                font-weight: 800;
                color: #ff7eb6;
                /* 粉色，呼应背景粉色调 */
                text-shadow: 0 2px 4px rgba(255, 126, 182, 0.2);
                /* 粉色阴影增强质感 */
            }

            /* 标语文字样式 */
            .slogan-text {
                font-family: "PingFang SC", "Helvetica Neue", Arial, sans-serif;
                font-size: 20px;
                color: #4a90e2;
                margin-left: 30px;
                text-align: left;
            }
        }

        .agree {
            display: flex;
            align-items: center;

            label {
                font-size: 12px;
                color: #b8b8b8;
                margin-left: 5px;
            }

            span {
                font-size: 12px;
                color: #ff9211;
                margin-left: auto;
            }
        }

        .btn {
            position: absolute;
            top: 55%;
            left: 50%;
            transform: translate(-50%, -50%);

            .login-btn,
            .register-btn {
                width: 200px;
                height: 42px;
                margin-top: 20px;
                background-color: #60a5fa;
                color: #fff;
                border-radius: 15px;
                box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.1);
                letter-spacing: 2px;
                text-align: center;
                line-height: 42px;
            }

            .register-btn {
                background-color: #93c5fd;
            }
        }
    }
}
</style>
