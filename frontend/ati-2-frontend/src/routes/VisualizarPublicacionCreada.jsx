import { useEffect, useState } from 'react';
import axios from 'axios';
//import { RegisterFormContext } from "../context/RegisterFormContext";

import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
//import { publicacionCreada } from "../components/FasesRegistrar";

import "../styles/VisualizarPublicacionCreada.scss"
import fotoPerfil from '../assets/default-user-icon.jpg';

export const VisualizarPublicacionCreada = () => {
    const { t } = useTranslation();

    const [data, setData] = useState({schedule: []});
    const {id} = useParams();
    let searchParams = location?.search;
    const postType = searchParams.includes('provide')? 'provide':'request';
    const [servicio, setServicio] = useState('');
    const [documents, setDocuments] = useState(''); 

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api-services/provide/get_post/ea695afc-5d49-4b97-a1bf-fb721271ee81/`);
                
                // console.log(response.data);
                setData(() => response.data);               

                // SERVICE
                if(data.service=='NIN'){
                    setServicio('Niñero(a)')
                }

                if(data.service=='CUI'){
                    setServicio('Cuidador(a) Ocupacional')
                }

            } catch (error) {
                console.log('An error occurred:', error);
            }
        };
    
        fetchPost();
        }, []);

        console.log(data);
        return (
            <section id="publicacion-creada">    
                 {/* Encabezado perfil */}
                <div className='header'>
                    <section className='encabezado-perfil'>                       
                        <div className='subtitle blue margin'>
                            <b>{servicio}</b>                            
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
                    <div className='rectangle text'> <b>{data.description} </b></div>                   
                </div>

                { /* Edad que solicita */ }
                <div className='basico'>
                    <div className='basico info'>
                        <div className='subtitle blue'><b>{t('publicacionCreada.edad_cuidador')}</b></div>
                        <div> {data.age}  {t('publicacionCreada.annios')} </div>
                    </div>
                </div>

                { /* Situación Familiar */ }
                <div className='basico'>
                    <div className='basico info'>
                        <div className='subtitle blue'><b>{t('publicacionCreada.situcion_familiar_cuidador')}</b></div>
                        {data.have_children == true && <span>{t('publicacionCreada.hijos')}</span>}
                        {data.have_children === false && <span>{t('publicacionCreada.no_hijos')}</span>}
                    </div>
                    <div className='subtitle red'>
                        <b>{t('publicacionCreada.PEN')}</b>
                    </div>
                </div>

                { /* Grado de Instrucción */ }
                <div className='basico'>
                    <div className='basico info'>
                        <div className='subtitle blue'><b> {t('publicacionCreada.grado_instrucción_cuidador')}</b></div>
                        <div> {t(`publicaciones_vista_lista.${data.education_level}`)} </div>                        
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
                        <div> { data.country }  </div>
                    </div>
                </div>
                
                { /* Estado / Provincia  */ }
                <div className='basico'>
                    <div className='basico info'>
                        <div className='subtitle black'><b>{t('publicacionCreada.provincia__cuidador')}</b></div>
                        <div>{data.state}</div>
                    </div>
                </div>

                { /* Ciudad */ }
                <div className='basico'>
                    <div className='basico info'>
                        <div className='subtitle black'><b>{t('publicacionCreada.ciudad_cuidador')}</b></div>
                        <div>{data.city} </div>
                    </div>
                </div>

                { /* Zona */ }
                <div className='basico'>
                    <div className='basico info'>
                        <div className='subtitle black'><b>{t('publicacionCreada.zona_cuidador')}</b></div>
                        <div>{data.zone}</div>
                    </div>
                </div>

                <br></br>

                {/* DESCRIPCIÓN GENERAL DE MI PERFIL LABORAL */ }
                <div className='basico'>
                    <div className='rectangle blue tag'>{t('publicacionCreada.perfilLaboral')}</div>                    
                </div>
                <br></br>

                <div className='basico'>
                    <div className='rectangle text'> { data.description }</div>                   
                </div>

                {/* FUNCIONES QUE HE DESEMPEÑADO */ }
                <div className='basico'>
                    <div className='rectangle blue tag'>{t('publicacionCreada.funciones_cumplir')}</div>                    
                </div>
                <br></br>

                <div className='basico'>
                    <div className='rectangle text'> {data.activities}</div>                   
                </div>

                { /* DISPONIBILIDAD PARA VIAJAR */ }
                <div className='basico'>
                    <div className='rectangle blue tag'>{t('publicacionCreada.disponibilidad_viajar')}</div>                    
                </div>
                <br></br>

                <div className='basico'>
                    {data.travel == true && <div className='rectangle text'>{t('publicacionCreada.si')} </div>}            
                    {data.travel == false && <div className='rectangle text'>{t('publicacionCreada.no')}  </div>}         
                </div>

                <div className='basico'>
                    {data.travel && <div className='rectangle text'>{data.travel_decription}</div>}                 
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
                        <div className='data'>  {t(`publicaciones_vista_lista.${data.workday}`)} </div>
                       
                    </div>
                </div>

                { /* Horario  */ }
                <div className='basico'>
                    <div className='basico info'>
                        <div className='rectangle yellow tag'>{t('publicacionCreada.horario_trabajo')}</div>
                        <div className='data'>
                        {data?.schedule.map(
                            (scheduleItem, index) => 
                                <div key={index}>
                                    {t(`publicaciones_vista_lista.${scheduleItem}`)}
                                </div>
                        )}
                        </div>
                    </div>
                </div>

                { /* Salario deseado  */ }
                <div className='basico'>
                    <div className='basico info'>
                        <div className='rectangle yellow tag'>{t('publicacionCreada.salario_ofrecido')} </div>
                        <div className='data'>
                            {data?.payment === 'MONTO' ? (data?.payment_amount + " " + data?.currency) : data?.payment}
                        </div>
                    </div>
                </div>

                { /* SOLICITO OTRO BENEFICIO  */ }
                <div className='basico'>
                    <div className='rectangle blue tag'>{t('publicacionCreada.beneficios')}</div>                    
                </div>
               

                { /* Solicito otros beneficios  */ }
                <div className='basico'>
                    {data.benefits === 1 ? (
                    <div className='rectangle text'>{t('publicacionCreada.si')}</div>
                    ) : (
                    <div className='rectangle text'>{t('publicacionCreada.no')}o</div>
                    )}
                </div>

                <div className='basico'>
                    {data.benefits === 1 && <div className='rectangle text'> {data.benefits_description} </div>}                  
                </div>
                
                
                { /* DISPONIBILIDAD PARA COMENZAR A TRABAJAR  */ }
                <div className='basico'>
                    <div className='rectangle blue tag'>{t('publicacionCreada.disponibilidad_trabajar')} </div>                    
                </div>

                <div className='basico'>
                    <div className='basico info'>
                        <div className='rectangle yellow tag'>{t('publicacionCreada.fecha_inicio')} </div>
                        <div className='data'>
                            {data?.availability === 'FECHA' ? (data.availability_date) : data.availability}
                        </div>
                    </div>
                </div>

                { /* CLIENTES CON LOS QUE QUIERO TRABAJAR  */ }
                <div className='basico'>
                    <div className='rectangle blue tag'>{t('publicacionCreada.clientes')} </div>                    
                </div>
                
                { /* Lugar de Procedencia  */ }
                <div className='basico'>
                    <div className='basico info'>
                        <div className='rectangle yellow tag'> {t('publicacionCreada.cliente_procedencia')}</div>
                        <div className='data'> {data.origin}  </div>
                    </div>
                </div>
                
                { /* Pais de Procedencia  */ }
                {data.origin === "SI" && (
                    <div className='basico'>
                        <div className='basico info'>
                            <div className='rectangle yellow tag'>{t('publicacionCreada.cliente_pais')}</div>
                            <div className='data'>{data.origin_country}</div>
                        </div>
                    </div>
                )}

                { /* Estado / Provincia  */ }
                {data.origin === "SI" && (
                    <div className='basico'>
                        <div className='basico info'>
                            <div className='rectangle yellow tag'> {t('publicacionCreada.cliente_estado')} </div>
                            <div className='data'> {data.origin_state} </div>
                        </div>
                    </div>
                )}
                
                { /* Ciudad  */ }
                {data.origin === "SI" && (
                    <div className='basico'>
                        <div className='basico info'>
                            <div className='rectangle yellow tag'>  {t('publicacionCreada.cliente_estado')} </div>
                            <div className='data'>  {data.origin_city}  </div>
                        </div>
                    </div>
                )}
                
                
                { /* DOCUMENTOS QUE PUEDO PRESENTAR A LOS CLIENTES  */ }
                <div className='basico'>
                    <div className='rectangle blue tag'>{t('publicacionCreada.documentos_solicitar')}</div>                    
                </div>

                <div className='basico'>
                    <div className='rectangle text'>
                        {data.have_documentation ? t('publicacionCreada.si') : t('publicacionCreada.no')}
                    </div>
                </div>
                <div className='basico'>
                    {data.have_documentation && (
                        <div>
                        {data.documents.map((document, index) => (
                            <div key={index} className='rectangle text'>
                            {t(`publicaciones_vista_lista.${document}`)}
                            </div>
                        ))}
                        </div>
                    )}
                </div>
                
                
                {/* SUGERENCIAS ANTES DE REALZIAR UNA ENTREVISTA DE TRABAJO */ }
                <div className='basico'>
                    <div className='rectangle blue tag'>{t('publicacionCreada.sugerencias_tags.antes')}</div>                    
                </div>
                <br></br>
                <ul>
                    <li className='basico'>
                        <li className='rectangle text'> {t('publicacionCreada.sugerencias.antes.1')}</li>                   
                    </li>

                    <li className='basico'>
                        <li className='rectangle text'> {t('publicacionCreada.sugerencias.antes.2')}</li>                   
                    </li>

                    <li className='basico'>
                        <li className='rectangle text'> {t('publicacionCreada.sugerencias.antes.3')}</li>                   
                    </li>
                </ul>
                
                
                {/* SUGERENCIAS AL MOMENTO DE REALIZAR LA ENTREVISTA  */ }
                <div className='basico'>
                    <div className='rectangle blue tag'>{t('publicacionCreada.sugerencias_tags.momento')}</div>                    
                </div>
                <br></br>
                
                <ul>
                    <li className='basico'>
                        <li className='rectangle text'>{t('publicacionCreada.sugerencias.momento.0')} </li>                   
                    </li>
                    
                    <li className='basico'>
                        <li className='rectangle text'>{t('publicacionCreada.sugerencias.momento.1')} </li>                   
                    </li>
                </ul>


                {/* SUGERENCIAS DE TRABAJO PARA EL DÍA A DÍA CON EL CLIENTE  */ }
                <div className='basico'>
                    <div className='rectangle blue tag'>{t('publicacionCreada.sugerencias_tags.dia')}</div>                    
                </div>
                <br></br>

                { /* Antes de iniciar sus labores  */ }
                <div className='basico'>
                    <div className='rectangle yellow tag right'>{t('publicacionCreada.sugerencias_tags.dia_antes')}  </div>
                </div>

                <div className='basico'>
                    <div className='rectangle text'>{t('publicacionCreada.sugerencias.dia_antes.0')}</div>                   
                </div>

                <div className='basico'>
                    <div className='rectangle text'>{t('publicacionCreada.sugerencias.dia_antes.1')}</div>                   
                </div>

                <div className='basico'>
                    <div className='rectangle text'>{t('publicacionCreada.sugerencias.dia_antes.2')}</div>                   
                </div>

                <div className='basico'>
                    <div className='rectangle text'>{t('publicacionCreada.sugerencias.dia_antes.3')}</div>                   
                </div>

                <div className='basico'>
                    <div className='rectangle text'>{t('publicacionCreada.sugerencias.dia_antes.4')}</div>                   
                </div>

                { /* En el día a día   */ }
                <div className='basico'>
                    <div className='rectangle yellow tag right'> {t('publicacionCreada.sugerencias_tags.dia_a_dia')}  </div>
                </div>

                <div className='basico'>
                    <div className='rectangle text'>{t('publicacionCreada.sugerencias.dia_a_dia.0')}</div>                   
                </div>

                <div className='basico'>
                    <div className='rectangle text'>{t('publicacionCreada.sugerencias.dia_a_dia.1')}</div>                   
                </div>

                { /* Si consideras que estas recibiendo un trato inadecuado por parte de tu empleador  */ }
                <div className='basico'>
                    <div className='rectangle yellow tag right'>{t('publicacionCreada.sugerencias_tags.abuso')}</div>
                </div>

                <div className='basico'>
                    <div className='rectangle text'>{t('publicacionCreada.sugerencias.abuso')}</div>                   
                </div>
                
                { /* Cuando recibas tu pago  */ }
                <div className='basico'>
                    <div className='rectangle yellow tag right'>{t('publicacionCreada.sugerencias_tags.pago')}</div>
                </div>

                <div className='basico'>
                    <div className='rectangle text'>{t('publicacionCreada.sugerencias.pago')}</div>                   
                </div>

                { /* Cuando el personal finalice sus labores */ }
                <div className='basico'>
                    <div className='rectangle yellow tag right'>{t('publicacionCreada.sugerencias_tags.finalizar')}</div>
                </div>

                <div className='basico'>
                    <div className='rectangle text'>{t('publicacionCreada.sugerencias.finalizar')}</div>                   
                </div>
                
                
                { /* Si usted decide no seguir trabajando con el cliente */ }
                <div className='basico'>                   
                    <div className='rectangle yellow tag right'>{t('publicacionCreada.sugerencias_tags.no_seguir')} </div>                    
                </div>

                <div className='basico'>
                    <div className='rectangle text'>{t('publicacionCreada.sugerencias.no_seguir')}</div>                   
                </div>

                { /* Sugerencias adicionales */ }
                <div className='basico'>
                    <div className='rectangle yellow tag right'>{t('publicacionCreada.sugerencias_tags.adicional')}</div>
                </div>

                <div className='basico'>
                    <div className='rectangle text'>{t('publicacionCreada.sugerencias.adicional')}</div>                   
                </div>
                
                
                { /* DATOS DE FACTURACIÓN */ }
                {/*
                <div className='basico'>
                    <div className='banco'>
                        <div className='rectangle blue tag smaller'> DATOS DE FACTURACIÓN </div>
                        <div className='rectangle blue tag smaller'> DATOS DE FACTURACIÓN </div>
                    </div>                    
                </div>

                <div className='basico'>
                    <div className='banco'>
                        <div className='subtitle blue margin'> <b> Plan Seleccionado</b> </div>                        
                    </div>                    
                </div>
                <div className='basico'>
                    <div className='banco'>
                        <div className='subtitle black margin'> <b> 3 meses </b> 50 USD </div>                        
                    </div>                    
                </div>
                */}

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

