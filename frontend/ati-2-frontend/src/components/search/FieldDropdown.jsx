import React from "react";

import { useState } from "react";

import "../styles/BuscarPersonalDomestico.scss"

export const FieldDropdown = ({title, placeholder, items}) => {

    const [displayContent, setDisplayContent] = useState(false);

    return <>
        <div className="field">
            <div className="field-title">
                {title}
            </div>
            <div className="field-dropdown">
                <div
                    className="field-dropdown-title"
                    onClick={ () => setDisplayContent( (prev) => !prev ) }
                >
                    {placeholder} <span>V</span> 
                </div>
                
                {displayContent?
                    <ul className="field-dropdown-content">
                        {items.map( x => <li>{x}</li> )}
                    </ul>
                : ""}

            </div>
        </div>
    </>

};