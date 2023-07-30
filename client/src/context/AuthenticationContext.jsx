import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({children})=>{

    const [currentUser,setCurrentUser] = useState({});
    
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user);
        });
        return ()=>{
            unSubscribe();
        }
    }, []);
    return(

        <AuthenticationContext.Provider value={currentUser}>
        {children}
        </AuthenticationContext.Provider>
)
};