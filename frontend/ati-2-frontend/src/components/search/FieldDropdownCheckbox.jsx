import React from "react";

import { useState } from "react";

import "../../styles/BuscarPersonalDomestico.scss"

export const FieldDropdownCheckbox = ({title, placeholder, items}) => {

    const [displayContent, setDisplayContent] = useState(false);

    return <>
        <div className="field">
            <div className="field-title">
                {title}
            </div>
            <div
                className="field-dropdown"
                onMouseLeave={ () => setDisplayContent( () => false ) }
            >
                <div
                    className="field-dropdown-title"
                    onClick={ () => setDisplayContent( (prev) => !prev ) }
                >
                    {placeholder} <span>▾</span> 
                </div>
                
                {displayContent?
                    <ul className="field-dropdown-content">
                        {items.map(
                            x =>
                                <label>
                                    <li
                                        className="field-dropdown-item"
                                    >
                                            <input type="checkbox"/>
                                            <span>{x}</span>
                                    </li>
                                </label>
                        )}
                    </ul>
                : ""}

            </div>
        </div>
    </>

};