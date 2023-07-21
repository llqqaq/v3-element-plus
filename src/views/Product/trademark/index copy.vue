<template>
    <div>
        <el-card class="box-card">
            <el-button type="primary" class="add_brand" @click="dialogVisible = true" icon="Plus">
                添加品牌
            </el-button>
            <!-- table -->
            <el-table :data="brandListData" border style="width: 100%">
                <el-table-column type="index" label="序号" width="60" align="center" />
                <el-table-column label="品牌名称">
                    <template #="{ row }">
                        <span class="brand_name">{{ row.tmName }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="品牌LOGO" align="center">
                    <template #default="scope">
                        <img width="80" :src="scope.row.logoUrl" alt=" ">
                    </template>
                </el-table-column>>
                <el-table-column fixed="right" label="品牌操作">
                    <template #default="scope">
                        <el-button type="warning" icon="Edit" size="small" @click="updateItem(scope.row)" />
                        <el-button type="danger" icon="Delete" size="small" @click="deleteItem(scope.row.id)" />
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination background v-model:current-page="currentPage" v-model:page-size="pageSize"
                :page-sizes="[3, 5, 7, 9]" small layout="prev, pager, next, jumper, ->, sizes, total" :total="total"
                @size-change="handleSizeChange" @current-change="getBrand" />
        </el-card>
        <!-- 弹窗 -->
        <el-dialog v-model="dialogVisible" title="添加品牌" width="50%" @close="dialogClose">
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm"
                status-icon>
                <el-form-item label="品牌名称" prop="brandName">
                    <el-input v-model="ruleForm.brandName" placeholder="请你输入品牌名字" />
                </el-form-item>
                <el-form-item label="品牌LOGO" prop="img">
                    <el-upload class="avatar-uploader"
                        action="#"
                        accept=".png, .jepg, .jep"
                        :http-request="imgUpload"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancel">取消</el-button>
                    <el-button type="primary" @click="comfirm">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { getBrandList, deleteBrand, updateOrSaveBrand, uploadImage } from '@/api/goods'
import axios from 'axios'
import type { ListItem } from '@/api/goods/type'
const imageUrl = ref('')
const currentPage = ref(1)
const pageSize = ref(5)
const total = ref(0)
const dialogVisible = ref(false)
const fileList = ref([])
const updateId = ref(0)
const isUpdae = ref(false)
const ruleFormRef = ref()
// 使用reactive声明的数组，直接赋值会失去响应式
let brandListData = reactive<ListItem[]>([])
const rules = reactive({
    brandName: [
        { required: true, message: '不能为空', trigger: 'blur' }
    ],
    img: [
        { required: true, message: 'LOGO不能为空', trigger: 'blur' }
    ]
})
const ruleForm = reactive({
    brandName: '',
    img: ''
})
const deleteItem = async (id: number) => {
    console.log(id)
    try {
        await ElMessageBox.confirm('确定删除?', '提示')
        const result = await deleteBrand(id)
        console.log(result)
        if (result.code === 200) {
            ElMessage({
                showClose: true,
                message: '删除成功!',
                type: 'success',
            })
            getBrand()
        } else {
            ElMessage({
                showClose: true,
                message: result.data,
                type: 'error',
            })
        }
    } catch (error) { }
}
const handleSizeChange = (val: number) => {
    currentPage.value = 1
    getBrand()
}
const getBrand = async () => {
    const result = await getBrandList({
        page: currentPage.value,
        limit: pageSize.value
    })
    console.log(result)
    if (result.code === 200) {
        total.value = result.data.total
        brandListData.length = 0
        result.data.records.forEach(item => brandListData.push(item))
    }
}
const dialogClose = () => {
    ruleForm.brandName = ''
    imageUrl.value = ''
}
const comfirm = async () => {
    
    // update
    if (isUpdae.value) {
        const result = await updateOrSaveBrand({
            id: updateId.value,
            logoUrl: imageUrl.value,
            tmName: ruleForm.brandName
        })
        if (result.code === 200) {
            imageUrl.value = ''
            ruleForm.brandName = ''
            getBrand()
            ElMessage({
                showClose: true,
                message: '修改成功'
            })
            return
        }
        ElMessage({
            showClose: true,
            message: result.message,
            type: 'error'
        })
        dialogVisible.value = false
    } else {
        ruleFormRef.value.validate(async (valid: boolean) => {
            if (valid) {
                console.log('可以上传')
                const result = await updateOrSaveBrand({
                    tmName: ruleForm.brandName,
                    logoUrl: imageUrl.value
                })
                console.log(result)
                if (result.code === 200) {
                    ElMessage({
                        showClose: true,
                        message: '添加成功！'
                    })
                    getBrand()
                    dialogVisible.value = false
                }
            }
        })
    }

    
}
const cancel = () => {
    console.log('cancel')
    dialogVisible.value = false
}
// 自定义上传logo
const imgUpload = async (data: any) => {
    // 封装FormData对象
    var formData = new FormData()
    formData.append("file", data.file)
    console.log("formData",formData)
    const result = await uploadImage(formData)
    return result
}
// 修改品牌数据
const updateItem = async (info: ListItem) => {
    dialogVisible.value = true
    isUpdae.value = true
    updateId.value = info.id as number
    ruleForm.brandName = info.tmName
    imageUrl.value = info.logoUrl
}
const handleAvatarSuccess = (response, uploadFile) => {
    console.log(response, uploadFile)
    imageUrl.value = response.data
    ruleForm.img = response.data
}

const beforeAvatarUpload = (rawFile) => {
    return true
}
onMounted(() => {
    getBrand()
})
</script>

<style lang='scss' scoped>
.add_brand {
    .el-icon {
        margin-right: 5px;
    }
}

.el-table {
    margin-top: 20px;

    .brand_name {
        color: rgb(231, 151, 151);
    }
}

.el-pagination {
    margin-top: 10px;
}

.el-dialog {
    .el-form {
        .el-form-item {
            :deep(.el-upload) {
                border: 1px dashed var(--el-border-color);
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
                transition: var(--el-transition-duration-fast);
            }

            :deep(.el-upload:hover) {
                border-color: var(--el-color-primary);
            }

            :deep(.el-icon.avatar-uploader-icon) {
                font-size: 28px;
                color: #8c939d;
                width: 178px;
                height: 178px;
                text-align: center;
            }
            :deep(.avatar) {
                max-width: 200px;
            }
        }
    }
}


</style>