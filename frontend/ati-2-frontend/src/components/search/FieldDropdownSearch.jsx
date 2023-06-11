import React from "react";

import { useState } from "react";

import "../../styles/BuscarPersonalDomestico.scss"
import PopUp from "./PopUp";

export const FieldDropdownSearch = ({title, placeholder, items, setSelectedState,popUpHTML}) => {
    const [state,setState] = useState(false);
    
    const togglePop = () => {
        setState(!state);
    };

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
                        {items.map( (x, index) =>
                            <li
                                key={x + index}
                                className="field-dropdown-item"
                                value={index}
                                onClick={ () => {
                                    setSelectedState( () => index );
                                    setDisplayContent( () => false );
                                    togglePop()
                                } }
                            >
                                {x}
                            </li>
                        )}
                    </ul>

                : ""}


            </div>
            {state ? <PopUp toggle={togglePop} /> : null}
        </div>
    </>

};