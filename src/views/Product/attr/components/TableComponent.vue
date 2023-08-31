<template>
    <el-card>
        <div class="add_attr_box" v-if="addAttr">
            <div class="attr">
                属性名称
                <el-input v-model="addAttrInput" placeholder="请您输入属性的名字"></el-input>
            </div>
            <div class="btn_box">
                <el-button type="primary" @click="addAttrValue" :disabled="addAttrDisable" size="small" icon="Plus">添加属性值</el-button>
                <el-button size="small"  @click="cancel">取消</el-button>
            </div>
            <el-table border :data="tableAttrValueList">
                <el-table-column type="index" width="80" align="center" label="序号" />
                <el-table-column prop="attrValue" label="属性名称">
                    <template #default="{ row }">
                        <!-- 使用函数的方式获取元素 -->
                        <el-input v-if="!row.show" :ref="(e: any) => inputRef = e" @blur='comfirmInput(row)' @keyup.enter="comfirmInput(row)" v-model="row.attrValue" placeholder="请您输入属性值名"></el-input>
                        <span @dblclick="dbShow(row)" v-else class="input_value_span">{{ row.attrValue }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="{ row }">
                        <el-button @click="deleteAttrValue(row)" size="small" type="danger" icon="Delete"/>
                    </template>
                </el-table-column>
            </el-table>
            <div class="btn_box">
                <el-button type="primary" @click="comfirm" size="small" :disabled="addAttrBtn">保存</el-button>
                <el-button size="small" @click="cancel">取消</el-button>
            </div>
        </div>
        <div v-else>
            <el-button class="add_btn" type="primary" @click="showAddAttr(undefined)" :disabled="disabled" icon="Plus">添加平台属性</el-button>
            <div class="no_data" v-if="!tableList.length">暂无数据</div>
            <div class="table_box" v-else>
                <el-table :data="tableList" border style="width: 100%">
                    <el-table-column type="index" width="80" align="center" label="序号" />
                    <el-table-column prop="attrName" label="属性名称"/>
                    <el-table-column label="属性值名称">
                        <template #default="{ row }">
                                <el-tag v-for="item in filterData(row.attrValueList)" class="ml-2" type="warning">{{ item }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template #default="{ row }">
                            <el-button type="warning" icon="Edit" @click="showAddAttr(row)"/>
                            <el-button type="danger" icon="Delete" @click="deleteAttItem(row)"/>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </el-card>
</template>

<script setup lang='ts'>
import { watch, ref, computed, reactive, nextTick } from 'vue'
import { getAttr, deleteAttrItem, saveAttr } from '@/api/goods'
import type { Datum, SaveAttrParams } from '@/api/goods/type'
interface AttrValueType {
    show: boolean,
    attrValue: string,
    id?: number,
    attrId?: number
}
const inputRef = ref()
const input = ref()
const disabled = ref(true)
const $emit = defineEmits(['setDisabled'])
const addAttr = ref(false) // 添加属性弹窗
const tableList = reactive<Datum[]>([])
const tableAttrValueList = reactive<AttrValueType[]>([])
const props = defineProps(['ids']);
const addAttrInput = ref<string>('')
const currentUpdateId = ref(0)
const addAttrBtn = computed(() => {
    return tableAttrValueList.length ? false : true
})
const addAttrDisable = computed(() => {
    return addAttrInput.value.length ? false : true
})
const comfirmInput = (row: any) => {
    // 未输入值  剔除
    if (!row.attrValue) {
        const index = tableAttrValueList.findIndex(item => item === row)
        tableAttrValueList.splice(index, 1)
        return
    }
    // 剔除重复的值
    // ...
    row.show = true
}
// 双击显示
const dbShow = (row: any) => {
    row.show = false
    nextTick(() => {
        inputRef.value.focus()
    })
}
// 显示添加属性
const showAddAttr = (params: undefined | any) => {

    if (typeof params == 'object') {
        addAttrInput.value = params.attrName
        currentUpdateId.value = params.id
        params.attrValueList.forEach((item: any) => {
            tableAttrValueList.push({
                attrValue: item.valueName,
                attrId: item.attrId,
                id: item.id,
                show: true
            })
        })
    }
    $emit('setDisabled', true)
    addAttr.value = true
}
// 删除属性
const deleteAttItem = async (row: any) => {
    console.log(row)
    const result = await deleteAttrItem(row.id)
    console.log('result: ', result)
    if (result.code === 200) {
        getAttrItems()
    }
}
// 删除属性value
const deleteAttrValue = (row: any) => {
    console.log(row)
    const index = tableAttrValueList.findIndex(item => item === row)
    tableAttrValueList.splice(index, 1)
}
// 保存
const comfirm = async () => {
    const params: SaveAttrParams = {
        attrName: addAttrInput.value,
        categoryId: props.ids[2],
        categoryLevel: 3,
        attrValueList: tableAttrValueList.map(item => ({
            attrId: currentUpdateId.value ? item.attrId : 0,
            id: currentUpdateId.value ? item.id : 0,
            valueName: item.attrValue
        }))
    }
    // 编辑状态
    if (currentUpdateId.value) {
        params.id = currentUpdateId.value
    }
    console.log(params)
    const result = await saveAttr(params)
    if (result.code === 200) {
        cancel()
        getAttrItems()
    }
}
// 取消
const cancel = () => {
    addAttr.value = false
    addAttrInput.value = ''
    currentUpdateId.value = 0
    tableAttrValueList.length = 0
    $emit('setDisabled', false)
}
const addAttrValue = () => {
    tableAttrValueList.push({
        attrValue: '',
        show: false
    })
    nextTick(() => {
        inputRef.value.focus()
        // input.value.focus()
    })
}

// 不能用() => props.ids https://juejin.cn/post/7062621782074720269
watch(props.ids , async (newV) => {
  console.log('newV', newV)
  // 不存在三级分类
  if (!newV[2]) {
    disabled.value = true
    tableList.length = 0
    return
  }
  getAttrItems()
})
const getAttrItems = async () => {
    const data = props.ids
    const result = await getAttr(data)
    disabled.value = false
    console.log(result.data)
    if (result.code === 200) {
        tableList.length = 0
        result.data.forEach(item => tableList.push(item))
    }
}
const filterData = (data: any) => {
    return data.map((item: any) => item.valueName)
}
</script>

<style lang='scss' scoped>
.el-card {
    margin-top: 10px;
    .add_btn {
        margin-bottom: 10px;
    }
    .no_data {
        text-align: center;
        font-size: 12px;
        color: #ccc;
        padding-top: 100px
    }
    .el-tag {
        margin-right: 5px;
    }
    .add_attr_box {
        .attr {
            display: flex;
            align-items: center;
            font-size: 14px;
            white-space: nowrap;
            .el-input {
                margin-left: 10px;
                width: 200px;
            }
        }
        .btn_box {
            display: flex;
            align-items: center;
            margin-top: 15px;
            margin-bottom: 10px;
        }
        .input_value_span {
            width: 100%;
            color: #fff;
            display: block;
            background:linear-gradient( to right,red,green,yellow);
        }
    }
}
</style>