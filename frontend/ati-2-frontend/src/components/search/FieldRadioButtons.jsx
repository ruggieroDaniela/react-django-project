import React from "react";

import { useState } from "react";

import "../../styles/BuscarPersonalDomestico.scss"

export const FieldRadioButtons = ({title, items, values, state, setState}) => {

    return <>
        <div className="field">
            <div className="field-title">
                {title}
            </div>
            <ul className="field-content field-content-radio">
                {items.map(
                    (x, index) =>
                        <label>
                            <li
                                className="field-radio-item"
                            >
                                    <input
                                        type="radio"
                                        checked={ state === values[index] }
                                        onChange={ () => setState( () => values[index] ) }
                                    />
                                    <span>{x}</span>
                            </li>
                        </label>
                )}
            </ul>
        </div>
    </>

};