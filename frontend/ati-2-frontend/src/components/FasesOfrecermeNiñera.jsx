const botonEnviar = () => {
    return (  
        <button id="enviar">Enviar</button>
    );
}
 


const Fase0 = () => {
    return ( "" );
}
 
const Fase1 = () => {
    return ( "" );
}

const Fase2 = () => {
    return ( "" );
}

const Fase3 = () => {
    return ( "" );
}

const Fase4 = () => {
    return ( "" );
}

const Fase5 = () => {
    return ( "" );
}
 
const  Fase6= () => {
    return ( 

        <div id="fase6">
            <span>Por favor, indique las condiciones de trabajo que desea recibir del cliente o empleador</span>
            <h1>Condiciones de trabajo</h1>

            
                <div>
                    <h2>¿Como desea que sean las salidas de su jornada laboral?</h2>
                    <input type="checkbox" id="c1"/>
                    <label for="c1">Semanal</label>

                    <input type="checkbox" id="c1"/>
                    <label for="c1">Quincenal</label>

                    <input type="checkbox" id="c1"/>
                    <label for="c1">Mensual</label>

                    <input type="checkbox" id="c1"/>
                    <label for="c1">Interdiario</label>

                    <input type="checkbox" id="c1"/>
                    <label for="c1">Medio tiempo</label><br/>

                    <input type="checkbox" id="c1"/>
                    <label for="c1">Fin de semana</label>
                    
                    <input type="checkbox" id="c1"/>
                    <label for="c1">En la noche</label>

                    <input type="checkbox" id="c1"/>
                    <label for="c1">Por temporadas</label>
                    
                    <input type="checkbox" id="c1"/>
                    <label for="c1">Por horas</label>

                    <input type="checkbox" id="c1"/>
                    <label for="c1">Otro</label>                    
                </div>

                <div>
                    <h2>Horario</h2>
                    <p>Seleccione los días que esta dispuesta(o) a trabajar</p>

                    <input type="checkbox" id="c1"/>
                    <label for="c1">Lunes</label>

                    <input type="checkbox" id="c1"/>
                    <label for="c1">Martes</label>

                    <input type="checkbox" id="c1"/>
                    <label for="c1">Miercoles</label>

                    <input type="checkbox" id="c1"/>
                    <label for="c1">Jueves</label>

                    <input type="checkbox" id="c1"/>
                    <label for="c1">Viernes</label><br/>

                    <input type="checkbox" id="c1"/>
                    <label for="c1">Sabado</label>
                    
                    <input type="checkbox" id="c1"/>
                    <label for="c1">Domingo</label>

                    <input type="checkbox" id="c1"/>
                    <label for="c1">De Lunes a Viernes</label>
                    
                    <input type="checkbox" id="c1"/>
                    <label for="c1">Fin de semana</label>

                    <input type="checkbox" id="c1"/>
                    <label for="c1">Otros a considerar</label>   


                </div>

                <div>
                    <h2>Salario Deseado</h2>

                    <input type="radio" id="c1"/>
                    <label for="c1">Monto</label> 

                    <input type="radio" id="c1"/>
                    <label for="c1">A convenir</label> 

                </div>

                <div id="beneficio-laboral">
                    <h2>¿Espera algun otro beneficio laboral?</h2>
                    <h2>Ejemplo</h2>
                    <p> Derecho a las comidas diarias<br/>
                        Seguro social obligatorio<br/>
                        Cobertura de seguro<br/>
                        Bonos de fin de año</p>
                    
                </div>

            

        </div>
     );
}
 

const FasesOfrecermeNiñera = [Fase0, Fase1, Fase2, Fase3, Fase4, Fase5, Fase6];

export {FasesOfrecermeNiñera,botonEnviar};