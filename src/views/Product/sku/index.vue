<template>
    <div>
        <ChildComponent :propObject="parentObject" />
    </div>
</template>
  
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import ChildComponent from './ChildComponent.vue';

const parentObject = ref({
    key1: 'value1',
    key2: 'value2',
})
const pass = ref({
    name: 1
})
onMounted(() => {
    setTimeout(() => {
        updateParentObject()
    }, 1000)
})
function updateParentObject() {
    // 模拟父组件改变 parentObject 的过程
    console.log('updateParentObject')
    // parentObject.value = pass; // 会触发子组件的 watch
}
</script>
  