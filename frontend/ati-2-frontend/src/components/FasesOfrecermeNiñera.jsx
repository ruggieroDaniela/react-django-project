import React, { useContext } from "react";
import { useTranslation } from 'react-i18next';
import { RegisterFormContext } from "../context/RegisterFormContext";
import { FieldDropdownCheckbox } from "./search/FieldDropdownCheckbox";
import { useState } from "react";

import "../styles/BuscarPersonalDomestico.scss"

const botonEnviar = () => {
    return (  
        <button id="enviar">Enviar</button>
    );
}
 


const Fase0 = () => {
    const { t, i18n } = useTranslation();
    const {registerFormState, setRegisterFormState} = useContext(RegisterFormContext);

    return ( 
        <div id="fase0">
            <div id="small">
                <p>{t('OfrecermeNiñera.fases.0.mensaje')}</p>                        
                <span className="red">*  </span>= <span className="blue">{t('OfrecermeNiñera.fases.0.campos-obligatorios')}</span>
            </div>
            <div >
                <p>{t('OfrecermeNiñera.fases.0.condiciones')}</p>
                <span className="red" >*  </span><h3 className="blue"> {t('OfrecermeNiñera.fases.0.edad')}</h3><input type="text" /> {t('OfrecermeNiñera.fases.0.años')}
            <div>
                <span className="red" >*  </span><h3 className="blue">{t('OfrecermeNiñera.fases.0.situacion-familiar')}</h3> <br />
                <div>
                    <input type="checkbox" id="situacion-familiar" name="interest" value="coding" checked />
                    <label for="situacion-familiar">{t('OfrecermeNiñera.fases.0.sin-hijos')}</label>

                    <input type="checkbox" id="situacion-familiar" className="segundo" name="interest" value="coding" checked />
                    <label for="situacion-familiar">{t('OfrecermeNiñera.fases.0.con-hijos')}</label>
                </div>
            </div>

            <div>
                <span className="red" >*  </span><h3 className="blue">{t('OfrecermeNiñera.fases.0.grado-instruccion')}</h3><br />
                <div>
                    <input type="checkbox" id="situacion-familiar" name="interest" value="coding" checked />
                    <label for="situacion-familiar">{t('OfrecermeNiñera.fases.0.grado.0')}</label>

                    <input type="checkbox" id="situacion-familiar" className="segundo" name="interest" value="coding" checked />
                    <label for="situacion-familiar">{t('OfrecermeNiñera.fases.0.grado.1')}</label>

                    <input type="checkbox" id="situacion-familiar" className="segundo" name="interest" value="coding" checked />
                    <label for="situacion-familiar">{t('OfrecermeNiñera.fases.0.grado.2')}</label>

                    <input type="checkbox" id="situacion-familiar" className="segundo" name="interest" value="coding" checked />
                    <label for="situacion-familiar">{t('OfrecermeNiñera.fases.0.grado.3')}</label>
                </div>
            </div>

            </div>

        </div>
     );
}
 
const Fase1 = () => {
    const { t, i18n } = useTranslation();
    const {registerFormState, setRegisterFormState} = useContext(RegisterFormContext);

    return ( 
        <div id="fase1">
            <div id="small">
                <span className="red">*  </span><span className="blue">{t('OfrecermeNiñera.fases.1.mensaje')}</span>
            </div>

            <div>
                <h2 className="blue">{t('OfrecermeNiñera.fases.1.nombre')}</h2>
                <p>{t('OfrecermeNiñera.fases.1.prefiero')}</p>
            </div>

            <div id="formulario">
                <div>
                    <label for="pais">{t('OfrecermeNiñera.fases.1.pais')}</label> 
                </div>

                <div>
                    <select name="pais" id="pais"> 
                        <option value="rigatoni">Rigatoni</option> 
                        <option value="dave">Dave</option> 
                        <option value="pumpernickel">Pumpernickel</option> 
                        <option value="reeses">Reeses</option> 
                    </select>
                </div>

                <div >
                    <label for="pais">{t('OfrecermeNiñera.fases.1.estado')}</label> 
                </div>
                <div>
                    <select name="pais" id="pais"> 
                        <option value="rigatoni">Rigatoni</option> 
                        <option value="dave">Dave</option> 
                        <option value="pumpernickel">Pumpernickel</option> 
                        <option value="reeses">Reeses</option> 
                    </select>
                </div>
                <div>
                    <label for="pais">{t('OfrecermeNiñera.fases.1.ciudad')}</label> 
                </div>
                <div>
                    <select name="pais" id="pais"> 
                        <option value="rigatoni">Rigatoni</option> 
                        <option value="dave">Dave</option> 
                        <option value="pumpernickel">Pumpernickel</option> 
                        <option value="reeses">Reeses</option> 
                    </select>
                </div>

                <div>
                    <label for="pais">{t('OfrecermeNiñera.fases.1.zona')}</label> 
                </div>
                <div>
                    <select name="pais" id="pais"> 
                        <option value="rigatoni">Rigatoni</option> 
                        <option value="dave">Dave</option> 
                        <option value="pumpernickel">Pumpernickel</option> 
                        <option value="reeses">Reeses</option> 
                    </select>
                </div>

            </div>

        </div> 
    );
}

