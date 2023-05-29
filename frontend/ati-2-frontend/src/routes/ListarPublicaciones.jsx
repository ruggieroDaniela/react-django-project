import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const ListarPublicaciones = () => {

    const {t} = useTranslation();
    const location = useLocation();
    const searchParams = location.search;

    const [postList, setPostList] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api-services/provideService/${searchParams}`, {
                    headers: {}
                });

                setPostList(response.data)
                return response.data;

            } catch (error) {
                console.error(error);
            } 
        };

        fetchPosts();
    }, []);

    console.log(searchParams);
    return(<>
        <div id="lista-posts">
            
        </div>
    </>);

}