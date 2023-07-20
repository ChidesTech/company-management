import * as recordController from "../controllers/recordController";
import express from "express";
import { isAdmin, isAuth } from "../utils/jwt";


const recordRoutes = express.Router();
 

recordRoutes.get("/",isAuth, recordController.getRecords);
recordRoutes.post("/", isAuth, recordController.createRecord);
recordRoutes.get("/:id",isAuth,isAdmin, recordController.getRecord);
recordRoutes.put("/:id",isAuth, isAdmin, recordController.updateRecord);
recordRoutes.delete("/:id",isAuth, isAdmin, recordController.deleteRecord);

export default recordRoutes;