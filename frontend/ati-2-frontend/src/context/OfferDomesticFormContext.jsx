import { useState, createContext } from "react";

const OfferDomesticFormContext = createContext();

function OfferDomesticFormContextProvider({children}){

    const [offerDomesticFormState, setOfferDomesticFormState] = useState(
        {
            user: 2, 
            service: "CUI",
            gender: "IDC",
            age_required_from: 13,
            age_required_to: 13,
            children: "IDC",
            education_level: "PRI",
            country: "",
            state: "",
            city: "",
            zone: "",
            number_tco: 2,
            age_tco: 11,
            gender_tco: "asdasdasd",
            disabilities_tco: true,
            disabilities_tco_decrip: "sssssssssssss",
            travel: true,
            travel_decription: "asdasd",
            activities: "",
            workday: [],
            workday_other: "",
            schedule: [],
            schedule_other: "",
            payment: "",
            payment_amount: "0.0",
            currency: -1,
            currency_other: "",
            salary_offered: -1,
            benefits: false,
            benefits_description: "",
            availability: "",
            availability_date: "",
            have_documentation: false,
            documents: "",
            documents_other: "",
            publication_time: "1",
            publication_plan: "1",
            billing_country: "dsfdf",
            billing_bank: "asdasd",
            age: "0",
            have_children: false,
            description: "",
            origin: "",
            origin_continent: "",
            origin_country: "",
            origin_state: "",
            origin_city: "",
            client_type: ""
        }
        );


    return(
        <OfferDomesticFormContext.Provider value={{offerDomesticFormState, setOfferDomesticFormState}}>
            {children}
        </OfferDomesticFormContext.Provider>
    )

}

export {OfferDomesticFormContextProvider, OfferDomesticFormContext};