const Fase2 = () => {
    const { t, i18n } = useTranslation();
    const {registerFormState, setRegisterFormState} = useContext(RegisterFormContext);

    return ( 
    <div id="fase2">
            
            <div id="small">
                <span className="red">*  </span><span className="blue">{t('OfrecermeNiñera.fases.2.mensaje')}</span>
            </div>
            
            <div id="titulos">
                <span className="red">* </span><h2 className="blue">{t('OfrecermeNiñera.fases.2.descripcion-perfil')}</h2>
                <div id="peq">{t('OfrecermeNiñera.fases.2.indique')}</div>
            </div>
            
            <div id="form">
                <textarea></textarea>
            </div>
    </div> 
    );
}

const Fase3 = () => {
    const { t, i18n } = useTranslation();
    const {registerFormState, setRegisterFormState} = useContext(RegisterFormContext);

    return (     
    <div id="fase3">

        <div id="small">
            <span className="red">*  </span><span className="blue">{t('OfrecermeNiñera.fases.3.mensaje')}</span><br />
            <span className="blue" >{t('OfrecermeNiñera.fases.3.mensaje2')}</span>
        </div>
        <div id="titulos">
            <span className="red">* </span><h2 >{t('OfrecermeNiñera.fases.3.pregunta')}</h2>
            <div id="form">
                    <div>
                        <input type="checkbox" id="situacion-familiar" name="interest" value="coding" checked />
                        <label for="situacion-familiar">{t('OfrecermeNiñera.fases.3.si')}</label>
                    </div>

                    <div>
                        <input type="checkbox" id="situacion-familiar" className="segundo" name="interest" value="coding" checked />
                        <label for="situacion-familiar">{t('OfrecermeNiñera.fases.3.no')}</label>
                    </div>
            </div>
        </div>
        <div >
            <div id="peq">{t('OfrecermeNiñera.fases.3.especifique')}</div>
        </div>

        <div id="form">
            <textarea></textarea>
        </div>

    </div>
  );
}

const Fase4 = () => {
    const { t, i18n } = useTranslation();
    const {registerFormState, setRegisterFormState} = useContext(RegisterFormContext);

    return ( 
    <div id="fase4">

        <div id="small">
            <span className="red">*  </span><span className="blue">{t('OfrecermeNiñera.fases.4.mensaje')}</span><br />
        </div>

        <div id="titulo">
            <h2 className="blue" >{t('OfrecermeNiñera.fases.4.titulo')}</h2><br />
        </div>
        <div id="contenido">
            <div id="titulos">
                <p>{t('OfrecermeNiñera.fases.4.indique')} </p>
                <h2>{t('OfrecermeNiñera.fases.4.ejemplo')}</h2>
                <ul>
                    <li>{t('OfrecermeNiñera.fases.4.ejemplos.0')}</li>
                    <li>{t('OfrecermeNiñera.fases.4.ejemplos.1')}</li>
                    <li>{t('OfrecermeNiñera.fases.4.ejemplos.2')}</li>
                    <li>{t('OfrecermeNiñera.fases.4.ejemplos.3')}</li>
                    <li>{t('OfrecermeNiñera.fases.4.ejemplos.4')}</li>
                    <li>{t('OfrecermeNiñera.fases.4.ejemplos.5')}</li>
                    <li>{t('OfrecermeNiñera.fases.4.ejemplos.6')}</li>
                </ul>
            </div>
            <div >
                <div id="peq"><span className="red">* </span><h2>{t('OfrecermeNiñera.fases.4.especifique')}</h2></div>
            </div>

            <div id="form">
                <textarea></textarea>
            </div>
        </div>
    </div>

     );
}

