import { useState, createContext } from "react";

const RequestDomesticFormContext = createContext();


function RequestDomesticFormContextProvider({children}){

    const [requestDomesticFormState, setRequestDomesticFormState] = useState(
    {
        user: -1, 
        service: "CUI",
        gender: "IDC",
        age_requirement: false,
        age_required_from: "",
        age_required_to: "",
        children: "IDC",
        education_level: "PRI",
        continent:"North America", 
        country: "",
        state: "",
        city: "",
        zone: "",
        number_tco: "",
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
        payment_amount: "0.0",
        currency: -1,
        currency_other: null,
        salary_offered: -1,
        benefits: 0,
        benefits_description: "",
        availability: "",
        availability_date: null,
        have_documentation: false,
        documents: [],
        documents_other: "",
        publication_time: "1",
        publication_plan: "1",
        billing_country: "",
        billing_bank: "",
        errors: {
            age_range_invalid: false,
            country_requered: false,
            state_required: false,
            city_required: false,
            number_tco_required: false,
            age_tco_required: false,
            gender_tco_required: false,
            diseases_required: false,
            activities_required: false,
            workday_required: false,
            workday_other_required: false,
            schedule_required: false,
            schedule_other_required: false,
            salary_option_required: false,
            salary_required: false,
            salary_other_required: false,
            benefits_required: false,
            date_opt_required: false,
            date_required: false,
            other_doc_required: false,
            billing_required: false,
            origin_required: false
        }
    }
    );

    return(
        <RequestDomesticFormContext.Provider value={{requestDomesticFormState, setRequestDomesticFormState}}>
            {children}
        </RequestDomesticFormContext.Provider>
    )

}

export {RequestDomesticFormContextProvider, RequestDomesticFormContext};