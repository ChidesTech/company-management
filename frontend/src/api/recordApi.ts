import http from "../http";
import { IRecordInterface } from "../interfaces/IRecordInterface";
const userInfo = JSON.parse(localStorage.getItem("userInfo")!)

export const createRecordApi = (data : IRecordInterface) => {
  return http.post<IRecordInterface>("/records", data, {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
});
}

export const getRecordsApi = (data : any) => {
    return http.get<IRecordInterface[]>(`/records/?renderer=${data.renderer}&&startDate=${data.startDate}&&endDate=${data.endDate}&&branch=${data.branch}`,
    {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
    });
}
export const updateRecordsApi = (id : string | undefined, data : IRecordInterface) => {
    return http.put<IRecordInterface[]>('/records/' + id, data ,{
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
    });
}

export const deleteRecordApi = (id : string) => {
    return http.delete("/records/" + id, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
    });
}