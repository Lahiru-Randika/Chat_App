import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations= ()=>{
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    //run once
    useEffect(()=>{
        const getConversations = async ()=>{
            setLoading(true);

            try{
                const res = await fetch("/api/users");
                const data = await res.json();

                if(data.error){
                    console.log(data.error);
                    throw new Error(data.error);
                }

                setConversations(data);

            }catch(error){
                toast.error(error.message);
            }finally{
                setLoading(false);
            }
        }

        //calling the function
        getConversations();
    },[]);

    return {loading, conversations};
}

export default useGetConversations;