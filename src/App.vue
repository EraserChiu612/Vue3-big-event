<script setup>
import { RouterView } from 'vue-router'

const goList = () => {
  console.log('goList')
}

import { useUserStore } from '@/stores/index.js'

const userStore = useUserStore()
</script>

<template>
  <div>
    <hr />
    <router-view></router-view>
    <hr />
    <hr />
    <hr />
    <el-button>跳首頁</el-button>
    <el-button @click="goList">跳列表頁</el-button>

    <p>{{ userStore.token }}</p>
    <el-button @click="userStore.setToken('qwregdsvxdghbersg')">登入</el-button>
    <el-button @click="userStore.removeToken()">登出</el-button>
  </div>
</template>

<style lang="scss" scoped></style>
