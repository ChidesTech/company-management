import http from "../http";
import { IRecordInterface } from "../../../interfaces/IRecordInterface";

export const createRecordApi = (data : IRecordInterface) => {
  return http.post<IRecordInterface>("/records", data);
}

export const getRecordsApi = (data : any) => {
    return http.get<IRecordInterface[]>(`/records/?renderer=${data.renderer}&&startDate=${data.startDate}&&endDate=${data.endDate}&&branch=${data.branch}`);
}
export const updateRecordsApi = (id : string | undefined, data : IRecordInterface) => {
    return http.put<IRecordInterface[]>('/records/' + id, data );
}

export const deleteRecordApi = (id : string) => {
    return http.delete("/records/" + id);
}