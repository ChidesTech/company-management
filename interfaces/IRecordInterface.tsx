import { IServiceInterface } from "./IServiceInterface";

export interface IRecordInterface{
    _id? : string,
    service? : any,
    renderer? : any,
    recorder? : any,
    branch? : any,
    price? : number,
    createdAt? : any,
    updatedAt? : string
}