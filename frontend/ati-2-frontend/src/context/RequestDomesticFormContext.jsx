import { useState, createContext } from "react";

const RequestDomesticFormContext = createContext();

function RequestDomesticFormContextProvider({children}){

    const [requestDomesticFormState, setRequestDomesticFormState] = useState(
    {
        user: 34, 
        service: "CUI",
        gender: "IDC",
        age_required_from: 18,
        age_required_to: 26,
        children: "",
        education_level: "",
        continent: "Suramerica", 
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
        travel: true,
        travel_description: "",
        activities: "",
        workday: "",
        workday_other: "",
        schedule: [],
        schedule_other: "",
        payment: "",
        payment_amount: "30.00",
        currency: "USD",
        currency_other: "",
        salary_offered: "30.00",
        benefits: 1,
        benefits_description: "",
        availability: "FECHA",
        availability_date: "2023-05-27",
        have_documentation: false,
        documents: ["PASAPORTE"],
        documents_other: "",
        publication_time: "1",
        publication_plan: "1",
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