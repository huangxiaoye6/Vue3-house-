<template>
  <div :class="{container:true,'sign-up-model':show}">
    <div class="left-container">
      <div class="login" @click="change_login">
        <h1>重庆房源系统</h1>
        <el-button type="primary">去登录</el-button>
      </div>
        <img src="@/assets/img.png">
    </div>
    <div class="right-container">
      <div class="register">
        <h1>重庆房源系统</h1>
        <el-button type="primary" @click="change_register">去注册</el-button>
      </div>
      <img src="@/assets/img.png">
    </div>
    <div class="form">
      <LoginForm :class="{'sign-up-model':show}" :url="'/app/login/'"></LoginForm>
      <RegisterForm :class="{'sign-up-model':show}" :url="'/app/register/'"></RegisterForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import LoginForm from "@/components/LoginForm.vue";
import RegisterForm from "@/components/RegisterForm.vue";

const show=ref<boolean>(false)
const change_login=()=>{
  show.value=true
}
const change_register=()=>{
  show.value=false
}
</script>

<style scoped>
.container{
  width: 100vw;
  height: 100vh;
  background-color: white;
  overflow: hidden;
  position: relative;
  display: flex;
}
.container::before{
  content: "";
  width: 2000px;
  height: 2000px;
  background-color: rgb(160,209,35);
  position: absolute;
  border-radius: 50%;
  transform: translateY(-50%);
  right: 50%;
  top:-10%;
  transition: 1.8s ease-in-out;
}
.left-container{
  width: 0;
  flex: 1;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  margin-right: 80px;
  padding: 3rem 10% 2rem 10%;
  pointer-events: all;
}
.right-container{
  width: 0;
  flex: 1;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  margin-left: 80px;
  padding: 3rem 10% 2rem 10%;
  pointer-events: none;
}
.container.sign-up-model::before{
  transform: translate(100%,-50%);
  transition: 1.8s ease-in-out;
}
.left-container img, .right-container img{
  width: 400px;
}
.container .right-container .register,
.container .right-container img{
  transform: translateX(1000px);
  transition: 1.8s ease-in-out;
}
.container.sign-up-model .right-container .register,
.container.sign-up-model .right-container img{
  transform: translateX(0px);
  transition: 1.8s ease-in-out;
  transition-delay: 0.5s;
}
.container.sign-up-model .left-container .login,
.container.sign-up-model .left-container img{
  transform: translateX(-1000px);
  transition: 1.8s ease-in-out;
  transition-delay: 0.5s;
}
.container .left-container .login,
.container .left-container img{
  transform: translateX(0);
  transition: 1.8s ease-in-out;
}
.form{
  width: 50%;
  height: 50%;
  position: absolute;
  right: 0;
  top: 20%;
  transition: 1.8s ease-in-out;
  display: grid;
  grid-template-columns: 1fr;
}
.container.sign-up-model .form{
  width: 50%;
  height: 50%;
  top: 20%;
  right: 50%;
  transition: 1.8s ease-in-out;
  transition-delay: 0.5s;
}
.container.sign-up-model .right-container{
  pointer-events: all;
}
.container.sign-up-model .left-container{
  pointer-events: none;
}
</style>