const Fase5 = () => {
    const { t, i18n } = useTranslation();
    const {registerFormState, setRegisterFormState} = useContext(RegisterFormContext);

    return ( 
        <div id="fase5">
            <div className="small">
                <span className="red">* </span><span className="blue">{t('OfrecermeNiñera.fases.5.mensaje')}</span>
            </div>

            <div>
                <h1 className="blue">{t('OfrecermeNiñera.fases.5.nombre')}</h1>
            </div>

            
                <div>
                    <div className="titulos">
                        <span className="red">* </span><h2>{t('OfrecermeNiñera.fases.5.salidas-jornada')}</h2>
                    </div>
                    <div className="form">
                        <div>
                            <input type="checkbox" id="c1"/>
                            <label for="c1">{t('OfrecermeNiñera.fases.5.salidas-jornada-opciones.0')}</label>
                        </div>    

                        <div>
                            <input type="checkbox" id="c1"/>
                            <label for="c1">{t('OfrecermeNiñera.fases.5.salidas-jornada-opciones.1')}</label>
                        </div>    

                        <div>
                            <input type="checkbox" id="c1"/>
                            <label for="c1">{t('OfrecermeNiñera.fases.5.salidas-jornada-opciones.2')}</label>
                        </div>

                        <div>
                            <input type="checkbox" id="c1"/>
                            <label for="c1">{t('OfrecermeNiñera.fases.5.salidas-jornada-opciones.3')}</label>
                        </div>

                        <div>
                            <input type="checkbox" id="c1"/>
                            <label for="c1">{t('OfrecermeNiñera.fases.5.salidas-jornada-opciones.4')}</label><br/>
                        </div>

                        <div>
                            <input type="checkbox" id="c1"/>
                            <label for="c1">{t('OfrecermeNiñera.fases.5.salidas-jornada-opciones.5')}</label>
                        </div>

                        <div>
                            <input type="checkbox" id="c1"/>
                            <label for="c1">{t('OfrecermeNiñera.fases.5.salidas-jornada-opciones.6')}</label>
                        </div>

                        <div>
                            <input type="checkbox" id="c1"/>
                            <label for="c1">{t('OfrecermeNiñera.fases.5.salidas-jornada-opciones.7')}</label>
                        </div>

                        <div>
                            <input type="checkbox" id="c1"/>
                            <label for="c1">{t('OfrecermeNiñera.fases.5.salidas-jornada-opciones.8')}</label>
                        </div>

                        <div>
                            <input type="checkbox" id="c1"/>
                            <label for="c1">{t('OfrecermeNiñera.fases.5.salidas-jornada-opciones.9')}</label>                    
                        </div>
                        <br />
                        
                        <div>
                        {t('OfrecermeNiñera.fases.5.salidas-jornada-opciones.10')}: <input type="text" />
                        </div>
                    </div>
                </div>

                <div>
                    <div className="titulos">
                        <span className="red">* </span><h2>{t('OfrecermeNiñera.fases.5.horario')}</h2>
                    </div>
                    <p>{t('OfrecermeNiñera.fases.5.horario-mensaje')}</p>

                    <div className="form">
                        <div>
                            <input type="checkbox" id="c1"/>
                            <label for="c1">{t('OfrecermeNiñera.fases.5.horario-opciones.0')}</label>
                        </div>

                        <div>
                            <input type="checkbox" id="c2"/>
                            <label for="c2">{t('OfrecermeNiñera.fases.5.horario-opciones.1')}</label>
                        </div>

                        <div>
                            <input type="checkbox" id="c3"/>
                            <label for="c3">{t('OfrecermeNiñera.fases.5.horario-opciones.2')}</label>
                        </div>

                        <div>
                            <input type="checkbox" id="c4"/>
                            <label for="c4">{t('OfrecermeNiñera.fases.5.horario-opciones.3')}</label>
                        </div>

                        <div>
                            <input type="checkbox" id="c5"/>
                            <label for="c5">{t('OfrecermeNiñera.fases.5.horario-opciones.4')}</label>
                        </div>

                        <div>
                            <input type="checkbox" id="c6"/>
                            <label for="c6">{t('OfrecermeNiñera.fases.5.horario-opciones.5')}</label>
                        </div>

                        <div>
                            <input type="checkbox" id="c7"/>
                            <label for="c7">{t('OfrecermeNiñera.fases.5.horario-opciones.6')}</label>
                        </div>

                        <div>
                            <input type="checkbox" id="c8"/>
                            <label for="c8">{t('OfrecermeNiñera.fases.5.horario-opciones.7')}</label>
                        </div>

                        <div>
                            <input type="checkbox" id="c9"/>
                            <label for="c9">{t('OfrecermeNiñera.fases.5.horario-opciones.8')}</label>
                        </div>

                        <div>
                            <input type="checkbox" id="c10"/>
                            <label for="c10">{t('OfrecermeNiñera.fases.5.horario-opciones.9')}</label>
                        </div>

                        <div>
                        {t('OfrecermeNiñera.fases.5.horario-opciones.10')}: <input type="text" />
                        </div>
                    </div>

                </div>

                <div>
                    <div className="titulos">
                        <span className="red">* </span><h2>{t('OfrecermeNiñera.fases.5.salario-deseado')}</h2>
                    </div>

                    <div id="form-vertical">
                        <div>
                            <input type="radio" id="c1"/>
                            <label for="c1">{t('OfrecermeNiñera.fases.5.salario-deseado-opciones.0')}</label> 
                        </div>

                        <div>
                            <input type="radio" id="c1"/>
                            <label for="c1">{t('OfrecermeNiñera.fases.5.salario-deseado-opciones.1')}</label> 
                        </div>
                    </div>
                </div>

                <div id="beneficio-laboral">
                    <div className="titulos">
                        <span className="red">* </span><h2 className="blue">{t('OfrecermeNiñera.fases.5.beneficio-laboral')}</h2>
                    </div>
                    <div id="row">
                        <div>
                            <h2>{t('OfrecermeNiñera.fases.5.ejemplo')}</h2>
                            <p> {t('OfrecermeNiñera.fases.5.ejemplos.0')}<br/>
                                {t('OfrecermeNiñera.fases.5.ejemplos.1')}<br/>
                                {t('OfrecermeNiñera.fases.5.ejemplos.2')}<br/>
                                {t('OfrecermeNiñera.fases.5.ejemplos.3')}</p>
                        </div>

                        <div>
                            <div id="der">
                                <div id="peq">{t('OfrecermeNiñera.fases.3.especifique')}</div>
                            </div>

                            <div id="der">
                                <textarea></textarea>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
     );
}
 
