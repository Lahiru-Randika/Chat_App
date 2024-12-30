import { useState } from "react";
import { toast } from 'react-hot-toast';

function handleInputErrors({fullName,userName,password,conformPassword,gender}){
    if (!fullName || !userName || !password || !conformPassword || !gender){
        toast.error("Please fill in all fields");
        //to make success = false
        return false;
    }

    if (password != conformPassword){
        toast.error("Password do not match");
        return false;
    }

    if (password.length < 6 ){
        toast.error("Password must contain atleast six characters");
        return false;
    }

    return true;
}

const userSignUp = ()=>{
    const [loading, setLoading] = useState(false);

    const signup = async ({fullName, userName, password, conformPassword, gender}) =>{
        const success = handleInputErrors({fullName, userName, password, conformPassword, gender});

        if(!success){
            return;
        }

        try{
            const res = await fetch("/api/auth/signup",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ fullName, userName, password, conformPassword, gender }),
            });

            if (!res.ok) {
                // Handle non-2xx status codes
                const errorData = await res.json();
                toast.error(errorData.error);
                return;
            }

            const data = await res.json();
            console.log(data);

        }catch(error){
            toast.error(error.message);
            console.log("Error in frontend signin: ", error.message)
        }finally{
            setLoading(false);
        }
    };

    return {loading, signup};
}
export default userSignUp;