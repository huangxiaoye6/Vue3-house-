export interface Pwd{
    new_password:string,
    password:string,
    check__new_password:string
}
export interface PwdRules{
    new_password:Array<any>
    password:Array<any>
    check__new_password:Array<any>
}