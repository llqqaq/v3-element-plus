<template>
    <router-view v-slot="{ Component }">
        <transition name="fade" appear>
            <component :is="Component" v-if="show" />
        </transition>
    </router-view>
</template>

<script setup lang='ts'>
import { watch, ref, nextTick } from 'vue'
import { screenStore } from '@/stores/screen'
const screen = screenStore()
const show = ref(true)
watch(() => screen.refresh, (newV) => {
    show.value = false // 销毁组件
    nextTick(() => {
        show.value = true // 重新创建组件
    })
})
</script>

<style lang='scss' scoped>
.fade-enter-from {
    opacity: 0;
}
.fade-enter-active {
    transition: all 1s;
}
.fade-enter-to {
    opacity: 1;
}
</style>