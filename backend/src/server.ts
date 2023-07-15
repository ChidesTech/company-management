import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import createHttpError, {isHttpError} from "http-errors";
import mongoose from "mongoose";
import morgan from "morgan";
import Service from "./models/serviceModel";
import serviceRoutes from "./routes/serviceRoute";
import env from "./utils/validateEnv";
const port = env.PORT;
import cors from "cors"
import userRoutes from "./routes/userRoute";
import recordRoutes from "./routes/recordRoute";
import expenseRoutes from "./routes/expenseRoute";


const app = express();

app.use(morgan("dev"))

app.use(express.json());

app.use(cors())


app.use("/api/services", serviceRoutes);
app.use("/api/users", userRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/expenses", expenseRoutes);

app.get("/create", async (req, res) => {
    const services = await Service.insertMany([
        {title : "Barbing", price : 1000, description : "lorem ipsum sit dolor conglorificatur"},
        {title : "Shaving", price : 500, description : "lorem ipsum sit dolor conglorificatur"},
        {title : "Dyeing", price : 300, description : "lorem ipsum sit dolor conglorificatur"},
        {title : "Bleaching", price : 4500, description : "lorem ipsum sit dolor conglorificatur"},
    ]);

    res.send(services);
})

app.use((req, res, next) => {
    next(createHttpError(404 , "Endpoint not found"));
})




app.use((error : unknown, req  : Request, res : Response, next : NextFunction)=> {
    let errorMessage = 'An Unknown Error Occured';
    let statusCode = 500;
    if(isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }

    res.status(statusCode).json({error : errorMessage});


})

mongoose.connect(env.MONGODB_URL)
.then(() => {
   console.log("MongoDB Connected");
    startServer()
}).catch(
    error => console.log(error)
)


const startServer = () => {
  app.listen(port, () => {
        console.log("Listening on port 5000")
    });
}
