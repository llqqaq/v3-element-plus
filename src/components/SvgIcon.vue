<template>
    222
    <svg :style="style">
        <use :href="`#icon-${name}`" :fill="color"></use>
    </svg>
</template>

<script setup lang='ts'>
import { ref, reactive, defineProps } from 'vue'
type styleType = {
    width: string,
    height: string
}
withDefaults(defineProps<{
    name: string,
    color: string,
    style: styleType
}>(), {
    name: '',
    color: '',
    style: () => ({
        width: '',
        height: ''
    })
})
</script>

<style scoped>

</style>