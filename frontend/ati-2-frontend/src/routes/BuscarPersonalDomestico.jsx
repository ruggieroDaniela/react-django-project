import React from "react";

import { useState } from "react";

import { FieldDropdown } from "../components/search/FieldDropdown";

import "../styles/BuscarPersonalDomestico.scss"

export const BuscarPersonalDomestico = () => {

    const [busquedaRapida, setBusquedaRapida] = useState(false);
    const [busquedaDetallada, setBusquedaDetallada] = useState(false);

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
                    Búsqueda Rápida
                </div>
                {busquedaRapida?
                
                    <div className="dropdown-content">
                        <FieldDropdown
                            title="title 1"
                            placeholder="placeholder 1"
                            items={["1", "2"]}
                        />
                        <FieldDropdown
                            title="title 1"
                            placeholder="placeholder 1"
                            items={["1", "2"]}
                        />
                        <FieldDropdown
                            title="title 1"
                            placeholder="placeholder 1"
                            items={["1", "2"]}
                        />
                        <FieldDropdown
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