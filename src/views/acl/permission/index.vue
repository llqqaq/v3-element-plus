<template>
    <el-table row-key="id" border :data="tableData" >
        <el-table-column label="名称" prop="name" show-overflow-tooltip></el-table-column>
        <el-table-column label="权限值" prop="code" show-overflow-tooltip></el-table-column>
        <el-table-column label="修改时间" prop="updateTime" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="250px">
            <template #default="{ row }">
                <el-button type="primary" size="small" :disabled="row.level === 4">{{ row.level === 3 ? '添加功能' : '添加菜单' }}</el-button>
                <el-button type="primary" size="small" :disabled="row.level === 1">编辑</el-button>
                <el-button type="primary" size="small" :disabled="row.level === 1">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import { reqPermission } from '@/api/acl/role'
const tableData = reactive([])
const getPermission = async () => {
    const result: any = await reqPermission()
    console.log(result)
    if (result.code === 200) {
        result.data.forEach((item: never) => tableData.push(item))
    }
}
onMounted(() => {
    getPermission()
})
</script>

<style lang='scss' scoped>

</style>