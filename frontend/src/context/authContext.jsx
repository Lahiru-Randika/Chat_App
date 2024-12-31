import { createContext, useContext, useState } from "react";

//create an authcontext
export const AuthContext = createContext();

//make the authcontext is usable. 
export const userAuthContext = ()=>{
    return useContext(AuthContext)
}


//This will wrap the app son that we can use authcontextprovider at anywhere
export const AuthContextProvider = ({children})=> {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);

    return <AuthContext.Provider value={{authUser, setAuthUser}}>
        {children}
    </AuthContext.Provider>
}