import React, { useState, useContext, useEffect } from 'react'

import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Multiform } from "../components/Multiform";
import { RequestDomesticFormContext } from "../context/RequestDomesticFormContext";
import { FasesSolicitarNiñera, botonEnviar, useValidar } from "../components/FasesSolicitarNiñera";
import { getCountryName } from "../components/dataFetchers/PaisDataFetcher";
import "../styles/SolicitarNiñera.scss"
import AuthContext from '../context/AuthContext';

export const SolicitarÑiñera = () => {
    const {authState, setAuthState} = useContext(AuthContext);
    const [userData, setUserData] = useState("");

    useEffect(()=>{
        const handleSubmit = async () => {
            try {
                    // Request was successful
                if(authState.id != undefined){
                    let response = await fetch( `${import.meta.env.VITE_DJANGO_API_URL}/users/${authState.id}`,{
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
    const { t } = useTranslation();

    let navigate = useNavigate(); 
   
    const goHome = () => {
        navigate(`/`);
    };

    //let stagesNames = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    let stagesNames = [];
    for (let i = 0; i < FasesSolicitarNiñera.length; i++) {
        stagesNames.push(t('SolicitarNiñera.fases.'+i+'.nombre'));
    }

    return (
        <div id="SolicitarNiñera">
            
            <div id="titulo">
                <h4>{t('SolicitarNiñera.titulo')}</h4>
            </div>

            <div  id="info-niñera">

                <div className="row">
                    <div className="first-row blue first-column" id="niñera"><h2>{t('SolicitarNiñera.cliente')}</h2></div>
                    <div className="first-row" id="n-niñera" >
                        <h1>{authState.name}</h1>
                    </div>
                    <div className="first-row" id="pais">

                        <h2><span className="blue">{t('OfrecermeNiñera.pais')}</span> <span className="red" >{getCountryName(userData.country)}</span></h2>

                        
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
                stages={FasesSolicitarNiñera}         // array de componentes que serán usados como stages
                stagesNames={stagesNames}       // nombres de los stages en el idioma correspondiente
                cancelEvent={goHome}            // onClick event del botón de cancelar
                SubmitButton={botonEnviar}   // componente con el botón de submit
                validateStages={useValidar}
            />

        </div>

    )
}
