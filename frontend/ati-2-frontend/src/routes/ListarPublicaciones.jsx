import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { PublicacionLista } from '../components/PublicacionLista';

import "../styles/ListarPublicaciones.scss"

export const ListarPublicaciones = () => {

    const {t} = useTranslation();
    const location = useLocation();
    const searchParams = location.search;

    const [postList, setPostList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const [selectedTipoPersona, setSelectedTipoPersona] = useState("");
    const [pageLinks, setPageLinks] = useState([]);

    const tipoPersona = ["1", "2", "3", "4", "5"];
    const ordenes = ["1", "2", "3", "4"];

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
                const response = await axios.get(`http://127.0.0.1:8000/api-services/provideService/${searchParams}`, {
                    headers: {}
                });

                const totalPages = response.data.length/sizeOfPage;
                console.log(totalPages);

                

                // console.log(pageLinks);

                setPostList(response.data)
                console.log(response.data);
                return response.data;

            } catch (error) {
                console.error(error);
            } 
        };

        fetchPosts();
    }, []);

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
                            <li className="checkbox">
                                <label>
                                    <input type="checkbox"/>
                                    <div className="checkbox-label">
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
                            <li className="button">
                                <button>
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