import { useState } from "react";
import { toast } from 'react-hot-toast';
import { userAuthContext } from "../context/authContext";

function handleInputErrors({fullName,userName,password,conformPassword,gender}){
    if (!userName || !password){
        toast.error("UserName and Password can not be empty");
        //to make success = false
        return false;
    }

    if (password.length < 6 ){
        toast.error("Password must contain atleast six characters");
        return false;
    }

    return true;
}

const userLogin = ()=>{
    const [loading,setLoading] = useState(false);
    const {authUser, setAuthUser} = userAuthContext();

    const login = async ({password, userName})=>{

        const success = handleInputErrors({userName, password});
        
        if (!success){
            console.log("Error in user inputs");
            return;
        }

        try{
            const res = await fetch("/api/auth/login",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ userName, password }),
            })

            if (!res.ok) {
                // Handle non-2xx status codes
                const errorData = await res.json();
                toast.error(errorData.error);
                return;
            }

            const data = await res.json();
            console.log(data);

            if (localStorage.getItem("chat-user") === null){
                localStorage.setItem("chat-user", JSON.stringify(data));
                setAuthUser(data);
            }

        }catch(error){
            toast.error(error.message);
            console.log("Error in frontend login: ", error.message)
        }finally{
            setLoading(false);
        }

    }

    return { loading,login }
}

export default userLogin;