const  Fase6= () => {
    const { t, i18n } = useTranslation();
    const {registerFormState, setRegisterFormState} = useContext(RegisterFormContext);

    return(
        <div id="fase6">

        <div id="small">
            <span className="red">*  </span><span className="blue">{t('OfrecermeNiñera.fases.6.mensaje')}</span><br />
        </div>

        <div id="titulo">
            <h2 className="blue" >{t('OfrecermeNiñera.fases.6.titulo')}</h2><br />
        </div>
        <div id="contenido">


                <div id="form">
                    <div id="form-vertical">
                        <div>
                            <input type="radio" id="c1"/>
                            <label for="c1">{t('OfrecermeNiñera.fases.6.fecha-inicio')}</label> 
                        </div>

                        <div>
                            <input type="radio" id="c1"/>
                            <label for="c1">{t('OfrecermeNiñera.fases.6.fecha-convenir')}</label> 
                        </div>
                    </div>
                    <div>
                        <input type="date" />   
                    </div>
                </div>
            

        </div>
    </div>
    );
}

const Fase7 = () => {
    const { t, i18n } = useTranslation();
    const {registerFormState, setRegisterFormState} = useContext(RegisterFormContext);
    var arr=[1,2,3];
    var val=[1,2,3];
    const [selectedServices, setSelectedServices] = useState("");

    return ( <div id="fase7">
        <div className="small blue">
            <ul>
                <li>{t('OfrecermeNiñera.fases.7.mensaje')}</li>
                <li>{t('OfrecermeNiñera.fases.7.mensaje1')}</li>
            </ul>
        </div>

        <div id="form">
            <div className="col">
                <div className="titulo">
                    <span className="red">* </span><h2 className="blue">{t('OfrecermeNiñera.fases.7.lugar-procedencia')}</h2>
                </div>
                <div className="form-vertical">
                        <div>
                            <input type="radio" id="c1"/>
                            <label for="c1">{t('OfrecermeNiñera.fases.7.lugar-procedencia-opciones.0')}</label> 
                        </div>

                        <div>
                            <input type="radio" id="c1"/>
                            <label for="c1">{t('OfrecermeNiñera.fases.7.lugar-procedencia-opciones.1')}</label> 
                        </div>
                </div>
            </div>
            <div className="col">
                <h2 >{t('OfrecermeNiñera.fases.7.tipo-cliente')}</h2>
                <div className="form-vertical">
                        <div>
                            <input type="radio" id="c1"/>
                            <label for="c1">{t('OfrecermeNiñera.fases.7.tipo-cliente-opciones.0')}</label> 
                        </div>
                        <div>
                            <input type="radio" id="c1"/>
                            <label for="c1">{t('OfrecermeNiñera.fases.7.tipo-cliente-opciones.1')}</label> 
                        </div>
                        <div>
                            <input type="radio" id="c1"/>
                            <label for="c1">{t('OfrecermeNiñera.fases.7.tipo-cliente-opciones.2')}</label> 
                        </div>

                </div>
            </div>

        </div>

        <div className="dropdown">
            <div className="dropdown-content">
                <FieldDropdownCheckbox 
                    title="prueba"
                    placeholder="placeholder 1"
                    items={arr}
                    values={val}
                    state={selectedServices}
                    setState={setSelectedServices}
                />

                <FieldDropdownCheckbox 
                    title="prueba"
                    placeholder="placeholder 1"
                    items={arr}
                    values={val}
                    state={selectedServices}
                    setState={setSelectedServices}
                />

                <FieldDropdownCheckbox 
                    title="prueba"
                    placeholder="placeholder 1"
                    items={arr}
                    values={val}
                    state={selectedServices}
                    setState={setSelectedServices}
                />

                <FieldDropdownCheckbox 
                    title="prueba"
                    placeholder="placeholder 1"
                    items={arr}
                    values={val}
                    state={selectedServices}
                    setState={setSelectedServices}
                />
            </div>
        </div>
        

        

    </div> );
}

