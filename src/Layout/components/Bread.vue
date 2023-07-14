<template>
    <el-icon class="toggle_icon" @click="toggleExpand">
        <component :is="screen.isExpand ? 'expand' : 'fold'"></component>
    </el-icon>
    <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: item.path }" v-for="item in $route.matched" v-show="item.meta.title">
            <el-icon class="bread_icon">
                <component :is="item.meta.icon"></component>
            </el-icon>
            {{ item.meta.title }}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang='ts'>
import { ref, reactive, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { screenStore } from '@/stores/screen'

const screen = screenStore()
const $route = useRoute()

const toggleExpand = () => {
    screen.isExpand = !screen.isExpand
}

watch($route, (newV) => {
    console.log(newV.matched)
})


</script>

<style lang='scss' scoped>
.toggle_icon {
    margin-right: 10px;
    cursor: pointer;
}
.bread_icon {
    transform: translateY(1px);
}
</style>