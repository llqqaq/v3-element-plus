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
                <el-upload v-model:file-list="fileList" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="SPU销售属性">
                <el-select size="small" placeholder="请你选择品牌">
                    <el-option v-for="item in lastSpuSaleAttr" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-button class="add_sale_attr" size="small" type="primary" :disabled="true" icon="Plus">添加销售属性</el-button>
                <el-table border class="add_sale_table" :data="form.saleAttr">
                    <el-table-column type="index" width="70px" label="序号" align="center"></el-table-column>
                    <el-table-column label="属性名" prop="saleAttrName"></el-table-column>
                    <el-table-column label="属性值">
                        <template #default="{ row }">
                            <el-tag v-for="item in row.spuSaleAttrValueList">{{ item.saleAttrValueName }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template #default="{ row }">
                            <el-button icon="Delete" type="danger"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="btn_box">
                    <el-button type="primary" size="small" @click="comfirm">保存</el-button>
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
import { ref, reactive, onMounted, watch } from 'vue'
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
const spuBrand = reactive<SPUBrand[]>([])
const spuSaleAttr = reactive<SPUBrand[]>([])
const lastSpuSaleAttr = reactive<SPUBrand[]>([])
const fileList = reactive<SpuImgList[]>([])
const $emit = defineEmits(['cancel'])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

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
            lastSpuSaleAttr.push({
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
            form.saleAttr.push(item)
            // 剔除已经存在的元素
            let index = lastSpuSaleAttr.findIndex(i => i.label === item.saleAttrName)
            if (index > -1) {
                lastSpuSaleAttr.splice(index, 1)
            }
        })
    }
}

// 保存
const comform = () => {
    const params = {
        category3Id: props.category3Id,
        "description": "string",
        "id": 0,
        "tmId": 0,
        "spuImageList": [
            {
            "id": 0,
            "imgName": "string",
            "imgUrl": "string",
            "spuId": 0
            }
        ],
        "spuName": "string",
        "spuSaleAttrList": [
            {
            "baseSaleAttrId": 0,
            "id": 0,
            "saleAttrName": "string",
            "spuId": 0,
            "spuSaleAttrValueList": [
                {
                "baseSaleAttrId": 0,
                "id": 0,
                "isChecked": "string",
                "saleAttrName": "string",
                "saleAttrValueName": "string",
                "spuId": 0
                }
            ]
            }
        ]
  }
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