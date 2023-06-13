import React, { useState, useEffect } from 'react'
import "../styles/ResetPassword.scss"
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import axios from 'axios';
import ErrorMessage from "../components/ErrorMessage";

export const ResetPassword = () => {

  const { t, i18n } = useTranslation();
  const [submitPassword, setSubmitPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [action, setAction] = useState('');
  const [email, setEmail] = useState('')
  const [invalidPassword, setInvalidPassword] = useState(false)
  const [tooShortPassword, setTooShortPassword] = useState(false)
  const params = useParams()

  useEffect(() => {
    const fetchMail = async () => {
      try {
        const response = await axios.post(`${import.meta.env.API_KEY}/users/get_email/`, {id: params.id})
        setEmail(response.data.email)
      } catch(error){
        console.log(error)
      }
     
    } 
    
    fetchMail()
  }, [])

  const handleSubmitRadio = (e) => {
    console.log(action)
    e.preventDefault();

    console.log(action)
    if(action === ""){
      window.opener = null;
      window.open("", "_self");
      window.close();
    }
  }

  const onRadioChange = e => {
      setAction(e.target.value);
      setAction("../" + e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();


    if(password === confirmPassword){

      if(password.length >= 8){
        try{
          const url = `${import.meta.env.API_KEY}/users/change_password/`
          await axios.post(url, {'id': params.id, 'new_password': password, 'confirm_password': confirmPassword})

          setInvalidPassword(false)
          setTooShortPassword(false)
          setSubmitPassword(true)
        } catch (error) {
          console.log(error)
        }
      } else {
        setInvalidPassword(false)
        setTooShortPassword(true)
      }
    } else {
      setInvalidPassword(true)
      setTooShortPassword(false)
    }
  }

  return (
    <>
      {submitPassword 
        ?
        <div className='reset-password'>
          <div className='reset'>
              <h2 id='title'>{t('resetPassword.titulo1')}</h2>

              <form onSubmit={ handleSubmitRadio } className='form'>
                  <p>{t('resetPassword.descripcion3')}</p>
                  <p>{t('resetPassword.pregunta')}</p>
                  <div>
                      <div>
                          <input type="radio" id="radio" className='radio-button' checked={ action === "../login" } onChange={ onRadioChange } name="iniciar" value="login"/>
                          <label htmlFor="radio">{t('resetPassword.radio1')}</label>
                      </div>

                      <div>
                          <input type="radio" id="radio2" className='radio-button' checked={ action === "../" } onChange={ onRadioChange } name="portal" value=""/>
                          <label htmlFor="radio2">{t('resetPassword.radio2')}</label>
                      </div>
                  </div>

                  <div id="buttons">
                      <Link to={action} id="padre-btn-aceptar">
                        <button id="btn-aceptar" type="submit" >{t('resetPassword.botonAceptar')}</button>
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
                      <p>{t('resetPassword.descripcion2')} <a href="#">{ email }</a> </p>

                      <div>
                          <div className='field'>
                              <label>{t('resetPassword.contraseña')}</label>
                              <input type="password" onChange={e => setPassword(e.target.value)} />
                          </div>
                          <div className='field'>
                              <label>{t('resetPassword.confirmarContraseña')}</label>
                              <input type="password" onChange={e => setConfirmPassword(e.target.value)} />
                          </div>
                      </div>
                      
                      {invalidPassword && <ErrorMessage message={t('resetPassword.passwordInvalido')}/> }
                      {tooShortPassword && <ErrorMessage message={t('resetPassword.passwordCorto')}/> }

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
