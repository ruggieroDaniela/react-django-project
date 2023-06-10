import React, { useContext } from "react";
import { RegisterFormContext } from "../context/RegisterFormContext";

import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import { Multiform } from "../components/Multiform";
import { FasesRegistrar, botonRegistrar, registrarUsuario, useValidarRegistrar } from "../components/FasesRegistrar";

import "../styles/Registrar.scss"

export const Registrar = () => {
    
    // hook para la internacionalizacion
    const { t } = useTranslation();

    // hook para redireccionar
    let navigate = useNavigate(); 

    // onClick event del botón de cancelar
    const goHome = () => {
        navigate(`/`);
    };

    const {registerFormState, setRegisterFormState} = useContext(RegisterFormContext);

    const stayInformed = registerFormState.phase[3].newsletter
    const stages2render = []
    // nombres de los stages en el idioma actual
    let stagesNames = [];
    for (let i = 0; i < FasesRegistrar.length; i++) {
        if(!(!stayInformed && i === 4)){
            stagesNames.push(t('registrar.fases.'+i+'.nombre'));
            stages2render.push(FasesRegistrar[i])
        }
    }

    return (
        <div id="registrar">
            
            <div>
                <h4>{t('registrar.titulo')}</h4>
            </div>

            <div className="indicaciones">
                <span>*</span> <span className="indicacion">{t('registrar.indicaciones.0')}</span>
                <br />
                <span>*</span> <span className="indicacion">{t('registrar.indicaciones.1')}</span>
            </div>

            <Multiform
                stages={stages2render}         // array de componentes que serán usados como stages
                stagesNames={stagesNames}       // nombres de los stages en el idioma correspondiente
                cancelEvent={goHome}            // onClick event del botón de cancelar
                SubmitButton={botonRegistrar}   // componente con el botón de submit
                validateStages={useValidarRegistrar}
            />

        </div>

    )

};