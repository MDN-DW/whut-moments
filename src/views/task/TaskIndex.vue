<script setup>
import { getAllTaskTag, getTaskList, getMyTaskList, takeTask, collectTask, cancelCollectTask, publishTask } from "@/api/task"
import { ref, onMounted } from "vue"
import defaultAvatar from "@/assets/image/default.png"
import router from "@/router"

// 正式
/* const taskTags = ref([])
const selectedTagId = ref(null)
const page = ref(1)
const size = ref(10)
const taskList = ref([])

const getTasks = async (staus, keyword) => {
    const { data: { data } } = await getTaskList({ page: page.value, size: size.value, tag_id: selectedTagId.value, status: staus, keyword: keyword })
    taskList.value = data.list
}

onMounted(async () => {
    const { data: { data } } = await getAllTaskTag()
    taskTags.value = data.list
    selectedTagId.value = taskTags.value[0].id
    await getTasks('', '')
})


const selectTag = async (id) => {
    selectedTagId.value = id
    await getTasks('', '')
}
 */

const take = async (task_id) => {
    await takeTask(task_id)
    await getTasks('', '')
}

// 测试
const taskTags = ref([
    {
        "id": 1,
        "name": "全部",
        "category": "POST",
        "weight": 100,
        "is_hot": 1
    },
    {
        "id": 2,
        "name": "校园生活",
        "category": "POST",
        "weight": 100,
        "is_hot": 1
    },
    {
        "id": 3,
        "name": "校园生活",
        "category": "POST",
        "weight": 100,
        "is_hot": 1
    },
    {
        "id": 4,
        "name": "校园生活",
        "category": "POST",
        "weight": 100,
        "is_hot": 1
    },
    {
        "id": 5,
        "name": "校园生活",
        "category": "POST",
        "weight": 100,
        "is_hot": 1
    },
    {
        "id": 6,
        "name": "校园生活",
        "category": "POST",
        "weight": 100,
        "is_hot": 1
    },
    {
        "id": 7,
        "name": "校园生活",
        "category": "POST",
        "weight": 100,
        "is_hot": 1
    },
])
const selectedTagId = ref(taskTags.value[0].id)
const taskList = ref([
    {
        "id": 4001,
        "publisher": {
            "id": 1001,
            "nickname": "发布者昵称",
            "avatar_url": ""
        },
        "title": "帮我取快递",
        "content": "在东门快递站取一个大包裹，送到西区宿舍楼",
        "reward": 10.50,
        "status": "RECRUIT",
        "visibility": "PUBLIC",
        "expire_at": "2023-12-31T23:59:59Z",
        "created_at": "2023-01-01T00:00:00Z",
        "files": [
            {
                "id": 1001,
                "thumb_url": "https://cdn.example.com/task/1001_thumb.jpg"
            }
        ],
        "tags": [
            {
                "id": 5,
                "name": "跑腿"
            }
        ],
        "stats": {
            "view_cnt": 200,
            "order_cnt": 3
        },
        "user_actions": {
            "is_favorited": false
        }
    },
    {
        "id": 4001,
        "publisher": {
            "id": 1001,
            "nickname": "发布者昵称",
            "avatar_url": ""
        },
        "title": "帮我取快递",
        "content": "在东门快递站取一个大包裹，送到西区宿舍楼",
        "reward": 10.50,
        "status": "RECRUIT",
        "visibility": "PUBLIC",
        "expire_at": "2023-12-31T23:59:59Z",
        "created_at": "2023-01-01T00:00:00Z",
        "files": [
            {
                "id": 1001,
                "thumb_url": "https://cdn.example.com/task/1001_thumb.jpg"
            }
        ],
        "tags": [
            {
                "id": 5,
                "name": "跑腿"
            }
        ],
        "stats": {
            "view_cnt": 200,
            "order_cnt": 3
        },
        "user_actions": {
            "is_favorited": false
        }
    },
    {
        "id": 4001,
        "publisher": {
            "id": 1001,
            "nickname": "发布者昵称",
            "avatar_url": ""
        },
        "title": "帮我取快递",
        "content": "在东门快递站取一个大包裹，送到西区宿舍楼",
        "reward": 10.50,
        "status": "FINISH",
        "visibility": "PUBLIC",
        "expire_at": "2023-12-31T23:59:59Z",
        "created_at": "2023-01-01T00:00:00Z",
        "files": [
            {
                "id": 1001,
                "thumb_url": "https://cdn.example.com/task/1001_thumb.jpg"
            }
        ],
        "tags": [
            {
                "id": 5,
                "name": "跑腿"
            }
        ],
        "stats": {
            "view_cnt": 200,
            "order_cnt": 3
        },
        "user_actions": {
            "is_favorited": false
        }
    },
    {
        "id": 4001,
        "publisher": {
            "id": 1001,
            "nickname": "发布者昵称",
            "avatar_url": ""
        },
        "title": "帮我取快递",
        "content": "在东门快递站取一个大包裹，送到西区宿舍楼",
        "reward": 10.50,
        "status": "RECRUIT",
        "visibility": "PUBLIC",
        "expire_at": "2023-12-31T23:59:59Z",
        "created_at": "2023-01-01T00:00:00Z",
        "files": [
            {
                "id": 1001,
                "thumb_url": "https://cdn.example.com/task/1001_thumb.jpg"
            }
        ],
        "tags": [
            {
                "id": 5,
                "name": "跑腿"
            }
        ],
        "stats": {
            "view_cnt": 200,
            "order_cnt": 3
        },
        "user_actions": {
            "is_favorited": true
        }
    },
    {
        "id": 4001,
        "publisher": {
            "id": 1001,
            "nickname": "发布者昵称",
            "avatar_url": ""
        },
        "title": "帮我取快递",
        "content": "在东门快递站取一个大包裹，送到西区宿舍楼",
        "reward": 10.50,
        "status": "RECRUIT",
        "visibility": "PUBLIC",
        "expire_at": "2023-12-31T23:59:59Z",
        "created_at": "2023-01-01T00:00:00Z",
        "files": [
            {
                "id": 1001,
                "thumb_url": "https://cdn.example.com/task/1001_thumb.jpg"
            }
        ],
        "tags": [
            {
                "id": 5,
                "name": "跑腿"
            },
            {
                "id": 5,
                "name": "跑腿"
            }
        ],
        "stats": {
            "view_cnt": 200,
            "order_cnt": 3
        },
        "user_actions": {
            "is_favorited": false
        }
    }
])

