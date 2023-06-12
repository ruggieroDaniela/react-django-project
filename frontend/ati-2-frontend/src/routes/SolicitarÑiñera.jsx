import React, { useContext, useEffect } from 'react'

import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import AuthContext from '../context/AuthContext';
import { Multiform } from "../components/Multiform";
import { RequestDomesticFormContext } from "../context/RequestDomesticFormContext";
import { FasesSolicitarNiñera, botonEnviar, useValidar } from "../components/FasesSolicitarNiñera";
import "../styles/SolicitarNiñera.scss"

export const SolicitarÑiñera = () => {

    const { t } = useTranslation();

    let navigate = useNavigate(); 

    const {requestDomesticFormState, setRequestDomesticFormState} = useContext(RequestDomesticFormContext);
    const {authState, setAuthState} = useContext(AuthContext);

    useEffect(() => {
        console.log(authState)
        setRequestDomesticFormState ( prev => {
            const newState = {... prev};
            newState.user = authState.id;
            return newState;
        });
    }, [])
   

    const goHome = () => {
        navigate(`/`);
    };

    //let stagesNames = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    let stagesNames = [];
    for (let i = 0; i < FasesSolicitarNiñera.length; i++) {
        stagesNames.push(t('SolicitarNiñera.fases.'+i+'.nombre'));
    }

    authState.id
    return (
        <div id="SolicitarNiñera">
            
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
                stages={FasesSolicitarNiñera}         // array de componentes que serán usados como stages
                stagesNames={stagesNames}       // nombres de los stages en el idioma correspondiente
                cancelEvent={goHome}            // onClick event del botón de cancelar
                SubmitButton={botonEnviar}   // componente con el botón de submit
                validateStages={useValidar}
            />

        </div>

    )
}
