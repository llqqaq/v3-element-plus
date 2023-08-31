<template>
    <div>
        <el-card>
            <!-- 阻止默认回车刷新页面行为 -->
            <el-form @submit.native.prevent>
                <el-form-item label="职位搜索">
                    <el-input v-model="roleName" @keyup.enter="search"  placeholder="请你输入搜索职位关键字"></el-input>
                </el-form-item>
                <div></div>
            </el-form>
        </el-card>
        <el-card>
            <el-table :data="tableData" border>
                <el-table-column label="#" align="center" type="index"></el-table-column>
                <el-table-column label="ID" width="150" align="center" prop="id"></el-table-column>
                <el-table-column label="职位名称" show-overflow-tooltip align="center" prop="roleName"></el-table-column>
                <el-table-column label="创建时间" show-overflow-tooltip align="center" prop="createTime"></el-table-column>
                <el-table-column label="更新时间" show-overflow-tooltip align="center" prop="updateTime"></el-table-column>
                <el-table-column label="操作" align="center" width="280" >
                    <template #default="{ row }">
                        <el-button type="primary" icon="User" size="small" @click="distributePermission(row)">分配权限</el-button>
                        <el-button type="primary" icon="Edit" size="small" @click='edit(row)'>编辑</el-button>
                        <el-button type="primary" icon="Delete" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 抽屉 -->
        <el-drawer v-model="drawer" direction="rtl">
            <template #header>
            <h4>set title by slot</h4>
            </template>
            <template #default>
                <el-tree
                    ref="treeRef"
                    :data="menuData"
                    show-checkbox
                    default-expand-all
                    :default-checked-keys="defaultCheckedKeys"
                    node-key="id"
                    highlight-current
                    :props="defaultProps"
                />
            </template>
            <template #footer>
            <div style="flex: auto">
                <el-button>cancel</el-button>
                <el-button type="primary" @click="confirm">confirm</el-button>
            </div>
            </template>
        </el-drawer>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, nextTick } from 'vue'
import { ElTree } from 'element-plus'
import { reqAllRole, reqRoleMenu } from '@/api/acl/role'
interface Tree {
  id: number
  label: string
  children?: Tree[]
}
const drawer = ref(false)
let tableData = reactive([])
const roleName = ref('')
const menuData = reactive([])
const defaultCheckedKeys = ref([])
const search = () => {
    getRole()
}
const edit = (row: any) => {
    console.log(row)
    row.roleName = 'dddddd'
}
const treeRef = ref<InstanceType<typeof ElTree>>()

const defaultProps = {
  children: 'children',
  label: 'name',
}

const data: Tree[] = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
]
const getRole = async () => {
    const result: any = await reqAllRole({
        page: 1,
        limit: 10,
        roleName: roleName.value
    })
    if (result.code === 200) {
        tableData.length = 0
        result.data.records.forEach((item: never) => tableData.push(item))
        console.log('tableData', tableData)
    }
    console.log(tableData)
}
const distributePermission = async (row: any) => {
    drawer.value = true
    const result = await reqRoleMenu(row.id)
    console.log('reqRoleMenu', result)
    menuData.length = 0
    result.data.forEach((item: never) => menuData.push(item))
    // 将选中的节点放入defaultCheckedKeys
    nextTick(() => {
        console.log()
        defaultCheckedKeys.value = filterDefaultCheckedKeys(menuData)
        // treeRef.value!.setCheckedKeys(defaultCheckedKeys, false)
    })
    
}

const confirm = () => {
    console.log(treeRef.value!.getCheckedKeys()) // 获取全选
    console.log(treeRef.value!.getHalfCheckedKeys()) // 获取半选
}


// 遍历找到根节点 并将select选中
const filterDefaultCheckedKeys = (data: any, initArr=[]) => {
    data.forEach((item: any) =>{
        if (item.children && item.children.length) {
            filterDefaultCheckedKeys(item.children, initArr)
        } else if (item.select) {
            initArr.push((item.id as never))
        }
    })
    return initArr
}
onMounted(() => {
    getRole()
})
</script>

<style lang='scss' scoped>

</style>