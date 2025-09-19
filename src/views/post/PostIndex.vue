<script setup>
import { useRouter } from 'vue-router'
import { getAllPost, likePost, cancelLikePost, collectPost, cancelCollectPost, sharePost } from "@/api/posts"
import { ref, onMounted } from "vue"
import defaultAvatar from "@/assets/image/default.png"
import { timeAgo } from "@/utils/timeFormat"
import { useUserStore } from '@/stores'

const userStore = useUserStore()

const router = useRouter()

const postList = ref([])
const postPage = ref(1)
const postSize = ref(10)

onMounted(async () => {
    const { data: { data } } = await getAllPost({ page: postPage.value, size: postSize.value })
    postList.value = data.list
})

// 测试
/* postList.value = [
    {
        "id": 2001,
        "user": {
            "id": 1001,
            "nickName": "用户昵称",
            "avatarUrl": ""
        },
        "content": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "visibility": "PUBLIC",
        "poiName": "天安门广场",
        "isTop": 0,
        "status": "PUBLISHED",
        "files": [
            {
                "id": 1001,
                "fileUrl": "",
                "thumbUrl": "",
                "size": 1024000
            }
        ],
        "topics": [
            {
                "id": 1,
                "name": "#北京旅游#"
            },
            {
                "id": 2,
                "name": "#北京旅游#"
            },
            {
                "id": 3,
                "name": "#北京旅游#"
            },
            {
                "id": 4,
                "name": "#北京旅游#"
            },
            {
                "id": 5,
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

const postLoading = ref(false)
const postFinished = ref(false)
const postRefreshing = ref(false)

const onPostLoad = async () => {
    if (postRefreshing.value) {
        postList.value = []
        postPage.value = 1
        postRefreshing.value = false
    }

    const { data: { data } } = await getAllPost({ page: postPage.value, size: postSize.value })
    if (postPage.value === 1) {
        postList.value = data.list
    } else {
        postList.value.push(...data.list)
    }

    postLoading.value = false
    ++postPage.value

    if (postList.value.length >= data.pagination.total) {
        postFinished.value = true
    }
}

const onPostRefresh = () => {
    postFinished.value = false
    postList.value = []
    postLoading.value = true
    onPostLoad()
}

// 根据id在postList中找到对应的post
const findPostById = (postId) => {
    return postList.value.find(post => post.id === postId)
}

const like = async (postId) => {
    const post = findPostById(postId)
    if (post.userActions.isLiked) {
        const { data: data } = await cancelLikePost(postId)
        post.userActions.isLiked = false
        post.stats.likeCnt = data.likeCnt
    } else {
        const { data: data } = await likePost(postId)
        post.userActions.isLiked = true
        post.stats.likeCnt = data.likeCnt
    }
}

const collect = async (postId) => {
    const post = findPostById(postId)
    if (post.userActions.isFavorited) {
        await cancelCollectPost(postId)
        post.userActions.isFavorited = false
    } else {
        await collectPost(postId)
        post.userActions.isFavorited = true
    }
}

const share = async (postId) => {
    const post = findPostById(postId)
    const { data: data } = await sharePost(postId)
    post.stats.shareCnt = data.shareCnt
}
</script>

<template>
    <van-nav-bar title="校遇" fixed />
    <van-search placeholder="请输入搜索关键词" @focus="router.push('/search')" class="post-search">
    </van-search>

    <van-cell class="post-share">
        <div class="post-share-container" @click="router.push('/posts/content')">
            <van-icon name="smile-comment" class="post-share-icon" />
            <div class="post-share-text">分享你的校园日常吧~</div>
        </div>
    </van-cell>

    <van-pull-refresh v-model="postRefreshing" @refresh="onPostRefresh">
        <van-list v-model:loading="postLoading" :finished="postFinished" finished-text="没有更多了" @load="onPostLoad">
            <van-cell v-for="item in postList" :key="item.id" class="post-info">
                <div class="header">
                    <van-image :src="item.user.avatarUrl || defaultAvatar" class="avatar-image"
                        @click="router.push(`/user/${item.user.id}`)" />
                    <div class="nickname-time">
                        <div class="nickname" @click="router.push(`/user/${item.user.id}`)">{{ item.user.nickName }}
                        </div>
                        <div class="time" @click="router.push(`/posts/detail/${item.id}`)">
                            <span class="time-text">{{ timeAgo(item.createdAt) }}</span>
                        </div>
                    </div>

                    <div class="view-cnt" v-if="item.stats.viewCnt" @click="router.push(`/posts/detail/${item.id}`)">
                        <van-icon name="eye-o" class="view-icon" />
                        <span class="view-cnt-text">{{ item.stats.viewCnt }}</span>
                    </div>
                </div>

                <div class="content-container" @click="router.push(`/posts/detail/${item.id}`)">
                    <div class="content" v-if="item.content.length <= 50">
                        {{ item.content }}
                    </div>
                    <div class="content" v-else>
                        <div class="content-text">{{ item.content.substring(0, 50) }}...
                            <span class="content-more">点击查看详情</span>
                        </div>
                    </div>


                    <div class=" topics">
                        <div class="topic-scroll-container">
                            <div class="topic-scroll-wrapper">
                                <div v-for="value in item.topics" :key="value.id" class="topic-item">
                                    <div class="topic-name">{{ value.name }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="files">
                        <div class="file-scroll-container">
                            <div class="file-scroll-wrapper">
                                <div v-for="value in item.files" :key="value.id" class="file-item">
                                    <van-image class="file-image" :src="value.fileUrl" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="location" v-if="item.poiName">
                        <van-icon name="location-o" />
                        <div class="location-text">{{ item.poiName }}</div>
                    </div>

                    <div class="function">
                        <div class="like-comment">
                            <div class="likes" @click="like(item.id)">
                                <div class="text">
                                    <van-icon name="good-job" v-if="item.userActions.isLiked" />
                                    <van-icon name="good-job-o" v-else />
                                    <span class="likes-text" v-if="item.stats.likeCnt">{{ item.stats.likeCnt
                                        }}</span>
                                </div>
                            </div>

                            <div class="comment">
                                <div class="text">
                                    <van-icon name="chat-o" />
                                    <span class="comment-text" v-if="item.stats.commentCnt">{{
                                        item.stats.commentCnt
                                        }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="collection-share">
                            <div class="collection" @click="collect(item.id)">
                                <van-icon name="bookmark-o" v-if="!item.userActions.isFavorited" />
                                <van-icon name="bookmark" v-else />
                            </div>

                            <div class="share" @click="share(item.id)">
                                <van-icon name="share-o" />
                                <span class="share-text" v-if="item.stats.shareCnt">{{ item.stats.shareCnt
                                    }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </van-cell>
        </van-list>
    </van-pull-refresh>
</template>

<style lang="less" scoped>
.post-search {
    margin-top: 50px;
    margin-bottom: 10px;
}

.post-share {
    padding: 0;

    :deep(.van-cell) {
        background-color: #f7f8fa;
        height: 50px;
    }

    .post-share-container {
        display: flex;
        align-items: center;
        height: 50px;
        padding-right: 0;

        .post-share-icon {
            margin-left: 10px;
            margin-right: 5px;
            font-size: 30px;
        }

        .post-share-text {
            height: 30px;
            padding-left: 10px;
            margin-right: 10px;
            font-size: 14px;
            text-align: left;
            line-height: 30px;
            color: #a1a8b3;
            background-color: #f7f8fa;
            border-radius: 10px;
            background-color: #f7f8fa;
            flex: 1;
        }
    }
}

.post-info {
    padding: 10px 10px !important;
    margin-top: 15px;

    :deep(.van-cell__value) {
        text-align: left;
    }

    .header {
        display: flex;

        .avatar-image {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }

        .nickname-time {
            margin-left: 10px;

            .nickname {
                font-size: 16px;
            }

            .time {
                font-size: 12px;
                color: #a1a8b3;
            }
        }

        .view-cnt {
            margin-left: auto;
            height: 20px;
            display: flex;
            align-items: center;

            .view-icon {
                font-size: 18px;
                margin-right: 5px;
            }

            .view-cnt-text {
                font-size: 12px;
            }
        }
    }

    .content-container {

        .content {
            font-size: 16px;
            text-align: left;

            .content-more {
                font-size: 14px;
                color: #1989fa;
            }
        }
    }
}

.location {
    margin-top: 10px;
    display: flex;
    align-items: center;
    color: #999;
    font-size: 12px;
}


.function {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .like-comment,
    .collection-share {
        display: flex;
    }

    .likes,
    .comment,
    .collection,
    .share {
        margin-right: 10px;
    }

    :deep(.van-icon) {
        font-size: 16px;
        margin-right: 3px;
    }
}

.expand-toggle {
    color: #1989fa;
    cursor: pointer;
    margin-top: 5px;
    display: inline-block;
}

.topic-scroll-container {
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

.topic-scroll-wrapper {
    :deep(.van-image) {
        width: 50px;
        height: 50px;
    }

    display: inline-block;
    padding: 0 15px;
    text-align: left;
}

.topic-item {
    display: inline-block;

    &:last-child {
        margin-right: 0;
    }

    .topic-name {
        width: 70px;
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
        background-color: #fef6fb;
        color: #f9b5df;
        font-weight: bold;
    }
}

.file-scroll-container {
    width: 100%;
    // 移除水平滚动，改为正常布局
    overflow-x: hidden;
    overflow-y: hidden;
    padding: 10px 0;
    background-color: #fff;
}

.file-scroll-wrapper {
    :deep(.van-image) {
        width: 100%;
        height: 100%;
    }

    // 移除内联块显示
    display: block;
    padding: 0 15px;
}

.file-item {
    // 使用网格布局
    display: inline-block;
    width: calc((100% - 20px) / 3); // 一行三张，减去间距
    margin-right: 10px;
    margin-bottom: 10px;

    // 移除之前的样式
    &:last-child {
        margin-right: 10px; // 保持一致的右边距
    }

    .file-image {
        width: 100%;
        height: 100px; // 固定高度或根据需要调整
        object-fit: cover; // 保持图片比例并填充容器
    }
}

// 确保每行最后一张图片没有右边距
.file-item:nth-child(3n) {
    margin-right: 0;
}
</style>