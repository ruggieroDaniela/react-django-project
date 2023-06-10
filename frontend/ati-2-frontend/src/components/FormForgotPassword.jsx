import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const FormForgotPassword = ({ message }) => {

    const [correoEnviado, setCorreoEnviado] = useState(false)
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
  
    const handleSubmit = e => {
        e.preventDefault();
        setCorreoEnviado(true);
    }

    const handleSendEmail = e => {
        e.preventDefault();

    }

    const data = {
        email: "anotherone@gmail.com",
        password: "12345",
        found_app_by: "Twitter",
        type_user: "natural",
        country: "Alemania",
        first_name: "Admin",
        last_name: "Ati-2",
        dni: "V-126125",
        contact_email: "admin@gmail.com",
        language: "es",
        want_inform: false,
        bank_origin: "Banesco",
        bank_country: "Venezuela",
        phone: "04141578632"
    };

    return (

        <>

            { correoEnviado

            ?
                <div id='forgot'>
                    <h2 id='title'>{t('forgotPassword.titulo1')}</h2>

                    <form onSubmit={ handleSendEmail } className='form'>
                        <p id="message">{t('forgotPassword.descripcion2.1')} <br/>
                            <a href="#">{ data.email }</a><br/>
                            {t('forgotPassword.descripcion2.2')} {data.phone} <br/><br/>
                            <span id="text">{t('forgotPassword.descripcion2.3')}</span>
                        </p>

                        <div id="buttons">
                            <button type="submit">{t('forgotPassword.botonAceptar')}</button>
                            <button type="button" onClick={() => navigate("/login")}>{t('forgotPassword.botonCancelar')}</button>
                        </div>
                    </form>
                </div>
            : 
                <div id='forgot'>
                    <h2 id='title'>{t('forgotPassword.titulo1')}</h2>

                    <form onSubmit={ handleSubmit } className='form'>
                        <p>{ message }</p>
                        <div id='input-forgot-password'>
                            <input type="text"  />
                        </div>
                        <div id="buttons">
                            <button type="submit">{t('forgotPassword.botonAceptar')}</button>
                            <button type="button" onClick={() => navigate("/login")}>{t('forgotPassword.botonCancelar')}</button>
                        </div>
                    </form>
                </div>
            
            }

        </>
  )
}
