import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import User from "../models/userModel";

import bcrypt from "bcryptjs"
import { generateToken } from "../utils/jwt";
import { IUserInterface } from "../interfaces/IUserInterface";

interface userParams {
    id: string,
}

export const getUsers: RequestHandler = async (req, res, next) => {
    const {branch} = req.query;
    const branchFilter = branch  ? {
        branch : branch
    } : {}
    try {
        const users = await User.find({...branchFilter}).exec();
        res.status(200).json(users);
    } catch (error) {
        next(error)
    }
}



export const createUser: RequestHandler<unknown, unknown, IUserInterface, unknown> = async (req, res, next) => {
    const { name, password } = req.body;
    const hashedPassword = password ? bcrypt.hashSync(password) : password;
    try {
        if (!name) throw createHttpError(400, "User's name is required");
        const user = await User.create({...req.body, password : hashedPassword});
        res.status(201).json({ success: "User Creation Successful", user });
    } catch (error) {
        next(error);
    }
};


export const getUser: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
     
    try {
        if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Invalid user Id")
        const user = await User.findById(id).exec();
        if (!user) throw createHttpError(400, "User not found");
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
};

export const updateUser: RequestHandler = async (req, res, next) => {
    const { id } = req.params;

    try {
        if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Invalid user Id");
        const user = await User.findById(id).exec();
        if (!user) throw createHttpError(404, "User not found");
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true });
        if (!updatedUser) throw createHttpError(400, "Error Creating user");
        res.status(201).json({ success: "User Update Successful", updatedUser });
    } catch (error) {
        next(error);
    }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id)) throw createHttpError(400, "Invalid user Id");
        const user = await User.findById(id).exec();    
        if (!user) throw createHttpError(404, "User Not Found");
        const deletedUser = await user.deleteOne();     
        if (!deletedUser) throw createHttpError(400, "Error Deleting user")
        res.status(201).json({ success: "User Delete Successful" });
    } catch (error) {
        next(error);
    }
};

interface LoginBody {
    email?: string,
    password?: string
}

export const loginUser: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) throw createHttpError(400, "Missing Login Credentials")
        const user: IUserInterface | null = await User.findOne({ email: email });
        if (!user) throw createHttpError(401, "Invalid Credentials");
        if (!bcrypt.compareSync(password, user.password)) throw createHttpError(401, "Invalid Credential");
        res.status(201).json({_id : user._id, username : user.username, image : user.image, branch : user.branch,isAdmin : user.isAdmin,  token : generateToken(user)});
    } catch (error) {
        next(error)
    }

}

export const checkUserToken : RequestHandler = async (req, res, next) => {
     try {
          const reason = "Checking User Authentication State"; 
     } catch (error) {
        next(error)
     }
}


