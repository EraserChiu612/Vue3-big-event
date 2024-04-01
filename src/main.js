import { createApp } from 'vue'
import '@/assets/main.scss'
import pinia from '@/stores/index.js'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(pinia).use(router).mount('#app')
