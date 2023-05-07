import React, { useContext } from "react";
import { RegisterFormContext } from "./context/RegisterFormContext";

import { useTranslation } from 'react-i18next';

// Fase 0: de donde nos conoces?
const Fase0 = () =>
    {

        const { t, i18n } = useTranslation();
        const {registerFormState, setRegisterFormState} = useContext(RegisterFormContext);

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
                            <div>
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

const FasesRegistrar = [

    Fase0
    // ,

    // // Fase 1: registrar usuario
    // () => {

    // },

    // // Fase 2: idioma
    // () => {

    // },

    // // Fase 3: Login data
    // () => {

    // },

    // // Fase 4: Newsletter
    // () => {

    // },

    // // Fase 5: Facturación
    // () => {

    // }

];

export {FasesRegistrar};