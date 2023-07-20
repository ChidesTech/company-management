import http from "../http";
import { IServiceInterface } from "../interfaces/IServiceInterface";
const userInfo = JSON.parse(localStorage.getItem("userInfo")!)

export const createServiceApi = (data : IServiceInterface) => {
  return http.post<IServiceInterface>("/services", data, {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
});
}

export const getServicesApi= () => {
    return http.get<IServiceInterface[]>('/services',
    {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
    });
}
export const updateServicesApi= (id : string | undefined, data : IServiceInterface) => {
    return http.put<IServiceInterface[]>('/services/' + id, data, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
    } );
}

export const deleteServiceApi = (id : string) => {
    return http.delete("/services/" + id, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
    });
}