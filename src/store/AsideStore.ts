import {defineStore} from "pinia";
import type {AsideState} from "@/types/Aside";

const useAsideStore=defineStore('Aside',{
    state:():AsideState=>({
        isCollapse:false,
    }),
    actions:{
        changeShow(){
            this.isCollapse=!this.isCollapse;
            // if(!this.isCollapse){
            //     this.width=200
            // }else {
            //     this.width=64
            // }

        }
    }
})
export default useAsideStore;