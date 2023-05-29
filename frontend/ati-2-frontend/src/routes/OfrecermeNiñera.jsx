import React from "react";

import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import { Multiform } from "../components/Multiform";
import { FasesOfrecermeNiñera, botonEnviar } from "../components/FasesOfrecermeNiñera";

import "../styles/OfrecermeNiñera.scss"

export const OfrecermeNiñera = () => {
    
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
            
            <div>
                <h4>{t('OfrecermeNiñera.titulo')}</h4>
            </div>

            <div className="indicaciones">
                <span>*</span> <span className="indicacion">{t('OfrecermeNiñera.indicaciones.0')}</span>
                <br />
                <span>*</span> <span className="indicacion">{t('OfrecermeNiñera.indicaciones.1')}</span>
            </div>

            <Multiform
                stages={FasesOfrecermeNiñera}         // array de componentes que serán usados como stages
                stagesNames={stagesNames}       // nombres de los stages en el idioma correspondiente
                cancelEvent={goHome}            // onClick event del botón de cancelar
                SubmitButton={botonEnviar}   // componente con el botón de submit
            />

        </div>

    )

};