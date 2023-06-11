import React from "react";

import { useState } from "react";
import { useTranslation } from 'react-i18next';

import "../styles/Multiform.scss"

export const Multiform = ({stages, SubmitButton, cancelEvent, stagesNames, validateStages}) => {
    
    // hook para la internacionalizacion
    const { t } = useTranslation();

    // indice del stage que se muestra actualmente
    const [currentStage, setCurrentStage] = useState(0);
    // stages por los que ya ha pasado el usuario
    const [stagesDone, setStagesDone] = useState(0);

    // pointer al stage que se muestra actualmente
    const RenderStage = stages[currentStage];

    const { validate } = validateStages();

    return (
        <div className="multiform">

            <div className="fases-grid">
                {
                    // listar todos los stages (los botones verdes y grises)
                    stages.map((stage, i) => {
                        return(
                            <button
                                key={'boton_form_stage_'+i}

                                // checkear el color de la fase listada (verde o gris)
                                className={`fase ${i>stagesDone? "inactive":""} ${i==currentStage? "current":""}`}
                                
                                // dar click en cada boton me lleva al respectivo stage (si ya pasé por ahí)
                                onClick={() => {
                                    if( i<=stagesDone )
                                        setCurrentStage((prev) => i);
                                }}
                            >
                                {(i+1)+"- "+stagesNames[i]}
                            </button>
                        );
                    })
                }
            </div>

            {/* stage actual */}
            <div className="fase-actual">

                {/* Devolverse al stage anterior */}
                <button 
                    className={`${currentStage <= 0?"ghost":""}`}
                    onClick={() => {
                        if(currentStage > 0)
                            setCurrentStage((prev) => prev-1);
                    }}
                >
                    ← {t('multiform.atras')}
                </button>
                
                {/* nombre del stage actual */}
                <span>
                    {stagesNames[currentStage]}
                </span>

                {/* ir al siguiente stage */}
                <button 
                    className={`${currentStage === stages.length-1?"ghost":""}`}
                    onClick={async () => {
                        const valid = await validate(currentStage)
                        
                        if(valid){
                            if(currentStage+1 < stages.length){
                                setCurrentStage((prev) => prev+1);
                                if( currentStage >= stagesDone )
                                    setStagesDone((prev) => prev+1);
                            }
                        }
                    }}
                >
                    {t('multiform.continuar')} →
                </button>
            
            </div>
            
            {/* renderizar stage actual */}
            <form>
                <RenderStage/>
            </form>

            <div id="botones">

                {/* boton de cancelar */}
                <button
                    id="boton_cancelar"
                    onClick={ cancelEvent }
                    >
                    {t('multiform.cancelar')}
                </button>
                
                {/* boton de submit */}
                {
                    currentStage == stages.length-1?
                        <SubmitButton/>
                    :""
                }

            </div>

        </div>

    )

};