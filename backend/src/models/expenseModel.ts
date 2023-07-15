import mongoose from "mongoose";



const expenseSchema = new mongoose.Schema({
    description : {type : String},
    recorder : {type : mongoose.Types.ObjectId, ref : "User"},
    branch : {type : String},
    price : {type : Number}
}, {timestamps : true});


type ExpenseType = mongoose.InferSchemaType<typeof expenseSchema>
const Expense = mongoose.model<ExpenseType>("Expense", expenseSchema);
export default Expense;