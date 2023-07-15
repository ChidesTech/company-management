import * as recordController from "../controllers/recordController";
import express from "express";


const recordRoutes = express.Router();
 

recordRoutes.get("/", recordController.getRecords);
recordRoutes.post("/", recordController.createRecord);
recordRoutes.get("/:id", recordController.getRecord);
recordRoutes.put("/:id", recordController.updateRecord);
recordRoutes.delete("/:id", recordController.deleteRecord);

export default recordRoutes;