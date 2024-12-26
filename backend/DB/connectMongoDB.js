import mongoose from "mongoose";

const connectToMongoDB = async ()=>{
    try{
        await mongoose.connect(process.env.MOG_DB_URI);
        console.log("Connected to the DB successfully")
    }catch(error){
        console.log("Error connecting to the DB", error.message)
    }
}

export default connectToMongoDB