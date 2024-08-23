export interface Register{
    username: string;
    password: string;
    check_password: string;
    phone: string;
    email: string;
    emailCode:string
}
export interface RegisterRules{
    username:Array<any>
    password:Array<any>
    check_password:Array<any>
    phone:Array<any>
    email:Array<any>
    emailCode:Array<any>
}
export interface InterRegisterProps{
    url:string
}