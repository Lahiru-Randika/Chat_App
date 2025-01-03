import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlenght: 6
    },
    gender:{
        type:String,
        required: true,
        enum: ['Male', 'Female']
    },
    profilepic: {
        type: String,
        default:""
    }

    //to get the createdAt and updatedAt time
}, {timestamps: true})

const User = mongoose.model("User",userSchema);
export default User;