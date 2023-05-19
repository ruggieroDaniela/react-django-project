import React from "react";

import { useState } from "react";

import "../styles/BuscarPersonalDomestico.scss"

export const BuscarPersonalDomestico = () => {

    const [busquedaRapida, setBusquedaRapida] = useState(false);
    const [busquedaDetallada, setBusquedaDetallada] = useState(false);

    return <>
        <div id="buscar-personal-domestico">
            <div
                className="dropdown-title"
                onClick={ () => setBusquedaRapida( (prev) => !prev ) }
            >
                <span className="dropdown-arrow">
                {">"}
                </span>
                Búsqueda Rápida
            </div>
        </div>
    </>

};