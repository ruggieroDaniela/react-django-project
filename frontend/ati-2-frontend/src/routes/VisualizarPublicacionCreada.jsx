import React from 'react';
//import { RegisterFormContext } from "../context/RegisterFormContext";

import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
//import { publicacionCreada } from "../components/FasesRegistrar";

import "../styles/VisualizarPublicacionCreada.scss"
import fotoPerfil from '../assets/default-user-icon.jpg';

export const VisualizarPublicacionCreada = () => {
    const { t } = useTranslation();

        return (
        <section id="publicacion-creada">            
            <section className='encabezado-perfil'>
               <section>
                    <section className='foto'>
                        <img
                            src={fotoPerfil}
                            style={{width:'30%', height:'30%'}}
                        />
                    </section>

               </section>
               <section style={{width:'100%'}}> 
                    <h1>Ana Peres</h1>
                    <section className='informacion-perfil'>
                        <span className='titulo'> {t('publicacionCreada.telefono_celular')}</span>
                        <span>  0412-123.32.23</span>
                    </section>
                    <section className='informacion-perfil'>
                        <span className='titulo'> {t('publicacionCreada.telefono_fijo')}</span>
                        <span> 0412-123.32.23 </span>
                    </section>
                    <section className='informacion-perfil'>
                        <span className='titulo'> {t('publicacionCreada.correo_electronico')}</span>
                        <span>mariaf0821@gmail.com</span>
                    </section>

               </section>
               <section> 

                    <section className='informacion-pais'>
                        <span className='span-01'> {t('publicacionCreada.pais')}</span>
                        <span>  0412-123.32.23</span>
                    </section>
                    <section className='informacion-pais'>
                    <span className='span-01'> {t('publicacionCreada.provincia')}</span>
                        <span>  0412-123.32.23</span>
                    </section>
               </section>
            </section>
            {
                <>
                    <section className='container-01'>
                        <section className='informacion-basica'>
                            <section className='titulo-02'>
                                <h1 > {t('publicacionCreada.datos_basicos_cuidador')}</h1>
                            </section>

                            <section>
                                <p>
                                    Soy persona de buena presencia, responsable, 
                                    
                                    honesta, buen carácter, y que le  gusta trabajar cuidando personas
                                </p>
                            </section>
                            <section className='container-span'>
                                <span className='span-01'> {t('publicacionCreada.edad_cuidador')}</span>
                                <span>  26 anos</span>
                            </section>
                            <section className='container-span'>
                                <span className='span-01'> {t('publicacionCreada.sexo_cuidador')}</span>
                                <span>  Femenino</span>
                            </section>
                            <section className='container-span'>
                                <span className='span-01'> {t('publicacionCreada.situcion_familiar_cuidador')} </span>
                                <span>  0412-123.32.23</span>
                            </section>
                            <section className='container-span'>
                                <span className='span-01'> {t('publicacionCreada.grado_instrucción_cuidador')} </span>
                                <span>  0412-123.32.23</span>
                            </section> 
                        </section>

                        <section className='informacion-basica'>
                            <section className='titulo-02'>
                                    <h1> {t('publicacionCreada.lugar_procedencia_cuidador')}</h1>
                            </section>
                            <p>
                                   <br></br>
                            </p>
                            <section className='container-span'>
                                <span className='titulo'>{t('publicacionCreada.pais_cuidador')}</span>
                                <span></span>
                            </section>
                            <section className='container-span'>
                                <span className='titulo'>{t('publicacionCreada.provincia_cuidador')} </span>
                                <span></span>
                            </section>
                            <section className='container-span'>
                                <span className='titulo'>{t('publicacionCreada.ciudad_cuidador')}  </span>
                                <span></span>
                            </section>
                            <section className='container-span'>
                                <span className='titulo'>{t('publicacionCreada.zona_cuidador')} </span>
                                <span></span>
                            </section>
                            
                        </section>
                    </section>

                    <section className='container-01'>
                        <section className='informacion-basica'>
                                <section className='titulo-02'>
                                    <h1>  {t('publicacionCreada.persona_cuidar')}</h1>
                                </section>
                                
                                <section>
                                    <section className='container-span'>
                                        <span className='titulo'>{t('publicacionCreada.cant_persona_cuidar')}</span>
                                        <span> 2 </span>
                                    </section>
                                    <section className='container-span'>
                                        <span className='titulo'>{t('publicacionCreada.edad_cuidar')}</span>
                                        <span> 2 </span>
                                    </section>
                                    <section className='container-span'>
                                        <span className='titulo'>{t('publicacionCreada.sexo_cuidar')}</span>
                                        <span> 2 </span>
                                    </section>
                                    <section className='container-span'>
                                        <span className='titulo'>{t('publicacionCreada.indique_capacidad')}</span>
                                        <span> 2 </span>
                                    </section>
                                    <section className='container-span'>
                                        <span className='titulo'>{t('publicacionCreada.enfermedad_cuidar')}</span>
                                        <span> 2 </span>
                                    </section>

                                </section>

                        </section>    

                        <section className='informacion-basica'>
                                <section className='titulo-02'>
                                    <h1 >{t('publicacionCreada.condiciones_trabajo')}</h1>
                                </section>                      
                                <section>
                                    <section className='container-span'>
                                        <span className='titulo'>{t('publicacionCreada.salida_cuidador')} </span>
                                        <span></span>
                                    </section>
                                    <section className='container-span'>
                                        <span className='titulo'>{t('publicacionCreada.horario_trabajo')} </span>
                                        <span></span>
                                    </section>
                                    <section className='container-span'>
                                        <span className='titulo'>{t('publicacionCreada.salario_ofrecido')} </span>
                                        <span></span>
                                    </section>
                                    <section className='container-span'>
                                        <span className='titulo'>{t('publicacionCreada.')} </span>
                                        <span></span>
                                    </section>
                                    <section className='container-span'>
                                        <span className='titulo'>{t('publicacionCreada.beneficios')} </span>
                                        <span></span>
                                    </section>
                                </section>
                                
                        </section>
                    </section>
                    <section className='container-01'>
                        <section className='informacion-basica'>
                            <section className='titulo-02'>
                                <h1 >{t('publicacionCreada.funciones_cumplir')}</h1>
                            </section>                        
                            <section>
                                <ul>
                                    <li>Limpiar</li>
                                    <li> Cocinar</li>
                                    <li> Manaejar</li>
                                </ul>
                            </section>
                    
                    
                        </section>
                        <section className='informacion-basica'>
                                <section className='titulo-02'>
                                    <h1>{t('publicacionCreada.documentos_solicitar')}</h1>  
                                </section>
                                <section>
                                <p>Si
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
                                <h1> {t('publicacionCreada.disponibilidad_viajar')}</h1>
                            </section>

                            <section>
                                <p>
                                    Si, La persona debe estar dispuesta a viajar 1 vez al mes al exterior
                                </p>
                            </section>
                        </section>
                        <section className='informacion-basica'>
                            <section className='titulo-02'>
                                    <h1 >{t('publicacionCreada.disponibilidad_trabajar')} </h1>
                            </section>
                            
                        
                            <section>
                                <section className='container-span'>
                                    <span className='titulo'>{t('publicacionCreada.fecha_inicio')} </span>
                                    <span></span>
                                </section>      
                            </section>
                    
                        </section>
                    </section>

                    <section className='container-01'>
                        <section className='informacion-basica'>
                            <section className='titulo-02'>
                                <h1 >{t('publicacionCreada.sugenrencia_trabajo')}</h1>
                            </section>                        
                            
                        </section>
                        <section className='informacion-basica'>
                            <section className='titulo-02'>
                                <h1>{t('publicacionCreada.sugencia_entrevista')}</h1>                            
                            </section>
                            <section>
                                <p>
                                    Si, La persona debe estar dispuesta a viajar 1 vez al mes al exterior
                                </p>
                            </section>
                        </section>
                    </section>

                    <section className='container-01'>
                        <section className='informacion-basica'>
                            <section className='titulo-02'>
                                <h1 >{t('publicacionCreada.consideraciones_del_servicio')}</h1>
                            </section>                        
                            <section>
                                <section className='container-span'>
                                        <span className='titulo'>{t('publicacionCreada.iniciar_labores')} </span>
                                        <span></span>
                                </section>      
                                <section className='container-span'>
                                        <span className='titulo'>{t('publicacionCreada.finalizar_labores')} </span>
                                        <span></span>
                                </section>      
                            </section>
                    
                        </section>
                        <section className='informacion-basica'>
                            <section className='titulo-02'>
                                <h1 >{t('publicacionCreada.consideraciones_del_servicio')}</h1>
                            </section>      
                            <section>
                                <section className='container-span'>
                                        <span className='titulo'>{t('publicacionCreada.dia_dia')} </span>
                                        <span></span>
                                </section>      
                                <section className='container-span'>
                                        <span className='titulo'>{t('publicacionCreada.sugerencia_adicionales')} </span>
                                        <span></span>
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
                                        <span></span>
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
                                    <span></span>
                                </section>      
                                <section className='container-span'>
                                    <span className='titulo'>{t('publicacionCreada.datos_cuenta')} </span>
                                    <span></span>
                                </section>      
                  
                            </section>
                        </section>
                    </section>
                </>
            } 

        </section>

    )
};

