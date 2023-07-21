<template>
    <div class="login_wrapper">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span='12' :xs="24" class="right_box">
                <el-form
                    ref="ruleFormRef"
                    :model="formParams"
                    status-icon
                    :rules="rules"
                    class="form">
                    <p>Hello</p>
                    <p>请登录</p>
                    <el-form-item prop='username'>
                        <el-input placeholder="请输入账号" :prefix-icon="User" v-model="formParams.username" autocomplete="off" />
                    </el-form-item>
                    <el-form-item prop='password'>
                        <el-input placeholder="请输入密码" :prefix-icon="Lock" show-password v-model="formParams.password" type="password" autocomplete="off" />
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" class="login_btn" type="primary" @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang='ts'>
import type { FormInstance, FormRules, ElForm } from 'element-plus'
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/user'
import { User, Lock } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { getTime } from '@/utils/time'
const loading = ref(false)
const user = useUserStore()
const router = useRouter()
const $route = useRoute()
const ruleFormRef = ref<InstanceType<typeof ElForm>>() // 可以通过instanceType读取类型
type formParamsType = {
    username: string,
    password: string
}
const formParams = reactive<formParamsType>({
    username: 'admin',
    password: 'atguigu123'
})
const validateName = (rule: any, value: any, callback: any) => {
    if (value.length >= 5) {
        callback()
    } else {
        callback(new Error('最小长度为5个字符'))
    }
}
const validateNPass = (rule: any, value: any, callback: any) => {
    if (value.length >= 6) {
        callback()
    } else {
        callback(new Error('最小长度为6个字符'))
    }
}
const rules = reactive<FormRules<formParamsType>>({
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },
        { validator: validateName, trigger: 'change' }
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { validator: validateNPass, trigger: 'change' }
    ]
})

const login = async () => {
    if (loading.value) return
    try {
        await ruleFormRef.value?.validate()
        loading.value = true
        await user.userLogin(formParams)
        loading.value = false
        ElNotification.success({
            title: `${getTime()}好`,
            message: '登录成功！'
        })
        router.push({
            path: ($route.query.redirect as string) || '/'
        })
    } catch (e) {
        // 捕获表单校验的报错
        if (typeof e === 'object') { 
            return
        }
        // 捕获登录的报错
        loading.value = false
        ElNotification.error(e as string)
    }
}
</script>

<style lang='scss' scoped>
.login_wrapper {
    width: 100%;
    height: 100%;
    background: url(@/assets/images/background.jpg) no-repeat;
    background-size: cover;

    .el-row {
        height: 100%;
        .el-form {
            background: url(@/assets/images/login_form.png) no-repeat;
            background-size: cover;
            padding: 20px;
            border-radius: 20px;
            width: 80%;
            max-width: 500px;
            margin: 0 auto;
            margin-top: 40vh;
            padding-top: 10px;
            .login_btn {
                width: 100%;
            }
            p {
                font-size: 20px;
                color: #fff;
                font-weight: bold;
                margin-bottom: 20px;
            }
        }
    }
}
</style>