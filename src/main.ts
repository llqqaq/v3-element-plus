

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// @ts-ignores
import zhCn from 'element-plus/dist/locale/zh-cn.mjs' // 配置国际化

import App from './App.vue'
import router from './router'

import 'virtual:svg-icons-register'  // svg插件脚本
import globalComponent from '@/utils/plugins'

import '@/styles/index.scss'
const app = createApp(App)

app.use(globalComponent)
app.use(createPinia())
app.use(router)
app.use(ElementPlus, {
    locale: zhCn
})
app.mount('#app')
