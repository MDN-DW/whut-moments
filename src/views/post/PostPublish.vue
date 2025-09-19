<script setup>
import { ref, computed } from 'vue'
import { publishPost } from '@/api/posts'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import defaultAvatar from '@/assets/image/default.png'

const route = useRoute()
const router = useRouter()

const userStore = useUserStore()

const isEdit = computed(() => !!route.params.id)

const files = ref([])

const form = ref({
    content: '',
    visibility: '',
    poiLat: null,
    poiLng: null,
    poiName: null,
    fileIds: [],
    topicNames: []
})

const showTopicList = ref(false)

/* const topicList = ref([
    {
        id: 1,
        name: '校园动态'
    },
    {
        id: 2,
        name: '生活分享'
    },
    {
        id: 2,
        name: '生活分享'
    },
    {
        id: 2,
        name: '生活分享'
    },
    {
        id: 2,
        name: '生活分享'
    }
]) */

const selectTopic = (topicName) => {
    if (form.value.topicNames.includes(topicName)) {
        form.value.topicNames.splice(form.value.topicNames.indexOf(topicName), 1)
    } else {
        form.value.topicNames.push(topicName)
    }
}

const showPrivacyList = ref(false)

const privacyList = ref([
    {
        text: '公开',
        value: 'PUBLIC'
    },
    {
        text: '仅朋友可见',
        value: 'FRIEND'
    },
    {
        text: '同校区可见',
        value: 'CAMPUS'
    }
])

// 获取用户位置
const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            // 成功回调
            (position) => {
                const latitude = position.coords.latitude
                const longitude = position.coords.longitude

                // 将位置信息保存到表单中
                form.value.poiLat = latitude
                form.value.poiLng = longitude

                // 可以调用逆地理编码获取具体地址名称
                getAddressFromCoordinates(latitude, longitude)
            },
            // 错误回调
            (error) => {
                console.error('获取位置失败:', error)
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        showFailToast("用户拒绝了地理位置请求")
                        break;
                    case error.POSITION_UNAVAILABLE:
                        showFailToast("位置信息不可用")
                        break;
                    case error.TIMEOUT:
                        showFailToast("请求超时")
                        break;
                    default:
                        showFailToast("发生未知错误")
                        break;
                }
            },
            {
                // 选项
                enableHighAccuracy: true, // 高精度
                timeout: 10000,           // 超时时间10秒
                maximumAge: 60000         // 缓存时间1分钟
            }
        );
    } else {
        console.log("浏览器不支持地理位置");
    }
}

// 逆地理编码：根据经纬度获取地址名称（需要调用地图API）
const getAddressFromCoordinates = (lat, lng) => {
    // 这里可以调用高德地图、百度地图或腾讯地图的逆地理编码API
    // 示例（使用高德地图API）：
    // 要申请api密钥 后端请求获取密钥

    /* fetch(`https://restapi.amap.com/v3/geocode/regeo?key=YOUR_KEY&location=${lng},${lat}`)
      .then(response => response.json())
      .then(data => {
        if (data.regeocode) {
          form.value.poiName = data.regeocode.formatted_address;
        }
      })
      .catch(error => {
        console.error('获取地址信息失败:', error);
      }); */
}

// 正式
/* onMounted(() => {
    getLocation()
}) */

// 测试
form.value.poiName = '武汉理工大学'

const onSubmit = async () => {
    const formData = new FormData()
    formData.append('content', form.value.content)
    formData.append('visibility', form.value.visibility)
    if (form.value.poiLat) {
        formData.append('poiLat', form.value.poiLat)
    }
    if (form.value.poiLng) {
        formData.append('poiLng', form.value.poiLng)
    }
    if (form.value.poiName) {
        formData.append('poiName', form.value.poiName)
    }

    form.value.topicNames.forEach(topic => {
        formData.append('topicNames', topic)
    })

    files.value.forEach(file => {
        formData.append('fileIds', file.file)
    })

    await publishPost(formData)

    router.push('/')
}
</script>

