<template>
    <div>
      <p>{{ propObject }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { watch, ref } from 'vue';
  
  const props = defineProps(['propObject']);
  

  
  watch(
    () => props.propObject,
    (newValue, oldValue) => {
      // 在这里处理 propObject 变化的逻辑
      console.log('propObject changed:', newValue);
    },
    { deep: true } // 监听对象内部属性的变化
  );
  </script>
  