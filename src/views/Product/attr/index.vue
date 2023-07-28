<template>
    <div>
        <select-component :disabled="selectDisabled" @change="change"></select-component>
        <table-component @setDisabled="setDisabled" :ids="passId" ></table-component>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, watch } from 'vue'
import SelectComponent from '@/components/SelectComponent.vue'
import TableComponent from './components/TableComponent.vue'
const passId = reactive<string[]>([])
const selectDisabled = ref(false)
const setDisabled = (disabled: boolean) => {
    selectDisabled.value = disabled
}
const change = (ids: string[]) => {
    passId.length = 0
    ids.forEach(id => passId.push(id))
}
</script>

<style lang='scss' scoped>
</style>