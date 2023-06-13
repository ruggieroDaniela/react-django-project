// GlobalStateContext.js
import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [authState, setAuthState] = useState({
        token: "",
        id: -1,
        logged_in: false,
        email: "",
        name: "",
        lang: "en"
    });

    useEffect(() => {
        const sessionData = JSON.parse(localStorage.getItem('sessionData'));
        if (sessionData) 
            setAuthState(sessionData);
        
    }, []);

    return(
        <AuthContext.Provider value={{authState, setAuthState}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
