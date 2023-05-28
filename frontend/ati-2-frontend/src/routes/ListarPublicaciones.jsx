import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom';

export const ListarPublicaciones = () => {

    const {t} = useTranslation();
    const {slug} = useParams();

    return(<>
        
    </>);

}