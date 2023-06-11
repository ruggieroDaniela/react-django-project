import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ErrorMessage from "./ErrorMessage";

export const FormForgotPassword = ({ message, info }) => {

    const [correoEnviado, setCorreoEnviado] = useState(false)
    const [userMail, setUserMail] = useState({});
    const [input, setInput] = useState("");
    const [invalidInput, setInvalidInput] = useState(false)
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
  
    const handleSubmit  = async (e) =>  {
        e.preventDefault();

        if(info==="id"){
            try {
                const response = await axios.post('http://127.0.0.1:8000/forgot-password/', {dni: input})
                setUserMail(response.data.email) 
                setInvalidInput(false)
                setCorreoEnviado(true);
            } catch(error) {
                setInvalidInput(true)
            }
        }
            
        else if(info==="email"){
            try {
                const response = await axios.post('http://127.0.0.1:8000/forgot-password/', {email: input})
                setUserMail(response.data.email) 
                setInvalidInput(false)
                setCorreoEnviado(true);
            } catch(error) {
                setInvalidInput(true)
            }
        }
    }

    const handleSendEmail = e => {
        e.preventDefault();

    }

    return (

        <>
            { correoEnviado?
                <div id='forgot'>
                    <h2 id='title'>{t('forgotPassword.titulo1')}</h2>

                    <form onSubmit={ handleSendEmail } className='form'>
                        <p id="message">{t('forgotPassword.descripcion2.1')} <br/>
                            <a href="#">{ userMail }</a><br/>
                            <br/>
                            <span id="text">{t('forgotPassword.descripcion2.3')}</span>
                        </p>

                        <div id="buttons">
                            <button type="submit" onClick={() => navigate("/login")}>{t('forgotPassword.botonAceptar')}</button>
                            <button type="button" onClick={() => navigate("/login")}>{t('forgotPassword.botonCancelar')}</button>
                        </div>
                    </form>
                </div>
            : 
                <div id='forgot'>
                    <h2 id='title'>{t('forgotPassword.titulo1')}</h2>

                    <form onSubmit={ handleSubmit } onChange={(e) => setInput(e.target.value)} className='form'>
                        <p>{ message }</p>
                        <div id='input-forgot-password'>
                            <input type="text"  />
                        </div>

                        {invalidInput && <ErrorMessage message={t('forgotPassword.inputInvalido') + info}/> }

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
