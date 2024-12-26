import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndCookies from "../utils/generateTokens.js";


//---------------------SignIn------------------------//
export const signinUser = async (req,res)=>{
    try{
        //get data from the user body
        const {fullName, userName, password, conformPassword, gender} = req.body;

        //password and conform password compare
        if (password !== conformPassword){
            return res.status(400).json({
                error:"Password does not match"
            })
        }

        //check if the username is exits already in Db
        const user = await User.findOne({userName});
        if(user){
            return res.status(400).json({
                error:"Username already exists"
            })
        }

        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //profile pics avtars
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        //create a new user using the userModel
        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilepic: gender === "male"? boyProfilePic : girlProfilePic
        })

        //if successfull
        if (newUser){
            //generate jwt token
            generateTokenAndCookies(newUser._id,res);

            //save the created user model instatnt in the Db
            await newUser.save();

            res.status(200).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilepic: newUser.profilepic
            })
        }else{
            res.status(500).json({
                error:"Invalid user data"
            })
        }

    }catch(error){
        console.log("Error in signin",error.message);
        res.status(500).json({
            error:"Internal server error"
        })
    }
}

//---------------------LogIn------------------------//
export const loginUser = async(req,res)=>{
    try{
        //get username and password fom user
        const {userName, password} = req.body;

        //check in the database if the user is exists ( should pass userName as an object)
        const user = await User.findOne({userName});

        //check is the password correct ( here {user?.password || ""} is used because it will not crash the app ,if user is not exists the db)
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect){
            return res.status(400).json({
                error:"Invalid username or password"
            })
        }

        //generate cookies for the session
        generateTokenAndCookies(user._id,res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilepic: user.profilepic
        })

    }catch(error){
        console.log("login error");
        res.status(500).json({
            error:"Internal server error in login"
        })
    }
}

//---------------------LogOut------------------------//
export const logoutUser = (req,res)=>{
    try{
        //empty the jwt and remove the cookies
        res.cookie("jwt"," ", {
            maxAge:0
        })

        res.status(200).json({
            message:"Logged out successfully"
        })
    }catch(error){
        console.log("logout error");
        res.status(500).json({
            error:"Internal server error in logout"
        })
    }
}
