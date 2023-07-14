<template>
    <span @click="$router.push('/login')">测试回login</span>
    <el-button icon="RefreshRight" circle @click="refresh" />
    <el-button icon="FullScreen" circle @click="fullScreen"/>
    <el-button icon="Setting" circle />
    <img :src="user.avatar" class="avatar" alt="">
    <el-dropdown
        :hide-on-click="false"
        @command="handleCommand">
        <span class="el-dropdown-link">
        {{ user.username }}
        <el-icon class="el-icon--right">
            <arrow-down />
        </el-icon>
        </span>
        <template #dropdown>
        <el-dropdown-menu>
            <el-dropdown-item command="signout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang='ts'>
import { screenStore } from '@/stores/screen'
import { ElMessageBox } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
const screen = screenStore()
const user = useUserStore()
const $router = useRouter()
const $route = useRoute()
// 刷新
const refresh = () => {
    screen.refresh = !screen.refresh
}
// 切换全屏
const fullScreen = () => {
    let full = document.fullscreenElement
    console.log('全屏', full)
    if (!full) {
        screen.isFull = true
        document.documentElement.requestFullscreen() // 全屏
    } else {
        screen.isFull = false
        document.exitFullscreen()   // 关闭全屏
    }
}
// 退出登录
const handleCommand = async (command: string) => {
    if (command === 'signout') {
        try {
            await ElMessageBox.confirm('确定退出?', '提示')
            user.userSignOut()
            $router.push(`/login?redirect=${$route.path}`)
            ElNotification.success('退出成功')
        } catch (error) {
            console.log(error)
        }
    }
}

</script>

<style lang='scss' scoped>
.avatar {
    width: 32px;
    height: 32px;
    margin: 0 10px;
    border-radius: 50%;
}
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>