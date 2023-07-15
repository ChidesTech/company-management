import http from "../http";
import { IUserInterface } from "../../../interfaces/IUserInterface";

export const createUserApi = (data : IUserInterface) => {
  return http.post<IUserInterface>("/users", data);
}

export const getUsersApi= (data : any) => {
    return http.get<IUserInterface[]>(`/users/?branch=${data.branch}`);
}

export const updateUsersApi= (id : string | undefined, data : IUserInterface) => {
    return http.put<IUserInterface[]>('/users/' + id, data );
}

export const deleteUserApi = (id : any) => {
    return http.delete("/users/" + id);
}

export const loginUser = ( data: IUserInterface) => {
    return http.post<IUserInterface>(`/users/login`, data);
}