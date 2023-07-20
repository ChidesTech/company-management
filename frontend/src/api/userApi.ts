import http from "../http";
import { IUserInterface } from "../interfaces/IUserInterface";

const userInfo = JSON.parse(localStorage.getItem("userInfo")!)

export const createUserApi = (data : IUserInterface) => {
  return http.post<IUserInterface>("/users", data, 
  {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
  });
}

export const getUsersApi= (data : any) => {
    return http.get<IUserInterface[]>(`/users/?branch=${data.branch}`,
    {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
    });
}

export const updateUsersApi= (id : string | undefined, data : IUserInterface) => {
    return http.put<IUserInterface[]>('/users/' + id, data, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
    } );
}

export const deleteUserApi = (id : any) => {
    return http.delete("/users/" + id,
    {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
    });
}

export const loginUser = ( data: IUserInterface) => {
    return http.post<IUserInterface>(`/users/login`, data);
}