import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import Record from "../models/recordModel";

interface recordBody {
    service?: string,
    renderer?: string,
    recorder?: string,
    price?: number
}

interface recordParams {
    id: string,
}

export const getRecords: RequestHandler = async (req, res, next) => {
    const { renderer, startDate, endDate, branch } = req.query;
    const dateFilter = startDate !== endDate ? {
        createdAt: {
            $gte: startDate,
            $lte: endDate
        }
    } : {};

    const rendererFilter = renderer  ? {
        renderer : renderer
    } : {} 
    const branchFilter = branch  ? {
        branch : branch
    } : {} 

    try {
        const records = await Record.find({...rendererFilter, ...dateFilter, ...branchFilter})
        .populate("service renderer recorder")
        .sort({ _id: -1 }).exec();
        res.status(200).json(records);
    } catch (error) {
        next(error)
    }
}



export const createRecord: RequestHandler<unknown, unknown, recordBody, unknown> = async (req, res, next) => {
    const { service, renderer, price } = req.body;
    try {
        if (!service) throw createHttpError(400, "Record requires a service");
        const record = await Record.create(req.body);
        res.status(201).json({ success: "Record Creation Successful", record });
    } catch (error) {
        next(error);
    }
};


export const getRecord: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Invalid Record Id")
        const record = await Record.findById(id).exec();
        if (!record) throw createHttpError(400, "Record not found");
        res.status(200).json(record);
    } catch (error) {
        next(error)
    }
};

export const updateRecord: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    const { service, renderer, price } = req.body;
    try {
        if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Invalid Record Id");
        const record = await Record.findById(id).exec();
        if (!record) throw createHttpError(404, "Record not found");
        const updatedRecord = await Record.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true });
        if (!updatedRecord) throw createHttpError(400, "Error Updating Record");
        res.status(201).json({ success: "Record Update Successful", updatedRecord });
    } catch (error) {
        next(error);
    }
};

export const deleteRecord: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Invalid Record Id");
        const record = await Record.findById(id).exec();
        if (!record) throw createHttpError(404, "Record Not Found");
        const deletedRecord = await record.deleteOne();
        if (!deletedRecord) throw createHttpError(400, "Error Deleting Record")
        res.status(201).json({ success: "Record Delete Successful" });
    } catch (error) {
        next(error);
    }
};
