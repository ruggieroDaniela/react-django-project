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

    const [selectedTipoPersona, setSelectedTipoPersona] = useState("");
    const tipoPersona = ["1", "2", "3", "4", "5"];
    const ordenes = ["1", "2", "3", "4"];

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api-services/provideService/${searchParams}`, {
                    headers: {}
                });

                setPostList(response.data)
                // console.log(response.data);
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
                Publicaciones Realizadas
            </div>
            <div className="row">
                <span className="title">
                    Ver listado como:
                </span>
                <ul className="input-group">
                    <li className="radio">
                        <label>
                            <input type="radio"/>
                            lista
                        </label>
                    </li>
                    <li className="radio">
                        <label>
                            <input type="radio"/>
                            foto
                        </label>
                    </li>
                </ul>
            </div>
            
            <div className="row note">
                seleccione
            </div>

            <div className="row">
                <span className="title">
                    Tipo de persona:
                </span>
                <ul className="input-group">
                    {
                        tipoPersona.map( (item, i) => 
                            <li className="checkbox">
                                <label>
                                    <input type="checkbox"/>
                                    <div className="checkbox-label">
                                        {item}
                                    </div>
                                </label>
                            </li>
                        )
                    }
                </ul>
            </div>

            <div className="row">
                <span className="title">
                    Ordenar:
                </span>
                <ul className="input-group">
                    {
                        ordenes.map( (item, i) => 
                            <li className="button">
                                <button>
                                        {item}
                                </button>
                            </li>
                        )
                    }
                </ul>
            </div>

            <div className="row center">
                <span className="subtitle">
                    página:
                </span>
                <ul className="input-group">
                    <li className='input-link'>
                        <a href="#">1</a>
                    </li>
                    <li className='input-link'>
                        <a href="#">2</a>
                    </li>
                    <li className='input-link'>
                        <a href="#">3</a>
                    </li>
                </ul>
            </div>

            <div className="row" id='post-group'>
                { postList.map( (post) => <PublicacionLista key={post.id} post={post}/> ) }
            </div>

        </div>
    </>);

}