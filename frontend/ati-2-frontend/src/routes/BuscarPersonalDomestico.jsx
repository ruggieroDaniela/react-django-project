import React from "react";

import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { FieldDropdown } from "../components/search/FieldDropdown";
import { FieldDropdownCheckbox } from "../components/search/FieldDropdownCheckbox";
import { FieldRadioButtons } from "../components/search/FieldRadioButtons";

import "../styles/BuscarPersonalDomestico.scss"

export const BuscarPersonalDomestico = () => {

    const navigate = useNavigate();

    const [selectedContinent, setSelectedContinent] = useState(-1);

    const [busquedaRapida, setBusquedaRapida] = useState(false);
    const [busquedaDetallada, setBusquedaDetallada] = useState(false);

    const { t, i18n } = useTranslation();

    const continentes = []

    for (let index = 0; index < 5; index++) {
        continentes.push( t('continentes.'+index) )
    }

    return <main>
        <div id="buscar-personal-domestico">
            <div className="dropdown">
                <div
                    className="dropdown-title"
                    onClick={ () => setBusquedaRapida( (prev) => !prev ) }
                >
                    <span className="dropdown-arrow">
                        {busquedaRapida?"▾":"▸"}
                    </span>
                    {t('search.busqueda_rapida')}
                </div>
                {busquedaRapida?
                
                    <div className="dropdown-content">
                        <FieldDropdown
                            title={t('search.continente')}
                            placeholder={
                                selectedContinent>=0?
                                    continentes[selectedContinent]:t('search.selecciona_continente')
                            }
                            items={continentes}
                            setSelectedState={setSelectedContinent}
                        />
                        <FieldDropdownCheckbox
                            title={t('search.pais')}
                            placeholder="placeholder 1"
                            items={["1", "2"]}
                        />
                        <FieldDropdownCheckbox
                            title={t('search.estado')}
                            placeholder="placeholder 1"
                            items={["1", "2"]}
                        />
                        <FieldDropdownCheckbox
                            title={t('search.personal_solicitado')}
                            placeholder="placeholder 1"
                            items={["1", "2"]}
                        />
                        
                        <div></div>
                        <button>
                            {t('search.buscar')}
                        </button>
                        <button
                            onClick={() => navigate("/")}
                        >
                            {t('search.cancelar')}
                        </button>
                        <div></div>
                    </div>
                
                : ""}
            </div>

            <div className="dropdown">
                <div
                    className="dropdown-title"
                    onClick={ () => setBusquedaDetallada( (prev) => !prev ) }
                >
                    <span className="dropdown-arrow">
                        {busquedaDetallada?"▾":"▸"}
                    </span>
                    {t('search.busqueda_detallada')}
                </div>
                {busquedaDetallada?
                
                    <div className="dropdown-content">
                        <FieldDropdown
                            title={t('search.continente')}
                            placeholder={
                                selectedContinent>=0?
                                    continentes[selectedContinent]:t('search.selecciona_continente')
                            }
                            items={continentes}
                            setSelectedState={setSelectedContinent}
                        />

                        <FieldDropdownCheckbox
                            title={t('search.pais')}
                            placeholder="placeholder 1"
                            items={["1", "2"]}
                        />
                        <FieldDropdownCheckbox
                            title={t('search.estado')}
                            placeholder="placeholder 1"
                            items={["1", "2"]}
                        />
                        <FieldDropdownCheckbox
                            title={t('search.ciudad')}
                            placeholder="placeholder 1"
                            items={["1", "2"]}
                        />
                        <FieldDropdownCheckbox
                            title={t('search.salida_personal')}
                            placeholder="placeholder 1"
                            items={["1", "2"]}
                        />
                        <FieldDropdownCheckbox
                            title={t('search.personal_solicitado')}
                            placeholder="placeholder 1"
                            items={["1", "2"]}
                        />

                        <FieldDropdownCheckbox
                            title={t('search.horario')}
                            placeholder="placeholder 1"
                            items={["1", "2"]}
                        />

                        <div className="field">
                            <FieldRadioButtons
                                title={t('search.remuneracion')}
                                placeholder="placeholder 1"
                                items={["A convenir", "Por rango"]}
                            />
                            
                            <div className="field-range-input">
                                <input type="text"/>
                                <span> - </span>
                                <input type="text"/>
                            </div>
                            
                        </div>

                        <FieldDropdown
                            title={t('search.remuneracion_frecuencia')}
                            placeholder="placeholder 1"
                            items={["1", "2"]}
                        />

                        <FieldDropdown
                            title={t('search.moneda')}
                            placeholder="placeholder 1"
                            items={["1", "2"]}
                        />

                        <FieldDropdownCheckbox
                            title={t('search.beneficio')}
                            placeholder="placeholder 1"
                            items={["1", "2"]}
                        />

                        <FieldRadioButtons
                            title={t('search.disponibilidad')}
                            placeholder="placeholder 1"
                            items={["1", "2"]}
                        />

                        <FieldRadioButtons
                            title={t('search.listar')}
                            items={["1", "2"]}
                        />
                        
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <button>
                            {t('search.buscar')}
                        </button>
                        <button
                            onClick={() => navigate("/")}
                        >
                            {t('search.cancelar')}
                        </button>
                        <div></div>
                    </div>
                
                : ""}
            </div>
        </div>
    </main>

};