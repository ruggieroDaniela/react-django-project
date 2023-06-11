import { useState, createContext } from "react";

const RequestDomesticFormContext = createContext();

function RequestDomesticFormContextProvider({children}){

    const [requestDomesticFormState, setRequestDomesticFormState] = useState(
    {
        user: 2, 
        service: "",
        gender: "",
        age_required: "",
        age_required_from: "",
        age_required_to: "",
        children: "",
        education_level: "",
        country: "",
        state: "",
        city: "",
        zone: "",
        number_tco: "",
        age_tco: "",
        gender_tco: "",
        disabilities_tco: false,
        disabilities_tco_decrip: "",
        diseases: "",
        travel: true,
        travel_decription: "",
        activities: "",
        workday: "",
        workday_other: "",
        schedule: "",
        schedule_other: "",
        payment: "",
        payment_amount: "30.00",
        currency: "USD",
        currency_other: "",
        salary_offered: "HORA",
        benefits: false,
        benefits_description: "",
        availability: "FECHA",
        availability_date: "2023-05-27",
        have_documentation: false,
        documents: "",
        documents_other: "",
        publication_time: "1",
        publication_plan: "1",
        billing_country: "",
        billing_bank: "",
        age: "0",
        have_children: false,
        description: "",
        origin: "",
        origin_continent: "",
        origin_country: "",
        origin_state: "",
        origin_city: "",
        client_type: "",

    }
    );

    return(
        <RequestDomesticFormContext.Provider value={{requestDomesticFormState, setRequestDomesticFormState}}>
            {children}
        </RequestDomesticFormContext.Provider>
    )

}

export {RequestDomesticFormContextProvider, RequestDomesticFormContext};