import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';

import AuthContext from '../context/AuthContext';

import { PublicacionLista } from '../components/PublicacionLista';
import { PublicacionFoto } from '../components/PublicacionFoto'; 
import { getServices } from '../components/dataFetchers/ServicesDataFetcher';

import "../styles/ListarPublicaciones.scss"

export const ListarPublicaciones = () => {

    const {t} = useTranslation();
    const location = useLocation();
    let searchParams = location.search;
    const postType = searchParams.includes('provide')? 'provide':'request';

    const [postList, setPostList] = useState([]);
    const [selectedPosts, setSelectedPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const [selectedTipoPersona, setSelectedTipoPersona] = useState("");
    const [selectedOrdering, setSelectedOrdering] = useState("");
    const [pageLinks, setPageLinks] = useState([]);

    // Tipo de Vista
    const [listView, setListView] = useState(true);

    const tipoPersona = ["1", "2", "3", "4", "5"];
    const ordenes = ["payment_amount", "availability_date", "education_level", "travel"];
    const acciones = ["Habilitar", "Deshabilitar", "Modificar", "Eliminar"];

    const services = getServices();

    const sizeOfPage = 5;

    pageLinks.length = 0;
    for (let index = 0; index < postList.length/sizeOfPage; index++) {
        pageLinks.push(
            <li 
                key={`page ${index+1}`}
                className={`input-link ${index == currentPage? "active":""}`}
                onClick={ () => setCurrentPage(() => index) }
            >
                <a
                    href="#"
                >
                    {index+1}
                </a>
            </li>
        );
        
    }

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                if( selectedTipoPersona.length > 0 ){
                    if( searchParams.length > 0 )
                        searchParams += "&service__in=";
                    else
                        searchParams += "?service__in=";
                
                    searchParams += selectedTipoPersona.substring(0, selectedTipoPersona.length-1);
                    // console.log(selectedTipoPersona);
                    // console.log(searchParams);
                }

                if( selectedOrdering.length > 0 ){
                    if( searchParams.length > 0 )
                        searchParams += "&ordering=";
                    else
                        searchParams += "?ordering=";
                
                    searchParams += selectedOrdering;
                    console.log(searchParams);
                }

                const response = await axios.get(`http://127.0.0.1:8000/api-services/${postType}Service/${searchParams}`, {
                    headers: {}
                });

                const totalPages = response.data.length/sizeOfPage;
                // console.log(totalPages);

                // console.log(pageLinks);

                setPostList(response.data)
                console.log(response.data);
                console.log(postType);
                return response.data;

            } catch (error) {
                console.error(error);
            } 
        };

        fetchPosts();
    }, [selectedTipoPersona, selectedOrdering]);

    const {authState, setAuthState} = useContext(AuthContext);

    return(<>
        <div id="lista-posts">
            <div className="header">
                {t(`lista_publicaciones.titulo`)}
            </div>
            <div className="row">
                <span className="title">
                    {t(`lista_publicaciones.ver_como`)}:
                </span>
                <ul className="input-group">
                    <li className="radio">
                        <label>
                            <input type="radio" checked={listView} onChange={(e) => {                
                                setListView(true);                             
                            }}/>
                            {t(`lista_publicaciones.tipo_lista`)}
                        </label>
                    </li>
                    <li className="radio">
                        <label>
                            <input type="radio" checked={!listView} onChange={(e) => { 
                                setListView(false);
                            }}/>
                            {t(`lista_publicaciones.tipo_foto`)}
                        </label>
                    </li>
                </ul>
            </div>
            
            <div className="row note">
                {t(`lista_publicaciones.seleccione`)}
            </div>

            <div className="row">
                <span className="title">
                    {t(`lista_publicaciones.tipo_persona`)}:
                </span>
                <ul className="input-group">
                    {
                        /* eslint-disable-next-line */
                        tipoPersona.map( (item, i) => 
                            <li className="checkbox" key={`${self.crypto.randomUUID()}`}>
                                <label key={`${self.crypto.randomUUID()}`}>
                                    <input
                                        type="checkbox"
                                        key={`${self.crypto.randomUUID()}`}
                                        checked={ services.length > i && selectedTipoPersona.includes(services[i]) }
                                        onChange={ () => setSelectedTipoPersona( prev => prev.includes(services[i])? prev.replace(services[i]+",", ""):prev+services[i]+"," ) }
                                    />
                                    <div className="checkbox-label" key={`${self.crypto.randomUUID()}`}>
                                        {t(`lista_publicaciones.tipos_personal.${i}`)}
                                    </div>
                                </label>
                            </li>
                        )
                    }
                </ul>
            </div>

            <div className="row">
                <span className="title">
                    {t(`lista_publicaciones.ordenar`)}:
                </span>
                <ul className="input-group">
                    {
                        ordenes.map( (item, i) => 
                            <li className="button" key={`${self.crypto.randomUUID()}`}>
                                <button
                                    key={`${self.crypto.randomUUID()}`}
                                    onClick={ () => {
                                        if( searchParams.includes("ordering") )
                                            searchParams = searchParams.substring( 0, searchParams.indexOf("ordering") );

                                        setSelectedOrdering( () => selectedOrdering == ""? ordenes[i]:"" );
                                    } }
                                >
                                    {t(`lista_publicaciones.ordenar_por.${i}`)}
                                </button>
                            </li>
                        )
                    }
                </ul>
            </div>

            {authState.logged_in && 
                <div className="row">
                    <span className="title">
                        {t(`lista_publicaciones.acciones`)}:
                    </span>
                    <ul className="input-group">
                        <li className="button" key={`${self.crypto.randomUUID()}`}>
                            <button
                                key={`${self.crypto.randomUUID()}`}
                                onClick={ () => {
                                    // fuck me in the ass 
                                } }
                            >
                                {t(`lista_publicaciones.accion.${0}`)}
                            </button>
                        </li>
                        <li className="button" key={`${self.crypto.randomUUID()}`}>
                            <button
                                key={`${self.crypto.randomUUID()}`}
                                onClick={ () => {
                                    // fuck me in the ass 
                                } }
                            >
                                {t(`lista_publicaciones.accion.${1}`)}
                            </button>
                        </li>
                        <li className="button" key={`${self.crypto.randomUUID()}`}>
                            <button
                                key={`${self.crypto.randomUUID()}`}
                                onClick={ () => {
                                    // fuck me in the ass 
                                } }
                            >
                                {t(`lista_publicaciones.accion.${2}`)}
                            </button>
                        </li>
                        <li className="button" key={`${self.crypto.randomUUID()}`}>
                            <button
                                key={`${self.crypto.randomUUID()}`}
                                onClick={ () => {
                                    // fuck me in the ass 
                                } }
                            >
                                {t(`lista_publicaciones.accion.${3}`)}
                            </button>
                        </li>
                    </ul>
                </div>
            }

            <div className="row center">
                <span className="subtitle">
                    {t(`lista_publicaciones.pagina`)}:
                </span>
                <ul className="input-group">
                    { pageLinks }
                </ul>
            </div>

            <div className="row" id='post-group'>
                {   
                    /* eslint-disable-next-line */
                    listView
                        ? postList
                        .slice(currentPage*sizeOfPage, currentPage*sizeOfPage + sizeOfPage)
                        .map( (post) => <PublicacionLista key={post.id} post={post} postType={postType} selectedPosts={selectedPosts} setSelectedPosts={setSelectedPosts}/> )
                        : postList
                        .slice(currentPage*sizeOfPage, currentPage*sizeOfPage + sizeOfPage)
                        .map( (post) => <PublicacionFoto key={post.id} post={post} postType={postType}/> )               
                }
            </div>

        </div>
    </>);

}