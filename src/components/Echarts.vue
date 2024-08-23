<template>
  <div ref="chart" class="chart" :style="chartStyle"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import {onMounted, ref} from "vue";
import map from "@/utils/ChongQing";
const chart=ref()
const props=defineProps({
  options:Object,
  chartStyle:String,
  chartShow:Boolean,
  mapData:Object,
  theme:{
    default:'light'
  }
})
let mgChart:any=null
const data=map.data
onMounted(  ()=>{
  mgChart =  echarts.init(chart.value,props.theme);
  echarts.registerMap('CQ',data)
  mgChart.setOption(props.options, false);
  window.addEventListener('resize', () => {
    mgChart.resize()
  })


})
</script>

<style scoped>

</style>