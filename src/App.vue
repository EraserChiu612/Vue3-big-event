<script setup>
const goList = () => {
  console.log('goList')
}

import { useUserStore } from '@/stores/index.js'

const userStore = useUserStore()
</script>

<template>
  <div>我是app</div>
  <el-button>跳首頁</el-button>
  <el-button @click="goList">跳列表頁</el-button>

  <p>{{ userStore.token }}</p>
  <el-button @click="userStore.setToken('qwregdsvxdghbersg')">登入</el-button>
  <el-button @click="userStore.removeToken()">登出</el-button>
</template>

<style lang="scss" scoped></style>
