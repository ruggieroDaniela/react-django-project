import React, { useState, useContext} from 'react'
import "../styles/ForgotPassword.scss"
import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';
import { FormForgotPassword } from '../components/FormForgotPassword';

export const ForgotPassword = () => {

    const { t, i18n } = useTranslation();
    const [info, setInfo] = useState('');
    const [formIdDoc, setformIdDoc] = useState(false);
    const [formEmail, setFormEmail] = useState(false);
    const navigate = useNavigate();

    const handleSubmitRadio = (e) => {

        e.preventDefault();

        if ( info === 'cedula' ){
            setformIdDoc(true);
            setFormEmail(false);
        }

        else if ( info === 'correo' ){
            setformIdDoc(false);
            setFormEmail(true);
        }
    }

    const onRadioChange = e => {
        setInfo(e.target.value);
    }

  return (
    <div id='forgot-password'>

        { 
            formIdDoc === true
            ? 
                <FormForgotPassword
                    message = {t("forgotPassword.mensaje1")}
                    info="id" 
                />
            : 
                null
        }

        { 
            formEmail === true
            ?
                <FormForgotPassword
                    message = {t("forgotPassword.mensaje2")}
                    info="email"
                />
            : 
                null
        }

        { 
            formEmail === false && formIdDoc === false?
                <div id='forgot'>
                    <h2 id='title'>{t('forgotPassword.titulo1')}</h2>

                    <form onSubmit={ handleSubmitRadio } className='form'>
                        <p>{t("forgotPassword.descripcion1")}</p>

                        <div>
                            <div>
                                <input type="radio" id="radio" className='radio-button' checked={ info === "cedula" } onChange={ onRadioChange } name="cedula" value="cedula"/>
                                <label htmlFor="radio">{t("forgotPassword.radio1")}</label>
                            </div>

                            <div>
                                <input type="radio" id="radio2" className='radio-button' checked={ info === "correo" } onChange={ onRadioChange } name="correo" value="correo"/>
                                <label htmlFor="radio2">{t("forgotPassword.radio2")}</label>
                            </div>

                            <div>
                                <input disabled  type="radio" id="radio3" className='radio-button' checked={ info === "telefono" } onChange={ onRadioChange } name="telefono" value="telefono"/>
                                <label htmlFor="radio3">{t("forgotPassword.radio3")}</label>
                            </div>
                        </div>

                        <div id="buttons">
                            <button type="submit">{t('forgotPassword.botonAceptar')}</button>
                            <button type="button" onClick={ () => {navigate("/login")} }>{t('forgotPassword.botonCancelar')}</button>
                        </div>

                    </form>
                </div>
            : 
                null
        }   
            
    </div>
  )
}
