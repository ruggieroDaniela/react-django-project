import React from "react";

import { useState } from "react";

import "../../styles/BuscarPersonalDomestico.scss"

export const FieldDropdown = ({title, placeholder, items}) => {

    const [displayContent, setDisplayContent] = useState(false);
    const [prevContent, setPrevContent] = useState(placeholder);
    const [selected, setSelected] = useState(-1);

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
                    {prevContent} <span>▾</span> 
                </div>
                
                {displayContent?
                    <ul className="field-dropdown-content">
                        {items.map( (x, index) =>
                            <li
                                className="field-dropdown-item"
                                value={index}
                                onClick={ () => {
                                    setPrevContent( () => x );
                                    setSelected( () => index );
                                } }
                            >
                                {x}
                            </li>
                        )}
                    </ul>
                : ""}

            </div>
        </div>
    </>

};