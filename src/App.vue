<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
html,body{
  width: 100vw;
  height: 100vh;
}
#app{
  width: 100vw;
  height: 100vh;
}
</style>
