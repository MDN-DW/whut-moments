<script setup>
import { getPostDetail, getCommentList } from "@/api/posts";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import defaultAvatar from "@/assets/image/default.png"
import { timeAgo } from "@/utils/timeFormat"
import { useUserStore } from '@/stores'

const userStore = useUserStore()

const route = useRoute()

const postId = route.params.id

// 正式
/* const post = ref({})
 onMounted(async () => {
    const { data: { data } } = await getPostDetail(postId)
    post.value = data
}) */

// 测试
const post = ref({
    "id": 2001,
    "user": {
        "id": 1001,
        "nickname": "用户昵称",
        "avatar_url": ""
    },
    "content": "动态内容",
    "visibility": "PUBLIC",
    "poi_name": "天安门广场",
    "is_top": 0,
    "status": "PUBLISHED",
    "files": [
        {
            "id": 1001,
            "file_url": "D:/Front-End/whut-moments/src/assets/image/default.png",
            "thumb_url": "",
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
        "view_cnt": 100,
        "like_cnt": 10,
        "comment_cnt": 5,
        "share_cnt": 2
    },
    "user_actions": {
        "is_liked": false,
        "is_favorited": false
    },
    "created_at": "2023-01-01T00:00:00Z",
    "updated_at": "2023-01-01T00:00:00Z"
})

const commentList = ref([])

const commentPage = ref(1)
const commentSize = ref(10)

const commentLoading = ref(false)
const commentFinished = ref(false)
const refreshing = ref(false)

// 正式
/* onMounted(async () => {
    onLoad()
})
 */

const onLoad = async () => {
    if (refreshing.value) {
        commentList.value = []
        refreshing.value = false
    }

    // 正式
    /* const { data: data } = await getCommentList(route.params.id, { page: commentPage.value, size: commentSize.value })

    if (commentPage.value === 1) {
        commentList.value = data.list
    } else {
        commentList.value.push(...data.list)
    } */

    // 测试
    commentList.value = [
        {
            "id": 3001,
            "user": {
                "id": 1001,
                "nickname": "评论者",
                "avatar_url": ""
            },
            "at_users": [
                {
                    "id": 1001,
                    "nickname": "评论者"
                }
            ],
            "content": "一级评论内容",
            "parent_id": 0,
            "like_cnt": 5, // 评论点赞数
            "is_liked": true, // 当前用户是否点赞
            "reply_count": 2, // 回复数量
            "created_at": "2023-01-01T00:00:00Z",
            "replies": [ // 二级评论（最多返回几条，或只返回 count）
                {
                    "id": 3002,
                    "user": {
                        "id": 1002,
                        "nickname": "回复者",
                        "avatar_url": ""
                    },
                    "at_users": [
                        {
                            "id": 1001,
                            "nickname": "评论者"
                        },
                        {
                            "id": 1001,
                            "nickname": "评论者"
                        }
                    ],
                    "content": "回复内容",
                    "parent_id": 3001,
                    "like_cnt": 2,
                    "is_liked": false,
                    "created_at": "2023-01-01T00:00:10Z"
                }
            ]
        }
    ]

    commentLoading.value = false

    /* if (commentList.value.length >= data.pagination.total) {
        finished.value = true
    } */
}

const onRefresh = () => {
    // 清空列表数据
    commentList.value = []
    commentFinished.value = false

    // 重新加载数据
    // 将 loading 设置为 true，表示处于加载状态
    commentLoading.value = true
    onLoad()
}

const like = async () => {
    if (post.value.user_actions.is_liked) {
        const { data: data } = await cancelLikePost(postId)
        post.value.user_actions.is_liked = false
        post.value.stats.like_cnt = data.like_cnt
    } else {
        const { data: data } = await likePost(postId)
        post.value.user_actions.is_liked = true
        post.value.stats.like_cnt = data.like_cnt
    }
}

const collect = async () => {
    if (post.value.user_actions.is_favorited) {
        await cancelCollectPost(postId)
        post.value.user_actions.is_favorited = false
    } else {
        await collectPost(postId)
        post.value.user_actions.is_favorited = true
    }
}

const share = async () => {
    const { data: data } = await sharePost(postId)
    post.value.stats.share_cnt = data.share_cnt
}

// 根据id查找comment
const findCommentById = (commentId) => {
    return commentList.value.find(comment => comment.id === commentId)
}
const likeComments = async (commentId, is_liked) => {
    const comment = findCommentById(commentId)
    if (is_liked) {
        const { data: { data } } = await cancelLikeComment(commentId)
        comment.is_liked = false
        comment.like_cnt = data.like_cnt
    } else {
        const { data: { data } } = await likeComment(commentId)
        comment.is_liked = true
        comment.like_cnt = data.like_cnt
    }
}

// 正式
/* const friendsList = ref([])

onMounted(async () => {
    const { data: { data } } = await getFriendsList({ page: 0, size: 0, status: 'ACCEPTED' })
    friendsList.value = data.list
}) */

// 测试
const friendsList = ref([
    {
        "id": 1,
        "friend_id": 1002,
        "friend": {
            "id": 1002,
            "nickname": "好友昵称",
            "avatar_url": "",
            "campus_name": "北京大学"
        },
        "status": "ACCEPTED",
        "created_at": "2023-01-01T00:00:00Z"
    },
    {
        "id": 2,
        "friend_id": 1003,
        "friend": {
            "id": 1002,
            "nickname": "好友昵称",
            "avatar_url": "",
            "campus_name": "北京大学"
        },
        "status": "ACCEPTED",
        "created_at": "2023-01-01T00:00:00Z"
    },
    {
        "id": 3,
        "friend_id": 1004,
        "friend": {
            "id": 1002,
            "nickname": "好友昵称",
            "avatar_url": "",
            "campus_name": "北京大学"
        },
        "status": "ACCEPTED",
        "created_at": "2023-01-01T00:00:00Z"
    },
    {
        "id": 4,
        "friend_id": 1005,
        "friend": {
            "id": 1002,
            "nickname": "好友昵称",
            "avatar_url": "",
            "campus_name": "北京大学"
        },
        "status": "ACCEPTED",
        "created_at": "2023-01-01T00:00:00Z"
    },
    {
        "id": 5,
        "friend_id": 1006,
        "friend": {
            "id": 1002,
            "nickname": "好友昵称",
            "avatar_url": "",
            "campus_name": "北京大学"
        },
        "status": "ACCEPTED",
        "created_at": "2023-01-01T00:00:00Z"
    },
    {
        "id": 6,
        "friend_id": 1007,
        "friend": {
            "id": 1002,
            "nickname": "好友昵称",
            "avatar_url": "",
            "campus_name": "北京大学"
        },
        "status": "ACCEPTED",
        "created_at": "2023-01-01T00:00:00Z"
    }
])

const atFlag = ref(false)

const commentContent = ref('')
const atUsersFlag = ref(new Map())
const atUsers = ref([])

const commentInput = ref(null)

// 处理输入框获得焦点
const handleInputFocus = () => {
    // 确保输入框获得焦点
    if (commentInput.value) {
        commentInput.value.focus()

        // 将输入框往上顶
        scrollToInput()
    }
}

// 处理输入框失去焦点
const handleInputBlur = () => {
    // 可以在这里添加额外的逻辑
}

// 处理 @ 按钮点击
const handleAtClick = () => {
    atFlag.value = !atFlag.value

    // 如果是打开列表，则让输入框获得焦点
    if (atFlag.value) {
        if (commentInput.value) {
            commentInput.value.focus()

            // 将光标移动到文本末尾
            const range = document.createRange()
            const selection = window.getSelection()
            range.selectNodeContents(commentInput.value)
            range.collapse(false)
            selection.removeAllRanges()
            selection.addRange(range)
        }
    }
}

const atOrNotAt = (at_id) => {
    const currentValue = atUsersFlag.value.get(at_id) || false
    atUsersFlag.value.set(at_id, !currentValue)
    atUsers.value = [...atUsersFlag.value.entries()]
        .filter(([key, value]) => value)
        .map(([key]) => key)
}

const currentReplyTo = ref(null)
const setReplyTo = (parent_id) => {
    currentReplyTo.value = parent_id
}
// 处理评论的评论按钮点击
const secondComment = (parent_id) => {
    // 设置parent_id 通过这个来标识是评论的评论还是评论帖子
    setReplyTo(parent_id)

    // 点击评论按钮时，让输入框获得焦点
    if (commentInput.value) {
        commentInput.value.focus()

        // 将输入框往上顶
        scrollToInput()
    }
}

// 将输入框往上顶的函数
const scrollToInput = () => {
    // 获取当前页面的滚动位置
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    // 获取输入框的位置
    const inputRect = commentInput.value.getBoundingClientRect()
    const inputTop = inputRect.top + scrollTop

    // 计算需要滚动的距离
    const viewportHeight = window.innerHeight
    const scrollDistance = inputTop - (viewportHeight * 0.8) // 调整偏移量

    // 平滑滚动到输入框位置
    window.scrollTo({
        top: scrollDistance,
        behavior: 'smooth'
    })
}

// 同时处理评论帖子和用户
const publish = async () => {
    // 检查是否有回复目标
    const isReply = currentReplyTo.value !== null

    if (isReply) {
        // 二级评论
        const { data: { data } } = await publishComment(postId, {
            content: commentContent.value,
            parent_id: currentReplyTo.value,
            at_users: atUsers.value
        })
        commentList.value.replies.push(data)
        commentContent.value = ''
        atUsers.value = []
    } else {
        // 一级评论
        const { data: { data } } = await publishComment(postId, {
            content: commentContent.value,
            parent_id: 0,
            at_users: atUsers.value
        })
        commentList.value.push(data)
        commentContent.value = ''
        atUsers.value = []
    }
}

const deleteUserComment = async (commentId) => {
    await deleteComment(commentId)
    commentList.value.splice(commentList.value.findIndex(comment => comment.id === commentId), 1)
}

</script>

<template>
    <van-nav-bar title="帖子详情" left-arrow @click-left="$router.back()" fixed />

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <div class="post">
            <div class="user-info">
                <div class="avatar">
                    <van-image :src="post.user.avatar_url || defaultAvatar" class="avatar-image" />
                </div>
                <div class="nickname-time">
                    <div class="nickname">{{ post.user.nickname }}</div>
                    <div class="time">
                        <span class="time-text">{{ timeAgo(post.created_at) }}</span>
                    </div>
                </div>

                <div class="view-cnt" v-if="post.stats.view_cnt">
                    <van-icon name="eye-o" class="view-icon" />
                    <span class="view-cnt-text">{{ post.stats.view_cnt }}</span>
                </div>
            </div>

            <div class="container">
                <div class="content">
                    {{ post.content }}
                </div>

                <div class="topics">
                    <div class="topic-scroll-container">
                        <div class="topic-scroll-wrapper">
                            <div v-for="item in post.topics" :key="item.id" class="topic-item">
                                <div class="topic-name">{{ item.name }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="files">
                    <div class="file-scroll-container">
                        <div class="file-scroll-wrapper">
                            <div v-for="item in post.files" :key="item.id" class="file-item">
                                <van-image class="file-image" :src="item.file_url" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="location" v-if="post.poi_name">
                    <van-icon name="location-o" />
                    <div class="location-text">{{ post.poi_name }}</div>
                </div>

                <div class="function">
                    <div class="like-comment">
                        <div class="likes" @click="like()">
                            <div class="text">
                                <van-icon name="good-job" v-if="post.user_actions.is_liked" />
                                <van-icon name="good-job-o" v-else />
                                <span class="likes-text" v-if="post.stats.like_cnt">{{ post.stats.like_cnt }}</span>
                            </div>
                        </div>

                        <div class="comment">
                            <div class="text">
                                <van-icon name="chat-o" />
                                <span class="comment-text" v-if="post.stats.comment_cnt">{{ post.stats.comment_cnt
                                }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="collection-share">
                        <div class="collection" @click="collect()">
                            <van-icon name="bookmark-o" v-if="!post.user_actions.is_favorited" />
                            <van-icon name="bookmark" v-else />
                        </div>

                        <div class="share" @click="share()">
                            <van-icon name="share-o" />
                            <span class="share-text" v-if="post.stats.share_cnt">{{ post.stats.share_cnt }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="comments">
            <div class="comment-header">
                <span class="comment-title">评论{{ post.stats.comment_cnt }}条</span>
            </div>

            <div class="inp">
                <div class="avatar-scroll-container" :class="{ 'show-at': atFlag }">
                    <div class="avatar-scroll-wrapper">
                        <div v-for="item in friendsList" :key="item.id" class="avatar-item"
                            @click="atOrNotAt(item.friend_id)">
                            <div class="select-style" :class="{ 'show-select': atUsersFlag.get(item.friend_id) }">
                                <van-icon name="success" color="#fb288e" class="select-icon" />
                            </div>
                            <van-image :src="item.friend.avatar_url || defaultAvatar" round />
                            <div class="avatar-name">{{ item.friend.nickname }}</div>
                        </div>
                    </div>
                </div>

                <div class="publish">
                    <div class="avatar">
                        <van-image :src="userStore.userInfo.avatar_url || defaultAvatar" class="avatar-image" />
                    </div>
                    <div class="publish-input">
                        <textarea v-model="commentContent" placeholder="善于结善缘，恶言伤人心" v-keyboard
                            @focus="handleInputFocus" @blur="handleInputBlur" ref="commentInput"></textarea>
                    </div>
                    <div class="publish-at">
                        <div @click="handleAtClick">@</div>
                    </div>

                    <div class="publish-button">
                        <van-button @click="publish">发布</van-button>
                    </div>
                </div>
            </div>


            <van-list v-model:loading="commentLoading" :finished="commentFinished" finished-text="没有更多了" @load="onLoad">
                <div class="comment-list" v-if="commentList">
                    <div v-for="comment in commentList" :key="comment.id" class="comment-item">
                        <div class="comment-user">
                            <van-image :src="comment.user.avatar_url || defaultAvatar" class="comment-avatar" />
                            <span class="comment-nickname">{{ comment.user.nickname }}</span>
                        </div>

                        <div class="comment-content">
                            {{ comment.content }}
                            <div v-if="comment.at_users">
                                @
                                <span v-for="user in comment.at_users" :key="user.id" class="comment-at-user">
                                    {{ user.nickname }}&nbsp;
                                </span>
                            </div>
                        </div>

                        <div class="comment-info">
                            <div class="comment-time">
                                {{ timeAgo(comment.created_at) }}
                            </div>

                            <div class="actions">
                                <div class="comment-user" @click="secondComment(comment.user.id)">
                                    评论
                                </div>
                                <div class="delete-comment" v-if="comment.user.id === userStore.userInfo.id">
                                    <van-icon name="delete-o" @click="deleteUserComment(comment.id)" />
                                </div>

                                <div class="comment-like" @click="likeComments(comment.id, comment.is_liked)">
                                    <van-icon name="good-job" v-if="comment.is_liked" />
                                    <van-icon name="good-job-o" v-else />
                                    <span class="text" v-if="comment.like_cnt">
                                        {{ comment.like_cnt }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="second-comment" v-if="comment.replies">
                            <div class="second-comment-line" v-for="reply in comment.replies">
                                <div class="comment-user">
                                    <van-image :src="reply.user.avatar_url || defaultAvatar" class="comment-avatar" />
                                    <span class="comment-nickname">{{ reply.user.nickname
                                    }}</span>
                                </div>

                                <div class="comment-content">
                                    {{ reply.content }} @
                                    <div v-if="reply.at_users">
                                        <span v-for="user in reply.at_users" :key="user.id" class="comment-at-user">
                                            {{ user.nickname }}&nbsp;
                                        </span>
                                    </div>
                                </div>

                                <div class="second-comment-info">
                                    <div class="comment-time">
                                        {{ timeAgo(reply.created_at) }}
                                    </div>

                                    <div class="actions">
                                        <div class="delete-comment" v-if="reply.user.id === userStore.userInfo.id">
                                            <van-icon name="delete-o"
                                                @click="deleteUserComment(comment.id, reply.id)"></van-icon>
                                        </div>

                                        <div class="comment-like"
                                            @click="likeComments(comment.id, reply.id, reply.is_liked)">
                                            <van-icon name="good-job" v-if="reply.is_liked" />
                                            <van-icon name="good-job-o" v-else />
                                            <span class="text" v-if="reply.like_cnt">
                                                {{ reply.like_cnt }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="no-comments">
                    暂无评论
                </div>
            </van-list>
        </div>
    </van-pull-refresh>
</template>

<style lang="less" scoped>
.post {
    margin-top: 60px;
    background-color: white;
    padding: 10px;
}

.user-info {
    background-color: white;
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

.container {
    margin-top: 10px;
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

.comments {
    margin-top: 10px;
    background-color: white;
}

.comment-header {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    font-size: 16px;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
    font-weight: 600;

    .comment-title {
        font-size: 16px;
    }
}

.comment-list {
    flex: 1;
    overflow-y: auto;
    padding: 10px 15px;
}

.comment-item {
    margin-bottom: 15px;
}

.comment-user {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
}

.comment-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
}

.comment-nickname {
    font-size: 14px;
    color: #666;
}

.comment-content {
    display: flex;
    font-size: 14px;
    margin-bottom: 5px;
}

.comment-time {
    font-size: 12px;
    color: #999;
}

.comment-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    .actions {
        display: flex;
        align-items: center;
        font-size: 12px;

        .comment-user {
            margin-top: 5px;
            margin-right: 10px;
        }
    }
}

.second-comment {
    margin-left: 30px;

    .second-comment-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }
}

.no-comments {
    text-align: center;
    padding: 20px;
    color: #999;
}

.publish {
    margin-left: 10px;
    margin-right: 10px;
    display: flex;
    align-items: center;

    .avatar-image {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .publish-input {
        margin-left: 10px;
        flex: 1;

        textarea {
            width: 100%;
            height: 30px;
            padding-top: 3px;
            margin-right: 10px;
            background-color: #f3f4f6;
            font-size: 14px;
            border: 1px solid #e5e5e5;
            border-radius: 15px;
            resize: none;
            outline: none;

            &:focus {
                border-color: #1989fa;
            }
        }
    }

    .publish-at {
        margin-left: 10px;
        width: 20px;
        height: 30px;
        font-size: 18px;
    }

    .publish-button {
        margin-left: 10px;
    }

    :deep(.van-button) {
        margin-bottom: 10px;
        height: 30px;
        border-radius: 30px;
    }

}

.avatar-scroll-container {
    display: none;
    width: 100%;
    // 这个属性，表示当内容宽度超过容器宽度时，自动显示水平滚动条
    overflow-x: auto;
    overflow-y: hidden;
    // 防止内容换行
    white-space: nowrap;
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

.avatar-scroll-wrapper {
    :deep(.van-image) {
        width: 40px;
        height: 40px;
    }

    display: inline-block;
}

.avatar-item {
    position: relative;
    height: 40px;
    display: inline-block;
    text-align: center;
    margin-right: 20px;

    &:last-child {
        margin-right: 0;
    }

    .avatar-name {
        font-size: 12px;
        color: #666;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

.show-at {
    display: block;
}

.select-style {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    z-index: 999;
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity .2s ease;

    .select-icon {
        font-size: 18px !important;
        margin-left: 1px;
    }

    &.show-select {
        opacity: 1;
    }
}
</style>
