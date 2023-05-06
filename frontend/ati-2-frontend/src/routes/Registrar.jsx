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
            {(() => {
                switch (signupStage) {
                    case 0:
                        return <RegistrarFase0/>
                    case 1:
                        return <RegistrarFase1/>
                    case 2:
                        return <RegistrarFase2/>
                    case 3:
                        return <RegistrarFase3/>
                    case 4:
                        return <RegistrarFase4/>
                    case 5:
                        return <RegistrarFase5/>
                    default:
                        return null;
                }
            })()}

        </div>

    )

};

const RegistrarFase0 = () => {
    
    const { t, i18n } = useTranslation();

    return(
        <>
            <div>
                <div className="descripcion">
                    {t('registrar.fases.0.descripcion')}
                </div>
                
                <div className="metodos-container">

                    <div className="metodo">
                        <label>
                            <input type="checkbox"/>
                            {t('registrar.fases.0.metodos.0')}
                        </label>
                    </div>

                    <div className="metodo">
                        <label>
                            <input type="checkbox"/>
                            {t('registrar.fases.0.metodos.1')}
                        </label>
                        <div className="social-network">
                            <label>
                                <input type="checkbox"/>
                                Facebook
                            </label>
                            <label>
                                <input type="checkbox"/>
                                Twitter
                            </label>
                            <label>
                                <input type="checkbox"/>
                                Instagram
                            </label>
                            <label>
                                <input type="checkbox"/>
                                {t('otro')}
                            </label>
                            <label>
                                {t('especifique')}
                                <input type="text"/>
                            </label>
                        </div>
                    </div>

                    <div className="metodo">
                        <label>
                            <input type="checkbox"/>
                            {t('registrar.fases.0.metodos.2')}
                        </label>
                    </div>

                    <div className="metodo">
                        <label>
                            <input type="checkbox"/>
                            {t('registrar.fases.0.metodos.3')}
                        </label>
                        <div className="social-network">
                            <label>
                                <input type="checkbox"/>
                                {t('registrar.fases.0.otros_metodos.0')}
                            </label>
                            <label>
                                {t('especifique')}
                                <input type="text"/>
                            </label>
                            <label>
                                <input type="checkbox"/>
                                {t('registrar.fases.0.otros_metodos.1')}
                            </label>
                            <label>
                                {t('especifique')}
                                <input type="text"/>
                            </label>
                            <label>
                                <input type="checkbox"/>
                                {t('otro')}
                            </label>
                            <label>
                                {t('especifique')}
                                <input type="text"/>
                            </label>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
};

const RegistrarFase1 = () => {
    return(
        <div>Fase 1</div>
    )
};

const RegistrarFase2 = () => {
    return(
        <div>Fase 2</div>
    )
};

const RegistrarFase3 = () => {
    return(
        <div>Fase 3</div>
    )
};

const RegistrarFase4 = () => {
    return(
        <div>Fase 4</div>
    )
};

const RegistrarFase5 = () => {
    return(
        <div>Fase 5</div>
    )
};