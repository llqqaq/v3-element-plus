<script setup lang="ts">
import { onMounted } from 'vue'
import { reqLogin } from '@/api/user'
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
  DocumentAdd
} from '@element-plus/icons-vue'
let style = {
  width: '20px',
  height: '20px'
}
onMounted(() => {
  reqLogin({
    username: 'admin',
    password: '111111'
  }).then(res => console.log(res))
})
</script>

<template>
  <p>
    <span>223</span>
  </p>
  <el-button :icon="Search" circle />
  <el-button type="primary" :icon="Edit" circle />
  <el-button type="success" :icon="Check" circle />
  <el-button type="info" :icon="Message" circle />
  <el-button type="warning" :icon="Star" circle />
  <el-button type="danger" :icon="Delete" circle />
  <el-button type="danger" :icon="DocumentAdd" circle />
  <el-select class="m-2" placeholder="Select" size="large">
    <el-option
      label="item.label"
      value="item.value"
    />
  </el-select>
  <me-icon name="fans" color="red" :style="style"></me-icon>
</template>

<style scoped lang="scss">
p {
  span {
    color: $color;
  }
}
svg {
  width: 20px;
  height: 20px;
}
</style>
