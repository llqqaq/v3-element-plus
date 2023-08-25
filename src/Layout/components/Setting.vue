<template>
    <el-button icon="RefreshRight" circle @click="refresh" />
    <el-button icon="FullScreen" circle @click="fullScreen"/>
    <el-popover
        placement="bottom"
        title="主题设置"
        :width="200"
        trigger="hover"
    >
        <el-form>
            <el-form-item label="主题颜色">
                <el-color-picker v-model="color" @change="colorChange" size="small" show-alpha :predefine="predefineColors" />
            </el-form-item>
            <el-form-item label="暗黑模式">
                <el-switch
                    v-model="switchValue"
                    class="mt-2"
                    inline-prompt
                    active-icon="Sunny"
                    inactive-icon="Moon"
                    size="small"
                    @change="switchChange"
                />
            </el-form-item>
        </el-form>
        <template #reference>
            <el-button icon="Setting" circle />
        </template>
  </el-popover>
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
import { ref } from 'vue'
import { screenStore } from '@/stores/screen'
import { ElMessageBox } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
const screen = screenStore()
const user = useUserStore()
const $router = useRouter()
const $route = useRoute()
const color = ref('rgba(64, 158, 255, 0.68)')
const switchValue = ref(true)
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
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
            await user.userSignOut() 
            $router.push(`/login?redirect=${$route.path}`)
            ElNotification.success('退出成功')
        } catch (error) {
            console.log(error)
        }
    }
}
const switchChange = (value: boolean) => {
     let html = document.documentElement
     html.classList.toggle('dark')
}
const colorChange = () => {
    const el = document.documentElement
    el.style.setProperty('--el-color-primary', color.value)
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