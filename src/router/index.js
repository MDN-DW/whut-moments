import { createRouter, createWebHistory } from 'vue-router'
import LoginIndex from '@/views/login/LoginIndex.vue'
import LayoutIndex from '@/views/layout/LayoutIndex.vue'
import FriendsIndex from '@/views/friends/FriendsIndex.vue'
import { useUserStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: LoginIndex
    },
    {
      path: '/',
      component: LayoutIndex,
      redirect: '/friends',
      children: [
        {
          path: '/friends',
          component: FriendsIndex
        },
        {
          path: '/task',
          component: () => import('@/views/task/TaskIndex.vue')
        },
        {
          path: '/message',
          component: () => import('@/views/message/MessageIndex.vue')
        },
        {
          path: '/me',
          component: () => import('@/views/me/MeIndex.vue')
        }
      ]
    },
    {
      path: '/search',
      component: () => import('@/views/search/SearchIndex.vue')
    },
    {
      path: '/searchcontent',
      component: () => import('@/views/search/SearchContent.vue')
    },
    {
      path: '/searchuser',
      component: () => import('@/views/search/SearchUser.vue')
    },
    {
      path: '/mecontent',
      component: () => import('@/views/me/MeContent.vue')
    },
    {
      path: '/black',
      component: () => import('@/views/me/BlackIndex.vue')
    },
    {
      path: '/collection',
      component: () => import('@/views/me/CollectionIndex.vue')
    }
  ],
})

// 需要登录才可以访问的页面
const authPages = []

router.beforeEach((to) => {
  const userStore = useUserStore()
  if (!authPages.includes(to.path)) {
    return true
  }
  if (userStore.token) {
    return true
  }
  return '/login'
})

export default router
