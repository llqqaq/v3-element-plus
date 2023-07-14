<template>
    <div class="header_container">
        <div class="header_l">
            <bread></bread>
        </div>
        <div class="header_r">
            <setting></setting>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import Bread from './Bread.vue'
import Setting from './Setting.vue'
</script>

<style lang='scss' scoped>
.header_container {
    padding: 0 20px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-image: linear-gradient(to right, rgb(202, 192, 192), rgb(192, 163, 163), #c1aaaa);
    .header_l, .header_r {
        display: flex;
        align-items: center;
    }
}
</style>