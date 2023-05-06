import React from "react";

import { useState } from "react";
import { useTranslation } from 'react-i18next';

import AuthContext from "../components/AuthContext";

import "../styles/Registrar.scss"

export const Registrar = () => {

    const { t, i18n } = useTranslation();

    const [signupStage, setSignupStage] = useState(0);
    const [signupStageDone, setSignupStageDone] = useState(0);

    const nFases = [0,1,2,3,4,5];

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
                                {t('registrar.fases.'+i)}
                            </button>
                        );
                    })
                }
            </div>
            <div className="fase-actual">
                <span>
                    {t('registrar.fases.'+signupStage)}
                </span>
                <button 
                    onClick={() => {
                        setSignupStage((prev) => prev+1);
                        setSignupStageDone((prev) => prev+1);
                    }}
                >
                    {t('registrar.continuar')} →
                </button>
            </div>
        </div>
    )

};