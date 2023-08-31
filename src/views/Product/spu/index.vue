<template>
    <div>
        <select-component :disabled="selectDisabled" @change="change"></select-component>
        <table-component :ids="passId"></table-component>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'

import SelectComponent from '@/components/SelectComponent.vue'
import TableComponent from './components/TableComponent.vue'

const passId = reactive<string[]>([])
const selectDisabled = ref(false)
const change = (ids: string[]) => {
    passId.length = 0
    ids.forEach(id => passId.push(id))
}
</script>

<style lang='scss' scoped>

</style>