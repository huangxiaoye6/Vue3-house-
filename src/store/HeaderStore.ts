import {defineStore} from "pinia";
import router from "@/router";
import type {headerState} from "@/types/Header";

const useHeaderStore = defineStore('Header',{
    state:():headerState=>({
        avatar:null,
        nickname:null,
        data:{
            'uuid':localStorage.getItem("uuid"),
        },
        headers:{
            'Authorization':localStorage.getItem("token")
        }
    }),
    actions:{
        exit(){
            localStorage.clear()
            router.push('/login')
        },
        user(){
            router.push('/home/user')
        },
        pwd(){
            router.push('/home/pwd')
        },
    }
})
export default useHeaderStore