const collectOrCancle = async (task_id, is_favorited) => {
    if (is_favorited) {
        await cancelCollectTask(task_id)
    } else {
        await collectTask(task_id)
    }
    await getTasks('', '')
}

</script>

<template>
    <van-nav-bar title="校园任务" fixed>
        <template #right>
            <van-button round class="publish-btn" color="#84b0ed" @click="router.push('/task/publish')">
                <van-icon name="plus" color="white" class="publish-icon" />
                发布
            </van-button>
        </template>
    </van-nav-bar>

    <div class="tag-scroll-container">
        <div class="tag-scroll-wrapper">
            <div v-for="item in taskTags" :key="item.id" class="tag-item"
                :class="{ 'tag-item-active': selectedTagId === item.id }" @click="selectTag(item.id)">
                <div class="tag-name">{{ item.name }}</div>
            </div>
        </div>
    </div>

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in taskList" :key="item.id" @click="router.push(`/task/detail/${item.id}`)">
                <div class="top">
                    <div class="tags">
                        <van-tag type="primary" class="tag" v-for="value in item.tags" :key="value.id" color="#fef6fb"
                            text-color="#f9b5df">
                            {{ value.name }}
                        </van-tag>
                    </div>
                    <div class="status">
                        <van-tag type="primary" v-if="item.status === 'RUNNING'">
                            进行中
                        </van-tag>
                        <van-tag type="primary" v-else-if="item.status === 'FINISH'">
                            已完成
                        </van-tag>
                        <van-tag type="primary" v-else-if="item.status === 'CLOSED'">
                            已关闭
                        </van-tag>
                        <van-tag type="primary" v-else-if="item.status === 'RECRUIT'">
                            招募中
                        </van-tag>
                        <van-tag type="primary" v-else-if="item.status === 'AUDITING'">
                            审核中
                        </van-tag>
                        <van-tag type="primary" v-else-if="item.status === 'ARBITRATED'">
                            审核未通过
                        </van-tag>
                    </div>
                </div>
                <div class="title">
                    {{ item.title }}
                </div>
                <div class="avatar-info">
                    <van-image v-if="item.publisher.avatar_url" :src="item.publisher.avatar_url" class="avatar-image" />
                    <van-image v-else :src="defaultAvatar" class="avatar-image" />
                    <div class="nickname">
                        {{ item.publisher.nickname || '匿名用户' }}
                    </div>
                </div>
                <div class="footer">
                    <div class="reward">
                        <van-icon name="bill" color="red" />
                        {{ item.reward }}
                    </div>
                    <div class="views">
                        <van-icon name="eye-o" />
                        {{ item.stats.view_cnt }}
                    </div>
                </div>
                <div class="btn">
                    <div class="get">
                        <van-button type="primary" class="get-btn" @click="take(item.id)"
                            v-if="item.status === 'RECRUIT'">
                            抢任务
                        </van-button>
                        <van-button type="primary" v-else disabled class="out">
                            已被人抢占
                        </van-button>
                        <van-button type="primary" class="collection-btn" color="#f3f4f6"
                            @click="collectOrCancle(item.id, item.user_actions.is_favorited)">
                            <van-icon name="star-o" color="black" v-if="!item.user_actions.is_favorited" />
                            <van-icon name="star" color="#f4dd0d" v-else />
                        </van-button>
                    </div>
                </div>
            </van-cell>
        </van-list>
    </van-pull-refresh>
