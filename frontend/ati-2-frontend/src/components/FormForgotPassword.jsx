import React, { useState } from 'react'

export const FormForgotPassword = ({ message }) => {

    const [correoEnviado, setCorreoEnviado] = useState(false)
  
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
                    <h2 id='title'>Recuperar mi contraseña, o mis datos</h2>

                    <form onSubmit={ handleSendEmail } className='form'>
                        <p id="message">Acabamos de enviar tu usuario, y un link para restablecer tu contraseña, al correo: <br/>
                            <a href="#">{ data.email }</a><br/>
                            y al número de teléfono: {data.phone} <br/><br/>
                            <span id="text">Si este no es su correo o teléfono, debe modificar su correo electrónico, o teléfono, en la cuenta que posee con la empresa, y solicitar nuevamente el envío de dicha información</span>
                        </p>

                        <div id="buttons">
                            <button type="submit">Aceptar</button>
                            <button type="button">Cancelar</button>
                        </div>
                    </form>
                </div>
            : 
                <div id='forgot'>
                    <h2 id='title'>Recuperar mi contraseña, o mis datos</h2>

                    <form onSubmit={ handleSubmit } className='form'>
                        <p>{ message }</p>
                        <div id='input-forgot-password'>
                            <input type="text"  />
                        </div>
                        <div id="buttons">
                            <button type="submit">Aceptar</button>
                            <button type="button">Cancelar</button>
                        </div>
                    </form>
                </div>
            
            }

        </>
  )
}
