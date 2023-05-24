import React from "react";

import { useState } from "react";

import "../../styles/BuscarPersonalDomestico.scss"

export const FieldDropdownCheckbox = ({title, placeholder, items, state, setState}) => {

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
                            (x, index) =>
                                <label>
                                    <li
                                        key={"" + x + index}
                                        className="field-dropdown-item"
                                    >
                                            <input
                                                type="checkbox"
                                                checked={state.includes(x)}
                                                onClick={
                                                    () => {

                                                        if( state.includes(x) == false ){
                                                            setState( prev => { return prev + "," + x } )
                                                        }else{
                                                            setState( prev => prev.replace(','+x, '') )
                                                        }
                                                    }
                                                }
                                            />
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