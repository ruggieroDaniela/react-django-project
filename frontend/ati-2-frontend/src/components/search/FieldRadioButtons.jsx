import React from "react";

import { useState } from "react";

import "../../styles/BuscarPersonalDomestico.scss"

export const FieldRadioButtons = ({title, items}) => {

    return <>
        <div className="field">
            <div className="field-title">
                {title}
            </div>
            <ul className="field-content">
                {items.map(
                    (x, index) =>
                        <label>
                            <li
                                className="field-radio-item"
                            >
                                    <input type="radio"/>
                                    <span>{x}</span>
                            </li>
                        </label>
                )}
            </ul>
        </div>
    </>

};