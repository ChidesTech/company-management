import * as userController from "../controllers/userController";
import express from "express";
import { isAdmin, isAuth } from "../utils/jwt";


const userRoutes = express.Router();
 

userRoutes.get("/", isAuth , userController.getUsers);
userRoutes.post("/",isAuth, isAdmin, userController.createUser);
userRoutes.post("/login", userController.loginUser);
userRoutes.get("/check/user/token",isAuth, userController.checkUserToken);
userRoutes.get("/:id",isAuth, userController.getUser);
userRoutes.put("/:id",isAuth, isAdmin, userController.updateUser);
userRoutes.delete("/:id",isAuth, isAdmin, userController.deleteUser);

export default userRoutes;