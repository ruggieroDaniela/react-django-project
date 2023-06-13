import React, { useState, useContext } from 'react'
import "../styles/IniciarSesion.scss"
import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';

import AuthContext from '../context/AuthContext';
import ErrorMessage from "../components/ErrorMessage";
import { useParams } from 'react-router';

export const IniciarSesion = () => {
    
    const { t, i18n } = useTranslation();
    const {authState, setAuthState} = useContext(AuthContext);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invalidPassword, setInvalidPassword] = useState(false)
    const [inexistentEmail, setInexistentEmail] = useState(false)

    const params = useParams()
    const noAuth = params.noAuth

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
    
        const data = {
            username: email,
            password: password
        };

        const url = 'http://localhost:8000/token-auth/'
        try {
            
            let response = await fetch( url,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            );
    
            if (response.ok) {
                setInvalidPassword(false)
                setInexistentEmail(false)

                // Request was successful
                console.log('POST request successful');
                const responseDataAuth = await response.json();

                response = await fetch( `http://localhost:8000/users/${responseDataAuth.user_id}`,{
                        method: 'GET',
                        headers: {
                            'Authorization': responseDataAuth.token,
                        }
                        // body: JSON.stringify({Authorization: responseDataAuth.token})
                    }
                );

                if(response.ok){
                  
                    const responseDataUser = await response.json();

                    const sessionData = {
                        token: responseDataAuth.token,
                        id: responseDataAuth.user_id,
                        logged_in: true,
                        email: responseDataUser.contact_email,
                        name: responseDataUser.first_name + " " + responseDataUser.last_name,
                        lang: responseDataUser.language
                    }

                    setAuthState( () => sessionData );

                    localStorage.setItem('sessionData', JSON.stringify(sessionData))

                    i18n.changeLanguage(authState.lang);
                    navigate('/');
                }else{
                    console.log("GET request failed: error fetching user data");
                    console.log(response);
                }

            } else {
                // Request failed
                const error = await response.json()

                if(error.error === "Wrong password"){
                    setInvalidPassword(true)
                    setInexistentEmail(false)
                }

                else if(error.error === "Email does not exist"){
                    setInvalidPassword(false)
                    setInexistentEmail(true)
                }
            }
    
        } catch (error) {
            console.log("error registrando");
            console.log(error);
        }

        setLoading(false);
    }


  return (
    <div id='iniciar-sesion' className='container'>
        {noAuth && <p> <ErrorMessage message={t('login.noAuth')}/> </p>}
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

                {invalidPassword && <ErrorMessage message={t('login.claveInvalida')}/> }
                {inexistentEmail && <ErrorMessage message={t('login.correoInexistente')}/> }

                <button
                    type="submit"
                    disabled={loading}
                >
                    <span className={loading? "loading":""}>
                        {loading? "..." : t('login.boton')}
                    </span>
                </button>
                
                <a href="/forgot-password">{t('login.olvide_contrasena')}</a>

            </form>
            
        </div>
    </div>
  )
}
