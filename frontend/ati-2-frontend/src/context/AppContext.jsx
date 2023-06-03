import { AuthContextProvider } from "./AuthContext";
import { RegisterFormContextProvider } from "./RegisterFormContext";
import { RequestDomesticFormContextProvider } from "./RequestDomesticFormContext";

export const AppContextProvider = ({children}) => {

    return(
        <AuthContextProvider>
            <RegisterFormContextProvider>
                <RequestDomesticFormContextProvider>
                    {children}
                </RequestDomesticFormContextProvider>
            </RegisterFormContextProvider>
        </AuthContextProvider>
    );
}