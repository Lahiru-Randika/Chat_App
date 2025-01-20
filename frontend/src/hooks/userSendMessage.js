import { useEffect, useState, useContext} from "react";
import toast from "react-hot-toast";
import { MyContext } from "../App";

const userSendMessage=(message)=>{

    const [loading, setLoading] = useState(false);
    const { currentRequestedChatName, setCurrentRequestedChatName, clickedMeToSeeMyChat, setClickedMeToSeeMyChat } = useContext(MyContext);

        const sendMessage= async(message,clickedMeToSeeMyChat)=>{
            setLoading(true);
            try{
                console.log("sending to : ",`/api/messages/send/${clickedMeToSeeMyChat}`)
                const res = await fetch(`/api/messages/send/${clickedMeToSeeMyChat}`,{
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({message}),
                });

                if (!res.ok) {
                    // Handle non-2xx status codes
                    const errorData = await res.json();
                    toast.error(errorData.error);
                    return;
                }
    
                const data = await res.json();
                console.log("sent to the receiver: ",data);
                return data;
            }catch(error){
                console.log(error.message)
                toast.error(error.message);
            }finally{
                setLoading(false);
            }
        }

    return {loading,sendMessage}
}

export default userSendMessage;