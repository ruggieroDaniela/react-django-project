import React from "react";
import { createContext, useContext } from "react";

import { useState } from "react";
import { useTranslation } from 'react-i18next';

import AuthContext from "../components/context/AuthContext";
import { RegisterFormContext, RegisterFormContextProvider } from "../components/context/RegisterFormContext";

import { FasesRegistrar } from "../components/FasesRegistrar";

import "../styles/Registrar.scss"

const FormContext = createContext();

export const Registrar = () => {
    
    const { t, i18n } = useTranslation();

    const [signupStage, setSignupStage] = useState(0);
    const [signupStageDone, setSignupStageDone] = useState(0);

    const nFases = [0,1,2,3,4,5];
    const CurrentFase = FasesRegistrar[signupStage];

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
            <form>
                <RegisterFormContextProvider>
                    {/* {FasesRegistrar[signupStage]()} */}
                    <CurrentFase/>
                </RegisterFormContextProvider>
            
            </form>

        </div>

    )

};

const RegistrarFase0 = () => {
    
    const { t, i18n } = useTranslation();

    const {formState, setFormState} = useContext(FormContext);
    console.log(formState);

    return(
        <>
            <div>
                <div className="descripcion">
                    {t('registrar.fases.0.descripcion')}
                </div>

                <div className="metodos-container">

                    <div className="metodo">
                        <label>
                            <input
                                type="checkbox"
                                onChange={ e => setFormState( {...formState, phase: [  ] } )}
                            />
                            {t('registrar.fases.0.metodos.0')}
                        </label>
                    </div>

                    <div className="metodo">
                        <label>
                            <input type="checkbox" onChange={ e => setFormState( {...formState, social_network: e.target.checked} )}/>
                            {t('registrar.fases.0.metodos.1')}
                        </label>
                        <div id="social-network" className={`${formState.phase[0].other? "":"ghost" }`}>
                            <div>
                                <input type="checkbox"/>
                                Facebook
                            </div>
                            <div>
                                <input type="checkbox"/>
                                Twitter
                            </div>
                            <div>
                                <input type="checkbox"/>
                                Instagram
                            </div>
                            <div>
                                <input type="checkbox"/>
                                {t('otro')}
                            </div>
                            <div>
                                {t('especifique')+": "}
                                <input type="text"/>
                            </div>
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
                        <div className={` ${formState.phase[0].other? "":"ghost" }`}>
                            <div>
                                <input type="checkbox"/>
                                {t('registrar.fases.0.otros_metodos.0')}
                            </div>
                            <div>
                                {t('especifique')+": "}
                                <input type="text"/>
                            </div>
                            <div>
                                <input type="checkbox"/>
                                {t('registrar.fases.0.otros_metodos.1')}
                            </div>
                            <div>
                                {t('especifique')+": "}
                                <input type="text"/>
                            </div>
                            <div>
                                <input type="checkbox"/>
                                {t('otro')}
                            </div>
                            <label>
                                {t('especifique')+": "}
                                <input type="text"/>
                            </label>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
};