import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { PublicacionLista } from '../components/PublicacionLista';
import { getServices } from '../components/dataFetchers/ServicesDataFetcher';

import "../styles/ListarPublicaciones.scss"

export const ListarPublicaciones = () => {

    const {t} = useTranslation();
    const location = useLocation();
    let searchParams = location.search;

    const [postList, setPostList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const [selectedTipoPersona, setSelectedTipoPersona] = useState("");
    const [selectedOrdering, setSelectedOrdering] = useState("");
    const [pageLinks, setPageLinks] = useState([]);

    const tipoPersona = ["1", "2", "3", "4", "5"];
    const ordenes = ["payment_amount", "availability_date", "education_level", "travel"];

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

                const response = await axios.get(`http://127.0.0.1:8000/api-services/provideService/${searchParams}`, {
                    headers: {}
                });

                const totalPages = response.data.length/sizeOfPage;
                // console.log(totalPages);

                // console.log(pageLinks);

                let posts = response.data;

                // for (let i = 0; i < posts.length; i++) {
                //     try {
                //         const responseUser = await axios.get(`http://127.0.0.1:8000/users/${posts[i].user}`, {
                //             headers: {}
                //         });

                //         console.log(responseUser);

                //     } catch (error) {
                //         console.error(error);
                //     } 
                // }

                setPostList(response.data)
                console.log(response.data);
                return response.data;

            } catch (error) {
                console.error(error);
            } 
        };

        fetchPosts();
    }, [selectedTipoPersona, selectedOrdering]);

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
                            <input type="radio"/>
                            {t(`lista_publicaciones.tipo_lista`)}
                        </label>
                    </li>
                    <li className="radio">
                        <label>
                            <input type="radio"/>
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
                                    onClick={ () => setSelectedOrdering( () => selectedOrdering == ""? ordenes[i]:"" ) }
                                >
                                    {t(`lista_publicaciones.ordenar_por.${i}`)}
                                </button>
                            </li>
                        )
                    }
                </ul>
            </div>

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
                    postList
                        .slice(currentPage*sizeOfPage, currentPage*sizeOfPage + sizeOfPage)
                        .map( (post) => <PublicacionLista key={post.id} post={post}/> )
                }
            </div>

        </div>
    </>);

}