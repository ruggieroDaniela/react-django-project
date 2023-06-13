import React, { useState } from 'react';
//import { RegisterFormContext } from "../context/RegisterFormContext";

import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
//import { publicacionCreada } from "../components/FasesRegistrar";

import "../styles/VisualizarPublicacionCreada.scss"
import fotoPerfil from '../assets/default-user-icon.jpg';

export const VisualizarPublicacionCreada = () => {
    const { t } = useTranslation();

    const [data, setData] = useState({});
    const {id} = useParams();
    //let searchParams = location?.search;
    //const postType = searchParams.includes('provide')? 'provide':'request';


    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         try {
    //           
    //             const response = await axios.get(`http://127.0.0.1:8000/api-services/${postType}/get_post/is`, {
    //                 headers: {}
    //             });
    
    //             setData(response.data)
    //             console.log(response.data);
    //             console.log(postType);
    //             return response.data;
                
    //         } catch (error) {
                
    //         }
    // }


    // fetchPosts();


    //     //fetchPosts();
    // }, []);

        return (
            <section id="publicacion-creada">    
                 {/* Encabezado perfil */}
                <div className='header'>
                    <section className='encabezado-perfil'>                       
                        <div className='subtitle blue margin'>
                            <b>Niñero(a)</b>
                        </div>
                        <div className='user-name'>
                            <b>Nombre Apellido </b>
                        </div>
                        <div>
                            
                        </div>
                        <div className='subtitle blue space'>
                            <b>{t('publicacionCreada.pais_cuidador')}</b>
                        </div>
                
                    </section>

                    <section className='encabezado-perfil'>
                        <div>
                            <img className='img-user' src={fotoPerfil} />
                        </div>
                        <div>
                            <div className='rectangle yellow'>{t('publicacionCreada.telefono_celular')}</div>
                            <div className='rectangle yellow'> {t('publicacionCreada.telefono_fijo')}</div>
                            <div className='rectangle yellow'> {t('publicacionCreada.correo_electronico')} </div>
                        </div>
                        <div>
                            <div className='data'> { data?.phone || 'No disponible'} </div>
                            <div className='data'> {data?.phone || 'No disponible'} </div>
                            <div className='data'> {data?.email ||'No disponible'}</div>
                        </div>
                        <div>
                            <div className='pais red'>Venezuela</div>                        
                            <div className='pais blue'> {t('publicacionCreada.provincia__cuidador')} </div>
                            <div className='pais red'>Distrito Capital</div>
                        </div>

                    </section>
                </div> 

                
                {/* DATOS BASICOS DE LA NIÑERA*/ }
                <div className='basico'>
                    <div className='rectangle blue tag'>{t('publicacionCreada.datos_basicos_cuidador')}</div>                    
                </div>

                <div className='basico'>
                    <div className='rectangle text'> <b>{data?.description || "Soy persona responsable, honesta, de buen carácter, y me gustan los niños(as)" } </b></div>                   
                </div>

                { /* Edad que solicita */ }
                <div className='basico'>
                    <div className='basico info'>
                        <div className='subtitle blue'><b>{t('publicacionCreada.edad_cuidador')}</b></div>
                        <div> { data?.data || "Entre 20 y 30 años / Con hijos"}</div>
                    </div>
                </div>
                
                { /* Sexo */ }
                <div className='basico'>
                    <div className='basico info'>
                        <div className='subtitle blue'><b>{t('publicacionCreada.sexo_cuidador')}</b></div>
                        <div> { data?.data || "Masculino" }</div>
                    </div>
                </div>

                { /* Situación Familiar */ }
                <div className='basico'>
                    <div className='basico info'>
                        <div className='subtitle blue'><b>{t('publicacionCreada.situcion_familiar_cuidador')}</b></div>
                        <div>{data?.have_children ? "Con hijos" : "Sin hijos" || 'con hijos'}</div>
                    </div>
                    <div className='subtitle red'><b>PENDIENTE POR ACTIVAR</b></div>
                </div>

                { /* Grado de Instrucción */ }
                <div className='basico'>
                    <div className='basico info'>
                        <div className='subtitle blue'><b> {t('publicacionCreada.grado_instrucción_cuidador')}</b></div>
                        <div>{data?.education_level || "Técnico Univeristario"}</div>
                    </div>
                </div>

                <br></br>

                {/* LUGAR DE PROCEDENCIA */ }
                <div className='basico'>
                    <div className='rectangle blue tag'>{t('publicacionCreada.lugar_procedencia_cuidador')}</div>                    
                </div>
                <br></br>

                { /* País de procedencia */ }
                <div className='basico'>
                    <div className='basico info'>
                        <div className='subtitle black'><b>{t('publicacionCreada.pais_cuidador')}</b></div>
                        <div> { data?.country || "Venezuela"}  </div>
                    </div>
                </div>
                
                { /* Estado / Provincia  */ }
                <div className='basico'>
                    <div className='basico info'>
                        <div className='subtitle black'><b>{t('publicacionCreada.provincia__cuidador')}</b></div>
                        <div>{data?.state || "Distrito Capital"}</div>
                    </div>
                </div>

                { /* Ciudad */ }
                <div className='basico'>
                    <div className='basico info'>
                        <div className='subtitle black'><b>{t('publicacionCreada.ciudad_cuidador')}</b></div>
                        <div>{data?.city || "Caracas"} </div>
                    </div>
                </div>

                { /* Zona */ }
                <div className='basico'>
                    <div className='basico info'>
                        <div className='subtitle black'><b>{t('publicacionCreada.zona_cuidador')}</b></div>
                        <div>{data?.zone || "Candelaria"}</div>
                    </div>
                </div>

                <br></br>

                {/* DESCRIPCIÓN GENERAL DE MI PERFIL LABORAL */ }
                <div className='basico'>
                    <div className='rectangle blue tag'>DESCRIPCIÓN GENERAL DE MI PERFIL LABORAL</div>                    
                </div>
                <br></br>

                <div className='basico'>
                    <div className='rectangle text'> {data?.description || "Persona con 5 años de experiencia en el cuidado de niños entre 0 y 11 años, en la ayuda de sus tareas, prepararles la comida, jugar con ellos. Tengo referencias laborales comprobables" }</div>                   
                </div>

                {/* FUNCIONES QUE HE DESEMPEÑADO */ }
                <div className='basico'>
                    <div className='rectangle blue tag'>{t('publicacionCreada.funciones_cumplir')}</div>                    
                </div>
                <br></br>

                <div className='basico'>
                    <div className='rectangle text'> Preparación de alimentos, Control de medicamentos, Baño e  higiene, Cambio de pañal, Jugar con los niños, Limpieza del hogar, Otros</div>                   
                </div>

                { /* DISPONIBILIDAD PARA VIAJAR */ }
                <div className='basico'>
                    <div className='rectangle blue tag'>{t('publicacionCreada.disponibilidad_viajar')}</div>                    
                </div>
                <br></br>

                <div className='basico'>
                    <div className='rectangle text'> Si </div>                   
                </div>

                <div className='basico'>
                    {true && <div className='rectangle text'> Si, La persona debe estar dispuesta a viajar 1 vez al mes al exterior</div>}                  
                </div>
               
                { /* CONDICIONES DE TRABAJO */ }
                <div className='basico'>
                    <div className='rectangle blue tag'>{t('publicacionCreada.condiciones_trabajo')}</div>                    
                </div>
                <br></br>

                { /* Salidas que prefiero  */ }
                <div className='basico'>
                    <div className='basico info'>
                        <div className='rectangle yellow tag'>{t('publicacionCreada.salida_cuidador')}</div>
                        <div className='data'>  {data?.workday || "Fin de semana"}  </div>
                    </div>
                </div>

                { /* Horario  */ }
                <div className='basico'>
                    <div className='basico info'>
                        <div className='rectangle yellow tag'>{t('publicacionCreada.horario_trabajo')}</div>
                        <div className='data'> { data?.schedule || "Lunes a Viernes"}  </div>
                    </div>
                </div>

                { /* Salario deseado  */ }
                <div className='basico'>
                    <div className='basico info'>
                        <div className='rectangle yellow tag'>{t('publicacionCreada.salario_ofrecido')} </div>
                        <div className='data'> { (data?.payment_amount + " " + data?.currency + " " ) || "300$" }  </div>
                    </div>
                </div>

                { /* SOLICITO OTRO BENEFICIO  */ }
                <div className='basico'>
                    <div className='rectangle blue tag'>{t('publicacionCreada.beneficios')}</div>                    
                </div>
               

                { /* Solicito otros beneficios  */ }
                <div className='basico'>
                    <div className='rectangle text'> Si </div>                   
                </div>
                <div className='basico'>
                    {true && <div className='rectangle text'> {data?.benefits_description ||
                                                               "Especifique: Seguro social obligatorio,Póliza de HCM y cobertura a mis familiares, Ayuda para útiles escolares, Otros"} </div>}                  
                </div>
                
                
                { /* DISPONIBILIDAD PARA COMENZAR A TRABAJAR  */ }
                <div className='basico'>
                    <div className='rectangle blue tag'>{t('publicacionCreada.disponibilidad_trabajar')} </div>                    
                </div>

                <div className='basico'>
                    <div className='basico info'>
                        <div className='rectangle yellow tag'>{t('publicacionCreada.salario_ofrecido')} </div>
                        <div className='data'>  2023-10-02  </div>
                    </div>
                </div>

                { /* CLIENTES CON LOS QUE QUIERO TRABAJAR  */ }
                <div className='basico'>
                    <div className='rectangle blue tag'>CLIENTES CON LOS QUE QUIERO TRABAJAR </div>                    
                </div>
                
                { /* Lugar de Procedencia  */ }
                <div className='basico'>
                    <div className='basico info'>
                        <div className='rectangle yellow tag'>Lugar de Procedencia </div>
                        <div className='data'>  Quiero especificar   </div>
                    </div>
                </div>
                
                { /* Pais de Procedencia  */ }
                <div className='basico'>
                    <div className='basico info'>
                        <div className='rectangle yellow tag'>Pais de Procedencia </div>
                        <div className='data'>  Estados Unidos  </div>
                    </div>
                </div>

                { /* Estado / Provincia  */ }
                <div className='basico'>
                    <div className='basico info'>
                        <div className='rectangle yellow tag'> Estado / Provincia </div>
                        <div className='data'>  California  </div>
                    </div>
                </div>
                
                { /* Ciudad  */ }
                <div className='basico'>
                    <div className='basico info'>
                        <div className='rectangle yellow tag'> Ciudad </div>
                        <div className='data'>  San Jose  </div>
                    </div>
                </div>

                
                {/*        


                </section>
                {
                    <>
        

                        <section className='container-01'>
                            <section className='informacion-basica'>
                                    <section className='titulo-02'>
                                        <h1>  {t('publicacionCreada.persona_cuidar')}</h1>
                                    </section>
                                    
                                    <section>
                                        <section className='container-span'>
                                            <span className='titulo'>{t('publicacionCreada.cant_persona_cuidar')}</span>
                                            <span> {data?.data ||  "2"} </span>
                                        </section>
                                        <section className='container-span'>
                                            <span className='titulo'>{t('publicacionCreada.edad_cuidar')}</span>
                                            <span> {data?.data ||  "8 - 15"} </span>
                                        </section>
                                        <section className='container-span'>
                                            <span className='titulo'>{t('publicacionCreada.sexo_cuidar')}</span>
                                            <span> {data?.data ||  "Femenino/ Femenino"} </span>
                                        </section>
                                        <section className='container-span'>
                                            <span className='titulo'>{t('publicacionCreada.indique_capacidad')}</span>
                                            <span> {data?.data ||  "Caminar"}</span>
                                        </secti-on>
                                        <section className='container-span'>
                                            <span className='titulo'>{t('publicacionCreada.enfermedad_cuidar')}</span>
                                            <span> {data?.data ||  "no"} </span>
                                        </section>

                                    </section>

                            </section>    

                            
                        </section>
                        
                        
                            </section>
                            <section className='informacion-basica'>
                                    <section className='titulo-02'>
                                        <h1>{t('publicacionCreada.documentos_solicitar')}</h1>  
                                    </section>
                                    <section>
                                    <p>
                                        Si
                                        Referencias familiares indicando nombre y apellido, teléfono local, Teléfono móvil, correo
                                        electrónico (opcional), y dirección
                                    </p>
                                    </section>

                            </section>
                        </section>
                    
                    </>
                }

                {
                    <>
                        

                        <section className='container-01'>
                            <section className='informacion-basica'>
                                <section className='titulo-02'>
                                    <h1 >{t('publicacionCreada.sugenrencia_trabajo')}</h1>
                                </section>                        
                                <section>
                                    <section className='container-span02'>
                                            <span className='titulo'>{t('publicacionCreada.iniciar_labores')} </span>
                                            <p>
                                            Indicarle a la persona contratada que debe mantener una buena higiene personal, y abstenerse de fumar, i
                                            ngerir bebidas alcohólicas o tener conductas que atenten contra la moral y las 
                                            buenas costumbres, principalmente delante de los niños. Indíquele al personal recomendaciones o procedimientos de seguridad para abrir la
                                            puerta, contestar el teléfono, personas a recibir en el inmueble, y cualquier otro asunto
                                            relacionado con las personas a su cuidado, o con el inmueble donde se realizarán las
                                            labores
                                            Proporcione información de contacto a su niñera(o) en caso de emergencia, como:
                                            Médico tratante, teléfono de empresas donde la(s) persona(s) bajo su cuidado están
                                            aseguradas, listado de clínicas cercanas a las que se pueda llevar a la persona en caso
                                            de emergencia, datos de contacto directo con usted en caso de cualquier emergencia, o
                                            consulta que pueda tener la persona contratada
                                            Si puede, registre las huellas dactilares del personal a su servicio para que tenga una
                                            base para deslindar responsabilidades en caso de robo o cualquier incidente que podría
                                            haber originado dicha persona en el inmueble, o hacia las personas bajo su cuidado

                                            </p>
                                    </section>      
                                    <section className='container-span02'>
                                            <span className='titulo'>{t('publicacionCreada.finalizar_labores')} </span>
                                            <span>
                                            Conversar con las personas que el cuidador(a) tendrá bajo su cargo, para verificar que la
                                            persona contratada le proporciona un buen trato a la persona
                                            Monitorear el desempeño de la persona contratada en sus labores
                                            Se le recomienda instalar cámaras de seguridad para supervisar las labores del personal,
                                            y verificar el trato que se le proporciona a las personas a cuidar
                                            </span>
                                    </section>      
                                </section>
                        
                            </section>
                            <section className='informacion-basica'>
                                <section className='titulo-02'>
                                    <h1 >{t('publicacionCreada.sugenrencia_trabajo')}</h1>
                                </section>      
                                <section>
                                    <section className='container-span02'>
                                            <span className='titulo'>{t('publicacionCreada.dia_dia')} </span>
                                            <span>
                                                Solicitarles que muestren el bolso antes de salir
                                            </span>
                                    </section>      
                                    <section className='container-span02'>
                                            <span className='titulo'>{t('publicacionCreada.sugerencia_adicionales')} </span>
                                            <span>
                                                    Los datos proporcionados son bajo la responsabilidad del anunciante, y la empresa queda
                                                exonerada de verificar su veracidad. Las sugerencias proporcionadas son para orientar al cliente o al personal, y al aceptar la
                                                publicación de dicho anuncio la empresa queda exonerada de cualquier incidente que
                                                pudiera ocurrir entre el cliente y el personal contratado
                                                Guardar joyas u objetos de valor que considere en lugares seguros
                                            </span>
                                    </section>      
                                </section>

                            </section>
                        </section>
                        



                        <section className='container-01'>
                            <section className='informacion-basica'>
                                <section className='titulo-02'>
                                    <h1 >{t('publicacionCreada.sugenrencia_entrevista')}</h1>
                                </section>                        
                                <section>
                                    <p>
                                        Obtenga toda la información posible de sus empleados.
                                        Averigüe dónde viven, datos de los familiares para avisar en caso de alguna emergencia
                                        (eso también le servirá a usted en caso de robo o si alguna de las personas bajo la
                                        responsabilidad del cuidador sufre algún daño que sea imputable a la persona).    
                                    </p> 
                                </section>
                        
                            </section>
                            <section className='informacion-basica'>
                                <section className='titulo-02'>
                                    <h1 >{t('publicacionCreada.sugerencia_servicio')}</h1>
                                </section>      
                                <section>
                                    <section>
                                        <p>
                                            Obtenga toda la información posible de sus empleados.
                                            Averigüe dónde viven, datos de los familiares para avisar en caso de alguna emergencia
                                            (eso también le servirá a usted en caso de robo o si alguna de las personas bajo la
                                            responsabilidad del cuidador sufre algún daño que sea imputable a la persona).    
                                        </p> 
                                    </section>
                                </section>

                            </section>
                        </section>
                        
                        
                        <section className='container-01'>
                            <section className='informacion-basica'>
                                <section className='titulo-02'>
                                    <h1 >{t('publicacionCreada.datos_facturacion')}</h1>
                                </section>          
                                <section>
                                    <section className='container-span'>
                                            <span className='titulo'>{t('publicacionCreada.plan_seleccionado')} </span>
                                            <span> 3 meses 25 USD</span>
                                    </section>      
                    
                                </section>


                            </section>
                            <section className='informacion-basica'>
                                <section className='titulo-02'>
                                    <h1 >{t('publicacionCreada.datos_facturacion')}</h1>
                                </section>       
                                <section>
                                    <section className='container-span'>
                                        <span className='titulo'>{t('publicacionCreada.pais_a_depositar')} </span>
                                        <span> {data?.billing_country || "Venezuela"} </span>
                                    </section>      
                                    <section>

                                        <section className='container-span'>
                                            <span className='titulo'>{t('publicacionCreada.salida_cuidador')} </span>
                                            <section>
                                                <span> {data?.data || "Depósito, Transferencia Bancaria"}</span>
                                                
                                            </section>
                                        </section>
                
                                        <section className='container-span'>
                                            <span className='titulo'>{t('publicacionCreada.pais_banco')} </span>
                                            <span> {"Venezuela"} </span>
                                        </section>
                                        <section className='container-span'>
                                            <span className='titulo'>{t('publicacionCreada.banco')} </span>
                                            <span>{"Banesco"}</span>
                                        </section>
                                        <section className='container-span'>
                                            <span className='titulo'>{t('publicacionCreada.n_cuenta')} </span>
                                            <span> {data?.billing_bank || "0000-0000-0000-0000"}
                                            </span>
                                        </section>
                                    </section>  
                    
                                </section>
                            </section>
                        </section>
                    </>
                } 
            */}
            </section>

        )
};

