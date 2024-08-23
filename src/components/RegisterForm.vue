<template>
  <el-form
      ref="registerFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm register-form"
  >
    <h1>注册</h1>
    <el-form-item prop="username">
      <el-input v-model="ruleForm.username" type="text" placeholder="输入账号"
                :prefix-icon="User"/>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
          v-model="ruleForm.password"
          type="password"
          placeholder="输入密码"
          show-password
          :prefix-icon="Lock"
      />
    </el-form-item>
    <el-form-item prop="check_password">
      <el-input v-model="ruleForm.check_password" type="password" placeholder="重新输入密码"
                show-password :prefix-icon="Lock"/>
    </el-form-item>
    <el-form-item prop="phone">
      <el-input v-model="ruleForm.phone" type="text"  placeholder="输入电话"
                :prefix-icon="Phone"/>
    </el-form-item>
    <el-form-item prop="email">
      <el-input v-model="ruleForm.email" type="text"  placeholder="输入邮箱"
                :prefix-icon="Message"/>
    </el-form-item>
    <el-form-item prop="emailCode">
      <el-input v-model="ruleForm.emailCode" type="text"  placeholder="邮箱验证码">
        <template #append><el-button :disabled=disabled class="email" @click="send_email">{{content}}</el-button></template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(registerFormRef)">注册</el-button>
      <el-button @click="resetForm(registerFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">

import {reactive, ref} from "vue";
import {ElMessage, type FormInstance} from "element-plus";
import type {InterRegisterProps, Register, RegisterRules} from "@/types/RegisterForm";
import {User, Lock,Message,Phone} from '@element-plus/icons-vue'
import requests from "@/utils/request";
const registerFormRef = ref<FormInstance>()
const ruleForm = reactive<Register>({
  username: '',
  password: '',
  check_password:'',
  phone:'',
  email:'',
  emailCode:''
})
const disabled=ref(false)
const second=ref(60)
const content=ref('获取验证码')
const props=defineProps<InterRegisterProps>()

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      register()
    } else {
      console.log('error submit!', fields)
    }
  })
  formEl.resetFields()
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const register=async()=>{
  const res=await requests.post(props.url,{
    username:ruleForm.username,
    password:ruleForm.password,
    phone:ruleForm.phone,
    email:ruleForm.email,
    emailCode:ruleForm.emailCode,
  })
  if (res.data.code===200){
    ElMessage.success('注册成功')
  }else {
    ElMessage.error(`${res.data.msg}`)
  }
}

const send_email=async ()=>{
  disabled.value=true
  const start=()=>{
    if(second.value>0){
      return content.value=`${second.value--}秒后重新获取`
    }else {
      disabled.value=false
      content.value='获取验证码'
      second.value=60
      console.log(1)
      clearInterval(timeInterval)
    }
    second.value--
  }
  const res=await requests.post('/app/email/',{
    email:ruleForm.email,
  })
  if (res.data.msg==='发送成功'){
    ElMessage.success('验证码发送成功')
  }else {
    ElMessage.error('发送失败,请重新发送')
  }
  const timeInterval=setInterval(start,1000)
}


const validate_check_password = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请重新输入密码'))
  } else if (value !== ruleForm.password) {
    callback(new Error("2次输入的密码不一致!"))
  } else {
    callback()
  }
}
const validate_username = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('账号不能为空'))
  } else if (/^\d+$/.test(value)) {
    callback()
  } else {
    callback(new Error("账号只能包含数字，不能包含字符"))
  }
}
const validate_phone = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('手机号不能为空'))
  } else if (/^\d+$/.test(value)) {
    callback()
  } else {
    callback(new Error("手机号只能包含数字，不能包含字符"))
  }
}
const validate_email = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('邮箱不能为空'))
  } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    callback()
  } else {
    callback(new Error("请输入正确的邮箱"))
  }
}
const rules=reactive<RegisterRules>({
  username: [
    { min: 1, max: 16, message: '输入的长度必须在1到16之间', trigger: 'change' },
    {validator:validate_username,trigger: "change"}
  ],
  password: [{required: true, message: '密码不能为空', trigger: 'change',}],
  check_password:[{validator:validate_check_password, trigger:'change'}],
  phone:[
    { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'change' },
    {validator:validate_phone,trigger: "change"}
  ],
  email:[{validator:validate_email,trigger: "change"}],
  emailCode:[{required: true, message: '验证码不能为空', trigger: 'change',}]
})
</script>

<style scoped>
.register-form{
  grid-row: 1;
  grid-column: 1;
  opacity: 1;
  transition: 1s ease-in-out;
  transition-delay: 0.5s;
  padding: 1% 25%;
  pointer-events: all;
}
.register-form.sign-up-model{
  opacity: 0;
  transition: 1s ease-in-out;
  pointer-events: none;
}
h1{
  margin-bottom: 10px;
  text-align: center;
}
.el-form{
  display: flex;
  flex-direction: column;
}
:deep(.el-form-item:last-child .el-form-item__content){
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>