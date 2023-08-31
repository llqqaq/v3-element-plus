<template>
    <div>
        <el-card class="box-card">
            <el-button type="primary" class="add_brand" @click="addBrand" icon="Plus">
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
        <el-dialog v-model="dialogVisible" :title="!ruleForm.id ? '添加品牌' : '编辑品牌'" width="50%" @close="dialogClose">
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
                        <img v-if="ruleForm.img" :src="ruleForm.img" class="avatar" />
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
import type { ListItem } from '@/api/goods/type'
const currentPage = ref(1)
const pageSize = ref(5)
const total = ref(0)
const dialogVisible = ref(false)
const ruleFormRef = ref()
// 使用reactive声明的数组，直接赋值会失去响应式
let brandListData = reactive<ListItem[]>([])
const rules = reactive({
    brandName: [
        { required: true, message: '不能为空', trigger: 'blur' }
    ],
    img: [
        { required: true, message: 'LOGO不能为空' }
    ]
})
const ruleForm = reactive({
    id: 0,
    brandName: '',
    img: ''
})
const deleteItem = async (id: number) => {
    try {
        await ElMessageBox.confirm('确定删除?', '提示')
        const result = await deleteBrand(id)
        if (result.code === 200) {
            ElMessage({
                showClose: true,
                message: '删除成功!',
                type: 'success',
            })
            // 当前页面只有一条
            if (brandListData.length === 1 && currentPage.value !== 1) currentPage.value--
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
    // 关闭弹窗后移除校验
    ruleFormRef.value.resetFields()
}
const addBrand = () => {
    dialogVisible.value = true
    ruleForm.id = 0
    ruleForm.brandName = ''
    ruleForm.img = ''
}
const comfirm = async () => {
    try {
        // 校验
        await ruleFormRef.value.validate()
        // 上传
        const result = await updateOrSaveBrand({
            id: ruleForm.id,
            tmName: ruleForm.brandName,
            logoUrl: ruleForm.img
        })
        console.log(result)
        if (result.code === 200) {
            ElMessage({
                showClose: true,
                message: ruleForm.id ? '修改成功' : '添加成功',
                type: 'success',
            })
            dialogVisible.value = false
            getBrand()
        } else {
            ElMessage({
                showClose: true,
                message: ruleForm.id ? '修改失败' : '添加失败',
                type: 'error',
            })
        }
    } catch (error) {}
}
const cancel = () => {
    dialogVisible.value = false
}
// 自定义上传logo
const imgUpload = async (data: any) => {
    const fd = new FormData()
    fd.append('file', data.file)
    fd.append('filename', data.filename)
    try {
        const result: any = await uploadImage(fd)
        if (result.code === 200) {
            // 清除图片的校验
            ruleFormRef.value.clearValidate('img')
            return result.data
        }
        return Promise.reject('Error: image upload failed')
    } catch (error) {
        return Promise.reject('Error: image upload failed')
    }
}
// 修改品牌数据
const updateItem = async (info: ListItem) => {
    console.log(info)
    ruleForm.img = info.logoUrl
    ruleForm.brandName = info.tmName
    ruleForm.id = info.id as number
    dialogVisible.value = true
}
const handleAvatarSuccess = (response: any, uploadFile: any) => {
    ruleForm.img = response
}

const beforeAvatarUpload = (rawFile: any) => {
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