const Fase8 = () => {
    const { t, i18n } = useTranslation();
    const {registerFormState, setRegisterFormState} = useContext(RegisterFormContext);

    return ( 
        <div id="fase8">

        <div id="small">
            <span className="red">*  </span><span className="blue">{t('OfrecermeNiñera.fases.8.mensaje')}</span><br />
        </div>

        <div id="titulo">
            <h2 className="blue" >{t('OfrecermeNiñera.fases.8.titulo')}</h2><br />
        </div>
        <div id="contenido">
            <h2>{t('OfrecermeNiñera.fases.8.posee-documentacion')}</h2>

            <div id="form">
                <div id="form-horizontal">
                    <div>
                        <input type="radio" id="c1"/>
                        <label for="c1">{t('OfrecermeNiñera.fases.8.si')}</label> 
                    </div>

                    <div id="segundo">
                        <input type="radio" id="c1"/>
                        <label for="c1">{t('OfrecermeNiñera.fases.8.no')}</label> 
                    </div>
                </div>
                <div >
                    <h2>{t('OfrecermeNiñera.fases.8.documentos')}</h2>
                    <div id="selects">
                        <div>
                            <input type="checkbox" id="c1"/>
                            <label for="c1">{t('OfrecermeNiñera.fases.8.documentos-opciones.0')}</label>
                        </div>
                        <div>
                            <input type="checkbox" id="c1"/>
                            <label for="c1">{t('OfrecermeNiñera.fases.8.documentos-opciones.1')}</label>
                        </div>    
                        <div>
                            <input type="checkbox" id="c1"/>
                            <label for="c1">{t('OfrecermeNiñera.fases.8.documentos-opciones.2')}</label>
                        </div>
                        <div>
                            <input type="checkbox" id="c1"/>
                            <label for="c1">{t('OfrecermeNiñera.fases.8.documentos-opciones.3')}</label>
                        </div>
                        <div>
                            <input type="checkbox" id="c1"/>
                            <label for="c1">{t('OfrecermeNiñera.fases.8.documentos-opciones.4')}</label>
                        </div>
                        <div>
                            <input type="checkbox" id="c1"/>
                            <label for="c1">{t('OfrecermeNiñera.fases.8.documentos-opciones.5')}</label>
                        </div>
                        <div>
                            <input type="checkbox" id="c1"/>
                            <label for="c1">{t('OfrecermeNiñera.fases.8.documentos-opciones.6')}</label>
                        </div>
                        <div>
                            <input type="checkbox" id="c1"/>
                            <label for="c1">{t('OfrecermeNiñera.fases.8.documentos-opciones.7')}</label>
                        </div>
                        <div>
                            <input type="checkbox" id="c1"/>
                            <label for="c1">{t('OfrecermeNiñera.fases.8.documentos-opciones.8')}</label>
                        </div>
                        <div>
                            <p> Especifique</p> <input type="text" />
                        </div>

                    </div>
                </div>
            </div>
            

        </div>
    </div>
     );
}

