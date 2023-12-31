import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import pinia from '@/store'
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')