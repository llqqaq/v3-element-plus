<template>
    <div>
        <el-form :model="form">
            <el-form-item label="SPU名称">
                <el-input placeholder="请你输入SPU名称" v-model="form.spuName"></el-input>
            </el-form-item>
            <el-form-item label="SPU品牌">
                <el-select v-model="form.tmId" class="m-2" placeholder="请你选择品牌">
                    <el-option v-for="item in spuBrand" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述">
                <el-input v-model="form.description" :rows="2" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="请你输入描述" />
            </el-form-item>
            <el-form-item label="SPU照片">
                <el-upload
                    v-model:file-list="fileList"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    accept=".png, .jepg, .jep"
                    :http-request="imgUpload">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="SPU销售属性">
                <el-select size="small" :placeholder="lastSpuSaleAttr.length ? '请你选择品牌' : '无数据'">
                    <el-option v-for="item in lastSpuSaleAttr" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-button class="add_sale_attr" size="small" type="primary" :disabled="true" icon="Plus">添加销售属性</el-button>
                <el-table border class="add_sale_table" :data="form.saleAttr">
                    <el-table-column type="index" width="70px" label="序号" align="center"></el-table-column>
                    <el-table-column label="属性名" prop="saleAttrName"></el-table-column>
                    <el-table-column label="属性值">
                        <template #default="{ row }">
                            <el-tag
                                style="margin-right: 5px; margin-bottom: 5px;"
                                closable v-for="(item, index) in row.spuSaleAttrValueList"
                                @close="handleClose(row.spuSaleAttrValueList, index)">{{ item.saleAttrValueName }}</el-tag>
                                <el-input
                                    style="width: 100px;"
                                    v-if="row.inputShow"
                                    v-model="tagValue"
                                    ref="InputRef"
                                    class="ml-1 w-20"
                                    size="small"
                                    autofocus
                                    @keyup.enter="handleInputConfirm(row)"
                                    @blur="handleInputConfirm(row)"
                                />
                                <el-button v-else class="button-new-tag ml-1" type="primary" size="small" icon="Plus" @click="row.inputShow = true"></el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template #default="{ row }">
                            <el-button icon="Delete" type="danger"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="btn_box">
                    <el-button type="primary" size="small" @click="comform">保存</el-button>
                    <el-button size="small" @click="cancel">取消</el-button>
                </div>
            </el-form-item>
        </el-form>
        <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
    </div>
</template>

<script setup lang='ts'>
import { uploadImage } from '@/api/goods'
import { ref, reactive, onMounted, watch, computed } from 'vue'
import {
    getTrademarkList,
    getBaseSaleAttrList,
    getSpuImageList,
    getSpuSaleAttrList
} from '@/api/SKU'
interface SPUBrand {
    label: string
    value: number
}
interface SpuImgList {
    name: string
    url: string
}
const props = defineProps({
    spuInfo: {
        type: Object,
        default: () => {}
    },
    category3Id: {
        type: Number,
        default: 0
    }
})
let form = reactive({
    saleAttr: [],
    description: '',
    tmId: 0,

})

const tagValue = ref('')
const spuBrand = reactive<SPUBrand[]>([])
const spuSaleAttr = reactive<SPUBrand[]>([])
const fileList = reactive<SpuImgList[]>([])
const $emit = defineEmits(['cancel'])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const lastSpuSaleAttr = computed(() => spuSaleAttr.filter(i => !form.saleAttr.some(j => i.label === j.saleAttrName)))
const handleRemove= (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
const cancel = () => {
    $emit('cancel')
}

// 获取所有品牌
const trademarkList = async () => {
    const result = await getTrademarkList()
    if (result.code === 200) {
        result.data.forEach(item => {
            spuBrand.push({
                label: item.tmName,
                value: item.id
            })
        })
    }
}
// 获取所有销售属性
const baseSaleAttrList = async () => {
    const result = await getBaseSaleAttrList()
    console.log(result)
    if (result.code === 200) {
        result.data.forEach(item => {
            spuSaleAttr.push({
                label: item.name,
                value: item.id
            })
        })
    }
}
// 获取spu的图片集
const spuImageList = async (id: number) => {
    const result = await getSpuImageList(id)
    console.log('spuImageList', result)
    if (result.code === 200) {
        result.data.forEach(item => {
            fileList.push({
                name: item.imgName,
                url: item.imgUrl
            })
        })
    }
}
// 获取spu的销售属性
const spuSaleAttrList = async (id: number) => {
    const result = await getSpuSaleAttrList(id)
    console.log('spuSaleAttrList', result)
    if (result.code === 200) {
        result.data.forEach(item => {
            item.inputShow = false
            form.saleAttr.push(item)
        })
    }
}
// 自定义上传logo
// 这里上传图片 如果return error ， 图片会自动从fileList删掉，不会手动删
// 上传成功，fileList存的是本地的url，网络url需要手动收集，fileList有个response，如果是新增的，就有这个值
const imgUpload = async (data: any) => {
    const fd = new FormData()
    fd.append('file', data.file)
    fd.append('filename', data.filename)
    try {
        const result: any = await uploadImage(fd)
        if (result.code === 200) {
            console.log(result)
            return result.data
        }
        return Promise.reject('Error: image upload failed')
    } catch (error) {
        return Promise.reject('Error: image upload failed')
    }
}
// 删除tag
const handleClose = (spuSaleAttrValueList: any, index: number) => {
    spuSaleAttrValueList.splice(index, 1)
}
// 添加tag
const handleInputConfirm = (row: any) => {

    // 这里的回车会触发 回车跟blur两个事件，会执行两次，可以通过下面这样处理
    // updateData(event) { ... //更新操作},
    // //回车失去焦点
    // enterBlur(event) { event.target.blur() }

    // 也可以通过判断tagValue的值不去触发push事件
    if (tagValue.value) {
        row.spuSaleAttrValueList.push({
            saleAttrName: row.saleAttrName,
            saleAttrValueName: tagValue.value
        })
    }
    tagValue.value = ''
    row.inputShow = false
}

// 保存
const comform = () => {
//     const params = {
//         category3Id: props.category3Id,
//         "description": "string",
//         "id": 0,
//         "tmId": 0,
//         "spuImageList": [
//             {
//             "id": 0,
//             "imgName": "string",
//             "imgUrl": "string",
//             "spuId": 0
//             }
//         ],
//         "spuName": "string",
//         "spuSaleAttrList": [
//             {
//             "baseSaleAttrId": 0,
//             "id": 0,
//             "saleAttrName": "string",
//             "spuId": 0,
//             "spuSaleAttrValueList": [
//                 {
//                 "baseSaleAttrId": 0,
//                 "id": 0,
//                 "isChecked": "string",
//                 "saleAttrName": "string",
//                 "saleAttrValueName": "string",
//                 "spuId": 0
//                 }
//             ]
//             }
//         ]
//   }
}

onMounted(() => {
    trademarkList()
    baseSaleAttrList()
})
// 监听外部传递进来的数据
watch(() => props.spuInfo, newV => {
    console.log(newV)
    Object.assign(form, newV)
    spuImageList(newV.id)
    spuSaleAttrList(newV.id)
})
</script>

<style lang='scss' scoped>
.el-form {
    .el-form-item {
        .add_sale_attr {
            margin-left: 10px;
        }
        .el-table_1_column_4 {
            
            :deep(.cell) {
            white-space: nowrap;
            }
        }
        .add_sale_table {
            margin-top: 10px;
            :deep(.cell) {
                color: #817b7b;
            }
        }
    }
}
</style>