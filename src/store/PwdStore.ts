import {defineStore} from "pinia";
import type {Pwd} from "@/types/Pwd";
import {ElMessage, type FormInstance} from "element-plus";
import requests from "@/utils/request";

const usePwdStore=defineStore('Pwd',{
    state:()=>({
        form:<Pwd>{
            password:'',
            new_password:'',
            check__new_password:'',
        }
    }),
    actions:{
         validate_password(rule: any, value: any, callback: any){
            if (value === '') {
                callback(new Error('必须输入密码'))
            } else {
                callback()
            }
        },
         validate_check_new_password(rule: any, value: any, callback: any){
            if (value === '') {
                callback(new Error('请重新输入新密码'))
            } else if (value !==this.form.new_password) {
                callback(new Error("2次输入的密码不一致!"))
            } else {
                callback()
            }
        },
         validate_new_password(rule: any, value: any, callback: any){
            if (value === '') {
                callback(new Error('必须输入新密码'))
            } else {
                callback()
            }
        },
        async submitForm (formEl: FormInstance | undefined){
            if (!formEl) return
            await formEl.validate ((valid, fields) => {
                if (valid) {
                    this.changePwd()
                    formEl.resetFields()
                } else {
                    console.log('提交错误!', fields)
                }
            })
        },

         resetForm (formEl: FormInstance | undefined){
            if (!formEl) return
            formEl.resetFields()
        },
        async changePwd(){
             const res=await requests.put('http://127.0.0.1:8000/app/pwd/',{
                 username:localStorage.getItem('username'),
                 password:this.form.password,
                 new_password:this.form.new_password,
             },
             {
                 headers:{'Authorization':localStorage.getItem('token')}
             },)
            if (res.data.code===200){
                ElMessage.success('修改成功')
            }else {
                ElMessage.error(`修改失败,${res.data.error}`)
            }
        }
    }
})
export default usePwdStore;