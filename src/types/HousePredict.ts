export interface PredictState{
    city_area:Array<any>,
    house_type_list:Array<any>
    building_type_list:Array<any>
    decoration_list:Array<any>
    year_list:Array<any>,
    form:PredictForm
    total_price:number|null
    single_price:number|null
}
export interface PredictForm{
    city_area:any
    house_type:string
    building_type:string
    decoration:string,
    house_size:number|null,
    year:string
}