export interface InterObj{
    name:string
    age?:number
    [propName:string]:any  //对于剩下的数据定义泛型
}

export interface InterArray{
    array:Array<string>
}