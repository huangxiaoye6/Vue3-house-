export  interface User{
    name: string;
    nickname: any;
    age: number|null;
    email: string;
    password: string;
    born:string
    city:string
    phone:string
    sex:boolean
    role:any,
    drawer_show:boolean
    drawer_form:UserDrawer
}
export interface UserDrawer{
    name: string;
    nick_name: any;
    age: number|null;
    email: string;
    born:string
    city:string
    phone:string
    sex:boolean|null
    [propName:string]:any
}