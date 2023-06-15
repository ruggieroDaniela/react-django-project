import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
//import { RegisterFormContext } from "../context/RegisterFormContext";

import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { getCountryName, getStateName } from "../components/dataFetchers/PaisDataFetcher";
//import { publicacionCreada } from "../components/FasesRegistrar";

import "../styles/VisualizarPublicacionCreada.scss"
import fotoPerfil from '../assets/default-user-icon.jpg';
import AuthContext from '../context/AuthContext';

export const VisualizarPublicacionCreada = () => {
    
    const [loadingData, setLoadingData] = useState(false);
    const [loadingUser, setLoadingUser] = useState(false);
    const [loadingBanks, setLoadingBanks] = useState(false);
    const { t } = useTranslation();
    const [userData, setUserData] = useState("");
    const {authState, setAuthState} = useContext(AuthContext);
    const [banks, setBanks] = useState("");
    // post data
    const [data, setData] = useState({schedule: []});
    
    // parametros especificados despues del ? en el link
    let searchParams = new URLSearchParams(location.search);

    // obtener tipo de post del link
    let postType = searchParams.get("postType");
    if (postType == null)   // si no está definido se asume provide
        postType = "provide";
    
    // obtener id del link
    const id = searchParams.get("id");
    
    const [servicio, setServicio] = useState('');
    const [documents, setDocuments] = useState(''); 
    const [paymentBank, setPaymentBank] = useState('');

    let publication_choices = [
        { plan: "1", value: "10 USD" },
        { plan: "3", value: "25 USD" },
        { plan: "6", value: "50 USD" },
        { plan: "9", value: "70 USD" },
        { plan: "12", value: "90 USD" }
      ];
    
      function searchBankID(){
        for( let i=0 ; i< banks.length ; i++){
            if (data.billing_bank == banks[i].id ){
                return banks[i];
            }
        }
      }

      
    //fetch banks data
    useEffect(() => {
        const getBanks = async () => {
        setLoadingBanks(true);
          try {
            const response = await axios.get(`http://localhost:8000/banks/`);
            return response.data; // Return the response data instead of the entire response
          } catch (error) {
            console.error(error);
          }
          setLoadingBanks(false);
        };
      
        const fetchBanks = async () => {
          const banksData = await getBanks(); // Await the getBanks() function to resolve the Promise
          setBanks(banksData); // Update the banks state with the fetched data
          console.log("banksData:"+banksData.id);
        };
        
        fetchBanks();

    }, [data]);

    useEffect(()=>{
        
        setPaymentBank(searchBankID);
        console.log(paymentBank);
    },[banks])
        

    useEffect(() => {
        const fetchPost = async () => {
            setLoadingData(true);
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api-services/${postType}/get_post/${id}/`);
                
                
                // console.log(response.data);
                setData(() => response.data);               
                console.log(data);
                
            } catch (error) {
                console.log('An error occurred:', error);
            }
            setLoadingData(false);
        };
        fetchPost();
        }, []);
        
        //fetching the user
        useEffect(()=>{
            const handleSubmit = async () => {
                setLoadingUser(true);
                try {
                        // Request was successful
                    if(authState.id != undefined){
                        let response = await fetch( `http://localhost:8000/users/${authState.id}`,{
                                method: 'GET',
                                headers: {
                                    'Authorization': authState.token,
                                }
                                // body: JSON.stringify({Authorization: responseDataAuth.token})
                            }
                        );
                        
        
                        if(response.ok){
                          
                            const responseDataUser = await response.json();
    
                            setUserData(responseDataUser);
                            console.log(responseDataUser)
                        }else{
                            console.log("GET request failed: error fetching user data");
                            console.log(response);
                        }
                    }
        
                    } catch (error) {
                        console.log("error");
                        console.log(error);
                    }
                    setLoadingUser(false);
        
            }
            handleSubmit();
        },[authState])

        
        return (
            
            <section id="publicacion-creada">    
                {/* Encabezado perfil */}
                
                { (postType === 'provide') && (
                    // something
                    <div className='header'>                        
                        <section className='encabezado-perfil'>                       
                            <div className='subtitle blue margin header'>
                                <b>{ data.service && t(`publicaciones_vista_lista.${data.service}`)}</b>                            
                            </div>
                            <div className='user-name header'>
                                <b>{authState?.name} </b>
                            </div>
                            <div></div>                           
                            
                    
                        </section>

                        <section className='encabezado-perfil'>
                            <div>
                                <img className='img-user' src={fotoPerfil} />
                            </div>
                            <div>
                                <div className='rectangle yellow tag header'>{t('publicacionCreada.telefono_celular')}</div>
                                <div className='rectangle yellow tag header'> {t('publicacionCreada.telefono_fijo')}</div>
                                <div className='rectangle yellow tag header'> {t('publicacionCreada.correo_electronico')} </div>
                            </div>
                            <div>                            
                                <div className='data header'> { userData?.cellphone || t('publicacionCreada.No_disponible')} </div>
                                <div className='data header'> { userData?.telephone || t('publicacionCreada.No_disponible')} </div>
                                <div className='data header'> { authState?.email || t('publicacionCreada.No_disponible')}</div>
                            </div>
                            <div>
                                <div className='pais blue'> {t('publicacionCreada.pais_cuidador')}</div>
                                <div className='pais red'>{getCountryName(userData.country)}</div>                        
                                <div className='pais blue'> {t('publicacionCreada.provincia__cuidador')}</div>
                                <div className='pais red'> {t('publicacionCreada.No_disponible')}</div>
                                
                            </div>
                            
                        </section>
                    </div> 
                    )
                }                

                
                {/* DATOS BASICOS DE LA NIÑERA*/ }
                <div className='basico'>
                    <div className='rectangle blue tag'>{t('publicacionCreada.datos_basicos_cuidador')} {t(`publicaciones_vista_lista.${data.service}`)}</div>                    
                </div>

                {
                    (loadingData || loadingUser)?
                    <>
                        <div className="parent-loading-screen">
                            <div className='loading-screen'></div>
                        </div>
                    </>
                    :
                    <>
                        { /* REQUEST: Solicito */ }
                        { postType === 'request' &&  (
                            <div className='basico'>
                                <div className='basico info'>
                                    <div className='subtitle red'><b>{t('publicacionCreada.Solicito')}</b></div>
                                    <div> {t(`publicacionCreada.gender.${data.gender}`)}</div>
                                </div>
                            </div>
                        )}

                        { postType === 'provide' && (
                            <div className='basico'>
                                <div className='rectangle text'> <b>{data.description} </b></div>                   
                            </div>
                            )                
                        }

                        { /* Edad que solicita */ }
                        <div className='basico'>
                            <div className='basico info'>
                                <div className='subtitle blue'><b>{t('publicacionCreada.edad_cuidador')}</b></div>

                                { postType === 'request' ? (
                                    data.age_requirement ? (
                                        <div>  {t('publicacionCreada.entre')} {data.age_required_from}  {t('publicacionCreada.y')} {data.age_required_to}  {t('publicacionCreada.annios')} </div>
                                    ) : (
                                        <div> {data.age_requirement} </div>
                                    )                            
                                ) : (
                                <div> {data.age}  {t('publicacionCreada.annios')} </div>
                                )}
                                
                            </div>
                        </div>

                        { /* Situación Familiar */ }
                        <div className='basico'>
                            <div className='basico info'>
                                <div className='subtitle blue'><b>{t('publicacionCreada.situcion_familiar_cuidador')}</b></div>
                                {postType === 'provide' ? (
                                    data.have_children === true ? (
                                        <span>{t('publicacionCreada.hijos')}</span>
                                    ) : (
                                        <span>{t('publicacionCreada.no_hijos')}</span>
                                    )
                                    ) : (
                                    t(`publicacionCreada.${data.children}`)
                                )}                        
                            </div>
                            <div className='subtitle red'>
                                <b>{t('publicacionCreada.PEN')}</b>
                            </div>
                        </div>

                        { /* Grado de Instrucción */ }
                        <div className='basico'>
                            <div className='basico info'>
                                <div className='subtitle blue'><b> {t('publicacionCreada.grado_instrucción_cuidador')}</b></div>
                                <div> {data.education_level &&t(`publicaciones_vista_lista.${data.education_level}`)} </div>                        
                            </div>
                        </div>
                    </>
                }


                {/* LUGAR DE PROCEDENCIA */ }
                <div className='basico'>
                    <div className='rectangle blue tag'>{t('publicacionCreada.lugar_procedencia_cuidador')}</div>                    
                </div>  
                <br></br>

                {
                    (loadingData || loadingUser)?
                    <>
                        <div className="parent-loading-screen">
                            <div className='loading-screen'></div>
                        </div>
                    </>
                    :
                    <>
                        { /* País de procedencia */ }
                        <div className='basico'>
                            <div className='basico info'>
                                <div className='subtitle black'><b>{t('publicacionCreada.pais_cuidador')}</b></div>
                                <div> { getCountryName(data.country) }  </div>
                            </div>
                        </div>
                        
                        { /* Estado / Provincia  */ }
                        <div className='basico'>
                            <div className='basico info'>
                                <div className='subtitle black'><b>{t('publicacionCreada.provincia__cuidador')}</b></div>
                                <div>{data.state != undefined && getStateName(data.state)}</div>
                            </div>
                        </div>

                        { /* Ciudad */ }
                        <div className='basico'>
                            <div className='basico info'>
                                <div className='subtitle black'><b>{t('publicacionCreada.ciudad_cuidador')}</b></div>
                                <div>{data.state != undefined && (data.city).substr((data.city).indexOf('-')+1)} </div>
                            </div>
                        </div>

                        { /* Zona */ }
                        <div className='basico'>
                            <div className='basico info'>
                                <div className='subtitle black'><b>{t('publicacionCreada.zona_cuidador')}</b></div>
                                <div>{data.zone}</div>
                            </div>
                        </div>
                    </>
                }

                {
                    (loadingData || loadingUser)?
                    <>
                        <div className="parent-loading-screen">
                            <div className='loading-screen'></div>
                        </div>
                    </>
                    :
                    <>
                        { postType === 'provide' ? (
                            <div>
                                {/* DESCRIPCIÓN GENERAL DE MI PERFIL LABORAL */}                        
                                <div className='basico'>
                                <div className='rectangle blue tag'>{t('publicacionCreada.perfilLaboral')}</div>
                                </div>
                                <br></br>

                                <div className='basico'>
                                    <div className='rectangle text'> { data.description }</div>                   
                                </div>
                                
                            </div>
                        ) : (          
                            <div>
                                <div className='basico'>
                                    {/* SOBRE LA PERSONA A CUIDAR */} 
                                    <div className='rectangle blue tag'> {t('publicacionCreada.persona_cuidar')}</div>
                                </div>

                                <div className='basico'>
                                    {/* Cantidad de personas */} 
                                    <div className='basico info'>
                                        <div className='rectangle yellow tag'>{t('publicacionCreada.cant_persona_cuidar')}</div>
                                        <div className='data'>  {data.number_tco} </div>                                
                                    </div>
                                </div>

                                <div className='basico'>
                                    {/* Edad(es) */} 
                                    <div className='basico info'>
                                        <div className='rectangle yellow tag'>{t('publicacionCreada.edad_cuidar')} </div>
                                        <div className='data'>  {data.age_tco} </div>                                
                                    </div>
                                </div>

                                <div className='basico'>
                                    {/* Sexo(s) */} 
                                    <div className='basico info'>
                                        <div className='rectangle yellow tag'>{t('publicacionCreada.sexo_cuidar')} </div>
                                        <div className='data'> {data.gender_tco}</div>                                
                                    </div>
                                </div>

                                <div className='basico'>
                                    {/* ¿Posee(n) alguna discapacidad o enfermedad? */} 
                                    <div className='basico info larger'>
                                        <div className='rectangle yellow tag'> {t('publicacionCreada.tiene_dispacacidad_cuidar')}</div>
                                        { data.disabilities_tco ? (
                                            <div className='data'> {t('publicacionCreada.si')}</div>   
                                        ) : (
                                            <div className='data'> {t('publicacionCreada.no')} </div> 
                                        )}
                                                                    
                                    </div>
                                </div>

                                { /* Discapacidad */ }
                                { data.disabilities_tco &&  (
                                    <div>
                                        <div className='basico'>                        
                                            <div className='rectangle yellow tag larger'> {t('publicacionCreada.indique_capacidad')}</div>                                
                                        </div>          
                                        <div className='basico'>
                                            <div className='rectangle text right'> {data.disabilities_tco_decrip}</div>                   
                                        </div>
                                        
                                    </div>                            
                                )}

                                {  /* Enfermedad */ }
                                { data.disabilities_tco &&  (
                                    <div>
                                        <div className='basico'>                        
                                            <div className='rectangle yellow tag larger'> {t('publicacionCreada.enfermedad_cuidar')}</div>                                
                                        </div>          
                                        <div className='basico'>
                                            <div className='rectangle text right'> {data.diseases_tco_descrip}</div>                   
                                        </div>
                                        
                                    </div>                            
                                )}
                            </div>       
                            
                        )
                    }
                    </>
                }

            

                {/* FUNCIONES QUE HE DESEMPEÑADO */ }
                <div className='basico'>
                    <div className='rectangle blue tag'>{t('publicacionCreada.funciones_cumplir')}</div>                    
                </div>
                <br></br>

                {
                    (loadingData || loadingUser)?
                    <>
                        <div className="parent-loading-screen">
                            <div className='loading-screen'></div>
                        </div>
                    </>
                    :
                    <>
                        <div className='basico'>
                            <div className='rectangle text'> {data.activities}</div>                   
                        </div>
                    </>
                }


                { /* DISPONIBILIDAD PARA VIAJAR */ }
                <div className='basico'>
                    <div className='rectangle blue tag'>{t('publicacionCreada.disponibilidad_viajar')}</div>                    
                </div>
                <br></br>

                {
                    (loadingData)?
                    <>
                        <div className="parent-loading-screen">
                            <div className='loading-screen'></div>
                        </div>
                    </>
                    :
                    <>
                        <div className='basico'>
                            {data.travel == true && <div className='rectangle text'>{t('publicacionCreada.si')} </div>}            
                            {data.travel == false && <div className='rectangle text'>{t('publicacionCreada.no')}  </div>}         
                        </div>

                        <div className='basico'>
                            {data.travel && <div className='rectangle text'>{data.travel_decription}</div>}                 
                        </div>
                    </>
                }

               
                { /* CONDICIONES DE TRABAJO */ }
                <div className='basico'>
                    <div className='rectangle blue tag'>{t('publicacionCreada.condiciones_trabajo')}</div>                    
                </div>
                <br></br>

                {loadingData?
                    <>
                        <div className="parent-loading-screen">
                            <div className='loading-screen'></div>
                        </div>
                    </>
                    :
                    <>
                        { /* Salidas que prefiero  */ }
                        <div className='basico'>
                            <div className='basico info'>
                                <div className='rectangle yellow tag'>{t('publicacionCreada.salida_cuidador')}</div>
                                { data.workday == 'OTRO' ? (
                                    <div className='data'> { data.workday_other} </div>
                                ): (
                                    <div className='data'>  {t(`publicaciones_vista_lista.${data.workday}`)} </div>
                                )}                    
                            
                            </div>
                        </div>

                        { /* Horario  */ }
                        <div className='basico'>
                            <div className='basico info'>
                                <div className='rectangle yellow tag'>{t('publicacionCreada.horario_trabajo')}</div>

                                { data.schedule == 'OTRO' ? (
                                    <div className='data'>  { data.schedule_other} </div>
                                ) : (
                                    <div className='data'>
                                    {data?.schedule.map(
                                    (scheduleItem, index) => 
                                        <div key={index}>
                                            {t(`publicaciones_vista_lista.${scheduleItem}`)}
                                        </div>
                                    )}
                                    </div>
                                )}
                                
                            </div>
                        </div>

                        { /* Salario deseado  */ }
                        <div className='basico'>
                            <div className='basico info'>
                                <div className='rectangle yellow tag'>{t('publicacionCreada.salario_ofrecido')} </div>

                                { data.currency === 'OTRA' ? (
                                    <div className='data'>
                                        {data?.payment === 'MONTO' ? (data?.payment_amount + " " + data?.currency_other) : data?.payment}
                                    </div> 
                                ) : (
                                    <div className='data'>
                                        {data?.payment === 'MONTO' ? (data?.payment_amount + " " + data?.currency) : data?.payment}
                                    </div> 
                                ) }
                                
                            </div>
                        </div>
                    </>
                }


                { /* SOLICITO OTRO BENEFICIO  */ }
                <div className='basico'>
                    <div className='rectangle blue tag'>{t('publicacionCreada.beneficios')}</div>                    
                </div>
               

                {
                    loadingData?
                    <>
                        <div className="parent-loading-screen">
                            <div className='loading-screen'></div>
                        </div>
                    </>
                    :
                    <>
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
                    </>
                }
                
                
                { /* DISPONIBILIDAD PARA COMENZAR A TRABAJAR  */ }
                <div className='basico'>
                    <div className='rectangle blue tag'>{t('publicacionCreada.disponibilidad_trabajar')} </div>                    
                </div>

                {
                    loadingData?
                    <>
                        <div className="parent-loading-screen">
                            <div className='loading-screen'></div>
                        </div>
                    </>
                    :
                    <>
                        <div className='basico'>
                            <div className='basico info'>
                                <div className='rectangle yellow tag'>{t('publicacionCreada.fecha_inicio')} </div>
                                <div className='data'>
                                    {data?.availability === 'FECHA' ? (data.availability_date) : data.availability}
                                </div>
                            </div>
                        </div>
                        
                        {postType === 'provide' && (
                            <div>
                                {/* CLIENTES CON LOS QUE QUIERO TRABAJAR */}
                                <div className='basico'>
                                <div className='rectangle blue tag'>{t('publicacionCreada.clientes')}</div>
                                </div>

                                {/* Lugar de Procedencia */}
                                <div className='basico'>
                                <div className='basico info'>
                                    <div className='rectangle yellow tag'>{t('publicacionCreada.cliente_procedencia')}</div>
                                    <div className='data'>{data.origin}</div>
                                </div>
                                </div>

                                {/* Pais de Procedencia */}
                                {data.origin === "SI" && (
                                <div className='basico'>
                                    <div className='basico info'>
                                    <div className='rectangle yellow tag'>{t('publicacionCreada.cliente_pais')}</div>
                                    <div className='data'>{data.origin_country}</div>
                                    </div>
                                </div>
                                )}

                                {/* Estado / Provincia */}
                                {data.origin === "SI" && (
                                <div className='basico'>
                                    <div className='basico info'>
                                    <div className='rectangle yellow tag'>{t('publicacionCreada.cliente_estado')}</div>
                                    <div className='data'>{data.origin_state}</div>
                                    </div>
                                </div>
                                )}

                                {/* Ciudad */}
                                {data.origin === "SI" && (
                                <div className='basico'>
                                    <div className='basico info'>
                                    <div className='rectangle yellow tag'>{t('publicacionCreada.cliente_ciudad')}</div>
                                    <div className='data'>{data.origin_city}</div>
                                    </div>
                                </div>
                                )}
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
                    </>
                }

                
                
                {/* SUGERENCIAS ANTES DE REALIZAR UNA ENTREVISTA DE TRABAJO */ }
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
                <br></br>
                { /* DATOS DE FACTURACIÓN */ }
                <div className="basico" id='banco'>
                        <div id='go-flex'>
                            <div id='left'>
                                <div className=" rectangle blue-box" id='top-left'>
                                    {t('publicacionCreada.Facturacion')}
                                </div>
                                
                                <div >
                                    <h2 className="blue">{t('publicacionCreada.plan_seleccionado')}</h2>

                                        <span>
                                        { data?.publication_plan == "1" &&
                                            <>
                                            {"1 "+ t('publicacionCreada.mes') + " " }
                                            <span className='red'>{ publication_choices[ Number( data.publication_plan ) -1 ].value }</span>
                                            </>
                                        }
                                        { 
                                            (data?.publication_plan == "2" || data?.publication_plan == "3" || data?.publication_plan == "4" || data?.publication_plan == "5") &&
                                            <>
                                                {data.publication_plan +" "+t('publicacionCreada.meses') +" "} 
                                                <span className='red'>{publication_choices[Number(data.publication_plan)-1].value}</span>
                                            </>
                                        }
                                        </span>
                                </div>
                            </div>
                            <div id='right'>
                                

                                <div id='right'>
                                    <div className='rectangle blue-box' id='top-right'>{t('publicacionCreada.Facturacion')}</div>
                                    <div id='boxes'>
                                        <div id='matrix'>
                                            <div id='item'>
                                                <div className='rectangle blue-box ' > Pais donde va a realizar el Depósito</div> 
                                            </div>
                                            <div id='item1'>
                                                <span>{data.billing_country}</span>
                                            </div>
                                            <div id='item2'>
                                                <div className='rectangle blue-box'  >
                                                    Datos de la cuenta seleccionada
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='rectangle blue-box' id="middle-box">{paymentBank?.name}</div>
                                        <div id='yellow-border'>
                                            <div id='sangria'>
                                                <h2 className='red'>{t('publicacionCreada.forma_pago')}</h2>
                                                <div id='sangria'>
                                                    <ul>
                                                        <li>{t('publicacionCreada.deposito')}</li>
                                                        <li>{t('publicacionCreada.transferencia')}</li>
                                                    </ul>
                                                </div>

                                                <p><span>{t('publicacionCreada.pais_cuidador')}</span> {paymentBank?.country}</p>
                                                <p><span>{t('publicacionCreada.banco')}</span> {paymentBank?.name}</p>
                                                <p><span>{t('publicacionCreada.n_cuenta')}</span> {paymentBank?.account}</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        
                </div>           
                
                
                

                
            </section>

        )
};

