<template>
    <div>
        <el-card class="el-card_t">
            <div class="input_l">
                用户名:<el-input placeholder="请输入用户名" v-model="inputValue"></el-input>
            </div>
            <div class="btn_r">
                <el-button type="primary" size="small">搜索</el-button>
                <el-button size="small">重置</el-button>
            </div>
        </el-card>
        <el-card class="el-card_b">
            <div class="btn_box">
                <el-button type="primary">添加</el-button>
                <el-button type="danger" :disabled="true">批量删除</el-button>
            </div>
            <el-table border :data="tableData" show-overflow-tooltip @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center" />
                <el-table-column label="#" type="index" align="center" width="40"></el-table-column>
                <el-table-column prop="id" label="id" align="center" width="50"></el-table-column>
                <el-table-column prop="name" label="用户名字"></el-table-column>
                <el-table-column prop="username" label="用户名称"></el-table-column>
                <el-table-column prop="roleName" label="用户角色"></el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column prop="updateTime" label="更新时间"></el-table-column>
                <el-table-column label="操作" width="270px" align="center">
                    <template #default="{ row }">
                        <el-button type="primary" icon="User" size="small" @click="distributeRole(row)">分配角色</el-button>
                        <el-button type="primary" icon="Edit" size="small">编辑</el-button>
                        <el-button type="primary" icon="Delete" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 7, 9, 11]" small
                background layout="prev, pager, next,jumper, ->, sizes,   total" :total="total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            <!-- 分配角色 -->
            <el-drawer v-model="drawer1" direction="rtl">
                <template #header>
                    <h4>分配角色</h4>
                </template>
                <template #default>
                    <el-form>
                        <el-form-item label="用户姓名">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="用户列表">
                            <el-checkbox
                                v-model="checkAll"
                                :indeterminate="isIndeterminate"
                                @change="handleCheckAllChange"
                                >Check all</el-checkbox
                            >
                            <el-checkbox-group
                                v-model="checkedCities"
                                @change="handleCheckedCitiesChange"
                            >
                                <el-checkbox v-for="item in AllRole" :key="item" :label="item">
                                {{ item.roleName }}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-form>
                </template>
                <template #footer>
                    <div style="flex: auto">
                        <el-button >cancel</el-button>
                        <el-button type="primary">confirm</el-button>
                    </div>
                </template>
            </el-drawer>
        </el-card>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import { UserList, ToAssign } from '@/api/acl'
const inputValue = ref('')
let tableData = reactive([])
const currentPage = ref(1)
const pageSize = ref(5)
const total = ref(0)
const drawer1 = ref(false)
const checkAll = ref(false)
const isIndeterminate = ref(true)
const checkedCities = ref([])
const AllRole = ref([])
const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
}
const handleSelectionChange = (val) => {
    console.log(val)
}
const getUserList = async () => {
    const result = await UserList({
        page: currentPage.value,
        limit: pageSize.value
    })
    console.log(result)
    if (result.code === 200) {
        total.value = result.data.total
        tableData = result.data.records
        console.log('tableData', tableData)
    }
}
const distributeRole = async (row) => {
    console.log(row)
    drawer1.value = true
    const result = await ToAssign(row.id)
    console.log(result)
    checkedCities.value = result.data.assignRoles
    AllRole.value = result.data.allRolesList
}
const handleCheckAllChange = (val: boolean) => {
  checkedCities.value = val ? AllRole.value : []
  isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value) => {
  console.log(value)
  const checkedCount = value.length
  checkAll.value = checkedCount === AllRole.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < AllRole.value.length
}

onMounted(() => {
    getUserList()
})
</script>

<style lang='scss' scoped>
.el-card_t {
    :deep(.el-card__body) {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .input_l {
            display: flex;
            align-items: center;
            white-space: nowrap;

            .el-input {
                margin-left: 10px;
            }
        }
    }
}

.el-card_b {
    .el-table {
        margin-top: 10px;
    }

    .el-pagination {
        margin-top: 10px;
    }
}
.test_model {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: skyblue;
    width: 300px;
    height: 300px;
    z-index: 99;
}
</style>