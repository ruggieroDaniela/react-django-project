import React from "react";

import { useState } from "react";
import { useTranslation } from 'react-i18next';

import { FieldDropdown } from "../components/search/FieldDropdown";
import { FieldDropdownCheckbox } from "../components/search/FieldDropdownCheckbox";

import "../styles/BuscarPersonalDomestico.scss"

export const BuscarPersonalDomestico = () => {

    const [busquedaRapida, setBusquedaRapida] = useState(false);
    const [busquedaDetallada, setBusquedaDetallada] = useState(false);

    const { t, i18n } = useTranslation();

    const continentes = []

    for (let index = 0; index < 5; index++) {
        continentes.push( t('continentes.'+index) )
    }

    return <>
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
                            placeholder={t('search.selecciona_continente')}
                            items={continentes}
                        />
                        <FieldDropdownCheckbox
                            title="title 1"
                            placeholder="placeholder 1"
                            items={["1", "2"]}
                        />
                        <FieldDropdownCheckbox
                            title="title 1"
                            placeholder="placeholder 1"
                            items={["1", "2"]}
                        />
                        <FieldDropdownCheckbox
                            title="title 1"
                            placeholder="placeholder 1"
                            items={["1", "2"]}
                        />
                        
                        <div></div>
                        <button>Buscar</button>
                        <button>Cancelar</button>
                        <div></div>
                    </div>
                
                : ""}
            </div>
        </div>
    </>

};