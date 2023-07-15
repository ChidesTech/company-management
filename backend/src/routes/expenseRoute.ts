import * as expenseController from "../controllers/expenseController";
import express from "express";


const expenseRoutes = express.Router();
 

expenseRoutes.get("/", expenseController.getExpenses);
expenseRoutes.post("/", expenseController.createExpense);
expenseRoutes.get("/:id", expenseController.getExpense);
expenseRoutes.put("/:id", expenseController.updateExpense);
expenseRoutes.delete("/:id", expenseController.deleteExpense);

export default expenseRoutes;