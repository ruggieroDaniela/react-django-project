import React, { useState } from 'react'
import "../styles/ResetPassword.scss"
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const ResetPassword = () => {

  const { t, i18n } = useTranslation();
  const [submitPassword, setSubmitPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [action, setAction] = useState('');

  const handleSubmitRadio = (e) => {

    e.preventDefault();

    
    if ( action === 'cedula' ){
        setformIdDoc(true);
        setFormEmail(false);
    }

    else if ( action === 'correo' ){
        setformIdDoc(false);
        setFormEmail(true);
    }
  }

const onRadioChange = e => {
    setAction(e.target.value);
    setAction("../" + e.target.value)
}

  const dataGET = {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitPassword(true);

    const dataPOST = {
        password: password,
        confirmPassword: confirmPassword,
    };
  }

  return (
    <>
      {submitPassword 
        ?
        <div className='reset-password'>
          <div className='reset'>
              <h2 id='title'>{t('resetPassword.titulo1')}</h2>

              <form onSubmit={ handleSubmitRadio } className='form'>
                  <p>{t('resetPassword.descripcion')}</p>
                  <p>{t('resetPassword.pregunta')}</p>
                  <div>
                      <div>
                          <input type="radio" id="radio" className='radio-button' checked={ action === "../login" } onChange={ onRadioChange } name="iniciar" value="login"/>
                          <label for="radio">{t('resetPassword.radio1')}</label>
                      </div>

                      <div>
                          <input type="radio" id="radio2" className='radio-button' checked={ action === "../" } onChange={ onRadioChange } name="portal" value=""/>
                          <label for="radio2">{t('resetPassword.radio2')}</label>
                      </div>

                      <div>
                          <input type="radio" id="radio3" className='radio-button' checked={ action === "" } onChange={ onRadioChange } name="salir" value=""/>
                          <label for="radio3">{t('resetPassword.radio3')}</label>
                      </div>
                  </div>

                  <div id="buttons">
                      <Link to={action} id="padre-btn-aceptar">
                        <button type="submit"  id="btn-aceptar" >{t('resetPassword.botonAceptar')}</button>
                      </Link>
                      <button>{t('resetPassword.botonCancelar')}</button>
                  </div>
              </form>
            </div>
          </div>

        :

          <div className='reset-password'>
              <div className='reset'>
                  <h2 id='title'>{t('resetPassword.titulo2')}</h2>

                  <form onSubmit={ handleSubmit } className='form'>
                      <p>{t('resetPassword.descripcion2')} <a href="#">{ dataGET.email }</a> </p>

                      <div>
                          <div className='field'>
                              <label>{t('resetPassword.contraseña')}</label>
                              <input type="password" onChange={e => setPassword(e.target.value)} required />
                          </div>
                          <div className='field'>
                              <label>{t('resetPassword.confirmarContraseña')}</label>
                              <input type="password" onChange={e => setConfirmPassword(e.target.value)} required />
                          </div>
                      </div>

                      <div id='buttons'>
                        <button id="btnCambiarContrasena" type="submit">{t('resetPassword.cambiarContraseña')}</button>
                      </div>

                  </form>
              </div>
          </div>
      }

      </>
  )
}
