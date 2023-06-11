// ver
// https://www.flaticon.com/free-icon/hide_2767146?related_id=2767146
// https://www.flaticon.com/free-icon/view_709612?related_id=709612

// editar
// https://www.flaticon.com/free-icon/pen_1250615?term=edit&page=1&position=13&origin=search&related_id=1250615

// eliminar
// https://www.flaticon.com/free-icon/bin_484662?term=delete&page=1&position=8&origin=search&related_id=484662


import axios from 'axios'
import { useState, useEffect, useContext } from "react"
import { useTranslation } from 'react-i18next'

import AuthContext from "../context/AuthContext";
import user_img from "../assets/default-user-icon.jpg"

import eliminar_img from "../assets/eliminar.png"
import editar_img from "../assets/editar.png"
import habilitar_img from "../assets/habilitar.png"
import deshabilitar_img from "../assets/deshabilitar.png"

import "../styles/PostLista.scss"

import { Tooltip } from "./Tooltip"
import { getCountryName, getStateName } from './dataFetchers/PaisDataFetcher';

const FieldViewDetails = ({label, detalles_texto, value=""}) => {
    const {t} = useTranslation();

    const [hover, setHover] = useState(false);

    return (<>
        <span className="item-title">{label}: </span>
        {value + " "}
        <a
            href=""
            className="item-link"
            onMouseEnter={ () => setHover(true) }
            onMouseLeave={ () => setHover(false) }
            onClick={ e => { e.preventDefault() } }
        >
            {t(`publicaciones_vista_lista.ver_detalles`)}
        </a>
        {hover?
            <Tooltip title={label} text={detalles_texto} />
        :""}
    </>)
}

