import React from "react";
import { useState } from "react";

import '../styles/Navbar.scss';

const NavbarDropdown = ({label, items}) =>{

    const [dropdownVisible, setDropdownVisible] = useState(false);

    let keyIndex = 0;

    return (
        <li key={Math.random()} className="item dropdown" onMouseLeave={() => setDropdownVisible((prev) => false)}>
            <div className="label" onClick={() => setDropdownVisible((prev) => !prev) }>
                <button >
                    {label.text}
                </button>
                <p>{label.arrow}</p>
            </div>
            <ul className={`list ${dropdownVisible? "show" : ""}`} >
                {items.map(
                    item => {
                        keyIndex++;
                        
                        return 'link' in item?
                            <li key={Math.random()} className="item"> <a className="link" href={item.link}>{item.label}</a> </li>
                            :
                            <NavbarDropdown
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