const Fase9 = () => {
    const { t, i18n } = useTranslation();
    const {registerFormState, setRegisterFormState} = useContext(RegisterFormContext);

    return ( 
        <div id="fase9">
            <div id="small">
                <span className="red">*  </span><span className="blue">{t('OfrecermeNiñera.fases.9.mensaje')}</span><br />
            </div>
            <div>
                <h2>{t("OfrecermeNiñera.fases.9.titulo")}</h2>
                <ul>
                    <li>{t("OfrecermeNiñera.fases.9.sugerencias.0")}</li>
                    <li>{t("OfrecermeNiñera.fases.9.sugerencias.1")}</li>
                    <li>{t("OfrecermeNiñera.fases.9.sugerencias.2")}</li>
                    <li>{t("OfrecermeNiñera.fases.9.sugerencias.3")}</li>
                </ul>
            </div>
        </div>
     );
}

const Fase10 = () => {
    const { t, i18n } = useTranslation();
    const {registerFormState, setRegisterFormState} = useContext(RegisterFormContext);

    return ( 
        <div id="fase10">
            <div id="small">
                <span className="red">*  </span><span className="blue">{t('OfrecermeNiñera.fases.10.mensaje')}</span><br />
            </div>
            <div>
                <h2>{t("OfrecermeNiñera.fases.10.titulo")}</h2>
                <ul>
                    <li>{t("OfrecermeNiñera.fases.10.sugerencias.0")}</li>
                    <li>{t("OfrecermeNiñera.fases.10.sugerencias.1")}</li>
                </ul>
            </div>
        </div>
     );
}

const Fase11 = () => {
    const { t, i18n } = useTranslation();
    const {registerFormState, setRegisterFormState} = useContext(RegisterFormContext);

    return ( 
        <div id="fase11">
            <div id="small">
                <span className="red">*  </span><span className="blue">{t('OfrecermeNiñera.fases.11.mensaje')}</span><br />
            </div>
            <h2 className="blue">{t("OfrecermeNiñera.fases.11.titulo")}</h2>
            <div>
                <h2>{t("OfrecermeNiñera.fases.11.titulos.0")}</h2>
                <p>{t("OfrecermeNiñera.fases.11.parrafos.1")}</p>
                <p>{t("OfrecermeNiñera.fases.11.parrafos.2")}</p>
                <p>{t("OfrecermeNiñera.fases.11.parrafos.3")}</p>
                <p>{t("OfrecermeNiñera.fases.11.parrafos.4")}</p>
            </div>
            <div>
                <h2>{t("OfrecermeNiñera.fases.11.titulos.1")}</h2>
                <p>{t("OfrecermeNiñera.fases.11.parrafos.5")}</p>
                <p>{t("OfrecermeNiñera.fases.11.parrafos.6")}</p>
            </div>
            
            <div>
                <h2>{t("OfrecermeNiñera.fases.11.titulos.2")}</h2>
                <p>{t("OfrecermeNiñera.fases.11.parrafos.7")}</p>
            </div>
            <div>
                <h2>{t("OfrecermeNiñera.fases.11.titulos.3")}</h2>
                <p>{t("OfrecermeNiñera.fases.11.parrafos.8")}</p>
            </div>
            <div>
                <h2>{t("OfrecermeNiñera.fases.11.titulos.4")}</h2>
                <p>{t("OfrecermeNiñera.fases.11.parrafos.9")}</p>
            </div>
            <div>
                <h2>{t("OfrecermeNiñera.fases.11.titulos.5")}</h2>
                <p>{t("OfrecermeNiñera.fases.11.parrafos.10")}</p>
            </div>
            <div>
                <h2>{t("OfrecermeNiñera.fases.11.titulos.6")}</h2>
                <p>{t("OfrecermeNiñera.fases.11.parrafos.11")}</p>
            </div>

        </div>
     );
}

