import { defineStore } from 'pinia'
import { ref } from 'vue'

//用戶模塊 token setToken removeToken
export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }
    return {
      token,
      setToken,
      removeToken
    }
  },
  {
    // 設置持久化
    persist: true
  }
)
