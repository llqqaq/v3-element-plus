import type { App } from 'vue'
import MeIcon from '@/components/SvgIcon.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const globalComponent: any = { MeIcon }
export default {
    install (app: App) {
        // 注册全局组件
        Object.keys(globalComponent).forEach(key => {
            app.component(key, globalComponent[key])
        })
        // 注册全局字体图标组件
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
    }
}