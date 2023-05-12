import React from "react";
import { createContext, useContext } from "react";

import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { useTranslation } from 'react-i18next';

import AuthContext from "../components/context/AuthContext";
import { RegisterFormContext, RegisterFormContextProvider } from "../components/context/RegisterFormContext";

import { FasesRegistrar } from "../components/FasesRegistrar";

import "../styles/Registrar.scss"

const FormContext = createContext();

export const Registrar = () => {
    
    const { t, i18n } = useTranslation();

    const [signupStage, setSignupStage] = useState(0);
    const [signupStageDone, setSignupStageDone] = useState(0);

    const nFases = [0,1,2,3,4,5];
    const CurrentFase = FasesRegistrar[signupStage];

    let navigate = useNavigate(); 
    const goHome = () => {
        navigate(`/`);
    };

    return (
        <div className="registrar">
            <div className="title">
                <h4>{t('registrar.titulo')}</h4>
            </div>

            <div className="indicaciones">
                <span>*</span> <span className="indicacion">{t('registrar.indicaciones.0')}</span>
                <br />
                <span>*</span> <span className="indicacion">{t('registrar.indicaciones.1')}</span>
            </div>

            <div className="fases-grid">
                {
                    nFases.map(i => {
                        return(
                            <button
                                key={'boton_registrar_fase_'+i}
                                className={`fase ${i>signupStageDone? "inactive":""} ${i==signupStage? "current":""}`}
                                onClick={() => {
                                    if( i<=signupStageDone )
                                        setSignupStage((prev) => i);
                                }}
                            >
                                {(i+1)+"- "+t('registrar.fases.'+i+'.nombre')}
                            </button>
                        );
                    })
                }
            </div>

            <div className="fase-actual">
                <button 
                    className={`${signupStage <= 0?"ghost":""}`}
                    onClick={() => {
                        if(signupStage > 0)
                            setSignupStage((prev) => prev-1);
                    }}
                >
                    ← {t('registrar.atras')}
                </button>
                <span>
                    {t('registrar.fases.'+signupStage+'.nombre')}
                </span>
                <button 
                    className={`${signupStage === nFases.length-1?"ghost":""}`}
                    onClick={() => {
                        if( signupStage+1 < nFases.length ){
                            setSignupStage((prev) => prev+1);
                            if( signupStage >= signupStageDone )
                                setSignupStageDone((prev) => prev+1);
                        }
                    }}
                >
                    {t('registrar.continuar')} →
                </button>
            </div>
            <form>
                <RegisterFormContextProvider>
                    <CurrentFase/>
                </RegisterFormContextProvider>
            </form>
            <div id="botones">
                <button
                    id="boton_cancelar"
                    onClick={goHome}
                >
                    {t('registrar.botones.cancelar')}
                </button>
                <button
                    id="boton_registrar"
                    style={{
                        display: signupStage == nFases.length-1? "block":"none"
                    }}
                >
                    {t('registrar.botones.registrar')}
                </button>
            </div>

        </div>

    )

};