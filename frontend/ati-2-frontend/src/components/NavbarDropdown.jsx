import React from "react";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

const NavbarDropdown = ({label, items}) =>{

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const { t, i18n } = useTranslation();
    let keyIndex = 0;

    return (
        <li key={Math.random().toString(36)} className="item dropdown" onMouseLeave={() => setDropdownVisible((prev) => false)}>
            <div key={Math.random().toString(36)} className="label" onClick={() => setDropdownVisible((prev) => !prev) }>
                <button key={Math.random().toString(36)} >
                    {label.text}
                </button>
                <p key={Math.random().toString(36)}>{label.arrow}</p>
            </div>
            <ul key={Math.random().toString(36)} className={`list ${dropdownVisible? "show" : ""}`} >
                {items.map(
                    item => {
                        keyIndex++;
                        
                        return 'link' in item?
                            <li key={Math.random().toString(36)} className="item"> <a className="link" href={item.link} onClick={() => i18n.changeLanguage(item.lan)} >{item.label}</a> </li>
                            :
                            <NavbarDropdown
                                key={Math.random().toString(36)}
                                label={item.label}
                                items={item.items}
                            />
                    }
                )}

            </ul>
        </li>
    );

}

export default NavbarDropdown;
