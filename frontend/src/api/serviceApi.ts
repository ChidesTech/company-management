import http from "../http";
import { IServiceInterface } from "../../../interfaces/IServiceInterface";

export const createServiceApi = (data : IServiceInterface) => {
  return http.post<IServiceInterface>("/services", data);
}

export const getServicesApi= () => {
    return http.get<IServiceInterface[]>('/services');
}
export const updateServicesApi= (id : string | undefined, data : IServiceInterface) => {
    return http.put<IServiceInterface[]>('/services/' + id, data );
}

export const deleteServiceApi = (id : string) => {
    return http.delete("/services/" + id);
}