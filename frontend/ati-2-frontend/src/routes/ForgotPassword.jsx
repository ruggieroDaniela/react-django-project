import React, { useState, useContext} from 'react'
import "../styles/ForgotPassword.scss"
import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';

export const ForgotPassword = () => {

    const { t, i18n } = useTranslation();
    const [info, setInfo] = useState('');
    const [formIdDoc, setformIdDoc] = useState(false);
    const [formEmail, setFormEmail] = useState(false);

    const handleSubmitRadio = (e) => {

        e.preventDefault();

        if ( info === 'cedula' ){
            setformIdDoc(true);
            setFormEmail(false);
            console.log('dsdsdsds')
        }
        else if ( info === 'correo' ){
            setformIdDoc(false);
            setFormEmail(true);
        }
    }

    const handleSubmitResetPassword = e => {
        e.preventDefault();
    }

    const onRadioChange = e => {
        setInfo(e.target.value);
    }

  return (
    <div id='forgot-password'>

        { 
            formIdDoc === true
            ? 
                <div id='forgot'>
                    <h2 id='title'>Recuperar mi contraseña, o mis datos</h2>

                    <form onSubmit={ handleSubmitResetPassword } className='form'>
                        <p>Ingresa tu cedula de identidad, DNI o pasaporte</p>
                        <div id='input-forgot-password'>
                            <input type="text"  />
                        </div>
                        <div id="buttons">
                            <button type="submit">Aceptar</button>
                            <button type="button">Cancelar</button>
                        </div>
                    </form>
                </div>
            : 
                null
        }

        { 
            formEmail === true
            ? 
                <div id='forgot'>
                    <h2 id='title'>Recuperar mi contraseña, o mis datos</h2>

                    <form onSubmit={ handleSubmitResetPassword } className='form'>
                        <p>Ingresa tu correo electrónico o usuario</p>
                        <div id='input-forgot-password'>
                            <input type="text"  />
                        </div>
                        <div id="buttons">
                            <button type="submit">Aceptar</button>
                            <button type="button">Cancelar</button>
                        </div>
                    </form>
                </div>
            : 
                null
        }

        { 
            formEmail === false && formIdDoc === false
            ?
                <div id='forgot'>
                    <h2 id='title'>Recuperar mi contraseña, o mis datos</h2>

                    <form onSubmit={handleSubmitRadio} className='form'>
                        <p>Seleccione la información que va a proporcionar</p>

                        <div>
                            <div>
                                <input type="radio" id="radio" className='radio-button' checked={ info === "cedula" } onChange={ onRadioChange } name="cedula" value="cedula"/>
                                <label for="radio">Cédula de identidad, DNI o pasaporte</label>
                            </div>

                            <div>
                                <input type="radio" id="radio2" className='radio-button' checked={ info === "correo" } onChange={ onRadioChange } name="correo" value="correo"/>
                                <label for="radio2">Correo electrónico o usuario</label>
                            </div>

                            <div>
                                <input type="radio" id="radio3" className='radio-button' checked={ info === "telefono" } onChange={ onRadioChange } name="telefono" value="telefono"/>
                                <label for="radio3">Teléfono celular o móvil</label>
                            </div>
                        </div>

                        <div id="buttons">
                            <button type="submit">Aceptar</button>
                            <button type="button">Cancelar</button>
                        </div>

                    </form>
                </div>
            : 
                null
        }   
            
    </div>
  )
}
