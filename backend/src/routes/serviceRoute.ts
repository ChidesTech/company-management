import * as serviceController from "../controllers/serviceController";
import express from "express";


const serviceRoutes = express.Router();
 

serviceRoutes.get("/", serviceController.getServices);
serviceRoutes.post("/", serviceController.createService);
serviceRoutes.get("/:id", serviceController.getService);
serviceRoutes.put("/:id", serviceController.updateService);
serviceRoutes.delete("/:id", serviceController.deleteService);

export default serviceRoutes;