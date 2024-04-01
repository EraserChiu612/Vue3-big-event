import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  // TODO 1. 基礎位置,超時時間
  baseURL,
  timeout: 10000
})

// 請求攔截器
instance.interceptors.request.use(
  (config) => {
    // TODO 2. 攜帶token
    const useStore = useUserStore()
    if (useStore.token) {
      config.headers.Authorization = useStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 響應攔截器
instance.interceptors.response.use(
  (res) => {
    // TODO 4. 獲取響應數據
    if (res.data.code === 0) {
      return res
    }
    // TODO 3. 處理業務失败
    //處理業務失敗,給錯誤提示,拋出錯誤
    ElMessage.error(res.data.message || '服務異常')
    return Promise.reject(res.data)
  },

  (err) => {
    // TODO 5. 處理401錯誤
    // 錯誤特殊情況處理 => 401權限不足 或 token過期 => 跳轉登入頁
    if (err.response?.status === 401) {
      router.push('/login')
    }

    // 錯誤默認提示 => 只給提示
    ElMessage.error(err.response.data.message || '服務異常')
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
