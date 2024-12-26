import User from "../models/userModel.js";

export const getUsersForSidebar = async (req,res) =>{
    try{
        //get the current logged user's id from the protectRoutes function
        const loggedInUserId  = req.user._id;

        //get all the users from the user schema expect the logged user himself
        const filteredUsers = await User.find({
            _id: { $ne: loggedInUserId}
        }).select("-password -gender");
        //If i want to have a feature like message to yourself like in whatsapp I can just use
        //const allUsers = await User.find().select("-password -gender");

        res.status(200).json(filteredUsers);

    }catch(error){
        console.log("Error in getUserForSidebar: ", error.message)
        res.status(500).json({
            error:"Internal server Error"
        })
    }
};