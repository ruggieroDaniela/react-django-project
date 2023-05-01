import React from "react";
import { useTranslation } from 'react-i18next';

import NavbarDropdown from "./NavbarDropdown";

import '../styles/Navbar.scss';

const Navbar = () => {

    const { t, i18n } = useTranslation();

    return (
        <nav className="navbar">
            <ul className="list">
                <li className="item">
                    <a href="/" className="link">{t('navbar.nuestros_servicios')}</a>
                </li>
                
                <NavbarDropdown
                    label={{
                        text: "Solicitar personal",
                        arrow: "▾"
                    }}
                    items={[
                        {
                            label: {
                                text: "Publicar anuncio",
                                arrow: "▸"
                            },
                            items:[
                                {label: "Solicitar Niñera(o)", link:"#"},
                                {label: "Solicitar Cuidador(a) ocupacional", link:"#"}
                            ]
                        },
                        {label: "Ver publicaciones", link:"#"},
                        {label: "Buscar", link:"#"},
                        {label: "Modificar", link:"#"},
                        {label: "Eliminar", link:"#"},
                        {label: "Habilitar", link:"#"},
                        {label: "deshabilitar", link:"#"}
                    ]}
                />

                <NavbarDropdown
                    label={{
                        text: "Empresas",
                        arrow: "▾"
                    }}
                    items={[
                        {
                            label: {
                                text: "Publicar anuncio como",
                                arrow: "▸"
                            },
                            items:[
                                {label: "Empresa de uniformes", link:"#"},
                                {label: "Zapatería", link:"#"},
                                {label: "Librerías", link:"#"},
                                {label: "Empresas de artículos de limpieza", link:"#"},
                                {label: "Empresas de seguros", link:"#"},
                            ]
                        },
                        {label: "Ver publicaciones", link:"#"},
                        {label: "Buscar", link:"#"},
                        {label: "Modificar", link:"#"},
                        {label: "Eliminar", link:"#"},
                        {label: "Habilitar", link:"#"},
                        {label: "deshabilitar", link:"#"}
                    ]}
                />

                <NavbarDropdown
                    label={{
                        text: "Ofrecer mis servicios",
                        arrow: "▾"
                    }}
                    items={[
                        {
                            label: {
                                text: "Publicar anuncio",
                                arrow: "▸"
                            },
                            items:[
                                {label: "Ofrecerme como Niñera(o)", link:"#"},
                                {label: "Ofrecerme como Cuidador(a) ocupacional", link:"#"}
                            ]
                        },
                        {label: "Ver publicaciones", link:"#"},
                        {label: "Buscar", link:"#"},
                        {label: "Modificar", link:"#"},
                        {label: "Eliminar", link:"#"},
                        {label: "Habilitar", link:"#"},
                        {label: "deshabilitar", link:"#"}
                    ]}
                />

                <li className="item">
                    <a href="/employment" className="link">Empleo</a>
                </li>
                
                <NavbarDropdown
                    label={{
                        text: "Juegos",
                        arrow: "▾"
                    }}
                    items={[
                        {label: "Bingo en línea", link:"#"},
                        {label: "Gana dinero jugando", link:"#"}
                    ]}
                />

                <li className="item">
                    <a href="/help" className="link">Ayuda</a>
                </li>

                <li className="item">
                    <a href="/contact" className="link">Contáctenos</a>
                </li>

                <li className="item">
                    <a href="#" className="link">Idiomas</a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
