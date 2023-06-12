import { useState, createContext } from "react";

const RequestDomesticFormContext = createContext();

function RequestDomesticFormContextProvider({children}){

    const [requestDomesticFormState, setRequestDomesticFormState] = useState(
    {
        user: -1, 
        service: "CUI",
        gender: "",
        age_required_from: 0,
        age_required_to: 0,
        children: "",
        education_level: "",
        continent: "", 
        country: "",
        state: "",
        city: "",
        zone: "",
        number_tco: 0,
        age_tco: "",
        gender_tco: "",
        disabilities_tco: false,
        disabilities_tco_decrip: "",
        diseases_tco_descrip: "",
        travel: false,
        travel_description: "",
        activities: "",
        workday: [],
        workday_other: "",
        schedule: [],
        schedule_other: "",
        payment: "",
        payment_amount: null,
        currency: null,
        currency_other: null,
        salary_offered: null,
        benefits: 0,
        benefits_description: "",
        availability: "",
        availability_date: null,
        have_documentation: false,
        documents: [],
        documents_other: "",
        publication_time: "",
        publication_plan: "",
        billing_country: "",
        billing_bank: "",
    }
    );

    return(
        <RequestDomesticFormContext.Provider value={{requestDomesticFormState, setRequestDomesticFormState}}>
            {children}
        </RequestDomesticFormContext.Provider>
    )

}

export {RequestDomesticFormContextProvider, RequestDomesticFormContext};