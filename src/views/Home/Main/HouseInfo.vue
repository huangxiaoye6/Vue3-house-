<template>
  <div class="house-info">
    <el-scrollbar>
    <Echarts :options="opts" :chartStyle="'width: 50%;height: 400px'" v-if="store.chartShow"></Echarts>
    <Echarts :options="opts2" :chartStyle="'width: 50%;height: 400px'" v-if="store.chartShow"></Echarts>
    <Echarts :options="opts3" :chartStyle="'width: 50%;height: 400px'" v-if="store.chartShow"></Echarts>
    <Echarts :options="opts4" :chartStyle="'width: 50%;height: 400px'" v-if="store.chartShow"></Echarts>
    <Echarts :options="opts5" :chartStyle="'width: 50%;height: 400px'" v-if="store.chartShow"></Echarts>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import Echarts from "@/components/Echarts.vue";
import {onMounted,} from "vue";
import useHouseInfoStore from "@/store/HouseInfoStore";
const store=useHouseInfoStore()
onMounted(  ()=>{
  if (store.city_list.length===0){
       store.get_analysis_list()
  }
})
const opts={
  title: {
    text: '重庆各区域平均房屋总价',
    x:'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}万'
  },
  xAxis: {
    data: store.city_list
  },
  yAxis: {},
  series: [
    {
      name: '平均总价',
      type: 'bar',
      data: store.total_price_list,
      color:'#00BFFF',
      markPoint: {
        data: [
          { type: 'max', name: '最大值' },
          { type: 'min', name: '最小值' }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: '平均值' }]
      }
    },

  ],
  toolbox: {
    feature: {
      magicType: { show: true, type: ['line', 'bar'],title:{line:'切换为折线图',bar:'切换为柱状图'}},
      restore: { show: true ,title: '还原'},
      saveAsImage: { show: true ,title: '保存为图片'}
    },
    right:'10%'
  },
  dataZoom: [
    {
      type: 'inside',
    },
    {
      type: 'slider'
    }
  ],

}
const opts2={
  title: {
    text: '重庆各区域房屋平均房屋单价',
    x:'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}元'
  },
  xAxis: {
    data: store.city_list
  },
  yAxis: {},
  series: [
    {
      name: '平均单价',
      type: 'bar',
      data: store.single_price_list,
      color:'#FF6600',
      markPoint: {
        data: [
          { type: 'max', name: '最大值' },
          { type: 'min', name: '最小值' }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: '平均值' }]
      }
    }
  ],
  toolbox: {
    feature: {
      magicType: { show: true, type: ['line', 'bar'],title:{line:'切换为折线图',bar:'切换为柱状图'}},
      restore: { show: true ,title: '还原'},
      saveAsImage: { show: true ,title: '保存为图片'}
    },
    right:'10%'
  },
  dataZoom: [
    {
      type: 'inside',
    },
    {
      type: 'slider'
    }
  ],

}
const opts3={
  title: {
    text: '重庆各区域房屋关注人数',
    x:'center'
  },
  tooltip: {},
  xAxis: {
    data: store.city_list,
  },
  yAxis: {},
  series: [
    {
      name: '人数',
      type: 'bar',
      data: store.view_num_list,
      color:'#7FFF00',
      markPoint: {
        data: [
          { type: 'max', name: '最大值' },
          { type: 'min', name: '最小值' }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: '平均值' }]
      }
    }
  ],
  toolbox: {
    feature: {
      magicType: { show: true, type: ['line', 'bar'],title:{line:'切换为折线图',bar:'切换为柱状图'}},
      restore: { show: true ,title: '还原'},
      saveAsImage: { show: true ,title: '保存为图片'}
    },
    right:'10%'
  },
  dataZoom: [
    {
      type: 'inside',
    },
    {
      type: 'slider'
    }

  ],

}
const opts4 =  {
  title: {
    text: '重庆各区域房屋装修程度关注人数',
    left:'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  toolbox: {
    feature: {
      restore: { show: true ,title: '还原'},
      saveAsImage: { show: true ,title: '保存为图片'}
    },
    right:'10%'
  },
  legend: {
    data: store.type_list,
    left:'10%',
    orient: 'vertical',
  },
  series: [
    {
      name: '关注人数',
      type: 'funnel',
      left: '10%',
      top: 60,
      bottom: 60,
      width: '80%',
      min: 0,
      max: 100,
      minSize: '0%',
      maxSize: '100%',
      sort: 'ascending',
      gap: 2,
      label: {
        show: true,
        position: 'inside'
      },
      labelLine: {
        length: 10,
        lineStyle: {
          width: 1,
          type: 'solid'
        }
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 1
      },
      emphasis: {
        label: {
          fontSize: 20
        }
      },
      data: store.decoration_view_list
    }
  ]
};
const opts5 = {
  title: {
    text: '重庆各房屋类型关注人数',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left:'10%',
  },
  toolbox: {
    feature: {
      restore: { show: true ,title: '还原'},
      saveAsImage: { show: true ,title: '保存为图片'}
    },
    right:'10%'
  },
  series: [
    {
      name: '关注人数',
      type: 'pie',
      radius: '50%',
      data: store.house_type_list,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
</script>

<style scoped>
.house-info{
  height: 100%;
  width: 100%;
}
.el-scrollbar{
    width: 100%;
  height: 100%;
}
:deep(.el-scrollbar__view){
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
</style>