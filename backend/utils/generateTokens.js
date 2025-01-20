import jwt from "jsonwebtoken";

const generateTokenAndCookies = (userId, res)=>{
    //here we are digitally signing the userId with our JWT_SECRET
    const token = jwt.sign({userId},process.env.JWT_SECRET, {
        expiresIn:'15d'
    })

    //make cookies
    res.cookie("jwt",token,{
        maxAge: 15*24*60*60*1000, //because we should give 15 days in miliseconds
        httpOnly: true, //prevent XSS attacks (users can not read this via javascript)
        sameSite: "strict",//prevent CSRF attacks
        secure: process.env.NODE_ENV !=="development"
    })
}   

export default generateTokenAndCookies;