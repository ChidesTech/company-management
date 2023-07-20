import * as serviceController from "../controllers/serviceController";
import express from "express";
import { isAdmin, isAuth } from "../utils/jwt";


const serviceRoutes = express.Router();
 

serviceRoutes.get("/", serviceController.getServices);
serviceRoutes.post("/",isAuth, isAdmin, serviceController.createService);
serviceRoutes.get("/:id",isAuth, serviceController.getService);
serviceRoutes.put("/:id",isAuth, isAdmin, serviceController.updateService);
serviceRoutes.delete("/:id",isAuth, isAdmin, serviceController.deleteService);

export default serviceRoutes;