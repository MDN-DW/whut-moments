import { createRouter, createWebHistory } from 'vue-router'
import LoginIndex from '@/views/login/LoginIndex.vue'
import LayoutIndex from '@/views/layout/LayoutIndex.vue'
import FriendsIndex from '@/views/friends/FriendsIndex.vue'
import { useUserStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // 登录
      path: '/login',
      component: LoginIndex
    },
    {
      // 首页架子
      path: '/',
      component: LayoutIndex,
      redirect: '/friends',
      children: [
        {
          // 朋友圈
          path: '/friends',
          component: FriendsIndex
        },
        {
          // 任务
          path: '/task',
          component: () => import('@/views/task/TaskIndex.vue')
        },
        {
          // 消息
          path: '/message',
          component: () => import('@/views/message/MessageIndex.vue')
        },
        {
          // 我的
          path: '/me',
          component: () => import('@/views/me/MeIndex.vue')
        }
      ]
    },
    {
      // 搜索
      path: '/search',
      component: () => import('@/views/search/SearchIndex.vue')
    },
    {
      // 帖子搜索页
      path: '/search/content',
      component: () => import('@/views/search/SearchContent.vue')
    },
    {
      // 用户搜索页
      path: '/search/user',
      component: () => import('@/views/search/SearchUser.vue')
    },
    {
      // 编辑用户信息
      path: '/me/content',
      component: () => import('@/views/me/MeContent.vue')
    },
    {
      // 黑名单
      path: '/black',
      component: () => import('@/views/me/BlackIndex.vue')
    },
    {
      // 我的收藏
      path: '/collection',
      component: () => import('@/views/me/CollectionIndex.vue')
    },
    {
      // 文章详情页
      path: '/article'
    },
    {
      // 任务详情页
      path: '/task/content'
    },
    {
      // 任务评价页
      path: '/task/rate'
    },
    {
      // 发朋友圈写内容页
      path: '/friends/content'
    },
    {
      // 我的朋友圈列表页
      path: '/friends/list'
    },
    {
      // 编辑朋友圈页
      path: '/friends/edit'
    },
    {
      // 主页访问页
      path: '/go/user'
    },
    {
      // 加好友申请信息页
      path: '/friends/apply'
    },
    {
      // 好友聊天页
      path: '/friends/chat'
    },
    {
      // 好友列表页
      path: '/partner/list'
    },
    {
      // 我的帖子页
      path: '/posts/list',
      component: () => import('@/views/me/PostList.vue')
    },
    {
      // 我的喜欢页
      path: '/likes',
      component: () => import('@/views/me/LikesList.vue')
    },
    {
      // 搜索好友页
      path: '/search/partner',
      component: () => import('@/views/search/SearchPartner.vue')
    },
    {
      // 发布任务和编辑任务
      path: '/task/publish/:id?',
      component: () => import('@/views/task/PublishTask.vue')
    }
  ],
})

// 需要登录才可以访问的页面
/* const authPages = ['/task/rate', '/friends/content', '/friends/list', '/friends/edit', '/go/user', '/friends/apply', '/friends/chat', '/black']

router.beforeEach((to) => {
  const userStore = useUserStore()
  if (!authPages.includes(to.path)) {
    return true
  }
  if (userStore.token) {
    return true
  }
  return '/login'
}) */

export default router
