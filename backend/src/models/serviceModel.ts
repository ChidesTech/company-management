import mongoose from "mongoose";



const serviceSchema = new mongoose.Schema({
    title : {type : String, required : true},
    description : {type : String},
    price : {type : Number}
}, {timestamps : true});


type ServiceType = mongoose.InferSchemaType<typeof serviceSchema>
const Service = mongoose.model<ServiceType>("Service", serviceSchema);
export default Service;