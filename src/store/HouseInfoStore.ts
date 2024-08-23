import {defineStore} from "pinia";
import requests from "@/utils/request";
import type {HouseInfoState} from "@/types/HouseInfo";

const useHouseInfoStore=defineStore('HouseInfo', {
    state:():HouseInfoState=>({
        city_list:[],
        total_price_list:[],
        single_price_list:[],
        view_num_list:[],
        decoration_view_list:[],
        house_type_list:[],
        type_list:[],
        chartShow:false
    }),
    actions:{
        async get_analysis_list(){
            const headers={
                'Authorization':localStorage.getItem('token')
            }
            const res=await requests.get('app/analysis/',{
                headers:headers
            })
            const data=res.data
            if (data.code===200){
                for (let i in data.area){
                    this.city_list.push(data.area[i]['city'])
                    this.total_price_list.push(Math.round(data.area[i]['total_price']))
                    this.single_price_list.push(Math.round(data.area[i]['single_price']))
                    this.view_num_list.push(data.area[i]['view_num'])
                }
                for (let i in data.decoration){
                    const obj:any={}
                    obj['name']=data.decoration[i]['decoration']
                    obj['value']=data.decoration[i]['view_num']
                    this.type_list.push(data.decoration[i]['decoration'])
                    this.decoration_view_list.push(obj)
                }
                for (let i in data.house_type){
                    const obj:any={}
                    obj['name']=data.house_type[i]['house_type']
                    obj['value']=data.house_type[i]['view_num']
                    this.house_type_list.push(obj)
                }

                this.chartShow=true
            }else {
                console.log('查询失败')
            }
        }
    }
})
export default useHouseInfoStore