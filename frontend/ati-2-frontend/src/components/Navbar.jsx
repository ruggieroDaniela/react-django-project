import React, {useContext} from "react";
import { useTranslation } from 'react-i18next';
import { useState } from "react";

import AuthContext from "../context/AuthContext";

import NavbarDropdown from "./NavbarDropdown";
import { redirect } from "react-router-dom";

import '../styles/Navbar.scss';

const Navbar = () => {

    const [userDropdownVisible, setUserDropdownVisible] = useState(false);
    const {authState, setAuthState} = useContext(AuthContext);
    const isAuth = authState.logged_in;

    const { t, i18n } = useTranslation();

    return (
        <>  {!isAuth?
            <div className="user">
                <div className="dropdown">
                    <div className="label">
                        <a href="/login">{t("navbar.usuario.iniciar_sesion")}</a>
                    </div>
                </div>
                <div className="dropdown">
                    <div className="label">
                        <a href="/sign-up">{t("navbar.usuario.registrarse")}</a>
                    </div>
                </div>
            </div>
            :
            <div className="user">
                <div className="card">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" alt="" />
                    <div className="info">
                        {authState.name}
                        <br />
                        {authState.email}
                    </div>
                </div>
                <div className="dropdown" onClick={() => setUserDropdownVisible((prev) => !prev) }  onMouseLeave={() => setUserDropdownVisible((prev) => false)}>
                    <div className="label">
                        <p>{t("navbar.usuario.label")}</p>
                        <p className="arrow">▾</p>
                    </div>
                    <ul className={`list ${userDropdownVisible? "show" : ""}`}>
                        <li className="item">
                            <a className="link" href="#">
                                Datos de usuario
                            </a>
                        </li>
                        <li 
                            className="item"
                            onClick={ () => { setAuthState( () => { return {logged_in:false} } ) }}
                        >
                            <a className="link" href="#">
                                Cerrar sesión
                            </a>
                        </li>
                    </ul>
                </div>
            </div>}

            <nav className="navbar">

                <ul className="list">
                    <li className="item">
                        <a href="/" className="link">{t('navbar.nuestros_servicios')}</a>
                    </li>
                    
                    {isAuth ? 
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
                                        {label: t("navbar.solicitar.babysitter"), link: isAuth == true ? "/request-babysitter" : "#"},
                                        {label: t("navbar.solicitar.cuidador"), link: isAuth == true ? "/request-carer" : "#"}
                                    ]
                                },
                                {label: t("navbar.operaciones.ver_publicaciones"), link:`/show-posts?type=provide&user=${authState.id}`},
                                {label: t("navbar.operaciones.buscar"), link:"/search-domestic-staff"},
                                {label: t("navbar.operaciones.modificar"), link:"#"},
                                {label: t("navbar.operaciones.eliminar"), link:"#"},
                                {label: t("navbar.operaciones.habilitar"), link:"#"},
                                {label: t("navbar.operaciones.deshabilitar"), link:"#"}
                            ]}
                        />
                    
                        : 

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
                                {label: t("navbar.operaciones.buscar"), link:"/search-domestic-staff"},
                            ]}
                        />
                    }

                    

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
                                    {label: t("navbar.ofrecerme.babysitter"), link: isAuth == true ? "./offer-my-services/post-add/offer-me-as-babysitter" : "#"},
                                    {label: t("navbar.ofrecerme.cuidador"), link:"#"}
                                ]
                            },
                            {label: t("navbar.operaciones.ver_publicaciones"), link:`/show-posts?type=provide&user=${authState.id}`},
                            {label: t("navbar.operaciones.buscar"), link:"/search-domestic-staff"},
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
                    
                    <NavbarDropdown
                        label={{
                            text: t("navbar.idiomas"),
                            arrow: "▾"
                        }}
                        items={[
                            {label: t("navbar.espagnol"), link:"#", lan:"es"},
                            {label: t("navbar.ingles"), link:"#", lan:"en"}
                        ]}
                    /> 
                </ul>
            </nav>
        </>
    );
};

export default Navbar;
