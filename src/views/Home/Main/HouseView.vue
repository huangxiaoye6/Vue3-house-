<template>
  <div class="house_view">
    <div class="detail" @click="change">进入可视化大屏</div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";

const router=useRouter()
const change=()=>{
  router.push('/view')
}
</script>


<style scoped>
.house_view{
  width: 100%;
  height: 100%;
  background-image: url("@/assets/houseViewjpeg.jpeg");
  background-size: cover;
}
.detail{
  position: absolute;
  left: 50%;
  top: 30%;
  width: 200px;
  height: 200px;
  box-shadow: inset 10px 10px 10px rgba(1,180,255,0.05),
  15px 25px 10px rgba(1,180,255,0.1),
  15px 20px 20px rgba(1,180,255,0.1),
  inset -10px -10px 15px rgba(225,255,255,0.5);
  transition: 0.5s;
  display: flex;
  justify-content: center;
  background-color: #01b4ff;
  align-items: center;
  border-radius: 29% 71% 75% 25% / 82% 74% 26% 18%  ;
  line-height: 1.2em;
  letter-spacing: 0.1em;
  font-size: 1em;
  text-align: center;
  color: white;
  flex-direction: column;
  cursor: pointer;
  font-weight: 700;
}
.detail:hover{
  border-radius: 68% 32% 39% 61% / 40% 30% 70% 60% ;
}
</style>