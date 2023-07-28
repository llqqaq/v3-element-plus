<template>
    <el-card class="top_box">
        <div class="select_item">
            <span class="tips">一级分类</span>
            <el-select :disabled="props.disabled" v-model="value1" clearable @change="change1" size="small" class="m-2" placeholder="请选择">
                <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>
        <div class="select_item">
            <span class="tips">二级分类</span>
            <el-select :disabled="props.disabled" v-model="value2" clearable @change="change2" size="small" class="m-2" placeholder="请选择">
                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>
        <div class="select_item">
            <span class="tips">三级分类</span>
            <el-select :disabled="props.disabled" v-model="value3" clearable size="small" class="m-2" placeholder="请选择">
                <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>
    </el-card>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, watchEffect } from 'vue'
import { getCategory1, getCategory2, getCategory3 } from '@/api/goods'
import type { CategoryItem } from '@/api/goods/type'
const $emit = defineEmits(['change'])
const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
const props = defineProps(['disabled'])
type OptionType = {
    value: number,
    label: string
}
const options1 = reactive<OptionType[]>([])
const options2 = reactive<OptionType[]>([])
const options3 = reactive<OptionType[]>([])
const change1 = async (val: string) => {
    value2.value = ''
        value3.value = ''
        options2.length = 0
        options3.length = 0
    // 清除
    if (!val) return
    // 加载第二个
    const result = await getCategory2(Number(val))
    if (result.code === 200) {
        options2.length = 0
        filterData(result.data).forEach(item => options2.push(item))
    }
}
const change2 = async (val: string) => {
    value3.value = ''
    options3.length = 0
    if (!val) {
        return
    }
    // 加载第二个
    const result = await getCategory3(Number(val))
    if (result.code === 200) {
        options3.length = 0
        filterData(result.data).forEach(item => options3.push(item))
    }
}
watchEffect(() => {
    const idArr = [value1.value, value2.value, value3.value]
    $emit('change', idArr)
})
onMounted(async () => {
    const result = await getCategory1()
    if (result.code === 200) {
        filterData(result.data).forEach(item => options1.push(item))
    }
})
const filterData = (data: CategoryItem[]) => {
    return data.map(item => ({ value: item.id, label: item.name }))
}

</script>

<style lang='scss' scoped>
.top_box {
    :deep(.el-card__body) {
        display: flex;

        .select_item {
            margin-right: 20px;
            display: flex;
            align-items: center;

            .tips {
                color: #706e6ef0;
                white-space: nowrap;
                font-size: 12px;
                margin-right: 8px;
            }
        }
    }
}
</style>