<template>
    <div class="login_wrapper">
        <el-row>
            <el-col :span="12" :xs="0">2</el-col>
            <el-col :span='12' :xs="24" class="right_box">
                <el-form ref="ruleFormRef" :model="ruleForm" status-icon class="ruleForm">
                    <p>Hello</p>
                    <p>请登录</p>
                    <el-form-item>
                        <el-input placeholder="请输入账号" :prefix-icon="User" v-model="ruleForm.username" autocomplete="off" />
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="请输入密码" :prefix-icon="Lock" show-password v-model="ruleForm.password" type="password" autocomplete="off" />
                    </el-form-item>
                    <el-form-item>
                        <el-button class="login_btn" type="primary" >登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'


const ruleForm = reactive({
    username: '',
    password: ''
})

</script>

<style lang='scss' scoped>
.login_wrapper {
    width: 100%;
    height: 100%;
    background-color: skyblue;

    .el-row {
        height: 100%;
        .el-form {
            padding: 20px;
            background-color: #fff;
            border-radius: 20px;
            width: 80%;
            margin: 0 auto;
            margin-top: 40vh;
            padding-top: 10px;
            .login_btn {
                width: 100%;
            }
            p {
                font-size: 15px;
                color: #222;
                font-weight: bold;
                line-height: 30px;
            }
        }
    }
}
</style>