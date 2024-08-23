import {defineStore} from "pinia";
import type {InterState} from "@/types/Index";
import requests from "@/utils/request";
import {ElMessage} from "element-plus";

const useIndexStore=defineStore('Index',{
    state:():InterState=>({
        house_num:null,
        total_price:null,
        single_price:null,
        view_num:null,
        house_list:[],
        page:0,
        city_area:[],
        city:null,
        select:null,
    }),
    actions:{
        async get_houseInfo(){
            const res=await requests.get('/app/houseInfo/',{
                headers:{
                    'Authorization':localStorage.getItem('token')
                },
            })
            const data=res.data
            if (data.code===200){
                this.house_num=data.data.house_num
                this.total_price=data.data.mean_total_price
                this.single_price=data.data.mean_single_price
                this.view_num=data.data.view_num
            }
        },
        load(){
            this.page+=1
            this.get_house_list()
        },
        async get_house_list(){
            const headers={
                'Authorization':localStorage.getItem('token')
            }
            const params:any={}
            if (this.city!==null){
                params['page']=this.page
                params['size']=20
                params['city']=this.city
            }else {
                params['page']=this.page
                params['size']=20

            }
            const res=await requests.get('/app/houseList/',{
                params:params,
                headers:headers
            })
            const data=res.data
            if (data.code===200){
                for (let i in data.data){
                    this.house_list.push(data.data[i])
                }
            }else {
                ElMessage.warning('数据到底了')
            }
        },
        async get_areas(){
            const headers={
                'Authorization':localStorage.getItem('token')
            }
            const res=await requests.get('app/area/',{
                headers:headers
            })
            const data=res.data
            if (data.code===200){
                for (let i in data.data){
                    const city:any={}
                    city['value']=data.data[i]['city']
                    city['label']=data.data[i]['city']
                    this.city_area.push(city)
                }
            }
        }
    },
    getters:{
        mean_total_price(state){
            return Math.round(state.total_price as number)
        },
        mean_sing_price(state){
            return Math.round(state.single_price as number)
        },
    }
})
export default useIndexStore