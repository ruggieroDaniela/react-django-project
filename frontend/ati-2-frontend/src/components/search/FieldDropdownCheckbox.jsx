import React from "react";

import { useState } from "react";

import "../../styles/BuscarPersonalDomestico.scss"

export const FieldDropdownCheckbox = ({title, placeholder, items, values, state, setState}) => {

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
                                <label key={"label" + x + index}>
                                    <li
                                        key={"li" + x + index}
                                        className="field-dropdown-item"
                                    >
                                            <input
                                                key={"checkbox" + x + index}
                                                type="checkbox"
                                                checked={ index < values.length && state.includes(values[index])}
                                                onChange={
                                                    () => {
                                                        if( index < values.length ){
                                                            if( state.includes(values[index]) == false ){
                                                                setState( prev => { return prev + "," + values[index] } )
                                                            }else{
                                                                setState( prev => prev.replace(','+values[index], '') )
                                                            }
                                                        }
                                                    }
                                                }
                                            />
                                            <span key={"span" + x + index}>{x}</span>
                                    </li>
                                </label>
                        )}
                    </ul>
                : ""}

            </div>
        </div>
    </>

};