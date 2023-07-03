import { createRouter, createWebHistory } from 'vue-router'
import { constantRoute } from './routes'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoute,
  // 切换路由时 滚动到响应的位置
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})

export default router
