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
            country: "Prueba2",
            state: "sdfsdf",
            city: "sdfsdf",
            zone: "",
            number_tco: 2,
            age_tco: 11,
            gender_tco: "asdasdasd",
            disabilities_tco: true,
            disabilities_tco_decrip: "sssssssssssss",
            travel: true,
            travel_decription: "asdasd",
            activities: "asdasd",
            workday: "SEMANAL",
            workday_other: "",
            schedule: "LUN",
            schedule_other: "",
            payment: "MONTO",
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
            billing_country: "dsfdf",
            billing_bank: "asdasd",
            age: "",
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