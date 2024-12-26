import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protectRoute = async (req,res,next)=>{
    try{
        //access the cookies to get the jwt token
        const token = req.cookies.jwt;
        if (!token){
            return res.status(401).json({
                error:"Unauthorized: no token provided"
            })
        }

        //decoding the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded){
            return res.status(401).json({
                error:"Unauthorized: invalid token | wrong user"
            })
        }

        //User.findById(decoded.userId) => find a user in user schema according to the user id that was decoded from the jwt cookies
        //select("-password") => select that user data without the password
        //this is called under decoded.userId because we signed the token as userId in generateTokens.js in util 'token = jwt.sign({userId},process.env.JWT_SECRET, {expiresIn:'15d'})'
        const user = await User.findById(decoded.userId).select("-password");
        if (!user){
            return res.status(404).json({
                error:"user not found"
            })
        }

        //requested user => user in the database
        req.user = user;

        //this will automatically calls the next function which is "sendMessage" in messageroutes.js
        //router.post("/send/:userid",protectRoute, sendMessage) so we can use 
        next();

    }catch(error){
        console.log("error in protecRoute middleware", error.message);
        res.status(500).json({
            error:"Internal server error"
        })
    }
}

export default protectRoute;