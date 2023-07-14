import { defineStore } from "pinia"
import { ref } from "vue"
export const screenStore = defineStore('screen', () => {
    const isExpand = ref(true) // 是否收缩左侧菜单
    const refresh = ref(false) // 是否刷新
    const isFull = ref(false) // 是否全屏
    return {
        isExpand,
        refresh,
        isFull
    }
})