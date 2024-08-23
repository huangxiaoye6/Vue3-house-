<template>
  <div class="predict">
    <div class="score">
      <div class="sing_price">
        <span class="title">单价:</span>
        <span>{{store.single_price_show}}元/m2</span>
      </div>
      <div class="total_price">
        <span class="title">总价：</span>
        <span>{{store.total_price_show}}万/套</span>
      </div>
    </div>
     <el-form ref="RegisterFormRef" :model="store.form" label-width="auto" :rules="rules" style="max-width: 600px">
      <el-form-item prop="city_area">
        <el-cascader :options="store.city_area" clearable style="width: 240px" v-model="store.form.city_area"
                     placeholder="请选择区域"/>
      </el-form-item>
       <el-form-item prop="house_type">
        <el-select v-model="store.form.house_type" clearable placeholder="请选择房屋类型" style="width: 240px">
          <el-option v-for="item in store.house_type_list" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
       <el-form-item prop="building_type">
        <el-select v-model="store.form.building_type" clearable placeholder="请选择房屋的建筑类型" style="width: 240px">
          <el-option v-for="item in store.building_type_list" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
       </el-form-item>
       <el-form-item prop="decoration">
        <el-select v-model="store.form.decoration" clearable placeholder="请选择房屋的装修程度" style="width: 240px">
          <el-option v-for="item in store.decoration_list" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
       </el-form-item>
       <el-form-item prop="house_size">
         <el-input v-model="store.form.house_size" style="width: 240px" clearable placeholder="请输入房屋面积"/>
       </el-form-item>
       <el-form-item prop="year">
         <el-select v-model="store.form.year" clearable placeholder="请选择房屋的建造年份" style="width: 240px">
           <el-option v-for="item in store.year_list" :key="item.value" :label="item.label" :value="item.value"/>
         </el-select>
       </el-form-item>
       <el-form-item >
         <el-button type="primary" @click="store.submitForm(RegisterFormRef)">点击预测</el-button>
         <el-button @click="store.resetForm(RegisterFormRef)">取消</el-button>
       </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import usePredictStore from "@/store/HousePredictStore";
import type {FormInstance, FormRules} from "element-plus";
import type {PredictForm} from "@/types/HousePredict";
const store=usePredictStore()
const RegisterFormRef = ref<FormInstance>()
onMounted(()=>{
  if(store.city_area.length===0){
    store.get_select_options()
  }
})
const rules = reactive<FormRules<PredictForm>>({
  city_area:[{ required: true, message: '必须选择区域', trigger: 'change' }],
  house_type:[{ required: true, message: '必须选择房屋类型', trigger: 'change' }],
  building_type:[{ required: true, message: '必须选择房屋的建筑类', trigger: 'change' }],
  decoration:[{ required: true, message: '必须选择房屋的装修程度', trigger: 'change' }],
  house_size:[{ validator: store.validate_house_size, trigger: 'change' }],
  year:[{ required: true, message: '必须选择房屋的建造年份', trigger: 'change' }]
})
</script>


<style scoped>
.predict{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.el-form{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: flex-start;
  height: 200px;
  width: 600px;
}
.score{
  width: 1000px;
  height: 400px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.sing_price{
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
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70% ;
  line-height: 1.2em;
  letter-spacing: 0.1em;
  font-size: 1em;
  text-align: center;
  color: white;
  flex-direction: column;
}
.sing_price:hover,.total_price:hover{
  border-radius: 29% 71% 75% 25% / 82% 74% 26% 18%  ;
}
.total_price{
  width: 200px;
  height: 200px;
  box-shadow: inset 10px 10px 10px rgba(190,1,254,0.05),
  15px 25px 10px rgba(190,1,254,0.1),
  15px 20px 20px rgba(190,1,254,0.1),
  inset -10px -10px 15px rgba(225,255,255,0.5);
  transition: 0.5s;
  display: flex;
  justify-content: center;
  background-color: #c61dff;
  align-items: center;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70% ;
  line-height: 1.2em;
  letter-spacing: 0.1em;
  font-size: 1em;
  text-align: center;
  color: white;
  flex-direction: column;
}
.title{
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 20px;
}
</style>