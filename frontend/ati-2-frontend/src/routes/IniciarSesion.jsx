import React, { useState, useContext} from 'react'
import "../styles/IniciarSesion.scss"
import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';

import AuthContext from '../context/AuthContext';

export const IniciarSesion = () => {
    
    const { t, i18n } = useTranslation();
    const {authState, setAuthState} = useContext(AuthContext);

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = {
            username: email,
            password: password
        };

        const url = 'http://127.0.0.1:8000/token-auth/'
        try {
            
            const response = await fetch( url,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                    // body: JSON.stringify(postBody),
                }
            );
    
            if (response.ok) {
                // Request was successful
                console.log('POST request successful');
                const responseData = await response.json();

                setAuthState(
                    () => {
                        return {
                            token: responseData.token,
                            id: responseData.id,
                            logged_in: true
                        }
                    }
                );

                console.log(responseData);
                navigate('/');
            } else {
                // Request failed
                console.log('POST request failed');
                console.log(response.json());
            }
    
        } catch (error) {
            console.log("error registrando");
            console.log(error);
        }

    }


  return (
    <div id='iniciar-sesion' className='container'>
        <div className='login'>
            <h2 className='title'>{t('login.titulo')}</h2>

            <form onSubmit={handleSubmit} className='form'>
                <p>{t('login.descripcion')}</p>

                <div>
                    <div className='field'>
                        <label id="input-login">{t('login.correo')} </label>
                        <input type="text" onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className='field'>
                        <label>{t('login.contrasena')} </label>
                        <input type="password" onChange={e => setPassword(e.target.value)} required />
                    </div>
                </div>

                
                <button type="submit">{t('login.boton')}</button>
                
                <a href="#">{t('login.olvide_contrasena')}</a>

            </form>
            
        </div>
    </div>
  )
}
