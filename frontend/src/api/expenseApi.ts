import http from "../http";
import { IExpenseInterface } from "../interfaces/IExpenseInterface";

export const createExpenseApi = (data : IExpenseInterface) => {
  return http.post<IExpenseInterface>("/expenses", data);
}

export const getExpensesApi = (data : any) => {
    return http.get<IExpenseInterface[]>(`/expenses/?recorder=${data.recorder}&&startDate=${data.startDate}&&endDate=${data.endDate}&&branch=${data.branch}`);
}
export const updateExpensesApi = (id : string | undefined, data : IExpenseInterface) => {
    return http.put<IExpenseInterface[]>('/expenses/' + id, data );
}

export const deleteExpenseApi = (id : string) => {
    return http.delete("/expenses/" + id);
}