import React from "react";
import { createContext, useContext } from "react";

import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { useTranslation } from 'react-i18next';

import AuthContext from "../components/context/AuthContext";
import { RegisterFormContext, RegisterFormContextProvider } from "../components/context/RegisterFormContext";

import { Multiform } from "../components/Multiform";
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

            <Multiform stages={FasesRegistrar} />

        </div>

    )

};