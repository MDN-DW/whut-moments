import { createRouter, createWebHistory } from 'vue-router'
import LoginIndex from '@/views/login/LoginIndex.vue'
import LayoutIndex from '@/views/layout/LayoutIndex.vue'
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
      childrem: [
        {
          path: ''
        }
      ]
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
