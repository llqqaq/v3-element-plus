<template>
    <div class="home">
        <router-link to="/login" >跳转</router-link><br>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'

</script>

<style lang='scss' scoped>
.home {
    height: 2000px;
}
a {
    position: fixed;
    top: 0;
    left: 0;
}
</style>