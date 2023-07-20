import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import Expense from "../models/expenseModel";

interface expenseBody {
    description?: string,
    recorder?: string,
    price?: number
}

interface expenseParams {
    id: string,
}

export const getExpenses: RequestHandler = async (req, res, next) => {
    const {recorder, startDate, endDate, branch } = req.query;
    const dateFilter = startDate !== endDate ? {
        createdAt: {
            $gte: startDate,
            $lte: endDate
        }
    } : {};

    const recorderFilter = recorder  ? {
        recorder : recorder
    } : {} 

    const branchFilter = branch  ? {
        branch : branch
    } : {} 

    try {
        const expenses  = await Expense.find({...dateFilter, ...branchFilter, ...recorderFilter})
        .populate("recorder")
        .sort({ _id: -1 }).exec();
        res.status(200).json(expenses);
    } catch (error) {
        next(error)
    }
}



export const createExpense: RequestHandler<unknown, unknown, expenseBody, unknown> = async (req, res, next) => {
    const { description,  price } = req.body;
    try {
        if (!description) throw createHttpError(400, "Record requires a description");
        const expense = await Expense.create(req.body);
        res.status(201).json({ success: "Expense Creation Successful", expense });
    } catch (error) {
        next(error);
    }
};


export const getExpense: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Invalid expense Id")
        const expense = await Expense.findById(id).exec();
        if (!expense) throw createHttpError(400, "Expense not found");
        res.status(200).json(expense);
    } catch (error) {
        next(error)
    }
};

export const updateExpense: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    const { description, price } = req.body;
    try {
        if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Invalid Record Id");
        const expense = await Expense.findById(id).exec();
        if (!expense) throw createHttpError(404, "Expense not found");
        const updatedExpense = await Expense.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true });
        if (!updatedExpense) throw createHttpError(400, "Error Updating Expense");
        res.status(201).json({ success: "Expense Update Successful", updatedExpense });
    } catch (error) {
        next(error);
    }
};

export const deleteExpense: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Invalid Record Id");
        const expense = await Expense.findById(id).exec();
        if (!expense) throw createHttpError(404, "Expense Not Found");
        const deletedExpense = await expense.deleteOne();
        if (!deletedExpense) throw createHttpError(400, "Error Deleting Expense")
        res.status(201).json({ success: "Expense Delete Successful" });
    } catch (error) {
        next(error);
    }
};
