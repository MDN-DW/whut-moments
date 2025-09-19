<script setup>
import { getUserDetail } from "@/api/user"
import { getUserPostList } from "@/api/posts"
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import defaultAvatar from '@/assets/image/default.png'
import { timeAgo } from "@/utils/timeFormat"

const route = useRoute()
const router = useRouter()

const userInfo = ref({})
const title = ref('')

// 测试
/* userInfo.value = {
    "id": 1001,
    "nickName": "WHUT",
    "avatarUrl": "",
    "birthday": "1990-01-01",
    "mobile": "1111111111",
    "gender": 1,
    "campusId": 1,
    "campusName": "北京大学",
    "isRealName": 1,
    "privacyMobile": 1,
    "privacyBirthday": 0,
    "privacyFans": 1,
    "createdAt": "2023-01-01T00:00:00Z",
    "stats": {
        "postCount": 100,
        "followerCount": 500,
        "followingCount": 200
    }
}
title.value = `${userInfo.value.nickName}的主页` */

onMounted(async () => {
    const { data: { data } } = await getUserDetail(route.params.id)
    userInfo.value = data
    title.value = `${userInfo.value.nickName}的主页`
})

const postList = ref([])
const page = ref(1)
const size = ref(10)

// 测试
/* postList.value = [
    {
        "id": 2001,
        "user": {
            "id": 1001,
            "nickName": "用户昵称",
            "avatarUrl": ""
        },
        "content": "动态内容",
        "visibility": "PUBLIC",
        "poiName": "天安门广场",
        "isTop": 0,
        "status": "PUBLISHED",
        "files": [
            {
                "id": 1001,
                "fileUrl": "/src/assets/image/test/bg.png",
                "thumbUrl": "",
                "size": 1024000
            }
        ],
        "topics": [
            {
                "id": 1,
                "name": "#北京旅游#"
            }
        ],
        "tags": [
            {
                "id": 1,
                "name": "旅游"
            }
        ],
        "stats": {
            "viewCnt": 100,
            "likeCnt": 10,
            "commentCnt": 5,
            "shareCnt": 2
        },
        "userActions": {
            "isLiked": false,
            "isFavorited": false
        },
        "createdAt": "2023-01-01T00:00:00Z",
        "updatedAt": "2023-01-01T00:00:00Z"
    },
    {
        "id": 2001,
        "user": {
            "id": 1001,
            "nickName": "用户昵称",
            "avatarUrl": ""
        },
        "content": "动态内容",
        "visibility": "PUBLIC",
        "poiName": "天安门广场",
        "isTop": 0,
        "status": "PUBLISHED",
        "files": [
            {
                "id": 1001,
                "fileUrl": "/src/assets/image/test/bg.png",
                "thumbUrl": "",
                "size": 1024000
            }
        ],
        "topics": [
            {
                "id": 1,
                "name": "#北京旅游#"
            }
        ],
        "tags": [
            {
                "id": 1,
                "name": "旅游"
            }
        ],
        "stats": {
            "viewCnt": 100,
            "likeCnt": 10,
            "commentCnt": 5,
            "shareCnt": 2
        },
        "userActions": {
            "isLiked": false,
            "isFavorited": false
        },
        "createdAt": "2023-01-01T00:00:00Z",
        "updatedAt": "2023-01-01T00:00:00Z"
    },
    {
        "id": 2001,
        "user": {
            "id": 1001,
            "nickName": "用户昵称",
            "avatarUrl": ""
        },
        "content": "动态内容",
        "visibility": "PUBLIC",
        "poiName": "天安门广场",
        "isTop": 0,
        "status": "PUBLISHED",
        "files": [
            {
                "id": 1001,
                "fileUrl": "/src/assets/image/test/bg.png",
                "thumbUrl": "",
                "size": 1024000
            }
        ],
        "topics": [
            {
                "id": 1,
                "name": "#北京旅游#"
            }
        ],
        "tags": [
            {
                "id": 1,
                "name": "旅游"
            }
        ],
        "stats": {
            "viewCnt": 100,
            "likeCnt": 10,
            "commentCnt": 5,
            "shareCnt": 2
        },
        "userActions": {
            "isLiked": false,
            "isFavorited": false
        },
        "createdAt": "2023-01-01T00:00:00Z",
        "updatedAt": "2023-01-01T00:00:00Z"
    }
] */

onMounted(async () => {
    const { data: { data } } = await getUserPostList(route.params.id, page.value, size.value)
    postList.value = data.list
})

const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)

const onLoad = async () => {
    if (refreshing.value) {
        postList.value = [];
        refreshing.value = false;
        page.value = 1
    }

    const { data: { data } } = await getUserDetail(route.params.id)
    userInfo.value = data
    title.value = `${userInfo.value.nickName}的主页`

    const { data: { data: d } } = await getUserPostList(route.params.id, page.value, size.value)

    if (page.value === 1) {
        postList.value = d.list
    } else {
        postList.value.push(...d.list)
    }

    loading.value = false
    ++page.value

    if (list.value.length >= d.pagination.total) {
        finished.value = true
    }
}

const onRefresh = () => {
    // 清空列表数据
    finished.value = false

    // 重新加载数据
    // 将 loading 设置为 true，表示处于加载状态
    loading.value = true
    onLoad()
}



</script>

