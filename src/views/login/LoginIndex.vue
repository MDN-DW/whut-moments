<script setup>
import { ref } from 'vue'
import { getCode, login } from '@/api/user';
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores'

const isMobileFocused = ref(false)
const isMsgCode = ref(false)


const mobile = ref('')
const msgCode = ref('')
const isAgree = ref(false)

// 校验
const valid = () => {
    if (!/^1[3-9]\d{9}$/.test(mobile.value)) {
        showToast({
            message: '请输入正确的手机号',
            position: 'top',
        })
        return false
    } else if (!/^\d{6}$/.test(msgCode.value)) {
        showToast({
            message: '请输入正确的验证码',
            position: 'top',
        })
        return false
    } else if (!isAgree.value) {
        showToast({
            message: '请勾选同意协议',
            position: 'top',
        })
        return false
    } else {
        return true
    }
}

const getMsgCode = async () => {
    await getCode()
}

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const Login = async () => {
    if (!valid()) {
        return
    }
    const { data: data } = await login({ mobile: mobile.value, code: msgCode.value })
    userStore.setToken(data.access_token)
    showSuccessToast('登录成功')
    const url = route.query.backUrl || '/'
    router.replace(url)
}



</script>

<template>
    <div class="login">
        <van-nav-bar title="登录" />
        <div class="container">
            <div class="title">
                <h3>手机号登录</h3>
                <p>未注册的手机号登录后将自动注册</p>
            </div>
            <div class="form">
                <div class="form-item" :class="{ focused: isMobileFocused }">
                    <input v-model="mobile" type="text" placeholder="请输入手机号码" maxlength="11" class="inp"
                        @focus="isMobileFocused = true" @blur="isMobileFocused = false" />
                </div>
                <div class="form-item" :class="{ focused: isMsgCode }">
                    <input v-model="msgCode" class="inp" placeholder="请输入验证码" type="password" @focus="isMsgCode = true"
                        @blur="isMsgCode = false" />
                    <span class="get-code" @click="getMsgCode">获取验证码</span>
                </div>
            </div>
            <div class="agree">
                <input type="checkbox" id="agree" v-model="isAgree">
                <label for="agree">我已阅读并同意</label>
            </div>
            <div class="btn" @click="Login">登录</div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.container {
    padding: 49px 29px;

    .title {
        margin-bottom: 20px;

        h3 {
            font-size: 26px;
            font-weight: normal;
        }

        p {
            line-height: 40px;
            font-size: 14px;
            color: #b8b8b8;
        }
    }

    .form-item {
        border-bottom: 1px solid #f3f1f2;
        padding: 2px;
        margin-bottom: 16px;
        display: flex;
        align-items: center;

        &.focused {
            border-bottom: 1px solid #ff9211;
            ;
        }

        .inp {
            border: none;
            outline: none;
            height: 32px;
            font-size: 14px;
            flex: 1;
        }

        img {
            width: 94px;
            height: 31px;
        }

        button {
            height: 31px;
            border: none;
            font-size: 13px;
            color: #b8b8b8;
            background-color: transparent;
            padding-right: 9px;
        }

        .get-code {
            font-size: 12px;
            color: #ff9211;
            margin-left: auto;
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
        height: 42px;
        margin-top: 39px;
        background-image: linear-gradient(to right, #ecb53c, #ff9211, #ecb53c);
        color: #fff;
        border-radius: 39px;
        box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);
        letter-spacing: 2px;
        text-align: center;
        line-height: 42px;
    }
}
</style>
