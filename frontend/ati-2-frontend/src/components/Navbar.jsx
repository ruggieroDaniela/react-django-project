import React from "react";
import { useState } from 'react';

import NavbarDropdown from "./NavbarDropdown";

import '../styles/Navbar.scss';



const Navbar = () => {

    return (
        <nav className="navbar">
            <ul className="list">
                <li className="item">
                    <a href="#" className="link">Nuestros<br/>servicios</a>
                </li>
                
                <NavbarDropdown
                    label="Solicitar personal"
                    items={[
                        {label: "1", link:"#"},
                        {label: "2", link:"#"}
                    ]}
                />

                <NavbarDropdown
                    label="Empresas"
                    items={[
                        {label: "1", link:"#"},
                        {label: "2", link:"#"}
                    ]}
                />

                <NavbarDropdown
                    label="Ofrecer mis servicios"
                    items={[
                        {label: "1", link:"#"},
                        {label: "2", link:"#"}
                    ]}
                />

                <li className="item">
                    <a href="#" className="link">Empleo</a>
                </li>
                
                <NavbarDropdown
                    label="Juegos"
                    items={[
                        {label: "1", link:"#"},
                        {label: "2", link:"#"}
                    ]}
                />

                <li className="item">
                    <a href="#" className="link">Ayuda</a>
                </li>

                <li className="item">
                    <a href="#" className="link">Contáctenos</a>
                </li>
                
                <li className="item">
                    <a href="#" className="link">Idiomas</a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
