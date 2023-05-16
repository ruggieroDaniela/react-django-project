import { useState, createContext } from "react";

const RequestDomesticFormContext = createContext();

function RequestDomesticFormContextProvider({children}){

    const [requestDomesticFormState, setRequestDomesticFormState] = useState(
    {
        service: "NIN",
        gender: "IDC",
        age_required_from: 0,
        age_required_to: 10,
        children: "IDC",
        education_level: "PRI",
        country: "a",
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
        billing_bank: "sdfsdf"
    }
    );

    return(
        <RequestDomesticFormContext.Provider value={{requestDomesticFormState, setRequestDomesticFormState}}>
            {children}
        </RequestDomesticFormContext.Provider>
    )

}

export {RequestDomesticFormContextProvider, RequestDomesticFormContext};