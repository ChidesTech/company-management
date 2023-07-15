import mongoose from "mongoose";



const userSchema = new mongoose.Schema({ 
        name : {type : String},
        image : {type : String},
        phone : {type : String},
        address : {type : String},
        role : {type : String},
        guarantorName : {type : String},
        guarantorPhone : {type : String},
        createdAt : {type : String},
        updatedAt : {type : String},
        email : {type : String},
        password : {type : String},
        username : {type : String},
        isAdmin : {type : Boolean , default : false},
        branch : {type : String}
    
}, {timestamps : true});


type UserType = mongoose.InferSchemaType<typeof userSchema>
const User = mongoose.model<UserType>("User", userSchema);
export default User;