<template>
    <van-nav-bar left-text="取消" @click-left="router.back()" fixed>
        <template #title>
            {{ isEdit ? '编辑动态' : '发布动态' }}
        </template>
        <template #right>
            <van-button round type="primary" plain @click="onSubmit">{{ isEdit ? '保存' : '发布' }}</van-button>
        </template>
    </van-nav-bar>

    <div class="container">

        <div class="avatar-nickname">
            <van-image :src="userStore.userInfo.avatar || defaultAvatar" class="avatar-image" />
            <div class="nickname-time">
                <div class="nickname">{{ userStore.userInfo.nickName }}</div>
            </div>
        </div>

        <van-field v-model="form.content" rows="5" type="textarea" maxlength="300" placeholder="分享你的校园日常吧~"
            show-word-limit />

        <div class="photo">
            <p class="photo-title">
                <van-icon class-prefix="my-icon" name="tupian" color="#1677ff" />
                <span class="title-text">
                    添加图片（可选）
                </span>
            </p>
            <van-uploader v-model="files" multiple>
                <div class="upload">
                    <van-icon name="plus" />
                </div>
            </van-uploader>
        </div>

        <div class="function">
            <div class="topics" @click="showTopicList = !showTopicList">
                <div class="list" :class="{ 'list-show': showTopicList }">
                    <div v-for="item in topicList" :key="item.id" class="item" @click.stop="selectTopic(item.name)"
                        :class="{ 'selected': form.topicNames.includes(item.name) }">
                        {{ item.name }}
                    </div>
                </div>

                <div class="title">
                    <div class="icon">
                        <van-icon class-prefix="my-icon" name="hashjinghao" />
                    </div>
                    <div class="text">
                        话题
                    </div>
                </div>
            </div>

            <div class="privacy" @click="showPrivacyList = !showPrivacyList">
                <div class="list" :class="{ 'list-show': showPrivacyList }">
                    <div v-for="item in privacyList" :key="item.value" class="item"
                        @click.stop="form.visibility = item.value"
                        :class="{ 'selected': form.visibility === item.value }">
                        {{ item.text }}
                    </div>
                </div>

                <div class="title">
                    <div class="icon">
                        <van-icon class-prefix="my-icon" name="jiesuo" />
                    </div>
                    <div class="text">
                        权限
                    </div>
                </div>
            </div>
        </div>

        <div class="position">
            <van-icon name="location-o" />
            <div class="text">
                {{ form.poiName }}
            </div>
        </div>

        <div class="warn">
            <div class="warn-text">
                <p class="text-span">
                    <van-icon class-prefix="my-icon" name="dian" />
                    请勿发布任何违反法律法规、校园规定的内容
                </p>
                <p class="text-span">
                    <van-icon class-prefix="my-icon" name="dian" />
                    涉及他人、商业广告的内容将被限制发布
                </p>
            </div>
        </div>

    </div>
</template>

<style lang="less" scoped>
:deep(.van-nav-bar__text) {
    color: #999999;
    /* 浅灰色取消文字 */
    font-size: 16px;
}

:deep(.van-button) {
    width: 50px;
    height: 30px;
    font-size: 14px;
    padding: 0;
}

.container {
    height: 100vh;
    background-color: #fafafc;
    position: relative;
    padding-top: 10px;

    .avatar-nickname {
        margin-top: 50px;
        margin-left: 15px;
        display: flex;
        align-items: center;

        .avatar-image {
            width: 40px;
            height: 40px;
        }

        .nickname-time {
            margin-left: 10px;

            .nickname {
                font-size: 16px;
            }
        }
    }

    .photo {
        margin-left: 15px;
        margin-top: 10px;

        .title-text {
            font-size: 14px;
            font-weight: bold;
            color: #57616d;
            margin-bottom: 10px;
        }

        :deep(.van-uploader__wrapper) {
            margin-left: 10px;
            display: grid;
            grid-template-columns: repeat(3, 30%); // 三列均分
            grid-gap: 10px;
        }

        :deep(.van-uploader__preview),
        :deep(.van-uploader__upload) {
            width: 100%;
            aspect-ratio: 1; // 关键属性：保持宽高比为1:1
            height: auto; // 让高度根据宽度自动计算
        }

        :deep(.van-uploader__preview-image) {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        :deep(.van-uploader__upload) {
            display: none;
        }

        .upload {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f3f4f6;
            width: 100px;
            height: 100px;
            border: 1px dashed #e5e5e5; // 添加虚线边框
            transition: all 0.3s ease;


            &:hover {
                background-color: #e8eaed;
            }

            &:active {
                background-color: #dfe1e4;
                transform: scale(0.98); // 点击时轻微缩放
            }

            :deep(.van-icon) {
                font-size: 32px;
                color: #999;
            }
        }
    }

    .function {
        margin-top: 20px;
        background-color: #fafafc;
        display: flex;
        justify-content: center;
        font-size: 16px;
        color: #9ca3af;

        .topics,
        .privacy {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-bottom: 10px;
            width: 48%;
            aspect-ratio: 3;
            height: auto;
            background-color: white;
            border-radius: 5px;

            .title {
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .list {
                position: absolute;
                width: 48vw;
                max-height: 100px;
                overflow-y: auto;
                background-color: white;
                border: 1px solid #e5e5e5;
                display: none;
                bottom: calc(48vw / 3);

                &.list-show {
                    display: block;
                }

                .item {
                    text-align: center;
                    margin-bottom: 3px;
                }
            }
        }

        .topics {
            border-right: 1px solid #e5e5e5;
        }
    }

    .position {
        margin-top: 20px;
        margin-left: 15px;
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #9ca3af;
    }

    .warn-text {
        margin-top: 20px;
        height: 60px;
        background-color: #f3f4f6;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .text-span {
            margin-top: 0;
            margin-bottom: 5px;
            font-size: 14px;
            color: #9da3af;
        }
    }
}

.selected {
    color: #60a5fa;
    border: 1px solid #60a5fa;
    border-radius: 5px;
}
</style>