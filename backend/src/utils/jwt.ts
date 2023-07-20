import { NextFunction, Request, RequestHandler, Response } from "express";
import createHttpError from "http-errors";
import jwt, { JwtPayload } from "jsonwebtoken"
import { IUserInterface } from "../interfaces/IUserInterface";



export const generateToken = (user : IUserInterface)=>{
return jwt.sign({_id : user._id, username : user.username, image : user.image, branch : user.branch,isAdmin : user.isAdmin},
    "secret", {expiresIn: 60 * 30 + "s"}
)
};


interface CustomRequest extends Request {
    user: any
}



export const isAuth = (req : Request , res :  Response , next  : NextFunction)=>{
const authorization = req.headers.authorization;
if(authorization){
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, "secret", (err, decode)=>{
        if(err){
            throw createHttpError(401, "Token Is Invalid")
            // res.status(401).send({message: "Token is Invalid"});
        }else{
            (req as CustomRequest).user = decode;
            next();
        }
    })
}
else{
    throw createHttpError(401, "No Token Provided")
}
};



export const isAdmin = (req : Request, res : Response, next : NextFunction) =>{
    if ((req as CustomRequest).user && (req as CustomRequest).user.isAdmin) {
        next();
      } else {
        throw createHttpError(401, "Invalid Admin Token")
      }

}

