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
                                <label key={"label" + values[index] + index}>
                                    <li
                                        key={"li" + values[index] + index}
                                        className="field-dropdown-item"
                                    >
                                            <input
                                                key={"checkbox" + values[index] + index}
                                                type="checkbox"
                                                checked={state.includes(values[index])}
                                                onChange={
                                                    () => {

                                                        if( state.includes(values[index]) == false ){
                                                            setState( prev => { return prev + "," + values[index] } )
                                                        }else{
                                                            setState( prev => prev.replace(','+values[index], '') )
                                                        }
                                                    }
                                                }
                                            />
                                            <span key={"span" + values[index] + index}>{x}</span>
                                    </li>
                                </label>
                        )}
                    </ul>
                : ""}

            </div>
        </div>
    </>

};