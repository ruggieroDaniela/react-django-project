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

export const Multiform = (props) => {
    
    const { t, i18n } = useTranslation();

    const [currentStage, setCurrentStage] = useState(0);
    const [stagesDone, setStagesDone] = useState(0);

    const RenderStage = props.stages[currentStage];

    let navigate = useNavigate(); 
    const goHome = () => {
        navigate(`/`);
    };

    return (
        <div className="registrar">

            <div className="fases-grid">
                {
                    props.stages.map((stage, i) => {
                        return(
                            <button
                                key={'boton_registrar_fase_'+i}
                                className={`fase ${i>stagesDone? "inactive":""} ${i==currentStage? "current":""}`}
                                onClick={() => {
                                    if( i<=stagesDone )
                                        setCurrentStage((prev) => i);
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
                    className={`${currentStage <= 0?"ghost":""}`}
                    onClick={() => {
                        if(currentStage > 0)
                            setCurrentStage((prev) => prev-1);
                    }}
                >
                    ← {t('registrar.atras')}
                </button>
                <span>
                    {t('registrar.fases.'+currentStage+'.nombre')}
                </span>
                <button 
                    className={`${currentStage === props.stages.length-1?"ghost":""}`}
                    onClick={() => {
                        if( currentStage+1 < props.stages.length ){
                            setCurrentStage((prev) => prev+1);
                            if( currentStage >= stagesDone )
                                setStagesDone((prev) => prev+1);
                        }
                    }}
                >
                    {t('registrar.continuar')} →
                </button>
            </div>
            <form>
                <RegisterFormContextProvider>
                    <RenderStage/>
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
                        display: currentStage == props.stages.length-1? "block":"none"
                    }}
                >
                    {t('registrar.botones.registrar')}
                </button>
            </div>

        </div>

    )

};