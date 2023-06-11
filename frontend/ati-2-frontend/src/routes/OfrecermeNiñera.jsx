import React, { useEffect, useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import { Multiform } from "../components/Multiform";
import { FasesOfrecermeNiñera, botonEnviar, useValidar } from "../components/FasesOfrecermeNiñera";
import { OfferDomesticFormContext } from "../context/OfferDomesticFormContext";
import AuthContext from '../context/AuthContext';

import "../styles/OfrecermeNiñera.scss"

export const OfrecermeNiñera = () => {
    
    const {offerDomesticFormState, setOfferDomesticFormState} = useContext(OfferDomesticFormContext);
    const {authState, setAuthState} = useContext(AuthContext);
    const [userData, setUserData] = useState("");

    useEffect(()=>{
        const handleSubmit = async () => {
            try {
                    // Request was successful
                if(authState.id != undefined){
                    let response = await fetch( `http://127.0.0.1:8000/users/${authState.id}`,{
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
            service: "NIN",
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
            travel_decription: "asdasd",
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
            age: "0",
            have_children: false,
            description: "",
            origin: "",
            origin_continent: "",
            origin_country: "",
            origin_state: "",
            origin_city: "",
            client_type: ""
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
                        <h1>{authState.name}</h1>
                    </div>
                    <div className="first-row" id="pais">

                        <h2><span className="blue">{t('OfrecermeNiñera.pais')}</span> <span className="red" >{userData.country}</span></h2>

                        
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
                                
                                <h4>{userData.cellphone != null  ? userData.cellphone :t('OfrecermeNiñera.no-tiene')}</h4>
                            </div>
                            <div className="first-column">
                                <h4>{t('OfrecermeNiñera.telefono_fijo')}</h4>
                            </div>
                            <div className="second-column">
                                <h4>{userData.telephone != null  ? userData.telephone :t('OfrecermeNiñera.no-tiene')}</h4>
                            </div>
                            <div className="first-column">
                                <h4>{t('OfrecermeNiñera.correo')}</h4>
                            </div>
                            <div className="second-column">
                                <h4>{authState.email}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="second-row" style={{visibility:'hidden'}}>
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