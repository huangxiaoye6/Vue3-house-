<template>
  <el-drawer
      v-model="store.drawer_show"
      :title="props.title"
      :direction="direction"
      :before-close="handleClose"
  >
    <slot name="content"></slot>
  </el-drawer>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {type DrawerProps, ElMessageBox} from "element-plus";
import useUserStore from "@/store/UserStore";
const store=useUserStore()
const direction = ref<DrawerProps['direction']>('rtl')
const props=defineProps({
  title:String,
})

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('确定离开吗?')
      .then(() => {
        done()
        store.drawer_show=false
        for (let i in store.drawer_form){
          if(store.drawer_form[i]!=='' && store.drawer_form[i]!==null){
            store.drawer_form[i]=null
          }
        }
      })
      .catch(() => {
        // catch error
      })
}
</script>

<style scoped>

</style>