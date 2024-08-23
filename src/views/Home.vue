<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header><Header></Header></el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">

import Aside from "@/views/Home/Aside.vue";
import Header from "@/views/Home/Header.vue";
</script>


<style scoped>
.common-layout,.el-container{
  height: 100%;
}
.el-header{
  height: 80px;
}
.el-aside{
  min-height: 100vh;
}
</style>