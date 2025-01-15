import { createContext, useContext, useEffect, useState } from "react";
import { userAuthContext } from "./authContext";
import io from "socket.io-client"

const SocketContext = createContext();

//create a hook to use the SocketContextProvider context
export const useSocketContext=()=>{
    return useContext(SocketContext)
}

export const SocketContextProvider = ({children}) =>{

    const [socket, setSocket] = useState(null);
    const [onlineUsers,setOnlineUsers] = useState({})
    const { authUser} = userAuthContext();

    useEffect(()=>{
        if(authUser){
            const socket = io("http://localhost:8000",{
                query:{
                    userId : authUser._id,
                }
            })

            setSocket(socket);

            //io.emit() is used to send events to all the connected clients
            socket.on("getOnlineUsers", (users)=>{
                setOnlineUsers(users)
            })

            return ()=> socket.close();

        }else{
            if(socket){
                socket.close();
                setSocket(null)
            }
        }
    },[authUser])


    return(
        <SocketContext.Provider value={{socket,onlineUsers}}>{children}</SocketContext.Provider>
    )
}