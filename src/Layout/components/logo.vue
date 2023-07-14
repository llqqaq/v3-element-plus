<template>
    <div class="logo_box" v-if="setting.logoHidden">
        <img :src="setting.logo" :class="['logo', { small: !screen.isExpand }]" alt="">
        <transition name="slide">
            <span v-if="screen.isExpand" class="title">{{ setting.title }}</span>
        </transition>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import setting from '@/setting'
import { screenStore } from '@/stores/screen'
const screen = screenStore()
</script>

<style lang='scss' scoped>
.logo_box {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 5px;
    .logo {
        width: 40px;
        height: 40px;
        margin-right: 8px;
        &.small {
            transition: all .3s;
            width: 20px;
            height: 20px;
            margin-right: 0px;
            margin-left: 5px;
        }
    }
    .title {
        font-size: 18px;
        color: #fff;
        font-weight: bold;
        white-space: nowrap;
        &.slide-enter, &.slide-leave-to  {
            transform: translateX(100px);
        }
        &.slide-enter-to, &.slide-leave-active {
            transition: all .01s;
        }
    }
}
</style>