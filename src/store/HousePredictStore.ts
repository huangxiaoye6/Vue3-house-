import {defineStore} from "pinia";
import requests from "@/utils/request";
import type {PredictState} from "@/types/HousePredict";
import {ElMessage, type FormInstance} from "element-plus";
import { ElLoading } from 'element-plus'
const usePredictStore =defineStore('predict',{
    state:():PredictState=>({
        city_area:[],
        house_type_list:[],
        building_type_list:[],
        decoration_list:[],
        year_list:[],
        total_price:null,
        single_price:null,
        form:{
            city_area:'',
            house_type:'',
            building_type:'',
            decoration:'',
            year:'',
            house_size:null
        }
    }),
    actions:{
        async predict(){
            const loading = ElLoading.service({
                lock: true,
                text: '预测中',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            const headers={
                'Authorization':localStorage.getItem('token')
            }
            const form_data:any={
                city:this.form.city_area[0],
                area:this.form.city_area[1],
                house_size:Number(this.form.house_size),
                house_type:this.form.house_type,
                decoration:this.form.decoration,
                building_type:this.form.building_type,
                year:this.form.year,
            }
            const res=await requests.post('/app/predict/',form_data,{headers:headers},)
            const data=await res.data
            if (data){
                loading.close()
                if (data.code===200){
                    ElMessage.success('预测成功')
                    this.total_price=data.data.total_price
                    this.single_price=data.data.single_price
                }else {
                    ElMessage.error('预测失败')
                }
            }
        },
        async get_select_options(){
            const headers={
                'Authorization':localStorage.getItem('token')
            }
            const res=await requests.get('app/options/',{
                headers:headers
            })
            const data=res.data
            if (data.code===200){
                for (let i in data.data.city_area_list){
                    const city:any={}
                    const area_list=[]
                    city['value']=data.data.city_area_list[i]['city']
                    city['label']=data.data.city_area_list[i]['city']
                    for (let a in data.data.city_area_list[i]['areas']){
                        const area:any={}
                        area['value']=data.data.city_area_list[i]['areas'][a]
                        area['label']=data.data.city_area_list[i]['areas'][a]
                        area_list.push(area)
                    }
                    city['children']=area_list
                    this.city_area.push(city)
                }
                for(let i in data.data.house_type_list){
                    const house_type:any={}
                    house_type['value']=data.data.house_type_list[i]
                    house_type['label']=data.data.house_type_list[i]
                    this.house_type_list.push(house_type)
                }
                for(let i in data.data.building_type_list){
                    const building_type:any={}
                    building_type['value']=data.data.building_type_list[i]
                    building_type['label']=data.data.building_type_list[i]
                    this.building_type_list.push(building_type)
                }
                for(let i in data.data.decoration_list){
                    const decoration:any={}
                    decoration['value']=data.data.decoration_list[i]
                    decoration['label']=data.data.decoration_list[i]
                    this.decoration_list.push(decoration)
                }
                for(let i=1990 ;i<=2024;i++){
                    const year:any={}
                    year['label']=`${i}年`
                    year['value']=`${i}年`
                    this.year_list.push(year)
                }
                this.year_list.push({'label':'其它年份','value':' '})
            }
        },
        validate_house_size (rule: any, value: any, callback: any){
            if (value === '') {
                callback(new Error('房屋面积必须输入'))
            } else if (/\b\d+(\.\d+)?\b/g.test(value)) {
                callback()
            } else {
                callback(new Error("房屋面积只能包含数字，不能包含字符"))
            }
        },
        async submitForm(formEl: FormInstance | undefined) {
            if (!formEl) return
            await formEl.validate((valid, fields) => {
                if (valid) {
                    this.predict()
                } else {
                    console.log('提交错误', fields)
                }
            })
            formEl.resetFields()
        },
        resetForm(formEl: FormInstance | undefined){
            if (!formEl) return
            formEl.resetFields()
        }
    },
    getters:{
        total_price_show(state){
            if (state.total_price==null){
                return '暂无数据'
            }else {
                return state.total_price
            }
        },
        single_price_show(state){
            if (state.single_price==null){
                return '暂无数据'
            }else {
                return state.single_price
            }
        }
    }
})
export default usePredictStore