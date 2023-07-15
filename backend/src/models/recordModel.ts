import mongoose from "mongoose";



const recordSchema = new mongoose.Schema({
    service : {type : mongoose.Types.ObjectId, ref : "Service"},
    renderer : {type : mongoose.Types.ObjectId, ref : "User"},
    recorder : {type : mongoose.Types.ObjectId, ref : "User"},
    branch : {type : String},
    price : {type : Number}
}, {timestamps : true});


type RecordType = mongoose.InferSchemaType<typeof recordSchema>
const Record = mongoose.model<RecordType>("Record", recordSchema);
export default Record;