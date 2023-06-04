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
            {   
                tipo_usuario: "natural",
                natural:{
                    nombre: "",
                    apellido: "",
                    identificacion: "",
                    correo: "",
                    pais: ""
                },
                empresa:{
                    nombre_empresa: "",
                    razon_rif: "",
                    pais: "",
                    ciudad: "",
                    direccion: "",
                    nombre_representante: "",
                    correo: ""
                },
                telefono:{
                    tipo: "",
                    codigo: "",
                    numero: "",
                    ext: ""
                }
            },{
                idioma: ""
            },{
                correo: "",
                clave: "",
                newsletter: false
            },{
                frecuencia: "",
                servicio_personal: false,
                servicio_profesional: false,
                usar_correo: false,
                correo: "",
                redes: false,
                facebook: false,
                twitter: false,
                usar_sms: false,
                sms: "",
                usar_otros: false,
                otros: "",
                usar_facebook: false,
                facebook_spec: ""
            },{
                banco_origen: "",
                pais: "",
                banco_destino: ""
            }
        ],
        countries:[],
        banks:[],
        errors:[
            {
                option_required: false,
                other_empty: false,
                social_required: false,
                other_required: false,
            },
            {
                invalid_stage: false
            },
            {
                invalid_stage: false,
                invalid_mail: false,
                invalid_password: false
            },
            {
                invalid_stage: false
            },
            {
                invalid_stage: false
            },
            {
                invalid_stage: false
            }
        ]
    });

    return(
        <RegisterFormContext.Provider value={{registerFormState, setRegisterFormState}}>
            {children}
        </RegisterFormContext.Provider>
    )

}

export {RegisterFormContextProvider, RegisterFormContext};