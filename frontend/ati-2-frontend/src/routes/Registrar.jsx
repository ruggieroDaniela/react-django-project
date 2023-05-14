import React from "react";
import { createContext, useContext } from "react";

import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { useTranslation } from 'react-i18next';

// import AuthContext from "../components/context/AuthContext";
import { RegisterFormContext, RegisterFormContextProvider } from "../components/context/RegisterFormContext";

import { Multiform } from "../components/Multiform";
import { FasesRegistrar } from "../components/FasesRegistrar";

import "../styles/Registrar.scss"

const FormContext = createContext();

export const Registrar = () => {
    
    const { t, i18n } = useTranslation();

    let navigate = useNavigate(); 
    const goHome = () => {
        navigate(`/`);
    };

    const register = (userData) => {
        let postBody = {};

        // De donde nos conoce?
        found_app_by = {
            website: userData.phase[0].website,
            social_network: {
                selected: userData.phase[0].social_network,
                facebook: userData.phase[0].facebook,
                twitter: userData.phase[0].twitter,
                other: userData.phase[0].social_network_other,
                other_spec: userData.phase[0].social_network_other_spec
            },
            friends: userData.phase[0].friends,
            other:{
                selected: userData.phase[0].other,
                radio: userData.phase[0].radio,
                radio_spec: userData.phase[0].radio_spec,
                press: userData.phase[0].press,
                press_spec: userData.phase[0].press_spec,
                other: userData.phase[0].other,
                other_spec: userData.phase[0].other_spec
            }
        };

        postBody.found_app_by = JSON.stringify(found_app_by);

        // Registrar Usuario
        postBody.type_user = userData.phase[1].tipo_usuario;

        if( postBody.type_user == "natural" ){
        
            postBody.country = userData.phase[1].natural.pais;
            postBody.first_name = userData.phase[1].natural.nombre;
            postBody.last_name = userData.phase[1].natural.apellido;
            postBody.dni = userData.phase[1].natural.identification;
            postBody.contact_email = userData.phase[1].natural.correo;

            if(userData.phase[1].telefono.tipo == "movil"){
                postBody.cellphone = userData.phase[1].telefono.codigo + userData.phase[1].telefono.numero;
            }else{
                postBody.telephone = userData.phase[1].telefono.codigo + userData.phase[1].telefono.numero + userData.phase[1].telefono.ext;
            }
        
        }else if( postBody.type_user == "enterprise" ){

            postBody.country = userData.phase[1].empresa.pais;
            postBody.company_name = userData.phase[1].empresa.nombre_empresa;
            postBody.rif = userData.phase[1].empresa.razon_rif;
            postBody.city = userData.phase[1].empresa.ciudad;
            postBody.address = userData.phase[1].empresa.direccion;
            postBody.representant_email = userData.phase[1].empresa.correo;
            postBody.representant_name = userData.phase[1].empresa.nombre_representante;

            if(userData.phase[1].telefono.tipo == "movil"){
                postBody.representant_cellphone = userData.phase[1].telefono.codigo + userData.phase[1].telefono.numero;
            }else{
                postBody.representant_telephone = userData.phase[1].telefono.codigo + userData.phase[1].telefono.numero + userData.phase[1].telefono.ext;
            }

        }

        // Idioma
        postBody.language = userData.phase[2].idioma;

        // Datos de Login
        postBody.email = userData.phase[3].correo;
        postBody.password = userData.phase[3].clave;
        postBody.want_inform = userData.phase[3].newsletter;

        // Newsletter
        postBody.frecuency_to_inform = userData.phase[4].frecuencia;

        postBody.services_interest = {
            available_personal: userData.phase[4].servicio_personal,
            professional_advice: userData.phase[4].servicio_profesional
        };

        postBody.email_to_inform = userData.phase[4].correo;

        postBody.social_media_to_inform = {
            Facebook: userData.phase[4].facebook,
            Twitter: userData.phase[4].twitter
        }
        
        postBody.phone_to_inform = userData.phase[4].sms
        postBody.other_to_inform = userData.phase[4].otros

        // Billing
        postBody.bank_origin = userData.phase[5].banco_origen;
        postBody.bank_country = userData.phase[5].pais;

    };

    let stagesNames = [];
    for (let i = 0; i < FasesRegistrar.length; i++) {
        stagesNames.push(t('registrar.fases.'+i+'.nombre'));
    }

    return (
        <div id="registrar">
            <div>
                <h4>{t('registrar.titulo')}</h4>
            </div>

            <div className="indicaciones">
                <span>*</span> <span className="indicacion">{t('registrar.indicaciones.0')}</span>
                <br />
                <span>*</span> <span className="indicacion">{t('registrar.indicaciones.1')}</span>
            </div>

            <Multiform
                stages={FasesRegistrar}
                stagesNames={stagesNames}
                cancelEvent={goHome}
                submitEvent={register}
                FormContextProvider={RegisterFormContextProvider}
            />

        </div>

    )

};