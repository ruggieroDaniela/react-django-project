import React, { useState, useContext } from "react";

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { RequestDomesticFormContext, RequestDomesticFormContextProvider } from "../context/RequestDomesticFormContext";

import "../styles/NuestrosServicios.scss"


export const NuestrosServicios = () => {

    const { t } = useTranslation();
    const {requestDomesticFormState, setRequestDomesticFormState} = useContext(RequestDomesticFormContext);
    const navigate = useNavigate();

    const [clickPostAd, setClickPostAd] = useState(false);
    const [clickFind, setClickFind] = useState(false);

    const [displayMoreOpt, setDisplayMoreOpt] = useState(false);
    const [postAdSelected, setPostAdSelected] = useState(0);

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
                                        setDisplayMoreOpt(prev => !prev);
                                        setPostAdSelected(() => 0);
                                    }}
                                >
                                    A- {t('nuestros_servicios.opciones.0')}
                                </button>
                                <button
                                    onClick={() => {
                                        setDisplayMoreOpt(prev => !prev);
                                        setPostAdSelected(() => 1);
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
            {displayMoreOpt && clickPostAd &&

                <div id="more-options">
                    
                    <button onClick={() => { navigate(`${postAdLinks[postAdSelected]}/babysitter`) }}>
                        {t('NIN')}
                    </button>
                    <div className="desc">
                        {t('nuestros_servicios.NIN_desc')}
                    </div>

                    <button onClick={() => { navigate(`${postAdLinks[postAdSelected]}/caretaker`) }}>
                        {t('CUI')}
                    </button>
                    <div className="desc">
                        {t('nuestros_servicios.CUI_desc')}
                    </div>
                    
                </div>
            }
        </div>
    </>

};