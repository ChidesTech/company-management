import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import Service from "../models/serviceModel";

interface serviceBody {
    title? : string,
    description? : string,
    price? : number
  }

interface serviceParams {
    id : string,
}

export const getServices : RequestHandler =  async(req, res, next) => {
    try {
        const services = await Service.find().exec();
        res.status(200).json(services);
    } catch (error) {
        next(error)
    }
}



export const createService : RequestHandler<unknown, unknown, serviceBody, unknown> =  async(req, res, next) => {
    const {title, description , price} = req.body;
    try {
        if(!title) throw createHttpError(400, "Service requires a title");
        const service = await Service.create({title , description , price });
        res.status(201).json({success : "Service Creation Successful", service});
    } catch (error) {
        next(error);
    }
};


export const getService : RequestHandler =  async(req, res, next) => {
    const {id} = req.params;
    try {
        if(!mongoose.isValidObjectId(id)) throw createHttpError(400, "Invalid Service Id")
        const service = await Service.findById(id).exec();
        if(!service) throw createHttpError(400, "Service not found");  
        res.status(200).json(service);
    } catch (error) {
        next(error)
    }
};

export const updateService : RequestHandler<serviceParams , unknown, serviceBody, unknown> =  async(req, res, next) => {
    const {id} = req.params;
    const {title, description , price} = req.body;
    try {
        if(!mongoose.isValidObjectId(id)) throw createHttpError(400, "Invalid Service Id");
        const service = await Service.findById(id).exec();
        if(!service) throw createHttpError(404, "Service not found");         
        const updatedService = await Service.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true });
        if(!updateService) throw createHttpError(400, "Error Creating Service");  
        res.status(201).json({success : "Service Update Successful", updatedService});
    } catch (error) {
        next(error);
    }
};

export const deleteService : RequestHandler<serviceParams , unknown, unknown, unknown> =  async(req, res, next) => {
    const {id} = req.params; 
    try {
        if(!mongoose.isValidObjectId(id)) throw createHttpError(400, "Invalid Service Id");
        const service = await Service.findById(id).exec();
        if(!service) throw createHttpError(404, "Service Not Found");  
        const deletedService = await service.deleteOne()   ;
        if(!deletedService) throw createHttpError(400, "Error Deleting Service")      
        res.status(201).json({success : "Service Delete Successful"});
    } catch (error) {
        next(error);
    }
};
