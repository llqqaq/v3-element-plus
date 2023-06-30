import type { App } from 'vue'
import MeIcon from '@/components/SvgIcon.vue'

const globalComponent = { MeIcon }
export default {
    install (app: App) {
        Object.keys(globalComponent).forEach(key => {
            app.component(key, globalComponent[key])
        })
    }
}