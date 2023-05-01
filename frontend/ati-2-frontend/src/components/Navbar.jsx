import React from "react";
import '../styles/Navbar.scss';

const Navbar = () => {

    return (
        <nav className="navbar">
            <ul className="list">
                <li className="item">
                    <a href="#" className="link">Nuestros<br/>servicios</a>
                </li>
                <li className="item">
                    <a href="#" className="link">Solicitar<br/>personal</a>
                </li>
                <li className="item">
                    <a href="#" className="link">Empresas</a>
                </li>
                <li className="item">
                    <a href="#" className="link">Ofrecer mis<br/>servicios</a>
                </li>
                <li className="item">
                    <a href="#" className="link">Empleo</a>
                </li>
                <li className="item">
                    <a href="#" className="link">Juegos</a>
                </li>
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
