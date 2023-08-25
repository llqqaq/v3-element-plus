<template>
    <el-card>
        <div v-show="!scenes">
            <el-button class="add_spu_btn" type="primary" :disabled="props.ids[2] ? false : true" icon="Plus" size="small" @click="scenes = true">添加SPU</el-button>
            <el-table border :data="tableList">
                <el-table-column type="index" label="序号" align="center" width="70px"></el-table-column>
                <el-table-column label="SPU名称" prop="spuName"></el-table-column>
                <el-table-column label="SPU描述" prop="description"></el-table-column>
                <el-table-column label="操作" width="230px">
                  <template #default="{ row }">
                    <el-button type="primary" title="添加SKU" size='small' icon="Plus"></el-button>
                    <el-button type="warning" title="修改SKU" size='small' icon="Edit" @click="edit(row)"></el-button>
                    <el-button type="info" title="查看SKU" size='small' icon="Warning"></el-button>
                    <el-button type="danger" title="删除SKU" size='small' icon="Delete"></el-button>
                  </template>
                </el-table-column>
            </el-table>
            <el-pagination
                v-if="total"
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[3, 5, 7, 9]"
                small
                background
                layout=" prev, pager, next, jumper, ->, sizes, total"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="getSPUFn"
                />
        </div>
        <sku-component
          v-show="scenes"
          @cancel="scenes = false"
          :spuInfo="spuInfo"
          :category3Id="props.ids[2] ? props.ids[2] : 0"></sku-component>
    </el-card>
</template>

<script setup lang='ts'>
import { ref, reactive, watch } from 'vue'
import { getSPU } from '@/api/SKU'
import SkuComponent from './SKUComponent.vue'
const props = defineProps(['ids']);
const tableList = reactive([])
const currentPage = ref(1)
const pageSize = ref(9)
const total = ref(0)
const scenes = ref(false)
let spuInfo = reactive({})
const handleSizeChange = (val: number) => {
  currentPage.value = 1
  getSPUFn()
}

watch(props.ids , (newV) => {
  // 不存在三级分类
  if (!newV[2]) {
    return
  }
  getSPUFn()
})
const getSPUFn = async (page = 1) => {
  currentPage.value = page
  const result = await getSPU({
    page: currentPage.value,
    limit: pageSize.value,
    id: props.ids[2]
  })
  if (result.code === 200) {
    total.value = result.data.total
    tableList.length = 0
    result.data.records.forEach(item => {
      tableList.push(item)
    })
    console.log('tableList', tableList)
  }
}
const edit = row => {
  spuInfo = row
  scenes.value = true
}

</script>

<style lang='scss' scoped>
.el-card {
    margin-top: 10px;
    .add_spu_btn {
        margin-bottom: 10px;
    }
    .el-pagination {
        margin-top: 10px;
    }
}
</style>