export const PublicacionLista = ({post, postType, selectedPosts, setSelectedPosts}) => {

    const {t} = useTranslation();
    const [username, setUsername] = useState("  ");
    const {authState, setAuthState} = useContext(AuthContext);
    const [countryName, setCountryName] = useState("");
    const [stateName, setStateName] = useState("");
    const canEdit = authState.logged_in && post.user == authState.id;
    const [postEnabled, setPostEnabled] = useState(post.enable);
    const [forceRefresh, setForceRefresh] = useState(true);
    // console.log(authState.user_id);

    // const canEdit = true;

    useEffect(() => {
        const fetchUserData = async () => {
            try {

                const response = await axios.post(`http://127.0.0.1:8000/users/get_name/`, {id: post.user});

                // console.log(response.data);
                setUsername( () => response.data.name + " " + response.data.last_name );
                
                if(post.country.length == 2){
                    const country = await getCountryName(post.country);
                    setCountryName(() => country);
                }

                const state = await getStateName(post.state);
                setStateName(() => state);

                return response.data;

            } catch (error) {
                console.error(error);
            } 
        };
        // if( post.client_type != "NO" )
        fetchUserData();
    }, []);

    return(<>
        <div
            key={`post ${post.id}`}
            className="post-lista"
            style={{
                gridTemplateColumns: canEdit? '0.5fr 1fr 12fr 1fr': "0.5fr 1fr 13fr"
            }}
        >
            
            <section className='checkbox-container'>
                <input
                    type="checkbox"
                    checked={selectedPosts.includes(post.id)}
                    onChange={ e => {
                        if(selectedPosts.includes(post.id))
                            setSelectedPosts( prev => prev.filter( x => x!=post.id ) );
                        else
                            setSelectedPosts( prev => [... prev, post.id] );
                    } }
                    disabled={!canEdit}
                />
            </section>

            <section key={`post ${post.id} foto`} >
                <div className='foto-container'>
                    <img className='img-user' src={user_img} alt="Profile photo" />
                </div>
            </section>

            <section key={`post ${post.id} details`} className="detalles">

                <div className="column" key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                    <div className="header-grid" key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                        <div>
                            <div className="detalles-title" key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                                {t(`publicaciones_vista_lista.${post.service}`)}
                            </div>
                            <div className="bold-subtitle" key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                                {username}
                            </div>
                            {postType == "provide"?
                                <div key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                                    {post.age} {t(`publicaciones_vista_lista.años`)}
                                </div>
                            :
                                <div key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                                    {post.age_required_from} - {post.age_required_to} {t(`publicaciones_vista_lista.edad_requerida`)}
                                </div>
                            }
                        </div>
                        <div className="subtitle" key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                            {post.country.length == 2? countryName:post.country}
                        </div>
                        <div key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                            <div className="bold-subtitle" key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                                {t(`publicaciones_vista_lista.estado`)}: <span className="blue-body">{stateName!=""? stateName : post.state}</span>
                            </div>
                            <div className="bold-subtitle" key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                                {t(`publicaciones_vista_lista.ciudad`)}: <span className="blue-body">{post.city}</span>
                            </div>
                        </div>
                    
                    </div>
                    <div className="title" style={ {width: "100%"} } key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                        {t(`publicaciones_vista_lista.publicado`)}{post.created_at.split("T")[0]}
                    </div>
                    <div className="desc-body" key={`post ${post.id} ${self.crypto.randomUUID()}`}>{post.description}</div>
                    <div className="info-and-contact" key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                        <ul className="info-list" key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                            <li key={`post ${post.id} instruccion`}>
                                <span className="item-title">{t(`publicaciones_vista_lista.grado_instruccion`)}: </span> {t(`publicaciones_vista_lista.${post.education_level}`)}
                            </li>
                            {/* <li key={`post ${post.id} perfil laboral`}>
                                <span className="item-title">{t(`publicaciones_vista_lista.perfil_laboral`)}: </span><a href="" className="item-link">{t(`publicaciones_vista_lista.ver_detalles`)}</a>
                            </li> */}
                            <li key={`post ${post.id} funciones`}>
                                <FieldViewDetails
                                    label={
                                        postType == "provide"?
                                            t(`publicaciones_vista_lista.funciones_previas`)
                                        :
                                            t(`publicaciones_vista_lista.funciones_requeridas`)
                                    }
                                    detalles_texto={post.activities}
                                    // detalles_texto={t(`publicaciones_vista_lista.${post.activities}`)}
                                />
                            </li>
                            <li key={`post ${post.id} documentacion`}>
                                <FieldViewDetails
                                    label={
                                        postType == "provide"?
                                            t(`publicaciones_vista_lista.documentacion`)
                                        :
                                            t(`publicaciones_vista_lista.documentacion_requerida`)
                                    }
                                    detalles_texto={t(`publicaciones_vista_lista.${post.documents}`)}
                                />
                            </li>
                        </ul>
                        <button key={`post ${post.id} ${self.crypto.randomUUID()}`}>{t(`publicaciones_vista_lista.contactar`)}</button>
                    </div>
                    <div className="more-info" key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                        <a href="" className="title link" key={`post ${post.id} ${self.crypto.randomUUID()}`}>{t(`publicaciones_vista_lista.ver_informacion`)}</a>
                    </div>
                </div>

                <div className="column" key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                    <div className="info-container" key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                        <div className="container-title" key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                            {t(`publicaciones_vista_lista.condiciones`)}
                        </div>
                        <ul className="info-list" key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                            <li key={`post ${post.id} salario`}>
                                <span className="item-title">{t(`publicaciones_vista_lista.salario`)}: </span> {post.payment_amount} {post.currency} 
                            </li>
                            <li key={`post ${post.id} beneficios`}>
                                { post.benefits > 0?
                                    <FieldViewDetails
                                        label={t(`publicaciones_vista_lista.beneficios`)}
                                        value={t('si')}
                                        detalles_texto={post.benefits_description}
                                    />
                                    :
                                    <>
                                        <span className="item-title">{t(`publicaciones_vista_lista.beneficios`)+": "}</span>{t('no')} 
                                    </>
                                }
                            </li>
                            <li key={`post ${post.id} disponibilidad`}>
                                <span className="item-title">{t(`publicaciones_vista_lista.disponibilidad`)}: </span> {post.availability_date}
                            </li>
                            <li key={`post ${post.id} viajar`}>
                                { post.travel?
                                    <FieldViewDetails
                                        label={t(`publicaciones_vista_lista.viajar`)}
                                        value={t('si')}
                                        detalles_texto={post.travel_description}
                                    />
                                    :
                                    <>
                                        <span className="item-title">{t(`publicaciones_vista_lista.viajar`)+": "}</span>{t('no')} 
                                    </>
                                }
                            </li>
                            <li key={`post ${post.id} horario`}>
                                <FieldViewDetails
                                    label={t(`publicaciones_vista_lista.horario`)}
                                    detalles_texto={t(`${post.schedule}`)}
                                />
                            </li>
                            <li key={`post ${post.id} salidas`}>
                                <FieldViewDetails
                                    label={t(`publicaciones_vista_lista.salidas`)}
                                    detalles_texto={t(`${post.workday}`)}
                                />
                            </li>
                            <li key={`post ${post.id} condiciones`}>
                                {/* <span className="item-title">{t(`publicaciones_vista_lista.condiciones`)}: </span> <a href="" className="item-link">{t(`publicaciones_vista_lista.ver_detalles`)}</a> */}
                                <FieldViewDetails
                                    label={t(`publicaciones_vista_lista.salario_deseado`)}
                                    detalles_texto={ post.payment_amount + " " + post.currency + " " + t(`${post.salary_offered}`)}
                                />
                            </li>
                            {post.client_type != undefined &&
                                <li key={`post ${post.id} clientes`}>
                                    <FieldViewDetails
                                        label={t(`publicaciones_vista_lista.clientes`)}
                                        detalles_texto={t(`publicaciones_vista_lista.tipo_cliente.${post.client_type}`)}
                                    />
                                </li>
                            }
                        </ul>
                    </div>
                    <div className="more-info" key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                        <a href="" className="title link" key={`post ${post.id} ${self.crypto.randomUUID()}`}>{t(`publicaciones_vista_lista.ver_informacion`)}</a>
                    </div>
                </div>
            </section>
            {canEdit?
                <section className='button-group' key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                    <button
                        disabled={ !(canEdit) }
                        onClick={ () => {
                            setPostEnabled(prev=>!prev);
                            axios.put(`http://localhost:8000/api-services/${postType}/enable_post/${post.id}/`)
                            setForceRefresh(prev => !prev);
                        } }
                    >
                        <img className='button-img' src={postEnabled? deshabilitar_img : habilitar_img} alt="" />
                    </button>
                    <button
                        disabled={ !(canEdit) }
                    >
                        <img className='button-img' src={editar_img} alt="" />
                    </button>
                    <button
                        disabled={ !(canEdit) }
                        onClick={ async () => {
                            await axios.delete(`http://127.0.0.1:8000/api-services/${postType}/delete_post/${post.id}/`)
                            window.location.reload();
                        } }
                    >
                        <img className='button-img' src={eliminar_img} alt="" />
                    </button>
                </section>
            :""}
        </div>
    </>);
}