import { useState, createContext } from "react";

const RegisterFormContext = createContext();

function RegisterFormContextProvider({children}){

    const [registerFormState, setRegisterFormState] = useState({
         phase:[
            {
                website: false,
                social_network: false,
                facebook: false,
                twitter: false,
                instagram: false,
                social_network_other: false,
                social_network_other_spec: "",
                friends: false,
                other: false,
                radio: false,
                radio_spec: "",
                press: false,
                press_spec: "",
                other_other: false,
                other_other_spec: ""
            },
            {}
        ]
    });

    return(
        <RegisterFormContext.Provider value={{registerFormState, setRegisterFormState}}>
            {children}
        </RegisterFormContext.Provider>
    )

}

export {RegisterFormContextProvider, RegisterFormContext};