import { createRouter, createWebHistory } from 'vue-router'

//createRouter: 創建實例
// 配置路由模式
// 1. createWebHistory: 創建路由模式 (不帶#)
// 2. createWebHashHistory: 創建hash模式

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: []
})

export default router
