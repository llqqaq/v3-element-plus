<template>
    <el-container>
        <el-aside :width="screen.isExpand ? '200px' : '60px'" v-show="!screen.isFull">
            <Logo></Logo>
            <el-scrollbar class="menu_container">
                <el-menu
                    router
                    background-color="#001529"
                    :collapse="!screen.isExpand"
                    text-color="#fff"
                    :default-active="defaultActive">
                    <MenuComponent :menuRoute="route"></MenuComponent>
                </el-menu>
            </el-scrollbar>
        </el-aside>
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-main>
                <Main></Main>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang='ts'>
import Logo from './components/logo.vue'
import MenuComponent from './components/MenuComponent.vue'
import Header from './components/Header.vue'
import Main from './components/main.vue'
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import { screenStore } from '@/stores/screen'
const screen = screenStore()
const router = useRoute()
const defaultActive = computed(() => {
    return router.path
})
const { route } = useUserStore()
</script>

<style lang='scss' scoped>
.el-container {
    height: 100%;

    .el-aside {
        background-color: $base-menu-background;
        display: flex;
        flex-direction: column;
        transition: width 0.2s;
        .menu_container {
            flex: 1;

            .el-menu {
                border: none;
            }
        }
    }

    .el-header {
        height: $base-tabbar-height;
        padding: 0;
    }
}</style>