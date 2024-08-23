<template>
  <div class="header">
    <div class="left">
      <el-icon size="30px" @click="asideStore.changeShow"><Expand /></el-icon>
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item>重庆二手房系统</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item,index) in breadcrumbItems" :key="index" :to="{ path: item.path }">{{item.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      <div class="avatar">
        <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:8000/app/avatar/"
            :data="store.data"
            :headers="store.headers"
            name="avatar"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
        >
          <el-tooltip
              class="box-item"
              effect="dark"
              content="修改头像"
              placement="top-start"
          >
            <el-avatar
                :size="40"
                class="mr-3"
                :src='store.avatar'
            />
          </el-tooltip>
        </el-upload>
      </div>
      <el-dropdown>
        <div class="nickname">{{store.nickname}}</div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item class="dropdown-menu" @click="store.user">个人信息</el-dropdown-item>
                <el-dropdown-item class="dropdown-menu" @click="store.pwd">修改密码</el-dropdown-item>
                <el-dropdown-item class="dropdown-menu" @click="store.exit">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
      </el-dropdown>
      <el-icon><ArrowDown /></el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight,Expand ,ArrowDown} from '@element-plus/icons-vue'
import useAsideStore from "@/store/AsideStore";
import {computed, onMounted} from "vue";
import useHeaderStore from "@/store/HeaderStore";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
const asideStore=useAsideStore()
const store=useHeaderStore()
const router = useRouter();
import type { UploadProps } from 'element-plus'
onMounted(()=>{
  let info:any
  const userInfo=localStorage.getItem('userInfo')
  if (userInfo!=null){
    info=JSON.parse(userInfo)
    store.nickname=info.nick_name
    if(info.avatar===null){
      store.avatar='/static/user.png'
    }else {
      store.avatar=info.avatar
    }
  }
})

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
) => {
  store.avatar=response.data.avatar
  localStorage.setItem('avatar',response.data.avatar)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('图片的格式必须是jpg')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片的大小不能超过2MB')
    return false
  }
  return true
}

const breadcrumbItems = computed(() => {
  return router.currentRoute.value.matched.map(route => ({
    path: route.path,
    meta: route.meta || {},
  })).filter(item => item.meta.title);
});

</script>

<style >
.header{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}
.el-breadcrumb{
  margin-left: 30px;
}
.el-icon:hover{
  cursor: pointer;
}
.left{
  display: flex;
  align-items: center;
}
.right{
  display: flex;
  align-items: center;
  width: 210px;
  background-color: #eeeeee;
  border: 1px solid #d4d4d4;
  border-radius: 20px;
  justify-content: space-evenly;
  margin-right: 50px;
}
.el-dropdown-link:hover{
  cursor: pointer;
}
.dropdown-menu:hover{
  background-color: #d4d4d4;
}
.dropdown-menu:hover{
  color: #67C23A;
}
.avatar:hover{
  cursor: pointer;
}
.el-dropdown{
  width: 80px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nickname{
  width: 80px;
  white-space: nowrap; /* 保持文本在一行内显示 */
  overflow: hidden; /* 隐藏超出容器的部分 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
}
.nickname:hover{
  cursor: pointer;
}
.avatar-uploader{
  display: flex;
  align-items: center;
}
</style>