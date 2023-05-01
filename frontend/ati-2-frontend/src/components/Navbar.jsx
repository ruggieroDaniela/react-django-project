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
                        text: t('navbar.solicitar_personal'),
                        arrow: "▾"
                    }}
                    items={[
                        {
                            label: {
                                text: t("navbar.publicar_anuncio"),
                                arrow: "▸"
                            },
                            items:[
                                {label: t("navbar.solicitar.babysitter"), link:"#"},
                                {label: t("navbar.solicitar.cuidador"), link:"#"}
                            ]
                        },
                        {label: t("navbar.operaciones.ver_publicaciones"), link:"#"},
                        {label: t("navbar.operaciones.buscar"), link:"#"},
                        {label: t("navbar.operaciones.modificar"), link:"#"},
                        {label: t("navbar.operaciones.eliminar"), link:"#"},
                        {label: t("navbar.operaciones.habilitar"), link:"#"},
                        {label: t("navbar.operaciones.deshabilitar"), link:"#"}
                    ]}
                />

                <NavbarDropdown
                    label={{
                        text: t("navbar.empresas"),
                        arrow: "▾"
                    }}
                    items={[
                        {
                            label: {
                                text: t("navbar.publicar_anuncio_como"),
                                arrow: "▸"
                            },
                            items:[
                                {label: t("navbar.lista_empresas.uniformes"), link:"#"},
                                {label: t("navbar.lista_empresas.zapateria"), link:"#"},
                                {label: t("navbar.lista_empresas.libreria"), link:"#"},
                                {label: t("navbar.lista_empresas.limpieza"), link:"#"},
                                {label: t("navbar.lista_empresas.seguro"), link:"#"},
                            ]
                        },
                        {label: t("navbar.operaciones.ver_publicaciones"), link:"#"},
                        {label: t("navbar.operaciones.buscar"), link:"#"},
                        {label: t("navbar.operaciones.modificar"), link:"#"},
                        {label: t("navbar.operaciones.eliminar"), link:"#"},
                        {label: t("navbar.operaciones.habilitar"), link:"#"},
                        {label: t("navbar.operaciones.deshabilitar"), link:"#"}
                    ]}
                />

                <NavbarDropdown
                    label={{
                        text: t("navbar.ofrecer_mis_servicios"),
                        arrow: "▾"
                    }}
                    items={[
                        {
                            label: {
                                text: t("navbar.publicar_anuncio"),
                                arrow: "▸"
                            },
                            items:[
                                {label: t("navbar.ofrecerme.babysitter"), link:"#"},
                                {label: t("navbar.ofrecerme.cuidador"), link:"#"}
                            ]
                        },
                        {label: t("navbar.operaciones.ver_publicaciones"), link:"#"},
                        {label: t("navbar.operaciones.buscar"), link:"#"},
                        {label: t("navbar.operaciones.modificar"), link:"#"},
                        {label: t("navbar.operaciones.eliminar"), link:"#"},
                        {label: t("navbar.operaciones.habilitar"), link:"#"},
                        {label: t("navbar.operaciones.deshabilitar"), link:"#"}
                    ]}
                />

                <li className="item">
                    <a href="/employment" className="link">{t("navbar.empleo")}</a>
                </li>
                
                <NavbarDropdown
                    label={{
                        text: t("navbar.juegos"),
                        arrow: "▾"
                    }}
                    items={[
                        {label: t("navbar.bingo"), link:"#"},
                        {label: t("navbar.loteria"), link:"#"}
                    ]}
                />

                <li className="item">
                    <a href="/help" className="link">{t("navbar.ayuda")}</a>
                </li>

                <li className="item">
                    <a href="/contact" className="link">{t("navbar.contactanos")}</a>
                </li>

                <li className="item">
                    <a href="#" className="link">{t("navbar.idiomas")}</a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
