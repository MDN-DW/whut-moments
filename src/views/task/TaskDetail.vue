<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from "@/stores"
import { getTaskDetail, acceptTask } from '@/api/task'
import { onMounted, ref } from 'vue'
import defaultAvatar from '@/assets/image/default.png'

const router = useRouter()
const route = useRoute()

const handleShare = () => {
  // 分享任务的接口

}

const handleAck = async () => {
  // 确认接取任务的接口
  await acceptTask(form.task_id)
}



// 定义获取标签背景色和文字色的方法
const getTagColors = (index) => {
  // 背景色数组
  const bgColors = ['#fff8e9', '#fef6fb', '#f3f4f6'];
  // 文字色数组，比对应背景色更深
  const textColors = ['#fbc22c', '#fab7d6', '#a8afba'];
  index = index % bgColors.length;
  return {
    backgroundColor: bgColors[index],
    color: textColors[index],
    fontWeight: 'bold',
  }
}
/* 
const form = ref({
  task_id: '',
  nickname: 'xiaoyu',
  avatar_url: '',
  title: '校遇',
  content: '让校园的每一次遇见，都有意义',
  reward: '20元',
  location: '南湖校区',
  status: '',
  visibility: 'PUBLIC',
  expire_at: '2024-05-20',
  create_at: '2024-05-01',
  file_urls: [],
  tag_names: ['遇', '校', '校遇']
}) */

onMounted(async () => {
  const { data: { data } } = await getTaskDetail(route.params.id)
  form.value = {
    publisherId: data.publisher.id,
    taskId: data.id,
    nickName: data.publisher.nickName,
    avatarUrl: data.publisher.avatarUrl,
    title: data.title,
    content: data.content,
    reward: data.reward,
    location: data.location,
    status: data.status,
    visibility: data.visibility,
    expireAt: data.expireAt,
    createAt: data.createAt,
    fileUrls: data.files.map(file => file.fileUrl),
    tagNames: data.tags.map(tag => tag.tagName)
  }
})

</script>

<template>
  <van-nav-bar title="任务详情" left-arrow @click-left="router.back()" fixed />

  <div class="task">
    <div class="publisher-info">
      <!-- 发布者信息栏 -->
      <div class="avatar-and-name">
        <!-- 发布者信息 -->
        <!-- 头像 -->
        <img :src="form.avatarUrl || defaultAvatar" class="avatar-flex">

        <div class="shrink-0">
          <!-- 昵称 -->
          <span style="font-weight: bold;">{{ form.nickName }}</span>
        </div>
      </div>
      <div class="shrink-0">
        <!-- 私信咨询 -->
        <button @click="router.push({
          path: '/chat',
          query: {
            userId: form.publisherId,
            nickName: form.nickName,
            avatarUrl: form.avatarUrl
          }
        })" class="consult-btn">私信咨询</button>
      </div>
    </div>

    <div class="task-header">
      <!-- 任务头  -->
      <div class="tags-container">
        <!-- 遍历ans列表生成标签 -->
        <span v-for="(tagText, index) in form.tagNames" :key="index" class="tag" :style="getTagColors(index)">
          {{ tagText }}
        </span>
      </div>

      <div class="task-title">
        <!-- 任务标题 -->
        {{ form.title }}
      </div>

      <div class="task-info">
        <!-- 任务具体参数信息 -->
        <div class="info-item">
          <!-- 任务奖励：用 Vant Icon 代替 SVG -->
          <van-icon name="gold-coin" color="#FFC107" class="info-icon" />
          <div class="info-content">
            <div class="info-label">任务奖励</div>
            <div class="info-value">{{ form.reward }}</div>
          </div>
        </div>
        <div class="info-item">
          <!-- 开始时间：用 Vant Icon 代替 SVG -->
          <van-icon name="clock-o" color="#666" class="info-icon" />
          <div class="info-content">
            <div class="info-label">开始时间</div>
            <div class="info-value">{{ form.createAt }}</div>
          </div>
        </div>
        <!-- 活动地点：用 location-o 图标 -->
        <div class="info-item">
          <van-icon name="location-o" color="#666" class="info-icon" />
          <div class="info-content">
            <div class="info-label">活动地点</div>
            <div class="info-value">{{ form.location }}</div>
          </div>
        </div>
        <!-- 结束时间：用 people-o 图标 -->
        <div class="info-item">
          <van-icon name="clock-o" color="#f1b2c6" class="info-icon" />
          <div class="info-content">
            <div class="info-label">结束时间</div>
            <div class="info-value">{{ form.expireAt }}</div> <!-- 后续替换为真实数据 -->
          </div>
        </div>
      </div>
    </div>

    <div class="task-description">
      <!-- 任务描述 -->
      <div class="info-item">
        <!-- 任务奖励：用 Vant Icon 代替 SVG -->
        <van-icon name="description" color="#80aafa" class="info-icon" />
        <div class="info-label">任务详情</div>
      </div>

      <div>
        {{ form.content }}
      </div>
    </div>

    <div class="bottom-bar">
      <!-- 分享任务按钮：带图标 -->
      <button class="bottom-button share-button" @click="handleShare">
        <van-icon name="share" color="#666" class="button-icon" />
        分享任务
      </button>
      <!-- 立即报名按钮：带图标 -->
      <button class="bottom-button ack-button" @click="handleAck">
        <van-icon name="certificate" color="#fff" class="button-icon" />
        立即报名
      </button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.task {
  margin-top: 50px;
  height: 100vh;
  background-color: #fafafc;
  display: flex;
  flex-direction: column;
}

.publisher-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.consult-btn {
  position: absolute;
  top: 3%;
  right: 8px;
  background-color: transparent;
  border: none;
  color: #409eff;
  font-weight: bold;
  cursor: pointer;
  font-size: 10px;
}


.task-header {
  align-items: center;
  margin-top: 10px;
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.task-description {
  align-items: center;
  margin-top: 10px;
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  flex: 1;
}

.avatar-and-name {
  display: flex;
  align-items: center;
}

.avatar-flex {
  width: 40px;
  height: 40px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 8px;
}


.bottom-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.tags-container {
  display: flex;
  gap: 8px;
  align-items: center;
}


.tag {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 11px;
  text-align: center;
  cursor: pointer;
  margin-right: 8px;
}

.task-title {
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  color: #333;
}

.task-info {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 10px 0;
}

.info-item {
  display: flex;
  align-items: flex-start;
  width: calc(50% - 10px);
}

.info-icon {
  font-size: 20px;
  margin-right: 8px;
  margin-top: 2px;
}

.info-content {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 14px;
  color: #999;
  margin-bottom: 2px;
}

.info-value {
  font-size: 14px;
  color: #333;
}

.bottom-button {
  background-color: #f5f7fa;
  border: 1px solid #eaecef;
  color: #333;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.share-button {
  width: 60%;
  height: 80%;
}

.share-button .button-icon {
  color: #666;
  margin-right: 6px;
}

.ack-button {
  width: 40%;
  height: 80%;
  background-color: #1989fa;
  color: #fff;
  border: none;
}

.ack-button .button-icon {
  color: #fff;
  margin-right: 6px;
}
</style>
