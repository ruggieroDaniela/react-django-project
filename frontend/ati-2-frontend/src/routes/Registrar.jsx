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

    let navigate = useNavigate(); 
    const goHome = () => {
        navigate(`/`);
    };

    const register = () => {};

    let stagesNames = [];
    for (let i = 0; i < FasesRegistrar.length; i++) {
        stagesNames.push(t('registrar.fases.'+i+'.nombre'));
    }

    return (
        <div className="registrar">
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