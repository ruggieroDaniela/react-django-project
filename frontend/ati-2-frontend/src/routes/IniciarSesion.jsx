import React, { useState } from 'react'
import "../styles/IniciarSesion.scss"
import { useTranslation } from 'react-i18next';

export const IniciarSesion = () => {
    
    const { t, i18n } = useTranslation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(email, password)
    }


  return (
    <div className='container'>
        <div className='login'>
            <h2 className='title'>{t('login.titulo')}</h2>

            <form onSubmit={handleSubmit} className='form'>
                <p>{t('login.descripcion')}</p>

                <div>
                    <div>
                        <label id="input-login">{t('login.correo')} </label>
                        <input type="text" onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div>
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
