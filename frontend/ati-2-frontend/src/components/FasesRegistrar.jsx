import React, { useContext } from "react";
import { RegisterFormContext } from "./context/RegisterFormContext";

import { useTranslation } from 'react-i18next';

import "../styles/Registrar.scss"

// Fase 0: de donde nos conoces?
const Fase0 = () =>
    {

        const { t, i18n } = useTranslation();
        const {registerFormState, setRegisterFormState} = useContext(RegisterFormContext);

        return(
        <>
            <div className="fase0">
                <div className="descripcion">
                    {t('registrar.fases.0.descripcion')}
                </div>

                <div className="metodos-container">

                    <div className="metodo">
                        <label>
                            <input
                                type="checkbox"
                                onChange={ e => {
                                    setRegisterFormState( prev => {
                                        const newState = {... prev};
                                        newState.phase[0] = {... prev.phase[0]};
                                        newState.phase[0].website = e.target.checked;
                                        return newState;
                                    } );   
                                }}
                            />
                            {t('registrar.fases.0.metodos.0')}
                        </label>
                    </div>

                    <div className="metodo">
                        <label>
                            <input
                                type="checkbox"
                                onChange={ e => {
                                    setRegisterFormState( prev => {
                                        const newState = {... prev};
                                        newState.phase[0] = {... prev.phase[0]};
                                        newState.phase[0].social_network = e.target.checked;
                                        return newState;
                                    } );
                                }}
                            />
                            {t('registrar.fases.0.metodos.1')}
                        </label>
                        <div id="social-network" className={`${registerFormState.phase[0].social_network? "":"ghost" }`}>
                            <div>
                                <input
                                    type="checkbox"
                                    onChange={ e => {
                                        setRegisterFormState( prev => {
                                            const newState = {... prev};
                                            newState.phase[0] = {... prev.phase[0]};
                                            newState.phase[0].facebook = e.target.checked;
                                            return newState;
                                        } );
                                    }}
                                />
                                Facebook
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    onChange={ e => {
                                        setRegisterFormState( prev => {
                                            const newState = {... prev};
                                            newState.phase[0] = {... prev.phase[0]};
                                            newState.phase[0].twitter = e.target.checked;
                                            return newState;
                                        } );
                                    }}
                                />
                                Twitter
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    onChange={ e => {
                                        setRegisterFormState( prev => {
                                            const newState = {... prev};
                                            newState.phase[0] = {... prev.phase[0]};
                                            newState.phase[0].instagram = e.target.checked;
                                            return newState;
                                        } );
                                    }}
                                />
                                Instagram
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    onChange={ e => {
                                        setRegisterFormState( prev => {
                                            const newState = {... prev};
                                            newState.phase[0] = {... prev.phase[0]};
                                            newState.phase[0].social_network_other = e.target.checked;
                                            return newState;
                                        } );
                                    }}
                                />
                                {t('otro')}
                            </div>
                            <div style={ {display: registerFormState.phase[0].social_network_other? "block":"none"} }>
                                {t('especifique')+": "}
                                <input
                                    type="text"
                                    onChange={ e => {
                                        setRegisterFormState( prev => {
                                            const newState = {... prev};
                                            newState.phase[0] = {... prev.phase[0]};
                                            newState.phase[0].social_network_other_spec = e.target.value;
                                            return newState;
                                        } );
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="metodo">
                        <label>
                            <input
                                type="checkbox"
                                onChange={ e => {
                                    setRegisterFormState( prev => {
                                        const newState = {... prev};
                                        newState.phase[0] = {... prev.phase[0]};
                                        newState.phase[0].friends = e.target.checked;
                                        return newState;
                                    } );
                                }}
                            />
                            {t('registrar.fases.0.metodos.2')}
                        </label>
                    </div>

                    <div className="metodo">
                        <label>
                            <input
                                type="checkbox"
                                onChange={ e => {
                                    setRegisterFormState( prev => {
                                        const newState = {... prev};
                                        newState.phase[0] = {... prev.phase[0]};
                                        newState.phase[0].other = e.target.checked;
                                        return newState;
                                    } );
                                }}
                            />
                            {t('registrar.fases.0.metodos.3')}
                        </label>
                        <div className={` ${registerFormState.phase[0].other? "":"ghost" }`}>
                            <div>
                                <input
                                    type="checkbox"
                                    onChange={ e => {
                                    setRegisterFormState( prev => {
                                            const newState = {... prev};
                                            newState.phase[0] = {... prev.phase[0]};
                                            newState.phase[0].radio = e.target.checked;
                                            return newState;
                                        } );
                                    }}    
                                />
                                {t('registrar.fases.0.otros_metodos.0')}
                            </div>
                            <div style={ {display: registerFormState.phase[0].radio? "block":"none"} } >
                                {t('especifique')+": "}
                                <input
                                    type="text"
                                    onChange={ e => {
                                    setRegisterFormState( prev => {
                                            const newState = {... prev};
                                            newState.phase[0] = {... prev.phase[0]};
                                            newState.phase[0].radio_spec = e.target.value;
                                            return newState;
                                        } );
                                    }}  
                                />
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    onChange={ e => {
                                    setRegisterFormState( prev => {
                                            const newState = {... prev};
                                            newState.phase[0] = {... prev.phase[0]};
                                            newState.phase[0].press = e.target.checked;
                                            return newState;
                                        } );
                                    }}  
                                />
                                {t('registrar.fases.0.otros_metodos.1')}
                            </div>
                            <div style={ {display: registerFormState.phase[0].press? "block":"none"} } >
                                {t('especifique')+": "}
                                <input
                                    type="text"
                                    onChange={ e => {
                                    setRegisterFormState( prev => {
                                            const newState = {... prev};
                                            newState.phase[0] = {... prev.phase[0]};
                                            newState.phase[0].press_spec = e.target.value;
                                            return newState;
                                        } );
                                    }} 
                                />
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    onChange={ e => {
                                    setRegisterFormState( prev => {
                                            const newState = {... prev};
                                            newState.phase[0] = {... prev.phase[0]};
                                            newState.phase[0].other_other = e.target.checked;
                                            return newState;
                                        } );
                                    }} 
                                />
                                {t('otro')}
                            </div>
                            <div style={ {display: registerFormState.phase[0].other_other? "block":"none"} }>
                                {t('especifique')+": "}
                                <input
                                    type="text"
                                    onChange={ e => {
                                    setRegisterFormState( prev => {
                                            const newState = {... prev};
                                            newState.phase[0] = {... prev.phase[0]};
                                            newState.phase[0].other_other_spec = e.target.value;
                                            return newState;
                                        } );
                                    }} 
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
        )

    };

// Fase 1: registrar usuario
const Fase1 = () => {
        const { t, i18n } = useTranslation();
        const {registerFormState, setRegisterFormState} = useContext(RegisterFormContext);

        return(
            <div className="fase1">
                
                <div id="tipo_usuario">
                    <label>{t('registrar.fases.1.tipo_usuario')+": "}</label>
                    <label>
                        <input
                            type="radio"
                            value="natural"
                            checked={ registerFormState.phase[1].tipo_usuario === 'natural' }
                            onChange={ e => {
                                setRegisterFormState( prev => {
                                        const newState = {... prev};
                                        newState.phase[1] = {... prev.phase[1]};
                                        newState.phase[1].tipo_usuario = 'natural';
                                        return newState;
                                    } );
                            }}
                        />
                        {t('registrar.fases.1.tipo_natural')}
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="empresa"
                            checked={ registerFormState.phase[1].tipo_usuario === 'empresa' }
                            onChange={ e => {
                                setRegisterFormState( prev => {
                                        const newState = {... prev};
                                        newState.phase[1] = {... prev.phase[1]};
                                        newState.phase[1].tipo_usuario = 'empresa';
                                        return newState;
                                    } );
                            }}
                        />
                        {t('registrar.fases.1.tipo_empresa')}
                    </label>
                </div>

                {
                    registerFormState.phase[1].tipo_usuario === 'natural'?
                    <div id="usuario_natural" className="container">
                        natural
                    </div>
                    :
                    <div id="usuario_empresa" className="container">
                        empresa
                    </div>
                }

            </div>
        );
    }

const Fase2 = () => {
        const { t, i18n } = useTranslation();
        const {registerFormState, setRegisterFormState} = useContext(RegisterFormContext);

        return(
            <div>
                Fase 2
            </div>
        );
    }

const Fase3 = () => {
        const { t, i18n } = useTranslation();
        const {registerFormState, setRegisterFormState} = useContext(RegisterFormContext);

        return(
            <div>
                Fase 3
            </div>
        );
    }

const Fase4 = () => {
        const { t, i18n } = useTranslation();
        const {registerFormState, setRegisterFormState} = useContext(RegisterFormContext);

        return(
            <div>
                Fase 4
            </div>
        );
    }

const Fase5 = () => {
        const { t, i18n } = useTranslation();
        const {registerFormState, setRegisterFormState} = useContext(RegisterFormContext);

        return(
            <div>
                Fase 5
            </div>
        );
    }

const FasesRegistrar = [Fase0, Fase1, Fase2, Fase3, Fase4, Fase5];

export {FasesRegistrar};