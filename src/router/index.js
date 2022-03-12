import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index'

// 公开路由表
const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    component: Layout
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})

export default router
