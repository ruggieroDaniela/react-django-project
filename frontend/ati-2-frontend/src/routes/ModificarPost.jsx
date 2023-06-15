import React, { useEffect, useContext, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import { Multiform } from "../components/Multiform";

import { FasesSolicitarCuidador, useValidar as useValidarSolicitarCuidador } from "../components/FasesSolicitarCuidador";
import { FasesSolicitarNiñera, useValidar as useValidarSolicitarNiñera } from "../components/FasesSolicitarNiñera";

import { FasesOfrecermeCuidador, useValidar as useValidarOfrecerCuidador } from "../components/FasesOfrecermeCuidador";
import { FasesOfrecermeNiñera, useValidar as useValidarOfrecerNiñera} from "../components/FasesOfrecermeNiñera";

import { OfferDomesticFormContext } from "../context/OfferDomesticFormContext";
import { RequestDomesticFormContext } from "../context/RequestDomesticFormContext";

import AuthContext from '../context/AuthContext';

import "../styles/OfrecermeCuidador.scss"

export const ModificarPost = () => {
    
    const {offerDomesticFormState, setOfferDomesticFormState} = useContext(OfferDomesticFormContext);
    const {requestDomesticFormState, setRequestDomesticFormState} = useContext(RequestDomesticFormContext);
    const {authState, setAuthState} = useContext(AuthContext);
    const [userData, setUserData] = useState("");
    const { id , postType } = useParams();
    const [ready, setReady] = useState(false);

    //fetching the post
    useEffect(() => {
    const fetchPost = async () => {
        try {
        const response = await fetch(`http://localhost:8000/api-services/${postType}/get_post/${id}/`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if required
            },
        });

        if (response.ok) {
            const post = await response.json();
            
            if ( postType == "provide")
            setOfferDomesticFormState({
                user: post.user,
                service: post.service,
                age: post.age,
                have_children: post.have_children,
                education_level: post.education_level,
                continent: post.continent,
                country: post.country,
                state: post.state,
                city: post.city,
                zone: post.zone,
                description: post.description,
                travel: post.travel,
                travel_decription: post.travel_decription,
                activities: post.activities,
                workday: post.workday,
                workday_other: post.workday_other,
                schedule: post.schedule,
                schedule_other: post.schedule_other,
                payment: post.payment,
                payment_amount: post.payment_amount,
                currency: post.currency,
                currency_other: post.currency_other,
                salary_offered: post.salary_offered,
                benefits: post.benefits,
                benefits_description: post.benefits_description,
                availability: post.availability,
                availability_date: post.availability_date,
                origin: post.origin,
                origin_continent: post.origin_continent,
                origin_country: post.origin_country,
                origin_state: post.origin_state,
                origin_city: post.origin_city,
                client_type: post.client_type,
                have_documentation: post.have_documentation,
                documents: post.documents,
                documents_other: post.documents_other,
                publication_time: post.publication_time,
                publication_plan: post.publication_plan,
                billing_country: post.billing_country,
                billing_bank: post.billing_bank,
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

            if ( postType == "request"){
            setRequestDomesticFormState(
                {
                    user: post.user, 
                    service: post.service,
                    gender: post.gender,
                    age_requirement: post.age_requirement,
                    age_required_from: post.age_required_from,
                    age_required_to: post.age_required_to,
                    children: post.children,
                    education_level: post.education_level,
                    continent: post.continent,
                    country: post.country,
                    state: post.state,
                    city: post.city,
                    zone: post.zone,
                    number_tco: post.number_tco,
                    age_tco: post.age_tco,
                    gender_tco: post.gender_tco,
                    disabilities_tco: post.disabilities_tco,
                    disabilities_tco_decrip: post.disabilities_tco_decrip,
                    diseases_tco_descrip: post.diseases_tco_descrip,
                    travel: post.travel,
                    travel_decription: post.travel_decription,
                    activities: post.activities,
                    workday: post.workday,
                    workday_other: post.workday_other,
                    schedule: post.schedule,
                    schedule_other: post.schedule_other,
                    payment: post.payment,
                    payment_amount: post.payment_amount,
                    currency: post.currency,
                    currency_other: post.currency_other,
                    salary_offered: post.salary_offered,
                    benefits: post.benefits,
                    benefits_description: post.benefits_description,
                    availability: post.availability,
                    availability_date: post.availability_date,
                    have_documentation: post.have_documentation,
                    documents: post.documents,
                    documents_other: post.documents_other,
                    publication_time: post.publication_time,
                    publication_plan: post.publication_plan,
                    billing_country: post.billing_country,
                    billing_bank: post.billing_bank,
                    errors: {
                        age_range_invalid: false,
                        country_requered: false,
                        state_required: false,
                        city_required: false,
                        number_tco_required: false,
                        age_tco_required: false,
                        gender_tco_required: false,
                        diseases_required: false,
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
                }      
            );
                setRequestDomesticFormState( prev =>{
                    const newState = {...prev};
                    newState.user = post.user
                    return newState;
                })
            }
            
            setReady(true);
            
            // Perform any further actions with the retrieved post data
        } else {
            console.log('Error retrieving post');
            // Handle the error if needed
        }
        } catch (error) {
        console.log('An error occurred:', error);
        // Handle the error if needed
        }
    };

    fetchPost();
    }, []);

    //fetching the user 
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


    const botonEnviar = () => {
        const { t, i18n } = useTranslation();
        const {offerDomesticFormState, setOfferDomesticFormState} = useContext(OfferDomesticFormContext);
        const navigate = useNavigate();
     
        let postData = "";
        if (postType == 'provide') postData = {...offerDomesticFormState};
        if (postType == 'request') postData = {...requestDomesticFormState};
        //console.log(JSON.stringify(postData));
        return(
            <button
                id="boton_registrar"
                
    
                onClick={
                    async () => {
                         
                        const url = `http://localhost:8000/api-services/${postType}/update_post/${id}/`
                        try {
                            
                            const response = await fetch( url,{
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(postData),
                                    // body: JSON.stringify(postBody),
                                }
                            );
                    
                            if (response.ok) {
                                // Request was successful
                                console.log('POST request successful');
                                console.log(response);
                                navigate(`/visualizar-publicacion-creada?postType=${postType}&id=${id}`);
                            } else {
                                // Request failed
                                console.log('POST request failed');
                                console.log(response);
                            }
                    
                        } catch (error) {
                            console.log("error registrando");
                            console.log(error);
                        }
                    }
                }
                >
                {t('multiform.registrar')}
            </button>
        );
    }
    

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

            { postType == "provide" &&
            <>
                { ready && offerDomesticFormState.service === "NIN" &&
                    <Multiform
                        stages={FasesOfrecermeNiñera}         // array de componentes que serán usados como stages
                        stagesNames={stagesNames}       // nombres de los stages en el idioma correspondiente
                        cancelEvent={goHome}            // onClick event del botón de cancelar
                        SubmitButton={botonEnviar}   // componente con el botón de submit
                        validateStages={useValidarOfrecerNiñera}
                    />
                }
                { ready && offerDomesticFormState.service === "CUI" &&
                    <Multiform
                        stages={FasesOfrecermeCuidador}         // array de componentes que serán usados como stages
                        stagesNames={stagesNames}       // nombres de los stages en el idioma correspondiente
                        cancelEvent={goHome}            // onClick event del botón de cancelar
                        SubmitButton={botonEnviar}   // componente con el botón de submit
                        validateStages={useValidarOfrecerCuidador}
                    />
                }
            </>
            }

            { postType == "request" &&
            <>
                { ready && offerDomesticFormState.service === "NIN" &&
                    <Multiform
                        stages={FasesSolicitarNiñera}         // array de componentes que serán usados como stages
                        stagesNames={stagesNames}       // nombres de los stages en el idioma correspondiente
                        cancelEvent={goHome}            // onClick event del botón de cancelar
                        SubmitButton={botonEnviar}   // componente con el botón de submit
                        validateStages={useValidarSolicitarNiñera}
                    />
                }
                { ready && offerDomesticFormState.service === "CUI" &&
                    <Multiform
                        stages={FasesSolicitarCuidador}         // array de componentes que serán usados como stages
                        stagesNames={stagesNames}       // nombres de los stages en el idioma correspondiente
                        cancelEvent={goHome}            // onClick event del botón de cancelar
                        SubmitButton={botonEnviar}   // componente con el botón de submit
                        validateStages={useValidarSolicitarCuidador}
                    />
                }
            </>
            }

        </div>

    )

};