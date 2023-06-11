import React, { useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import { Multiform } from "../components/Multiform";
import { FasesOfrecermeNiñera, botonEnviar, useValidar } from "../components/FasesOfrecermeNiñera";
import { OfferDomesticFormContext } from "../context/OfferDomesticFormContext";

import "../styles/OfrecermeNiñera.scss"

export const OfrecermeNiñera = () => {
    
    const {offerDomesticFormState, setOfferDomesticFormState} = useContext(OfferDomesticFormContext);
    useEffect(()=>{
        setOfferDomesticFormState({
            user: -1, 
            service: "CUI",
            gender: "IDC",
            age_required_from: 13,
            age_required_to: 13,
            children: "IDC",
            education_level: "PRI",
            continent:"North America",
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
            travel_decription: "",
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
            documents: [],
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
            errors: {
                invalid_age: false,
                country_required: false,
                state_required: false,
                city_required: false,
                description_required: false,
                travel_desc_required: false
            }
        });
    },[]);

    // hook para la internacionalizacion
    const { t } = useTranslation();

    // hook para redireccionar
    let navigate = useNavigate(); 

    // onClick event del botón de cancelar
    const goHome = () => {
        navigate(`/`);
    };

    // nombres de los stages en el idioma actual
    let stagesNames = [];
    for (let i = 0; i < FasesOfrecermeNiñera.length; i++) {
        stagesNames.push(t('OfrecermeNiñera.fases.'+i+'.nombre'));
    }

    return (
        <div id="OfrecermeNiñera">
            
            <div id="titulo">
                <h4>{t('OfrecermeNiñera.titulo')}</h4>
            </div>

            <div  id="info-niñera">

                <div className="row">
                    <div className="first-row blue first-column" id="niñera"><h2>{t('OfrecermeNiñera.niñera')}</h2></div>
                    <div className="first-row" id="n-niñera" >
                        <h1>Ana Silva</h1>
                    </div>
                    <div className="first-row" id="pais">

                        <h2><span className="blue">{t('OfrecermeNiñera.pais')}</span> <span className="red" >Venezuela</span></h2>

                        
                    </div>
                    <div className="second-row first-column">
                        <div id="img">
                            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Arrastre su foto tipo carnet y fondo blanco aquí" />            
                        </div>
                    </div>
                    <div className="second-row">
                        <div id="info-personal">
                            <div className="first-column">
                                <h4>{t('OfrecermeNiñera.telefono_movil')}</h4>
                            </div>
                            <div className="second-column">
                                <h4>+58-412-703-88-88</h4>
                            </div>
                            <div className="first-column">
                                <h4>{t('OfrecermeNiñera.telefono_fijo')}</h4>
                            </div>
                            <div className="second-column">
                                <h4>+58-212-235-78-88</h4>
                            </div>
                            <div className="first-column">
                                <h4>{t('OfrecermeNiñera.correo')}</h4>
                            </div>
                            <div className="second-column">
                                <h4>nirvana01@gmail.com</h4>
                            </div>
                        </div>
                    </div>
                    <div className="second-row">
                        <h2><span className="blue">{t('OfrecermeNiñera.estado')}</span> <span className="red" >Distrito Capital</span></h2>
                    </div>
                </div>

            </div>

            <div id="panel-opciones">
                <span>{t('OfrecermeNiñera.panel-opciones')}</span>
            </div>

            <div className="indicaciones">
                <span>*</span> <span className="indicacion">{t('registrar.indicaciones.0')}</span>
                <br />
                <span>*</span> <span className="indicacion">{t('registrar.indicaciones.1')}</span>
            </div>
   
            <Multiform
                stages={FasesOfrecermeNiñera}         // array de componentes que serán usados como stages
                stagesNames={stagesNames}       // nombres de los stages en el idioma correspondiente
                cancelEvent={goHome}            // onClick event del botón de cancelar
                SubmitButton={botonEnviar}   // componente con el botón de submit
                validateStages={useValidar}
            />

        </div>

    )

};