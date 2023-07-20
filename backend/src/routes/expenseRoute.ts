import * as expenseController from "../controllers/expenseController";
import express from "express";
import { isAdmin, isAuth } from "../utils/jwt";


const expenseRoutes = express.Router();
 

expenseRoutes.get("/",isAuth, expenseController.getExpenses);
expenseRoutes.post("/", isAuth, expenseController.createExpense);
expenseRoutes.get("/:id",isAuth, isAdmin, expenseController.getExpense);
expenseRoutes.put("/:id",isAuth, isAdmin, expenseController.updateExpense);
expenseRoutes.delete("/:id",isAuth, isAdmin, expenseController.deleteExpense);

export default expenseRoutes;