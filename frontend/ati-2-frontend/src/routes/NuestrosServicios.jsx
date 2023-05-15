import React from "react";
import { useTranslation } from 'react-i18next';

export const NuestrosServicios = () => {

    const { t } = useTranslation();

    return <>
        <div id="nuestros-servicios">
            <div id="info-solicitantes">
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
            <div id="info-personal">
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
                        <button>
                            {t('nuestros_servicios.publicar_anuncio')}
                        </button>
                        <div className="label">
                            <span className="required">*</span> {t('nuestros_servicios.seleccionar_opcion')}
                            <div className="button_dropdown_content">
                                <button>
                                    {t('nuestros_servicios.opciones.0')}
                                </button>
                                <button>
                                    {t('nuestros_servicios.opciones.1')}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="button_dropdown">
                        <button>
                            {t('nuestros_servicios.buscar_personas')}
                        </button>
                        <div className="label">
                            <span className="required">*</span> {t('nuestros_servicios.seleccionar_opcion')}
                            <div className="button_dropdown_content">
                                <button>
                                    {t('nuestros_servicios.opciones.2')}
                                </button>
                                <button>
                                    {t('nuestros_servicios.opciones.3')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>

};