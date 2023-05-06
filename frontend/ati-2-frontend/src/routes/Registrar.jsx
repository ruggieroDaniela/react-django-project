import React from "react";

import { useState } from "react";
import { useTranslation } from 'react-i18next';

import AuthContext from "../components/AuthContext";

export const Registrar = () => {

    const { t, i18n } = useTranslation();

    const [signupStage, setSignupStage] = useState(0);

    const nFases = [0,1,2,3,4,5];

    return <>
        <h3>{t('registrar.titulo')}</h3>
        <div>
            <span>*</span> <span>{t('registrar.indicaciones.0')}</span>
            <br />
            <span>*</span> <span>{t('registrar.indicaciones.1')}</span>
        </div>
        <div>
            {
                nFases.map(i => {
                    return(
                        <button>{t('registrar.fases.'+i)}</button>
                    );
                })
            }
        </div>
        <div>
            {t('registrar.fases.'+signupStage)}
            <button onClick={() => setSignupStage((prev) => prev+1)}>{t('registrar.continuar')}</button>
        </div>
    </>

};