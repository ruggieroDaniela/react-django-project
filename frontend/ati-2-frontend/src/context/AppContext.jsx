import { AuthContextProvider } from "./AuthContext";
import { RegisterFormContextProvider } from "./RegisterFormContext";
import { RequestDomesticFormContextProvider } from "./RequestDomesticFormContext";
import { OfferDomesticFormContextProvider } from "./OfferDomesticFormContext";

export const AppContextProvider = ({children}) => {

    return(
        <AuthContextProvider>
            <RegisterFormContextProvider>
                <RequestDomesticFormContextProvider>
                    <OfferDomesticFormContextProvider>
                    {children}
                    </OfferDomesticFormContextProvider>
                </RequestDomesticFormContextProvider>
            </RegisterFormContextProvider>
        </AuthContextProvider>
    );
}