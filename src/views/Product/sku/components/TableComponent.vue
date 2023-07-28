<template>
    <el-card>
        <div v-if="!scenes">
            <el-button class="add_spu_btn" type="primary" icon="Plus" size="small">添加SPU</el-button>
            <el-table border v-model="tableList">
                <el-table-column type="index" label="序号" align="center" width="70px"></el-table-column>
                <el-table-column label="SPU名称"></el-table-column>
                <el-table-column label="SPU描述"></el-table-column>
                <el-table-column label="操作"></el-table-column>
            </el-table>
            <el-pagination
                v-model:current-page="currentPage4"
                v-model:page-size="pageSize"
                :page-sizes="[3, 5, 7, 9]"
                small
                background
                layout=" prev, pager, next, jumper, ->, sizes, total"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                />
        </div>
        <div v-else>
            <el-form>
                <el-form-item label="SPU名称">
                    <el-input placeholder="请你输入SPU名称"></el-input>
                </el-form-item>
                <el-form-item label="SPU品牌">
                    <el-select class="m-2" placeholder="请你选择品牌">
                        <el-option
                        v-for="item in spuBrand"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="SPU描述">
                    <el-input
                        :rows="2"
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4 }"
                        placeholder="请你输入描述"
                    />
                </el-form-item>
                <el-form-item label="SPU照片">
                    <el-upload
                        v-model:file-list="fileList"
                        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                    >
                        <el-icon><Plus /></el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item label="SPU销售属性">
                    <el-input></el-input>
                </el-form-item>
            </el-form>
            <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
        </div>
    </el-card>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
const tableList = reactive([])
const currentPage4 = ref(4)
const pageSize = ref(9)
const total = ref(400)
const scenes = ref(true)
const spuBrand = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  }
]
const fileList = ref([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'plant-1.png',
    url: '/images/plant-1.png',
  },
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'plant-2.png',
    url: '/images/plant-2.png',
  },
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'figure-1.png',
    url: '/images/figure-1.png',
  },
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'figure-2.png',
    url: '/images/figure-2.png',
  }
])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const handleRemove= (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
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