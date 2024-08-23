<template>
<div class="view">
  <el-tooltip
      class="box-item"
      effect="light"
      content="点击退出"
      placement="bottom"
  >
  <div class="exit" @click="store.exit(router)">
    <el-icon><SwitchButton /></el-icon>
    <span style="margin-left: 5px">退出大屏</span>
  </div>
  </el-tooltip>
  <div class="echarts_left">
    <echarts :options="opt1" style="height: 50%;width: 100%" v-if="store.echarts_show" theme='dark'></echarts>
    <echarts :options="opts4" style="height: 50%;width: 100%" v-if="store.echarts_show" theme="dark"></echarts>
  </div>
  <div class="echarts_center">
    <echarts :options="opts2" style="height: 100%;width: 100%" v-if="store.echarts_show" theme="dark" ></echarts>
  </div>
  <div class="echarts_right">
    <echarts :options="opts3" style="height: 50%;width: 100%" v-if="store.echarts_show" theme="dark"></echarts>
    <echarts :options="opts5" style="height: 50%;width: 100%" v-if="store.echarts_show" theme="dark"></echarts>
  </div>
</div>
</template>

<script setup lang="ts">
import useViewStore from "@/store/ViewStore";
import {useRouter} from "vue-router";
import {SwitchButton} from '@element-plus/icons-vue'
import Echarts from "@/components/Echarts.vue";
import 'echarts-wordcloud';
import {onMounted} from "vue";
const router=useRouter()
const store=useViewStore()
onMounted(()=>{
  if (store.house_Type_list.length===0){
    store.get_map_data()
  }
})
const opt1 = {
  title: {
    text: '重庆各区域房型关注人数',
    x:'center',
    top:'7%'
  },
  toolbox: {
    feature: {
      magicType: { show: true, type: ['line', 'bar'],title:{line:'切换为折线图',bar:'切换为柱状图'}},
      restore: { show: true ,title: '还原'},
      saveAsImage: { show: true ,title: '保存为图片'},
    },
    top:'2%',
  },
  dataZoom: [
    {
      type: 'inside',
    },
    {
      type: 'slider'
    }
  ],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
      type: 'category',
      name:'house_type',
      data:store.house_Type_list,
      axisTick: {
        alignWithLabel: true
      },
    },
  yAxis: {},
  series: [
    {
      name: '关注人数',
      type: 'bar',
      barWidth: '60%',
      data:store.type_view__num,
      order: 'desc',
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
  ]
};
const opts2 = {
  title: {
    text: '重庆各区域房屋概况',
    left: 'center',
    top:'5%'
  },
  series: [
    {
      name: '房屋总价',
      type: 'map',
      map: 'CQ',
      label: {
        show: true
      },
      roam: true,
      data: store.total_price_list,
      itemStyle: {
        areaColor: '#ddffdd'
      }
    },
    {
      name: '房屋单价',
      type: 'map',
      map: 'CQ',
      label: {
        show: true
      },
      roam: true,
      data: store.single_price_list,
      itemStyle: {
        areaColor: '#ccc'
      }
    },
    {
      name: '关注人数',
      type: 'map',
      map: 'CQ',
      label: {
        show: true
      },
      roam: true,
      data: store.view_num_list,
      itemStyle: {
        areaColor: '#ffdddd'
      }
    },
  ],
  toolbox: {
    feature: {
      restore: { show: true ,title: '还原'},
      saveAsImage: { show: true ,title: '保存为图片'}
    },
    top:'2%',
  },
  visualMap: {
    min: 4000,
    max: 10000,
    left:'15%',
    text: ['High', 'Low'],
    realtime: false,
    calculable: true,
    inRange: {
      color: ['lightskyblue', 'yellow', 'orangered']
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: function (params: any) {
      let res = params.name + '<br/>';
      opts2.series.forEach(function (serie) {
        if (serie.data && serie.data.length > 0) {
          const data = serie.data.find(function (item: any) {
            return item.name === params.name;
          });
          if (data) {
            let unit = '';
            switch (serie.name) {
              case '房屋总价':
                unit = '万元';
                break;
              case '房屋单价':
                unit = '元';
                break;
              case '关注人数':
                unit = '人';
                break;
            }
            res += serie.name + ' : ' + data.value + unit + '<br/>';
          }
        }
      });
      return res;
    }
  },
};
const opts3 = {
  title: {
    text: '重庆在售各房屋朝向类型数量TOP30',
    left: 'center',
    top:'10%'
  },
  tooltip: {
    show: true
  },
  toolbox: {
    feature: {
      restore: { show: true ,title: '还原'},
      saveAsImage: { show: true ,title: '保存为图片'}
    },
    top:'2%',
  },
  series: [{
    type: 'wordCloud',
    gridSize: 8,
    rotationStep: 45,
    shape: 'pentagon',
    width: '100%',
    height: '100%',
    drawOutOfBound: false,
    textStyle: {
      normal: {
        color: function() {
          return 'rgb(' +
              Math.round(Math.random() * 255) +
              ', ' + Math.round(Math.random() * 255) +
              ', ' + Math.round(Math.random() * 255) + ')'
        }
      },
      emphasis: {
        shadowBlur: 10,
        shadowColor: '#333'
      }
    },
    data: store.toward_list
  }]
};
const opts4 =  {
  title: {
    text: '重庆各建筑类型房屋的平均总价',
    left:'center',
    top:'5%'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}万元 ({d}%)'
  },
  toolbox: {
    feature: {
      restore: { show: true ,title: '还原'},
      saveAsImage: { show: true ,title: '保存为图片'}
    },
    top:'2%',
  },
  series: [
    {
      name: '平均总价',
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
      data: store.building_type_list
    }
  ]
};
const opts5= {
  title: {
    text: '重庆在售各装修类型的房屋单价',
    left: 'center',
    top:'10%'
  },
  toolbox: {
    feature: {
      restore: { show: true ,title: '还原'},
      saveAsImage: { show: true ,title: '保存为图片'}
    },
    top:'10%'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}元/m2   ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    top:'20%'
  },
  series: [
    {
      name: '单价',
      type: 'pie',
      radius: '50%',
      data: store.decoration_list,
      roseType: 'area',
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
</script>

<style scoped>
.view{
  width: 99vw;
  height: 99vh;
  display: flex;
  box-sizing: border-box;
}
.exit{
  cursor: pointer;
  width: 100px;
  height: 30px;
  line-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #100C2A;
  position: absolute;
  left: 50%;
  color: white;
  border-radius: 20px;
  z-index: 1;
  font-weight: 700;
}
.el-switch{
  position: absolute;
  left: 60%;
  z-index: 1;
}
.echarts_left,.echarts_right{
  flex: 1;
  box-sizing: border-box;
  height: 100%;
}
.echarts_center{
  flex: 2;
  height: 100%;
  box-sizing: border-box;
}
</style>