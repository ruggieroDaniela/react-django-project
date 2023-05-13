import React from "react";

import { useState } from "react";
import { useTranslation } from 'react-i18next';

import "../styles/Multiform.scss"

export const Multiform = (props) => {
    
    const { t } = useTranslation();

    const [currentStage, setCurrentStage] = useState(0);
    const [stagesDone, setStagesDone] = useState(0);

    const RenderStage = props.stages[currentStage];
    const ContextProvider = props.FormContextProvider;

    return (
        <div className="multiform">

            <div className="fases-grid">
                {
                    props.stages.map((stage, i) => {
                        return(
                            <button
                                key={'boton_form_stage_'+i}
                                className={`fase ${i>stagesDone? "inactive":""} ${i==currentStage? "current":""}`}
                                onClick={() => {
                                    if( i<=stagesDone )
                                        setCurrentStage((prev) => i);
                                }}
                            >
                                {(i+1)+"- "+props.stagesNames[i]}
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
                    ← {t('multiform.atras')}
                </button>
                <span>
                    {props.stagesNames[currentStage]}
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
                    {t('multiform.continuar')} →
                </button>
            </div>
            <form>
                <ContextProvider>
                    <RenderStage/>
                </ContextProvider>
            </form>
            <div id="botones">
                <button
                    id="boton_cancelar"
                    onClick={ props.cancelEvent }
                >
                    {t('multiform.cancelar')}
                </button>
                <button
                    id="boton_registrar"
                    onClick={ props.submitEvent }
                    style={{
                        display: currentStage == props.stages.length-1? "block":"none"
                    }}
                >
                    {t('multiform.registrar')}
                </button>
            </div>

        </div>

    )

};