const Fase12 = () => {
    const { t, i18n } = useTranslation();
    const {registerFormState, setRegisterFormState} = useContext(RegisterFormContext);

    return ( 
        <div id="fase12">
            <div id="small">
                <span className="red">*  </span><span className="blue">{t('OfrecermeNiñera.fases.12.mensaje')}</span><br />
            </div>
            
            <div className="red">
                <p>{t("OfrecermeNiñera.fases.12.parrafos.0")}</p>
                <p>{t("OfrecermeNiñera.fases.12.parrafos.1")}</p>

            </div>
        </div>
     );
}

const Fase13 = () => {
    
    const { t, i18n } = useTranslation();
    const {registerFormState, setRegisterFormState} = useContext(RegisterFormContext);
    var arr=[1,2,3];
    var val=[1,2,3];
    const [selectedServices, setSelectedServices] = useState("");


    return ( 
        <div id="fase13">
            <div id="small">
                <span className="red">*  </span><span className="blue">{t('OfrecermeNiñera.fases.13.mensaje')}</span><br />
            </div>

            <div id="two-columns">
                <div id="first-column">
                    <h2 className="blue">{t('OfrecermeNiñera.fases.13.plan-seleccionado')}</h2>
                    <div id="form-vertical">
                    
                        <div>
                            <input type="radio" id="c1"/>
                            <label for="c1">1 {t('OfrecermeNiñera.fases.13.mes')}</label>
                        </div>
                        <div>
                            <h3 className="red">10 USD</h3>
                        </div>
                        <div>
                            <input type="radio" id="c1"/>
                            <label for="c1">3 {t('OfrecermeNiñera.fases.13.meses')}</label>
                        </div>
                        
                        <div>
                            <h3 className="red">25 USD</h3>
                        </div>    

                        <div>
                            <input type="radio" id="c1"/>
                            <label for="c1">6 {t('OfrecermeNiñera.fases.13.meses')}</label>
                        </div>    

                        <div>
                            <h3 className="red">50 USD</h3>
                        </div>

                        <div>
                            <input type="radio" id="c1"/>
                            <label for="c1">9 {t('OfrecermeNiñera.fases.13.meses')}</label>
                        </div>    

                        <div>
                            <h3 className="red">70 USD</h3>
                        </div>

                        <div>
                            <input type="radio" id="c1"/>
                            <label for="c1">12 {t('OfrecermeNiñera.fases.13.meses')}</label>
                        </div>    

                        <div>
                            <h3 className="red">90 USD</h3>
                        </div>
                        
                    </div>
                </div>
                <div id="second-column">
                    <div className="blue-box">
                        <p>{t('OfrecermeNiñera.fases.13.forma-pago')}</p>
                    </div>
                    <p>{t('OfrecermeNiñera.fases.13.forma-pago-descripcion')}</p>

                    <div className="blue-box">
                        <p>{t('OfrecermeNiñera.fases.13.pais-titulo')}</p>
                    </div>
                    <p id="less-margin">{t('OfrecermeNiñera.fases.13.pais-titulo-descripcion')}</p>

                    
                        <div className="dropdown-content">
                            <FieldDropdownCheckbox 
                                title="prueba"
                                placeholder="placeholder 1"
                                items={arr}
                                values={val}
                                state={selectedServices}
                                setState={setSelectedServices}
                            />
                        </div>
                    

                    <div className="blue-box">
                        <p>{t('OfrecermeNiñera.fases.13.cuentas')}</p>
                    </div>
                        <div className="dropdown-content" id="bancos">
                            <FieldDropdownCheckbox 
                                title="prueba"
                                placeholder="placeholder 1"
                                items={arr}
                                values={val}
                                state={selectedServices}
                                setState={setSelectedServices}
                            />
                        </div>
                </div>
            </div>
        </div>
     );
}
 

const FasesOfrecermeNiñera = [Fase0, Fase1, Fase2, Fase3, Fase4, Fase5, Fase6,Fase7,Fase8,Fase9,Fase10,Fase11,Fase12,Fase13];

export {FasesOfrecermeNiñera,botonEnviar};