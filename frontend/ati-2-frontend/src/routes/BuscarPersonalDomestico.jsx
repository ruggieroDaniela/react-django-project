import React from "react";

import { useState } from "react";

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
                        {">"}
                    </span>
                    Búsqueda Rápida
                </div>
                {busquedaRapida?
                
                    <div className="dropdown-content">
                        <div className="field">
                            <div className="field-title">
                                t
                            </div>
                            <div className="field-dropdown">
                                <div className="field-dropdown-title">
                                    title <span>V</span> 
                                </div>
                                <ul className="field-dropdown-content">
                                    <li>1</li>
                                    <li>2</li>
                                </ul>
                            </div>
                        </div>
                        <div className="field">
                            <div className="field-title">
                                t
                            </div>
                            <div className="field-dropdown">
                                <div className="field-dropdown-title">
                                    title <span>V</span> 
                                </div>
                                <ul className="field-dropdown-content">
                                    <li>1</li>
                                    <li>2</li>
                                </ul>
                            </div>
                        </div>
                        <div className="field">
                            <div className="field-title">
                                t
                            </div>
                            <div className="field-dropdown">
                                <div className="field-dropdown-title">
                                    title <span>V</span> 
                                </div>
                                <ul className="field-dropdown-content">
                                    <li>1</li>
                                    <li>2</li>
                                </ul>
                            </div>
                        </div>
                        <div className="field">
                            <div className="field-title">
                                t
                            </div>
                            <div className="field-dropdown">
                                <div className="field-dropdown-title">
                                    title <span>V</span> 
                                </div>
                                <ul className="field-dropdown-content">
                                    <li>1</li>
                                    <li>2</li>
                                </ul>
                            </div>
                        </div>
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