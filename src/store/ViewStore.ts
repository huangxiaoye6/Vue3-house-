import {defineStore} from "pinia";
import requests from "@/utils/request";
import type {ViewState} from "@/types/View";

const useViewStore=defineStore('View',{
    state:():ViewState=>({
        total_price_list:[],
        single_price_list:[],
        view_num_list:[],
        echarts_show:false,
        house_Type_list:[],
        type_view__num:[],
        toward_list:[],
        decoration_list:[],
        building_type_list:[],
    }),
    actions:{
        exit(router:any){
            router.push('/home/houseView')
        },
        async get_map_data(){
            const headers={
                'Authorization':localStorage.getItem('token')
            }
            const res=await requests.get('/app/houseview/',{
                headers:headers
            })
            const data=await res.data
            if (data.code===200){
                for (let i in data.data['area_Analysis']){
                    const total_price:any={}
                    const single_price:any={}
                    const view_num:any={}
                    total_price['name']=data.data['area_Analysis'][i]['city']
                    total_price['value']=Math.round(data.data['area_Analysis'][i]['total_price'])
                    single_price['name']=data.data['area_Analysis'][i]['city']
                    single_price['value']=Math.round(data.data['area_Analysis'][i]['single_price'])
                    view_num['name']=data.data['area_Analysis'][i]['city']
                    view_num['value']=data.data['area_Analysis'][i]['view_num']
                    this.total_price_list.push(total_price)
                    this.single_price_list.push(single_price)
                    this.view_num_list.push(view_num)
                }
                for (let i in data.data['house_type_Analysis']){
                    this.house_Type_list.push(data.data['house_type_Analysis'][i]['house_type'])
                    this.type_view__num.push(data.data['house_type_Analysis'][i]['view_num'])
                }
                for (let i in data.data['toward_Analysis']){
                    const toward:any={}
                    toward['name']=data.data['toward_Analysis'][i]['toward']
                    toward['value']=data.data['toward_Analysis'][i]['toward_num']
                    this.toward_list.push(toward)
                }
                for (let i in data.data['decoration_Analysis']){
                    const decoration:any={}
                    decoration['name']=data.data['decoration_Analysis'][i]['decoration']
                    decoration['value']=Math.round(data.data['decoration_Analysis'][i]['single_price'])
                    this.decoration_list.push(decoration)
                }
                for (let i in data.data['building_type_Analysis']){
                    const building_type:any={}
                    building_type['name']=data.data['building_type_Analysis'][i]['building_type']
                    building_type['value']=Math.round(data.data['building_type_Analysis'][i]['total_price'])
                    this.building_type_list.push(building_type)
                }

            }
            this.echarts_show=true

        }
    }
})
export default useViewStore;