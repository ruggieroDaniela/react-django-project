import React, { useState, useContext} from 'react'
import "../styles/ResetPassword.scss"
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const ResetPassword = () => {

  const { t, i18n } = useTranslation();
  const [submitPassword, setSubmitPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [iniciarSesion, setIniciarSesion] = useState(false);
  const [navegar, setNavegar] = useState(false);
  const [salir, setSalir] = useState(false);
  const [action, setAcction] = useState('');

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
    setAcction(e.target.value);
    setAcction("../" + e.target.value)
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
              <h2 id='title'>Contraseña restablecida</h2>

              <form onSubmit={ handleSubmitRadio } className='form'>
                  <p>Seleccione la información que va a proporcionar</p>
                  <p>¿Qué desea hacer?</p>
                  <div>
                      <div>
                          <input type="radio" id="radio" className='radio-button' checked={ action === "../login" } onChange={ onRadioChange } name="iniciar" value="login"/>
                          <label for="radio">Iniciar sesión</label>
                      </div>

                      <div>
                          <input type="radio" id="radio2" className='radio-button' checked={ action === "../portal" } onChange={ onRadioChange } name="portal" value="portal"/>
                          <label for="radio2">Seguir navegando en el portal</label>
                      </div>

                      <div>
                          <input type="radio" id="radio3" className='radio-button' checked={ action === "../salir" } onChange={ onRadioChange } name="salir" value="salir"/>
                          <label for="radio3">Salir</label>
                      </div>
                  </div>

                  <div id="buttons">
                      <Link to={action} id="padre-btn-aceptar">
                        <button type="submit"  id="btn-aceptar" >Aceptar</button>
                      </Link>
                      <button>Cancelar</button>
                  </div>
              </form>
            </div>
          </div>

        :

          <div className='reset-password'>
              <div className='reset'>
                  <h2 id='title'>Restablece tu contraseña</h2>

                  <form onSubmit={ handleSubmit } className='form'>
                      <p>Cambiando la contraseña de correo de la persona <a href="#">{ dataGET.email }</a> </p>

                      <div>
                          <div className='field'>
                              <label>Contraseña</label>
                              <input type="password" onChange={e => setPassword(e.target.value)} required />
                          </div>
                          <div className='field'>
                              <label>Confirmar contraseña</label>
                              <input type="password" onChange={e => setConfirmPassword(e.target.value)} required />
                          </div>
                      </div>

                      <div id='buttons'>
                        <button id="btnCambiarContrasena" type="submit">Cambiar contraseña</button>
                      </div>

                  </form>
              </div>
          </div>
      }

      </>
  )
}
