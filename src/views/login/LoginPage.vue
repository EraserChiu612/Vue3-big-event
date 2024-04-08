<script setup>
import { userRegisterService, userLoginService } from '@/api/user.js'
import { User, Lock } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
const isRegister = ref(true)
const form = ref()

//整個用於提交的form數據對象
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})
//整個表單的校驗規則\
// 1.非空較驗 required: true  message: 消息提示  trigger: 校驗時機( blur 表示失去焦點時校驗 / change 時時較驗 )
// 2.長度較驗 min: 最小長度  max: 最大長度
// 3.正則較驗 pattern : 正則表達式
// 4.自定義較驗 validator: 自定義函數 (1) rule 當前較驗規則相關信息
// (2) value 所較驗的表單元素目前的表單值 (3) callback 無論成功還是失敗都需要callback回調 => callback() 表示較驗通過 callback(new Error('提示')) 表示較驗失敗

const rules = {
  username: [
    { required: true, message: '請輸入用戶名', trigger: 'blur' },
    { min: 5, max: 10, message: '長度必須在5到10位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密碼必須是6-15位的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '請再次輸入密碼', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密碼必須是6-15位的非空字符',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('兩次輸入的密碼不一致'))
        } else {
          callback() // 就算成功也需要callback
        }
      },
      trigger: 'blur'
    }
  ]
}

const register = async () => {
  //  註冊成功之前,先進行較驗 , 較驗成功 ->進行請求，較驗失敗 ->自動提示
  await form.value.validate()
  await userRegisterService(formModel.value)
  ElMessage.success('註冊成功')
  isRegister.value = false
}
const userStore = useUserStore()
const router = useRouter()

const login = async () => {
  await form.value.validate()
  const res = await userLoginService(formModel.value)
  userStore.setToken(res.data.token)
  ElMessage.success('登入成功')
  router.push('/')
}

// 切換登入/註冊頁面時,重置表單頁面
watch(isRegister, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})
</script>

<template>
  <!-- 結構
      el-row表示一行,一行分成24份 
      el-col表示一列,:span表示一行中佔幾份,:offset表示左偏移多少份
      el-form 整個表單組件
      el-form-item 表單的一行 (不互相影響)
      el-input 表單輸入框

      較驗
      1.el-form => :model = "ruleForm" 收集整個form的數據
      2.el-form-item => :rules = "rules" 綁定整個rules規則對象
      3.表單元素 => v-model = "ruleForm.xxx" 給表單元素,綁定form的子屬性
      4.el-form-item => prop配置生效的是哪個校驗規則 (和rule中的字段要對應)

  -->
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 註冊相關表單 -->
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
      >
        <el-form-item>
          <h1>註冊</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="請輸入用戶名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="請輸入密碼"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="formModel.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="請再次輸入密碼"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="register"
            class="button"
            type="primary"
            auto-insert-space
          >
            註冊
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>

      <!-- 登入相關表單 -->
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-else
      >
        <el-form-item>
          <h1>登入</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="請輸入用戶名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="請輸入密碼"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>記住我</el-checkbox>
            <el-link type="primary" :underline="false">忘記密碼？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="login"
            class="button"
            type="primary"
            auto-insert-space
            >登入</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            註冊 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background:
      url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
