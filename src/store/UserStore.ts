import {defineStore} from "pinia";
import type {User} from "@/types/User";
import requests from "@/utils/request";
import {ElMessage, type FormInstance} from "element-plus";

const useUserStore = defineStore('user',{
    state:():User=>({
        name: '',
        nickname: localStorage.getItem('nick_name'),
        age: null,
        email: '',
        password: '',
        born:'',
        city:'',
        phone:'',
        sex:true,
        drawer_show:false,
        role:localStorage.getItem('role'),
        drawer_form:{
            name:'',
            nick_name:'',
            age: null,
            email: '',
            born:'',
            city:'',
            phone:'',
            sex:null
        }
    }),
    actions:{
         getUserInfo(){
             let info:any
             const userInfo=localStorage.getItem("userInfo");
             if(userInfo!=null){
                 info=JSON.parse(userInfo)
                 this.nickname=info.nick_name
                 this.name=info.name
                 this.age=info.age
                 this.city=info.city
                 this.phone=info.phone
                 this.email=info.email
                 this.born=info.born
                 this.sex=info.sex
             }
        },
        open_drawer(){
            this.drawer_show=true
        },
         cancelForm(formEl: FormInstance | undefined){
             this.drawer_show=false
             if (!formEl) return
             formEl.resetFields()
        },
         async changeUserInfo(formEl: FormInstance | undefined) {
            const form:any={}
            for (let i in this.drawer_form){
                if(this.drawer_form[i]!=='' && this.drawer_form[i]!==null){
                    form[i]=this.drawer_form[i]
                }
            }
             if (!formEl) return
             formEl.resetFields()
            const res=await requests.put('/app/userInfo/',form,{
                headers:{'Authorization':localStorage.getItem('token')},
                params:{'uuid':localStorage.getItem('uuid')},
            })
             const data=res.data
             if (data.code===200){
                 ElMessage.success('修改成功')
                 localStorage.removeItem('userInfo')
                 localStorage.setItem('userInfo',JSON.stringify(data.data))
                 this.getUserInfo()
             }else {
                 ElMessage.error(`修改失败,${data.error}`)
             }
             this.drawer_show = false
        },
        async submitForm (formEl: FormInstance | undefined) {
            if (!formEl) return
            await formEl.validate((valid, fields) => {
                if (valid) {
                    this.changeUserInfo(formEl)
                } else {
                    console.log('error submit!', fields)
                }
            })
        },
         validate_phone(rule: any, value: any, callback: any){
            if (/^\d+$/.test(value)) {
                callback()
            }else if(value===''){
                callback()
            }else {
                callback(new Error("手机号只能包含数字，不能包含字符"))
            }
        },
        validate_email(rule: any, value: any, callback: any){
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                callback()
            } else if(value===''){
                callback()
            }else {
                callback(new Error("请输入正确的邮箱"))
            }
        }

    }
})
export default useUserStore