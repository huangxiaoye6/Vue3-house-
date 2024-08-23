<template>
  <div class="aside" ref="menu">
    <el-menu
        :default-active="route.path"
        class="el-menu-vertical-demo"
        :collapse="store.isCollapse"
        router
    >
      <el-menu-item index="/home/index" route="/home/index">
        <el-icon><HomeFilled /></el-icon>
        <template #title>首页</template>
      </el-menu-item>
      <el-menu-item index="/home/houseInfo" route="/home/houseInfo">
        <el-icon><InfoFilled /></el-icon>
        <template #title>房源概况</template>
      </el-menu-item>
      <el-menu-item index="/home/housePredict" route="/home/housePredict">
        <el-icon><Search /></el-icon>
        <template #title>房价预测</template>
      </el-menu-item>
      <el-menu-item index="/home/houseView" route="/home/houseView">
        <el-icon><Histogram /></el-icon>
        <template #title>可视化房源</template>
      </el-menu-item>
      <el-menu-item index="/home/user" route="/home/user">
        <el-icon><UserFilled /></el-icon>
        <template #title>个人信息</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import {Search, Histogram,UserFilled,HomeFilled,InfoFilled} from '@element-plus/icons-vue'
import useAsideStore from "@/store/AsideStore";
import { ref} from "vue";
import {useRoute} from "vue-router";
const store=useAsideStore()
const menu = ref();
const route=useRoute()
</script>

<style scoped>
.aside,.el-menu{
  height: 100%;
}
</style>