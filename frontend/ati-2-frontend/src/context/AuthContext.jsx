// GlobalStateContext.js
import { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [authState, setAuthState] = useState({
        logged_in: false,
        user_id: -1,
        token: ""
    });

    return(
        <AuthContext.Provider value={{authState, setAuthState}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
