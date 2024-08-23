<template>
  <div class="Pwd">
    <el-form
        ref="pwdFormRef"
        style="max-width: 600px"
        :model="store.form"
        :rules="rules"
        label-width="auto"
        class="login-form"
    >
        <el-form-item prop="password">
          <el-input v-model="store.form.password" type="password"  placeholder="请输入密码"  show-password :prefix-icon="User"/>
        </el-form-item>
        <el-form-item prop="new_password">
          <el-input v-model="store.form.new_password" type="password"  placeholder="请输入新密码" show-password :prefix-icon="Lock"/>
        </el-form-item>
          <el-form-item prop="check__new_password">
            <el-input v-model="store.form.check__new_password" type="password"  placeholder="请再次输入新密码" show-password :prefix-icon="Lock"/>
          </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="store.submitForm(pwdFormRef)">提交</el-button>
          <el-button @click="store.resetForm(pwdFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script setup lang="ts">

import {Lock, User} from "@element-plus/icons-vue";
import {reactive, ref} from "vue";
import type {FormInstance} from "element-plus";
import type {PwdRules} from "@/types/Pwd";
import usePwdStore from "@/store/PwdStore";
const pwdFormRef = ref<FormInstance>()
const store=usePwdStore()
const rules = reactive<PwdRules>({
  password:[{validator:store.validate_password,trigger: 'change',}],
  new_password:[{validator:store.validate_new_password,trigger: 'change'}],
  check__new_password:[{validator:store.validate_check_new_password,trigger: 'change'}]
})


</script>

<style scoped>
.Pwd{
  width: 100%;
  height: 100%;
  display: flex;
}
.el-form{
  width: 400px;
  margin: 150px auto;
}
:deep(.el-form-item:last-child .el-form-item__content){
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>