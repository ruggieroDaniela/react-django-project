import React, { useState, useContext } from "react";

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import AuthContext from "../context/AuthContext";

import "../styles/NuestrosServicios.scss"


export const NuestrosServicios = () => {

    const { t } = useTranslation();
    const {authState, setAuthState} = useContext(AuthContext);
    const isAuth = authState.logged_in;
    const navigate = useNavigate();

    const [clickPostAd, setClickPostAd] = useState(false);
    const [clickFind, setClickFind] = useState(false);

    const [postAdSelected, setPostAdSelected] = useState(-1);

    const postAdLinks = [
        "/post-ad/offer",
        "/post-ad/request"
    ]

    return <>
        <div id="nuestros-servicios">
            <div className="info" id="info-solicitantes">
                <div className="note-title">
                    {t('nuestros_servicios.notas.0.titulo')}
                </div>
                <ol className="list-body">
                    <li>
                        {t('nuestros_servicios.notas.0.items.0')}
                    </li>
                    <li>
                        {t('nuestros_servicios.notas.0.items.1')}
                    </li>
                </ol>
            </div>

            <div className="info" id="info-personal">
                <div className="note-title">
                    {t('nuestros_servicios.notas.1.titulo')}
                </div>
                <ol className="list-body">
                    <li>
                        {t('nuestros_servicios.notas.1.items.0')}
                    </li>
                    <li>
                        {t('nuestros_servicios.notas.1.items.1')}
                    </li>
                </ol>
            </div>

            <div id="opciones">
                <div className="label">
                    {t('nuestros_servicios.seleccionar_servicio')}
                </div>
                <div id="botones">
                    <div className="button_dropdown">
                        <button onClick={() => { setClickPostAd( (prev) => !prev ) }}>
                            {t('nuestros_servicios.publicar_anuncio')}
                        </button>
                        <div
                            className="label"
                            style={{visibility: clickPostAd? "visible":"hidden"}}
                        >
                            <span className="required">*</span> {t('nuestros_servicios.seleccionar_opcion')}
                            <div className="button_dropdown_content">
                                <button
                                    onClick={() => {
                                        setPostAdSelected(prev => prev == 0? -1:0);
                                    }}
                                >
                                    A- {t('nuestros_servicios.opciones.0')}
                                </button>
                                <button
                                    onClick={() => {
                                        setPostAdSelected(prev => prev == 1? -1:1);
                                    }}
                                >
                                    B- {t('nuestros_servicios.opciones.1')}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="button_dropdown">
                        <button onClick={() => { setClickFind( (prev) => !prev ) }}>
                            {t('nuestros_servicios.buscar_personas')}
                        </button>
                        <div
                            className="label"
                            style={{visibility: clickFind? "visible":"hidden"}}
                        >
                            <span className="required">*</span> {t('nuestros_servicios.seleccionar_opcion')}
                            <div className="button_dropdown_content">
                                <button
                                    onClick={ () => {
                                        navigate("/search-domestic-staff");
                                    } }
                                >
                                    C- {t('nuestros_servicios.opciones.2')}
                                </button>
                                <button
                                    onClick={ () => {
                                        navigate("/search-clients");
                                    } }
                                >
                                    D- {t('nuestros_servicios.opciones.3')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {postAdSelected != -1 && clickPostAd &&
                <>
                    <div id="more-options-header">
                        <h4>
                            {postAdSelected == 0?
                                `A- ${t('nuestros_servicios.opciones.0')}`
                                :
                                `B- ${t('nuestros_servicios.opciones.1')}`
                            }
                        </h4>
                        <p>
                            {postAdSelected == 0?
                                `${t('nuestros_servicios.offer_desc')}`
                                :
                                `${t('nuestros_servicios.request_desc')}`
                            }
                        </p>
                    </div>
                    <div id="more-options">
                        
                        <button 
                            onClick={() => { 
                                if(!isAuth)
                                    navigate(`/login`)

                                navigate(`${postAdLinks[postAdSelected]}/babysitter`)
                            }}
                        >
                            {t('NIN')}
                        </button>
                        <div className="desc">
                            {t('nuestros_servicios.NIN_desc')}
                        </div>
                        <button 
                            onClick={() => { 
                                if(!isAuth)
                                    navigate(`/login`)
                                    
                                navigate(`${postAdLinks[postAdSelected]}/caretaker`)
                            }}
                        >
                            {t('CUI')}
                        </button>
                        <div className="desc">
                            {t('nuestros_servicios.CUI_desc')}
                        </div>
                        
                    </div>
                    <div id="how-to">
                        <h4>
                            {postAdSelected == 0?
                                `${t('nuestros_servicios.como_ofrezco')}`
                                :
                                `${t('nuestros_servicios.como_solicito')}`
                            }
                        </h4>
                        <ol id="steps">
                            <li>{t('nuestros_servicios.pasos_solicitar.0')} <a href="/sign-up">{t('aquí')}</a></li>
                            <li>{t('nuestros_servicios.pasos_solicitar.1')} <a href="/login">{t('aquí')}</a></li>
                            {postAdSelected == 1 &&
                                <li>{t('nuestros_servicios.pasos_solicitar.2')}</li>
                            }
                        </ol>
                    </div>
                </>
            }
        </div>
    </>

};