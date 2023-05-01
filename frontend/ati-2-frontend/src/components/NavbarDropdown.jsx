import React from "react";
import { useState } from "react";

import '../styles/Navbar.scss';

const NavbarDropdown = ({label, items}) =>{

    const [dropdownVisible, setDropdownVisible] = useState(false);

    let keyIndex = 0;

    return (
        <li className="item dropdown"  onMouseLeave={() => setDropdownVisible((prev) => false)}>
            <div className="label">
                <button onClick={() => setDropdownVisible((prev) => !prev) }>
                    {label}
                </button>
                <p>▾</p>
            </div>
            <ul className={`list ${dropdownVisible? "show" : ""}`} >
                {items.map(
                    item => {
                        keyIndex++;
                        return <li key={label + keyIndex} className="item"> <a className="link" href={item.link}>{item.label}</a> </li>
                    }
                )}

            </ul>
        </li>
    );

}

export default NavbarDropdown;
