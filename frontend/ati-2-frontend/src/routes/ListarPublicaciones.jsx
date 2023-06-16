import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';

import AuthContext from '../context/AuthContext';

import { PublicacionLista } from '../components/PublicacionLista';
import { PublicacionFoto } from '../components/PublicacionFoto'; 
import { getServices } from '../components/dataFetchers/ServicesDataFetcher';

import "../styles/ListarPublicaciones.scss"

export const ListarPublicaciones = () => {

    const navigate = useNavigate();

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

    const [__refreshPostList, refreshPostList] = useState(true);

    const [loading, setLoading] = useState(false);

    // Tipo de Vista
    const [listView, setListView] = useState(true);

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

    useEffect( () => {
        if(searchParams.includes("ordering")){
            let orderIndexStart = searchParams.indexOf("ordering");
            orderIndexStart = searchParams.indexOf("=", orderIndexStart+1)+1;
            const orderIndexEnd = searchParams.indexOf("&", orderIndexStart);
            setSelectedOrdering(searchParams.substring( orderIndexStart, orderIndexEnd == -1? searchParams.length:orderIndexEnd ));
            console.log("ordering: ");
            console.log(searchParams.substring( orderIndexStart, orderIndexEnd ));
        }else{
            console.log("nor order");
        }
        
    }, [] );

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setPostList([]);

            try {
                if( selectedTipoPersona.length > 0 ){
                    if( searchParams.length > 0 ){

                        if(searchParams.includes("service__in")){
                            let serviceIndexStart = searchParams.indexOf("service__in");
                            const serviceIndexEnd = searchParams.indexOf("&", serviceIndexStart);
                            searchParams.replace( searchParams.substring( serviceIndexStart, serviceIndexEnd ), `service__in=${selectedTipoPersona.substring(0, selectedTipoPersona.length-1)}` )
                        }else{
                            searchParams += "&service__in=" + selectedTipoPersona.substring(0, selectedTipoPersona.length-1);
                        }
                    }else{
                        searchParams += "?service__in=" + selectedTipoPersona.substring(0, selectedTipoPersona.length-1);
                    }
                }

                if( selectedOrdering.length > 0 ){
                    if( searchParams.length > 0 ){
                        if(searchParams.includes("ordering")){
                            let orderIndexStart = searchParams.indexOf("ordering");
                            const orderIndexEnd = searchParams.indexOf("&", orderIndexStart);

                            searchParams.replace( searchParams.substring( orderIndexStart, orderIndexEnd == -1? searchParams.length:orderIndexEnd ), `ordering=${selectedOrdering}&` )
                        }else{
                            searchParams += "&ordering=" + selectedOrdering + "&";
                        }
                    }else{
                        searchParams += "?ordering=" + selectedOrdering + "&";
                    }
                    // console.log(searchParams);
                }

                console.log(searchParams);

                const response = await axios.get(`${import.meta.env.VITE_DJANGO_API_URL}/api-services/${postType}Service/${searchParams}`, {
                    headers: {}
                });
                
                console.log(response.data);

                // const filteredPostList = response.data.filter( x => (
                //     (x.enable ||( authState.logged_in && authState.id == x.user))
                // ) ) 

                setPostList(response.data);
                
                setLoading(false);

            } catch (error) {
                setLoading(false);
                console.error(error);
            } 
        };

        fetchPosts();
    }, [selectedTipoPersona, selectedOrdering, __refreshPostList, location.search]);

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
                            <li className="checkbox" key={`${"self.crypto.randomUUID()"}`}>
                                <label key={`${"self.crypto.randomUUID()"}`}>
                                    <input
                                        type="checkbox"
                                        key={`${"self.crypto.randomUUID()"}`}
                                        checked={ services.length > i && selectedTipoPersona.includes(services[i]) }
                                        onChange={ () => 
                                            setSelectedTipoPersona( prev =>
                                                prev.includes(services[i])? prev.replace(services[i]+",", ""):prev+services[i]+","
                                            )
                                        }
                                    />
                                    <div className="checkbox-label" key={`${"self.crypto.randomUUID()"}`}>
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
                            <li className="button" key={`${"self.crypto.randomUUID()"}`}>
                                <button
                                    key={`${"self.crypto.randomUUID()"}`}
                                    onClick={ () => {
                                        // if( searchParams.includes("ordering") )
                                        //     searchParams = searchParams.substring( 0, searchParams.indexOf("ordering") );

                                        setSelectedOrdering( () => selectedOrdering == ordenes[i]? "":ordenes[i] );
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
                        <li className="button" key={`${"self.crypto.randomUUID()"}`}>
                            <button
                                key={`${"self.crypto.randomUUID()"}`}
                                onClick={ async () => {
                                    // habilitar 
                                    for (let i = 0; i < selectedPosts.length; i++) {
                                        await axios.put(`${import.meta.env.VITE_DJANGO_API_URL}/api-services/${postType}/enable_post/${selectedPosts[i].id}/`)
                                    }
                                    refreshPostList(prev => !prev);
                                    setSelectedPosts([]);
                                } }
                            >
                                {t(`lista_publicaciones.accion.${0}`)}
                            </button>
                        </li>
                        
                        <li className="button" key={`${"self.crypto.randomUUID()"}`}>
                            <button
                                key={`${"self.crypto.randomUUID()"}`}
                                onClick={ async () => {
                                    // eliminar 
                                    for (let i = 0; i < selectedPosts.length; i++) {
                                        await axios.put(`${import.meta.env.VITE_DJANGO_API_URL}/api-services/${postType}/delete_post/${selectedPosts[i].id}/`)
                                    }
                                    refreshPostList(prev => !prev);
                                    setSelectedPosts([]);
                                } }
                            >
                                {t(`lista_publicaciones.accion.${1}`)}
                            </button>
                        </li>

                        {selectedPosts.length<=1 &&
                            <li className="button" key={`${"self.crypto.randomUUID()"}`}>
                                <button
                                    key={`${"self.crypto.randomUUID()"}`}
                                    onClick={ () => {
                                        if(selectedPosts.length == 1)
                                            navigate(`/modify-post/${postType}/${selectedPosts[0].id}`);
                                    } }
                                    disabled={selectedPosts.length>1}
                                >
                                    {t(`lista_publicaciones.accion.${2}`)}
                                </button>
                            </li>
                        }
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

            { loading?
                <div className="parent">
                    <div className='loading'></div>
                </div>
                :
                <>
                    { postList.length == 0 &&
                        <div id='no-post-msg'>
                            <h3>{t('lista_publicaciones.no_posts')}...</h3>
                        </div>
                    }

                    <div className="row" id='post-group'>
                        { listView? 
                            postList
                                .slice(currentPage*sizeOfPage, currentPage*sizeOfPage + sizeOfPage)
                                .map( (post) => <>{
                                    (post.enable ||( authState.logged_in && authState.id == post.user)) &&
                                    <PublicacionLista key={post.id} post={post} postType={postType} selectedPosts={selectedPosts} setSelectedPosts={setSelectedPosts}/>
                                }</>)
                            :
                            postList
                                .slice(currentPage*sizeOfPage, currentPage*sizeOfPage + sizeOfPage)
                                .map( (post) => <>{
                                    (post.enable ||( authState.logged_in && authState.id == post.user)) &&
                                    <PublicacionFoto key={post.id} post={post} postType={postType}/>
                                }</>)               
                        }
                    </div>
                </>
            }

            

        </div>
    </>);

}