</template>

<style lang="less" scoped>
:deep(.van-tag) {
    border-radius: 5px;
}

.top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;

    .tags {
        display: flex;

        .tag {
            margin-right: 5px;
        }
    }


}

.title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    color: black;
    text-align: left;
    padding-left: 0;
}

.avatar-info {
    display: flex;
    align-items: center;
    font-size: 16px;

    .avatar-image {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 8px;
    }
}

.footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    margin-top: 10px;
}

.btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;

    .get-btn,
    .collection-btn,
    .out {
        width: 250px;
        height: 35px;
        border-radius: 10px;
    }

    .collection-btn {
        width: 80px;
        margin-left: 8px;
    }

    .out {
        background-color: #f3f4f6;
        color: #666;
        border: none;
    }
}

.publish-btn {
    width: 70px;
    height: 30px;
    padding: 0;
    font-size: 14px;
    font-weight: bold;

    .publish-icon {
        font-size: 16px;
        font-weight: bold;
    }
}

.tag-scroll-container {
    width: 100%;
    // 这个属性，表示当内容宽度超过容器宽度时，自动显示水平滚动条
    overflow-x: auto;
    overflow-y: hidden;
    // 防止内容换行
    white-space: nowrap;
    padding: 10px 0;
    background-color: #fff;
    margin-top: 45px;

    // 隐藏WebKit浏览器（如Chrome、Safari）的滚动条
    &::-webkit-scrollbar {
        display: none;
    }

    // 隐藏IE/Edge浏览器的滚动条
    -ms-overflow-style: none;
    // 隐藏Firefox浏览器的滚动条
    scrollbar-width: none;
}

.tag-scroll-wrapper {
    :deep(.van-image) {
        width: 50px;
        height: 50px;
    }

    display: inline-block;
    padding: 0 15px;
}

.tag-item {
    display: inline-block;

    &:last-child {
        margin-right: 0;
    }

    .tag-name {
        width: 58px;
        height: 30px;
        margin-right: 10px;
        border-radius: 15px;
        text-align: center;
        line-height: 30px;
        font-size: 12px;
        margin-top: 5px;
        color: #666;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

.tag-item-active {

    .tag-name {
        background-color: #9ed2fd69;
        color: rgb(79, 181, 245);
        font-weight: bold;
    }
}
</style>