import http from "../http";
import { IExpenseInterface } from "../interfaces/IExpenseInterface";
const userInfo = JSON.parse(localStorage.getItem("userInfo")!)

export const createExpenseApi = (data : IExpenseInterface) => {
  return http.post<IExpenseInterface>("/expenses", data, {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
});
}

export const getExpensesApi = (data : any) => {
    return http.get<IExpenseInterface[]>(`/expenses/?recorder=${data.recorder}&&startDate=${data.startDate}&&endDate=${data.endDate}&&branch=${data.branch}`,
    {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
    });
}
export const updateExpensesApi = (id : string | undefined, data : IExpenseInterface) => {
    return http.put<IExpenseInterface[]>('/expenses/' + id, data ,{
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
    });
}

export const deleteExpenseApi = (id : string) => {
    return http.delete("/expenses/" + id, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
    });
}