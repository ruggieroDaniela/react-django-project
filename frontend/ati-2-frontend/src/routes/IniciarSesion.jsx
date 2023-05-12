import React from 'react'
import "../styles/IniciarSesion.scss"

export const IniciarSesion = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit exitoso')
    }



  return (
    <div className='container'>
    <div className='login'>
        <h2 className='title'>Iniciar Sesión</h2>

        <form onSubmit={handleSubmit} className='form'>
            <p>Selecciona la cuenta en la que desea acceder</p>

            <div className='form'>
                <div>
                    <label id="input-login">correo </label>
                    <input type="text" name="uname" required />
                </div>
                <div>
                    <label>contraseña </label>
                    <input type="password" name="pass" required />
                </div>
            </div>

            
            <button id="submit-button" type="submit">Iniciar Sesión</button>
            
            <a href="#">Olvidé mi contraseña, o mis datos</a>

        </form>
        
    </div>
    </div>
  )
}
