<template>
  <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      class="login-form"
  >
    <h1>登录</h1>
    <el-form-item prop="username">
      <el-input v-model="ruleForm.username" type="text"  placeholder="请输入账号" :prefix-icon="User"/>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="ruleForm.password" type="password" @keydown.enter="login" placeholder="请输入密码" show-password :prefix-icon="Lock"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>


<script setup lang="ts">
import {reactive, ref} from "vue";
import {ElMessage, type FormInstance} from "element-plus";
import type {InterLogin, InterLoginProps, InterLoginRules,} from "@/types/LoginForm";
import { User,Lock } from '@element-plus/icons-vue'
import requests from "@/utils/request";
import {useRouter} from "vue-router";
import {jwtDecode} from "jwt-decode";
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<InterLogin>({
  username:'',
  password:'',
})
const router=useRouter()
const props=defineProps<InterLoginProps>()

const rules = reactive<InterLoginRules>({
  username: [
    { required: true, message: '请输入账号', trigger: 'change' },
    { min: 1, max: 16, message: '输入的长度必须在1到16之间', trigger: 'change' },
  ],
  password: [{required: true, message: '请输入密码', trigger: 'change',}],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
    await formEl.validate ((valid, fields) => {
    if (valid) {
      login()
    } else {
      console.log('提交错误!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const login=async ()=>{
  const res=  await requests.post(props.url,{
    username:ruleForm.username,
    password:ruleForm.password,
  })
  const baseURL=requests.defaults.baseURL
  if (res.data.code===200){
    const token=res.data.token;
    const decode:any=jwtDecode(token);
    localStorage.setItem('token',token)
    localStorage.setItem('userInfo',JSON.stringify(decode.user.userInfo))
    localStorage.setItem('uuid',decode.user.userInfo.uuid)
    localStorage.setItem('username',decode.user.username)
    localStorage.setItem('role',decode.user.role)
    await router.push({path: '/home'})
  }else {
    ElMessage.error(`${res.data.msg}`)
  }
}
</script>
<style scoped>
.login-form{
  grid-row: 1;
  grid-column: 1;
  opacity: 0;
  transition: 1s ease-in-out;
  transition-delay: 0.5s;
  padding: 1% 30%;
  pointer-events: none;
}
.login-form.sign-up-model{
  opacity: 1;
  transition: 1s ease-in-out;
  pointer-events: all;
}
.login-form{
  display: flex;
  flex-direction: column;
}
h1{
  margin-bottom: 10px;
  text-align: center;
}
.el-form-item{
  width: 400px;
}
:deep(.el-form-item:last-child .el-form-item__content){
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>