<template>
    <van-nav-bar :title="title" left-arrow fixed @click-left="router.back()" />

    <div class="info">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <div class="container">
                    <div class="header">
                        <div class="bg">
                            <div class="btn">
                                <div class="follow">
                                    <van-button class="follow-btn" type="primary" round color="#60a5fa">关注</van-button>
                                </div>

                                <div class="chat">
                                    <van-button class="chat-btn" type="primary" round color="white">
                                        <van-icon name="guide-o" />
                                        <span class="text">私信</span>
                                    </van-button>
                                </div>
                            </div>
                        </div>
                        <div class="box">
                            <div class="avatar">
                                <van-image :src="userInfo.avatarUrl || defaultAvatar" class="avatar-image" />
                            </div>
                            <div class="nickname-gender-campus-func">
                                <div class="nickname">
                                    <span>{{ userInfo.nickName }}</span>
                                </div>
                                <div class="campus-gender">
                                    <div class="campus">{{ userInfo.campusName }}</div>
                                    <div class="gender">
                                        <van-icon class-prefix="my-icon" name="nan" v-if="userInfo.gender === 1"
                                            color="#1296db" />
                                        <van-icon class-prefix="my-icon" name="nvxing" v-else color="#d4237a" />
                                    </div>
                                </div>
                                <div class="cnt">
                                    <div class="post_cnt">
                                        <p class="cnt">{{ userInfo.stats.postCount }}</p>
                                        <p class="text">发布内容</p>
                                    </div>
                                    <div class="follower_cnt">
                                        <p class="cnt">{{ userInfo.stats.followerCount }}</p>
                                        <p class="text">粉丝</p>
                                    </div>
                                    <div class="follow_cnt">
                                        <p class="cnt">{{ userInfo.stats.followingCount }}</p>
                                        <p class="text">关注</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="posts">
                        <div class="cell-grid">
                            <div v-for="item in postList" :key="item.id" class="custom-cell"
                                :class="{ 'no-content': !item.content && !item.files.length }"
                                @click="router.push(`/posts/detail/${item.id}`)">
                                <div class="file" v-if="item.files.length > 0">
                                    <van-image :src="item.files[0].fileUrl"></van-image>
                                </div>
                                <div class="content">
                                    <p class="text" v-if="item.content.length <= 50">
                                        {{ item.content }}
                                    </p>
                                    <p class="text" v-else>
                                        {{ item.content.substring(0, 50) }}...
                                    </p>
                                </div>
                                <div class="time">
                                    <p class="time-text">
                                        {{ timeAgo(item.createdAt) }}
                                    </p>
                                </div>
                                <div class="like" v-if="item.stats.likeCnt">
                                    <van-icon name="good-job-o" color="white" />
                                    <span class="like-text">
                                        {{ item.stats.likeCnt }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<style lang="less" scoped>
.info {
    background-color: white;
}

:deep(.van-cell__value) {
    text-align: left; // 将内容左对齐
}

.header {
    position: relative;

    .bg {
        height: 180px;
        margin-top: 50px;
        background: linear-gradient(135deg,
                #fce7f3 0%,
                #e0f2fe 100%);
        backdrop-filter: blur(10px);
        /* 模糊效果增强层次感 */
        position: relative;

        .btn {
            display: flex;
            align-items: center;
            position: absolute;
            right: 3%;
            bottom: 5%;

            .follow-btn,
            .chat-btn {
                width: 58px;
                height: 20px;
                font-size: 12px;
            }

            .chat-btn {
                width: 68px;
                margin-left: 5px;

                :deep(.van-button__text) {
                    color: black;
                }
            }
        }
    }

    .box {
        display: flex;
        align-items: center;
        background-color: transparent;
        padding: 10px;
        position: absolute;
        left: 0;
        right: 0;
        top: 68%;

        .avatar {
            margin-right: 10px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 3px solid white;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;

            .avatar-image {
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }
        }

        .nickname-gender-campus-func {
            .nickname {
                font-size: 18px;
                font-weight: bold;
                margin-top: 3px;
                margin-right: 5px;
            }

            .campus-gender {
                display: flex;
                align-items: center;
                font-size: 12px;
            }



            .cnt {
                margin-top: 5px;
                display: flex;
                align-items: center;
                margin-right: 10px;
                font-size: 14px;

                .post_cnt,
                .follower_cnt,
                .follow_cnt {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-right: 10px;

                    p {
                        margin: 0;
                    }

                    .text {
                        font-size: 10px;
                        color: #9ea8b8;
                    }

                }
            }
        }
    }
}


.posts {
    margin-top: 60px;

    .cell-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 10px;
        padding: 0 10px;

        .custom-cell {
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            padding: 10px;
            position: relative;

            &.no-content {
                background: transparent !important;
                box-shadow: none !important;
                padding: 0 !important;
            }

            .file {
                margin-bottom: 10px;

                :deep(.van-image) {
                    width: 100%;
                    height: 120px;
                    border-radius: 8px;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
            }

            .content {
                margin-bottom: 10px;

                .text {
                    margin: 0;
                    font-size: 14px;
                    line-height: 1.4;
                    color: #333;
                }
            }

            .time {
                margin-bottom: 10px;

                .time-text {
                    margin: 0;
                    font-size: 12px;
                    color: #999;
                }
            }

            .like {
                display: flex;
                align-items: center;
                position: absolute;
                right: 15px;
                top: 15px;
                width: 30px;
                height: 15px;
                border-radius: 5px;
                background-color: rgba(170, 170, 172, .8);
                padding: 3px;

                .van-icon {
                    margin-right: 1px;
                    font-size: 10px;
                }

                .like-text {
                    font-size: 10px;
                    color: white;
                }
            }
        }
    }
}
</style>