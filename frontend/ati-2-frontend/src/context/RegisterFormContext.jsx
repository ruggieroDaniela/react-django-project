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
                    pais: "",
                    codigo_pais: "AF",
                },
                empresa:{
                    nombre_empresa: "",
                    razon_rif: "",
                    pais: "",
                    codigo_pais: "AF",
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
                client_code: "",
                banco_origen: "",
                codigo_pais_banco: "AF",
                pais: "",
                banco_destino: ""
            }
        ],
        countries:[],
        cities:[],
        errors:[
            {
                option_required: false,
                other_empty: false,
                social_required: false,
                other_required: false,
            },
            {
                name_required: false,
                name_invalid: false,
                last_name_required: false,
                last_name_invalid: false,
                id_required: false,
                id_invalid: false,
                email_required: false,
                email_invalid: false,

                business_required: false,
                business_invalid: false,
                rif_required: false,
                rif_invalid: false,
                address_required: false,
                rep_name_required: false,
                rep_name_invalid: false,
                rep_email_required: false,
                rep_email_invalid: false,

                telefono_required: false,
                telefono_invalid: false
            },
            {
                option_required: false,
            },
            {
                invalid_mail: false,
                mail_exists: false,
                invalid_password: false
            },
            {
                frecuencia_required: false,
                servicio_required: false,
                means_required: false,
                email_required: false,
                social_required: false,
                sms_required: false,
                other_required: false,
                facebook_required: false
            },
            {
                banco_requerido: false,
                banco_minimo: false,
                destino_requerido: false, 
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