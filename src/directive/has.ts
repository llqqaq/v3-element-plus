import type { App } from 'vue'
import { useUserStore } from '@/stores/user'
const user = useUserStore()
export default {
    install: (app: App) => {
        app.directive('has', (el, options) => {
            if (!user.btnPermission.includes(options.value)) {
                el.parentElement.removeChild(el)
            }
        })
    }
}
