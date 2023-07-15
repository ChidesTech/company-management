import * as userController from "../controllers/userController";
import express from "express";


const userRoutes = express.Router();
 

userRoutes.get("/", userController.getUsers);
userRoutes.post("/", userController.createUser);
userRoutes.post("/login", userController.loginUser);
userRoutes.get("/:id", userController.getUser);
userRoutes.put("/:id", userController.updateUser);
userRoutes.delete("/:id", userController.deleteUser);

export default userRoutes;