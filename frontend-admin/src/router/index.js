import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: '二维码生成器' }
  },
  {
    path: '/display',
    name: 'Display',
    component: () => import('@/views/DisplayView.vue'),
    meta: { title: '内容展示' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由守卫 - 设置页面标题
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '二维码生成器'
  next()
})

export default router
