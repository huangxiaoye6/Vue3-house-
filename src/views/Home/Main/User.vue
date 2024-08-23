<template>
  <el-descriptions
      class="margin-top"
      title="个人信息"
      :column="3"
      size="default"
      border
  >
    <template #extra>
      <el-button type="primary" @click="store.open_drawer">修改信息</el-button>
    </template>
    <el-descriptions-item label-class-name="label">
      <template #label>
        <div class="cell-item">
          <el-icon :style="{'marginRight': '6px'}">
            <user />
          </el-icon>
          用户名
        </div>
      </template>
      {{store.nickname}}
    </el-descriptions-item>
    <el-descriptions-item label-class-name="label">
      <template #label>
        <div class="cell-item">
          <el-icon :style="{'marginRight': '6px'}">
            <CollectionTag />
          </el-icon>
          账号等级
        </div>
      </template>
      <el-tag size="small" type="primary">{{store.role}}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label-class-name="label">
      <template #label>
        <div class="cell-item">
          <el-icon :style="{'marginRight': '6px'}">
            <location />
          </el-icon>
          所在城市
        </div>
      </template>
      {{store.city}}
    </el-descriptions-item>
    <el-descriptions-item label-class-name="label">
      <template #label>
        <div class="cell-item">
          <el-icon :style="{'marginRight': '6px'}">
            <Avatar />
          </el-icon>
          姓名
        </div>
      </template>
      {{store.name}}
    </el-descriptions-item>
    <el-descriptions-item label-class-name="label">
      <template #label>
        <div class="cell-item">
          <el-icon :style="{'marginRight': '6px'}">
            <DCaret />
          </el-icon>
          年龄
        </div>
      </template>
      {{store.age}}
    </el-descriptions-item>
    <el-descriptions-item label-class-name="label">
      <template #label>
        <div class="cell-item">
          <el-icon :style="{'marginRight': '6px'}">
            <Place />
          </el-icon>
          出生日期
        </div>
      </template>
      {{store.born}}
    </el-descriptions-item>
    <el-descriptions-item label-class-name="label">
      <template #label>
        <div class="cell-item">
          <el-icon :style="{'marginRight': '6px'}">
            <Male />
          </el-icon>
          性别
        </div>
      </template>
      {{sex}}
    </el-descriptions-item>
    <el-descriptions-item label-class-name="label">
      <template #label>
        <div class="cell-item">
          <el-icon :style="{'marginRight': '6px'}">
            <iphone />
          </el-icon>
          手机号
        </div>
      </template>
      {{store.phone}}
    </el-descriptions-item>
    <el-descriptions-item label-class-name="label">
      <template #label>
        <div class="cell-item">
          <el-icon :style="{'marginRight': '6px'}">
            <Position />
          </el-icon>
          邮箱
        </div>
      </template>
      {{store.email}}
    </el-descriptions-item>
  </el-descriptions>
<!--  抽屉-->
  <Drawer title="修改信息">
    <template v-slot:content>
      <div class="demo-drawer__content">
        <el-form :model="store.drawer_form" ref="drawerFormRef" :rules="rules">
          <el-form-item label="用户名" :label-width="formLabelWidth" prop="nick_name">
            <el-input v-model="store.drawer_form.nick_name" autocomplete="off" placeholder="请输入你的用户名"/>
          </el-form-item>
          <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="name">
            <el-input v-model="store.drawer_form.name" autocomplete="off" placeholder="请输入你的姓名"/>
          </el-form-item>
          <el-form-item label="所在城市" :label-width="formLabelWidth" prop="city">
            <el-input v-model="store.drawer_form.city" autocomplete="off" placeholder="请输入你的所在城市"/>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
            <el-input v-model="store.drawer_form.phone" autocomplete="off" placeholder="请输入你的手机号"/>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
            <el-input v-model="store.drawer_form.email" autocomplete="off" placeholder="请输入你的邮箱"/>
          </el-form-item>
          <el-form-item label="出生日期" :label-width="formLabelWidth" prop="born">
            <el-date-picker
                v-model="store.drawer_form.born"
                type="date"
                placeholder="选择日期"
                style="width: 100%"
                value-format="YYYY-MM-DD"
            />
          </el-form-item>
          <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
            <el-input-number v-model="store.drawer_form.age" :step="1" placeholder="输入年龄"/>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
            <el-radio-group v-model="store.drawer_form.sex">
              <el-radio value=true>男</el-radio>
              <el-radio value=false>女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="store.cancelForm(drawerFormRef)">取消</el-button>
          <el-button type="primary" @click="store.submitForm(drawerFormRef)">提交</el-button>
        </div>
      </div>
    </template>
  </Drawer>
</template>

<script setup lang="ts">
import {Iphone, Location, Avatar, User, Male ,CollectionTag,DCaret,Position,Place} from '@element-plus/icons-vue'
import {computed, onMounted, reactive, ref} from "vue";
import useUserStore from "@/store/UserStore";
import Drawer from "@/components/Drawer.vue";
import type {FormInstance} from "element-plus";
const drawerFormRef = ref<FormInstance>()
const store=useUserStore()
onMounted(()=>{
  let info:any
  const userInfo=localStorage.getItem("userInfo");
  if(userInfo!=null){
    info=JSON.parse(userInfo)
    store.nickname=info.nick_name
    store.name=info.name
    store.age=info.age
    store.city=info.city
    store.phone=info.phone
    store.email=info.email
    store.born=info.born
    store.sex=info.sex
  }
  store.role=localStorage.getItem("role");
})

const formLabelWidth = '80px'
const sex=computed(()=>{
  if (store.sex===true){
    return '男'
  }else {
    return '女'
  }
})
const rules=reactive({
  phone:[
     {min: 11, max:11, message: '请输入正确的手机号', trigger: 'change' },
    {validator:store.validate_phone,trigger: "change"}],
  email:[{validator:store.validate_email,trigger: "change"}],
})
</script>




<style scoped>
.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
}
.demo-drawer__footer{
  display: flex;
  justify-content: center;
}
</style>