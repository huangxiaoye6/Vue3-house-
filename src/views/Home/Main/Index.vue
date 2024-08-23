<template>
  <div id="index">
    <div class="statistics">
      <div class="statistics_item" :style="{backgroundColor:'#ee4645'}">
        <div class="title">房源数量</div>
        <div class="content">{{store.house_num}}套</div>
      </div>
      <div class="statistics_item" :style="{backgroundColor:'greenyellow'}">
        <div class="title">平均总价</div>
        <div class="content">{{store.mean_total_price}}万</div>
      </div>
      <div class="statistics_item" :style="{backgroundColor:'#2AE3EE'}">
        <div class="title">平均单价</div>
        <div class="content">{{store.mean_sing_price}}元/平方米</div>
      </div>
      <div class="statistics_item" :style="{backgroundColor:'#ac47ee'}">
        <div class="title">关注人数</div>
        <div class="content">{{store.view_num}}人</div>
      </div>
      <el-cascader :options="store.city_area" clearable  v-model="store.select" @change="change"/>
    </div>
    <div class="houseInfo">
      <el-scrollbar style="height: 100%">
        <div class="house" v-infinite-scroll="store.load" infinite-scroll-distance='1000' infinite-scroll-delay="500">
            <div class="house_item" v-for="item in store.house_list" :key="item.id">
              <img :src="`//images.weserv.nl/?url=${item.img}`" alt="加载失败">
              <div class="item_description">
                <span class="item_title">{{item.title}}</span>
                <span class="item_address">
                  <el-icon size="14" color="#394043"><Location /></el-icon>
                  {{item.city}} - {{item.area}} - {{item.region}}
                </span>
                <span class="item_info">
                  <el-icon><House /></el-icon>
                  {{item.house_type}} | {{item.house_size}} | {{item.toward}} | {{item.decoration}} | {{item.floor}}
                  | {{item.year}} | {{item.building_type}}
                </span>
                <span class="item_view">
                  <el-icon><Star /></el-icon>
                  {{item.view_num}}人关注 | {{item.release_time}}
                </span>
              </div>
              <div class="item_price">
                <span class="item_total_price">{{item.total_price}}万</span>
                <span class="item_single_price">{{item.single_price}}元/m2</span>
              </div>
            </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script setup lang="ts">
import useIndexStore from "@/store/InddexStore";
import {Location,House,Star} from '@element-plus/icons-vue'
import {onMounted, ref} from "vue";
const store=useIndexStore()
onMounted(()=>{
  if(store.house_num===null) {
    store.get_houseInfo()
    store.get_areas()
  }
})
const change=()=>{
  store.city=store.select[0]
  store.page=1
  store.house_list.length=0
  store.get_house_list()
}
</script>
<style scoped>
#index{
  height: 100%;
  width: 100%;
}
.statistics{
  width: 100%;
  height: 170px;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.statistics_item{
  width: 200px;
  height: 150px;
  border-radius: 30px;
  box-shadow: 5px 5px 10px #eeeeee,-5px -5px 10px #eeeeee;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.statistics_item:hover{
  box-shadow: 5px 5px 10px #cccccc,-5px -5px 10px #cccccc;
}
.content{
  width: 100%;
  height: 50px;
  text-align: center;
}
.title{
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-weight: 700;
  font-size: 20px;
}
.house{
  height: calc(100% - 170px);
}
.house_item{
  height: 200px;
  border-bottom: 1px solid #cccccc;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.el-scrollbar{
  height: 100%;
}
.houseInfo{
  height:calc(100% - 170px);
}
img{
  width: 250px;
  height: 160px;
}
.item_description{
  width: 800px;
  height: 160px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 20px;
}
.item_price{
  width: 200px;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.item_title{
  max-width: 500px;
  font-size: 22px;
  color: #394043;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 900;
}
.item_address{
  font-size: 14px;
  height: 20px;
  width: 400px;
  color: #515151;
  line-height: 20px;
}
.item_info{
  font-size: 14px;
  height: 20px;
  width: 500px;
  color: #515151;
 }
.item_view{
  font-size: 14px;
  height: 20px;
  width: 400px;
  color: #515151;
}
.item_total_price{
  font-size: 26px;
  font-weight: bold;
  color: #db4c3f;
}
.item_single_price{
  font-size: 14px;
}
</style>