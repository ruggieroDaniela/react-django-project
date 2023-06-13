import React, { useEffect, useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import { Multiform } from "../components/Multiform";
import { FasesOfrecermeCuidador, botonEnviar, useValidar } from "../components/FasesOfrecermeCuidador";
import { OfferDomesticFormContext } from "../context/OfferDomesticFormContext";
import AuthContext from '../context/AuthContext';

import "../styles/OfrecermeCuidador.scss"

export const OfrecermeCuidador = () => {
    
    const {offerDomesticFormState, setOfferDomesticFormState} = useContext(OfferDomesticFormContext);
    const {authState, setAuthState} = useContext(AuthContext);
    const [userData, setUserData] = useState("");

    useEffect(()=>{
        const handleSubmit = async () => {
            try {
                    // Request was successful
                if(authState.id != undefined){
                    let response = await fetch( `http://localhost:8000/users/${authState.id}`,{
                            method: 'GET',
                            headers: {
                                'Authorization': authState.token,
                            }
                            // body: JSON.stringify({Authorization: responseDataAuth.token})
                        }
                    );
                    
    
                    if(response.ok){
                      
                        const responseDataUser = await response.json();

                        setUserData(responseDataUser);
                        console.log(responseDataUser)
                    }else{
                        console.log("GET request failed: error fetching user data");
                        console.log(response);
                    }
                }
    
                } catch (error) {
                    console.log("error");
                    console.log(error);
                }
    
        }
        handleSubmit();
    },[authState])



    useEffect(()=>{
        setOfferDomesticFormState({
            user: authState.id, 
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
            currency_other: null,
            salary_offered: -1,
            benefits: 0,
            benefits_description: "",
            availability: "",
            availability_date: null,
            have_documentation: false,
            documents: ["PASAPORTE"],
            documents_other: "",
            publication_time: "1",
            publication_plan: "1",
            billing_country: "",
            billing_bank: "",
            age: "0",
            have_children: false,
            description: "",
            origin: "NO",
            origin_continent: "",
            origin_country: "",
            origin_state: "",
            origin_city: "",
            client_type: "NO",
            errors: {
                invalid_age: false,
                country_required: false,
                state_required: false,
                city_required: false,
                description_required: false,
                travel_desc_required: false,
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
    for (let i = 0; i < FasesOfrecermeCuidador.length; i++) {
        stagesNames.push(t('OfrecermeCuidador.fases.'+i+'.nombre'));
    }

    return (
        <div id="OfrecermeNiñera">
            
            <div id="titulo">
                <h4>{t('OfrecermeCuidador.titulo')}</h4>
            </div>

            <div  id="info-niñera">

                <div className="row">
                    <div className="first-row blue first-column" id="niñera"><h2>{t('OfrecermeCuidador.niñera')}</h2></div>
                    <div className="first-row" id="n-niñera" >
                        <h1>{authState.name}</h1>
                    </div>
                    <div className="first-row" id="pais">

                        <h2><span className="blue">{t('OfrecermeCuidador.pais')}</span> <span className="red" >{userData.country}</span></h2>

                        
                    </div>
                    <div className="second-row first-column">
                        <div id="img">
                            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Arrastre su foto tipo carnet y fondo blanco aquí" />            
                        </div>
                    </div>
                    <div className="second-row">
                        <div id="info-personal">
                            <div className="first-column">
                                <h4>{t('OfrecermeCuidador.telefono_movil')}</h4>
                            </div>
                            <div className="second-column">
                                
                                <h4>{userData.cellphone != null  ? userData.cellphone :t('OfrecermeCuidador.no-tiene')}</h4>
                            </div>
                            <div className="first-column">
                                <h4>{t('OfrecermeCuidador.telefono_fijo')}</h4>
                            </div>
                            <div className="second-column">
                                <h4>{userData.telephone != null  ? userData.telephone :t('OfrecermeCuidador.no-tiene')}</h4>
                            </div>
                            <div className="first-column">
                                <h4>{t('OfrecermeCuidador.correo')}</h4>
                            </div>
                            <div className="second-column">
                                <h4>{authState.email}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="second-row" style={{visibility:'hidden'}}>
                        <h2><span className="blue">{t('OfrecermeCuidador.estado')}</span> <span className="red" >Distrito Capital</span></h2>
                    </div>
                </div>

            </div>

            <div id="panel-opciones">
                <span>{t('OfrecermeCuidador.panel-opciones')}</span>
            </div>

            <div className="indicaciones">
                <span>*</span> <span className="indicacion">{t('registrar.indicaciones.0')}</span>
                <br />
                <span>*</span> <span className="indicacion">{t('registrar.indicaciones.1')}</span>
            </div>
   
            <Multiform
                stages={FasesOfrecermeCuidador}         // array de componentes que serán usados como stages
                stagesNames={stagesNames}       // nombres de los stages en el idioma correspondiente
                cancelEvent={goHome}            // onClick event del botón de cancelar
                SubmitButton={botonEnviar}   // componente con el botón de submit
                validateStages={useValidar}
            />

        </div>

    )

};