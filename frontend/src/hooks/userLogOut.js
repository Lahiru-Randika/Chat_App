import { useState } from "react";
import { userAuthContext } from "../context/authContext";

const userLogOut = () =>{
    const [loading, setLoading] = useState(false);
    const { authUser, setAuthUser } = userAuthContext()

    const logout = async ()=>{
        setLoading(true);
        try{
            const res = await fetch("/api/auth/logout",{
                method:"POST",
                headers: {"Content-Type":"application/json"}
            })

            const data = await res.json();

            if(data.error){
                throw new Error(data.error)
            }

            //if no issue, remove the data from the local storage
            localStorage.removeItem("chat-user");
            setAuthUser(null)

        }catch(error){
            toast.error(error.message);
            console.log("Error in frontend signin: ", error.message)
        }finally{
            setLoading(false);
        }
    }

    return {loading, logout};
}

export default userLogOut;