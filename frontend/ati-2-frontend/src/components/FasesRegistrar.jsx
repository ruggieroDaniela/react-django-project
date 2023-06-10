import React, { useContext, useEffect, useState } from "react";
import { RegisterFormContext } from "../context/RegisterFormContext";
import AuthContext from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { getAllCountries, getCitiesInCountry} from "../components/dataFetchers/PaisDataFetcher";
import ErrorMessage from "./ErrorMessage";
import axios from 'axios';
import validator from "validator";
import { useNavigate } from 'react-router-dom';

import "../styles/Registrar.scss"

// Fase 0: de donde nos conoces?
const Fase0 = () =>
    {
        const { t, i18n } = useTranslation();
        const {registerFormState, setRegisterFormState} = useContext(RegisterFormContext);
        const selectionEmpty = registerFormState.errors[0].option_required
        const specifyEmpty = registerFormState.errors[0].other_empty
        const socialRequired = registerFormState.errors[0].social_required  
        const otherRequired = registerFormState.errors[0].other_required

        return(
        <>
            <div id="fase0">
                <div className="descripcion">
                    {t('registrar.fases.0.descripcion')}
                </div>

                {selectionEmpty && <ErrorMessage message={t('registrar.errores.0.requerido')}/> }
                {specifyEmpty && <ErrorMessage message={t('registrar.errores.0.especificar_vacio')}/>  }
                {socialRequired && <ErrorMessage message={t('registrar.errores.0.social_requerida')}/>  }
                {otherRequired && <ErrorMessage message={t('registrar.errores.0.otro_requerido')}/> }

                <div className="metodos-container">

                    <div className="metodo">
                        <label>
                            <input
                                type="checkbox"
                                checked={registerFormState.phase[0].website}
                                onChange={ e => {
                                    setRegisterFormState( prev => {
                                        const newState = {... prev};
                                        newState.phase[0] = {... prev.phase[0]};
                                        newState.phase[0].website = e.target.checked;
                                        return newState;
                                    } );   
                                }}
                            />
                            {t('registrar.fases.0.metodos.0')}
                        </label>
                    </div>

                    <div className="metodo">
                        <label>
                            <input
                                type="checkbox"
                                checked={registerFormState.phase[0].social_network}
                                onChange={ e => {
                                    setRegisterFormState( prev => {
                                        const newState = {... prev};
                                        newState.phase[0] = {... prev.phase[0]};
                                        newState.phase[0].social_network = e.target.checked;
                                        return newState;
                                    } );
                                }}
                            />
                            {t('registrar.fases.0.metodos.1')}
                        </label>
                        <div id="social-network" className={`${registerFormState.phase[0].social_network? "":"ghost" }`}>
                            <div>
                                <input
                                    type="checkbox"
                                    checked={registerFormState.phase[0].facebook}
                                    onChange={ e => {
                                        setRegisterFormState( prev => {
                                            const newState = {... prev};
                                            newState.phase[0] = {... prev.phase[0]};
                                            newState.phase[0].facebook = e.target.checked;
                                            return newState;
                                        } );
                                    }}
                                />
                                Facebook
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    checked={registerFormState.phase[0].twitter}
                                    onChange={ e => {
                                        setRegisterFormState( prev => {
                                            const newState = {... prev};
                                            newState.phase[0] = {... prev.phase[0]};
                                            newState.phase[0].twitter = e.target.checked;
                                            return newState;
                                        } );
                                    }}
                                />
                                Twitter
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    checked={registerFormState.phase[0].instagram}
                                    onChange={ e => {
                                        setRegisterFormState( prev => {
                                            const newState = {... prev};
                                            newState.phase[0] = {... prev.phase[0]};
                                            newState.phase[0].instagram = e.target.checked;
                                            return newState;
                                        } );
                                    }}
                                />
                                Instagram
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    checked={registerFormState.phase[0].social_network_other}
                                    onChange={ e => {
                                        setRegisterFormState( prev => {
                                            const newState = {... prev};
                                            newState.phase[0] = {... prev.phase[0]};
                                            newState.phase[0].social_network_other = e.target.checked;
                                            return newState;
                                        } );
                                    }}
                                />
                                {t('otro')}
                            </div>
                            <div style={ {display: registerFormState.phase[0].social_network_other? "block":"none"} }>
                                {t('especifique')+": "}
                                <input
                                    type="text"
                                    value={registerFormState.phase[0].social_network_other_spec}
                                    onChange={ e => {
                                        setRegisterFormState( prev => {
                                            const newState = {... prev};
                                            newState.phase[0] = {... prev.phase[0]};
                                            newState.phase[0].social_network_other_spec = e.target.value;
                                            return newState;
                                        } );
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="metodo">
                        <label>
                            <input
                                type="checkbox"
                                checked={registerFormState.phase[0].friends}
                                onChange={ e => {
                                    setRegisterFormState( prev => {
                                        const newState = {... prev};
                                        newState.phase[0] = {... prev.phase[0]};
                                        newState.phase[0].friends = e.target.checked;
                                        return newState;
                                    } );
                                }}
                            />
                            {t('registrar.fases.0.metodos.2')}
                        </label>
                    </div>

                    <div className="metodo">
                        <label>
                            <input
                                type="checkbox"
                                checked={registerFormState.phase[0].other}
                                onChange={ e => {
                                    setRegisterFormState( prev => {
                                        const newState = {... prev};
                                        newState.phase[0] = {... prev.phase[0]};
                                        newState.phase[0].other = e.target.checked;
                                        return newState;
                                    } );
                                }}
                            />
                            {t('registrar.fases.0.metodos.3')}
                        </label>
                        <div className={` ${registerFormState.phase[0].other? "":"ghost" }`}>
                            <div>
                                <input
                                    type="checkbox"
                                    checked={registerFormState.phase[0].radio}
                                    onChange={ e => {
                                    setRegisterFormState( prev => {
                                            const newState = {... prev};
                                            newState.phase[0] = {... prev.phase[0]};
                                            newState.phase[0].radio = e.target.checked;
                                            return newState;
                                        } );
                                    }}    
                                />
                                {t('registrar.fases.0.otros_metodos.0')}
                            </div>
                            <div style={ {display: registerFormState.phase[0].radio? "block":"none"} } >
                                {t('especifique')+": "}
                                <input
                                    type="text"
                                    value={registerFormState.phase[0].radio_spec}
                                    onChange={ e => {
                                    setRegisterFormState( prev => {
                                            const newState = {... prev};
                                            newState.phase[0] = {... prev.phase[0]};
                                            newState.phase[0].radio_spec = e.target.value;
                                            return newState;
                                        } );
                                    }}  
                                />
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    checked={registerFormState.phase[0].press}
                                    onChange={ e => {
                                    setRegisterFormState( prev => {
                                            const newState = {... prev};
                                            newState.phase[0] = {... prev.phase[0]};
                                            newState.phase[0].press = e.target.checked;
                                            return newState;
                                        } );
                                    }}  
                                />
                                {t('registrar.fases.0.otros_metodos.1')}
                            </div>
                            <div style={ {display: registerFormState.phase[0].press? "block":"none"} } >
                                {t('especifique')+": "}
                                <input
                                    type="text"
                                    value={registerFormState.phase[0].press_spec}
                                    onChange={ e => {
                                    setRegisterFormState( prev => {
                                            const newState = {... prev};
                                            newState.phase[0] = {... prev.phase[0]};
                                            newState.phase[0].press_spec = e.target.value;
                                            return newState;
                                        } );
                                    }} 
                                />
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    checked={registerFormState.phase[0].other_other}
                                    onChange={ e => {
                                    setRegisterFormState( prev => {
                                            const newState = {... prev};
                                            newState.phase[0] = {... prev.phase[0]};
                                            newState.phase[0].other_other = e.target.checked;
                                            return newState;
                                        } );
                                    }} 
                                />
                                {t('otro')}
                            </div>
                            <div style={ {display: registerFormState.phase[0].other_other? "block":"none"} }>
                                {t('especifique')+": "}
                                <input
                                    type="text"
                                    value={registerFormState.phase[0].other_other_spec}
                                    onChange={ e => {
                                    setRegisterFormState( prev => {
                                            const newState = {... prev};
                                            newState.phase[0] = {... prev.phase[0]};
                                            newState.phase[0].other_other_spec = e.target.value;
                                            return newState;
                                        } );
                                    }} 
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
        )

    };

// Fase 1: registrar usuario
const Fase1 = () => {
        const { t, i18n } = useTranslation();
        const {registerFormState, setRegisterFormState} = useContext(RegisterFormContext);

        const countries = registerFormState.countries;
        const [cities, setCities] = useState(registerFormState.cities);
        const [countryCode, setCountryCode] = useState(registerFormState.phase[1].empresa.codigo_pais);

        const nameRequired = registerFormState.errors[1].name_required 
        const nameInvalid = registerFormState.errors[1].name_invalid
        const lastNameRequired = registerFormState.errors[1].last_name_required
        const lastNameInvalid = registerFormState.errors[1].last_name_invalid
        const idRequired = registerFormState.errors[1].id_required
        const idInvalid = registerFormState.errors[1].id_invalid
        const emailRequired = registerFormState.errors[1].email_required
        const emailInvalid = registerFormState.errors[1].email_invalid

        const business_required = registerFormState.errors[1].business_required
        const business_invalid = registerFormState.errors[1].business_invalid
        const rif_required = registerFormState.errors[1].rif_required
        const rif_invalid = registerFormState.errors[1].rif_invalid
        const address_required = registerFormState.errors[1].address_required
        const rep_name_required = registerFormState.errors[1].rep_name_required
        const rep_name_invalid = registerFormState.errors[1].rep_name_invalid
        const rep_email_required = registerFormState.errors[1].rep_email_required
        const rep_email_invalid = registerFormState.errors[1].rep_email_invalid

        const telefonoRequired = registerFormState.errors[1].telefono_required
        const telefonoInvalid = registerFormState.errors[1].telefono_invalid

        useEffect(() => {
            const fetchCities = async () => {
                if(countryCode){
                    let [names, values] = await getCitiesInCountry(countryCode);
                    names  = [...new Set(names)];
                    setCities(names);
                }
            };

            fetchCities();
        }, [countryCode])

        return(
            <div id="fase1">
                <div id="tipo_usuario">
                    <label>{t('registrar.fases.1.tipo_usuario')+": "}</label>
                    <label>
                        <input
                            type="radio"
                            value="natural"
                            checked={ registerFormState.phase[1].tipo_usuario === 'natural' }
                            onChange={ e => {
                                setRegisterFormState( prev => {
                                        const newState = {... prev};
                                        newState.phase[1] = {... prev.phase[1]};
                                        newState.phase[1].tipo_usuario = 'natural';
                                        return newState;
                                    } );
                            }}
                        />
                        {t('registrar.fases.1.tipo_natural')}
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="enterprise"
                            checked={ registerFormState.phase[1].tipo_usuario === 'enterprise' }
                            onChange={ e => {
                                setRegisterFormState( prev => {
                                        const newState = {... prev};
                                        newState.phase[1] = {... prev.phase[1]};
                                        newState.phase[1].tipo_usuario = 'enterprise';
                                        return newState;
                                    } );
                            }}
                        />
                        {t('registrar.fases.1.tipo_empresa')}
                    </label>
                </div>

                {
                    registerFormState.phase[1].tipo_usuario === 'natural'?
                    <div id="usuario_natural" className="container">
                        {t('registrar.fases.1.natural.nota_inicial')+": "}

                        <div className="field">
                            <span className="label">
                                <span className="required">*</span> {t('registrar.fases.1.natural.nombre')+": "}
                            </span>
                            <input
                                type="text"
                                value={registerFormState.phase[1].natural.nombre}
                                onChange={ e => {
                                setRegisterFormState( prev => {
                                        const newState = {... prev};
                                        newState.phase[1] = {... prev.phase[1]};
                                        newState.phase[1].natural.nombre = e.target.value;
                                        return newState;
                                    } );
                                }} 
                            />

                            { nameRequired && <ErrorMessage message={t('registrar.errores.1.requerido')}/> }
                            { nameInvalid && <ErrorMessage message={t('registrar.errores.1.minimo')}/>}
                        </div>

                        <div className="field">
                            <span className="label">
                                <span className="required">*</span> {t('registrar.fases.1.natural.apellido')+": "}
                            </span>
                            <input
                                type="text"
                                value={registerFormState.phase[1].natural.apellido}
                                onChange={ e => {
                                setRegisterFormState( prev => {
                                        const newState = {... prev};
                                        newState.phase[1] = {... prev.phase[1]};
                                        newState.phase[1].natural.apellido = e.target.value;
                                        return newState;
                                    } );
                                }} 
                            />

                            { lastNameRequired && <ErrorMessage message={t('registrar.errores.1.requerido')}/> }
                            { lastNameInvalid && <ErrorMessage message={t('registrar.errores.1.minimo')}/> }    
                        </div>

                        

                        <div className="field">
                            <span className="label">
                                <span className="required">*</span> {t('registrar.fases.1.natural.id')+": "}
                            </span>
                            <input
                                type="text"
                                value={registerFormState.phase[1].natural.identificacion}
                                onChange={ e => {
                                setRegisterFormState( prev => {
                                        const newState = {... prev};
                                        newState.phase[1] = {... prev.phase[1]};
                                        newState.phase[1].natural.identificacion = e.target.value;
                                        return newState;
                                    } );
                                }} 
                            />

                            { idRequired && <ErrorMessage message={t('registrar.errores.1.requerido')}/>  }
                            { idInvalid && <ErrorMessage message={t('registrar.errores.1.id')}/> }
                        </div>
                        
                        

                        <div className="field">
                            <span className="label">
                                <span className="required">*</span> {t('registrar.fases.1.natural.correo')+": "}
                            </span>
                            <input
                                type="text"
                                value={registerFormState.phase[1].natural.correo}
                                onChange={ e => {
                                setRegisterFormState( prev => {
                                        const newState = {... prev};
                                        newState.phase[1] = {... prev.phase[1]};
                                        newState.phase[1].natural.correo = e.target.value;
                                        return newState;
                                    } );
                                }} 
                            />

                            { emailRequired && <ErrorMessage message={t('registrar.errores.1.requerido')}/>  }
                            { emailInvalid && <ErrorMessage message={t('registrar.errores.1.email')}/> }
                        </div>
                        
                        

                        <div className="field">
                            <span className="label">
                                <span className="required">*</span> {t('registrar.fases.1.natural.pais')+": "}
                            </span>

                            <select 
                                style={{width: '100%' , boxSizing: 'border-box'}}
                                name="select" 
                                value={registerFormState.phase[1].natural.pais}
                                onChange={ e => {
                                    const country =  JSON.parse(e.target.options[e.target.selectedIndex].getAttribute('data-country'))
                                    setCountryCode(country.code)
                                    setRegisterFormState( prev => {
                                        const newState = {... prev};
                                        newState.phase[1] = {... prev.phase[1]};
                                        newState.phase[1].natural.pais = e.target.value;
                                        newState.phase[1].natural.codigo_pais = country.code;
                                        return newState;
                                    } )
                                }}>

                                {countries?.map( country => {
                                      return (<option key={country.code} value={country.name} data-country={JSON.stringify(country)}> {country.name}</option>);
                                })}

                            </select>
                            
                        </div>


                        <div className="field">
                                
                                <div>
                                    <span className="label">
                                        <span className="required">*</span> {t('registrar.fases.1.telefono.titulo')+": "}
                                    </span>

                                    <div className="note">
                                        {t('registrar.fases.1.telefono.nota')}
                                    </div>
                                    
                                    <div id="telefono_container">
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={registerFormState.phase[1].telefono.select_movil}
                                                onChange={ e => {
                                                    setRegisterFormState( prev => {
                                                            const newState = {... prev};
                                                            newState.phase[1] = {... prev.phase[1]};
                                                            newState.phase[1].telefono.select_movil = e.target.checked;
                                                            return newState;
                                                        } );
                                                }}
                                            />
                                            <div className="tipo_telefono">
                                                {t('registrar.fases.1.telefono.movil')}
                                            </div>
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={registerFormState.phase[1].telefono.select_local}
                                                onChange={ e => {
                                                    setRegisterFormState( prev => {
                                                            const newState = {... prev};
                                                            newState.phase[1] = {... prev.phase[1]};
                                                            newState.phase[1].telefono.select_local = e.target.checked;
                                                            return newState;
                                                        } );
                                                }}
                                            />
                                            <div className="tipo_telefono">
                                                {t('registrar.fases.1.telefono.local')}
                                            </div>
                                        </label>
                                    </div>

                                    <div
                                        className="field"
                                        id="telefono_field"
                                        style={{ display: registerFormState.phase[1].telefono.select_movil? "block":"none" }}
                                    >
                                        <input
                                            id="telefono_codigo"
                                            type="text"
                                            checked={registerFormState.phase[1].telefono.codigo}
                                            onChange={ e => {
                                            setRegisterFormState( prev => {
                                                    const newState = {... prev};
                                                    newState.phase[1] = {... prev.phase[1]};
                                                    newState.phase[1].telefono.movil.codigo = e.target.value;
                                                    return newState;
                                                } );
                                            }} 
                                        />
                                        <input
                                            id="telefono_numero"
                                            type="text"
                                            checked={registerFormState.phase[1].telefono.numero}
                                            onChange={ e => {
                                            setRegisterFormState( prev => {
                                                    const newState = {... prev};
                                                    newState.phase[1] = {... prev.phase[1]};
                                                    newState.phase[1].telefono.movil.numero = e.target.value;
                                                    return newState;
                                                } );
                                            }} 
                                        />
                                    </div>

                                    <div
                                        className="field"
                                        id="telefono_field"
                                        style={{ visibility: registerFormState.phase[1].telefono.select_local? "visible":"hidden" }}
                                    >
                                        <input
                                            id="telefono_codigo"
                                            type="text"
                                            value={registerFormState.phase[1].telefono.codigo}
                                            onChange={ e => {
                                            setRegisterFormState( prev => {
                                                    const newState = {... prev};
                                                    newState.phase[1] = {... prev.phase[1]};
                                                    newState.phase[1].telefono.local.codigo = e.target.value;
                                                    return newState;
                                                } );
                                            }} 
                                        />
                                        <input
                                            id="telefono_numero"
                                            type="text"
                                            value={registerFormState.phase[1].telefono.numero}
                                            onChange={ e => {
                                            setRegisterFormState( prev => {
                                                    const newState = {... prev};
                                                    newState.phase[1] = {... prev.phase[1]};
                                                    newState.phase[1].telefono.local.numero = e.target.value;
                                                    return newState;
                                                } );
                                            }} 
                                        />
                                        <label>
                                            Ext
                                            <input
                                                id="telefono_ext"
                                                type="text"
                                                value={registerFormState.phase[1].telefono.ext}
                                                onChange={ e => {
                                                setRegisterFormState( prev => {
                                                        const newState = {... prev};
                                                        newState.phase[1] = {... prev.phase[1]};
                                                        newState.phase[1].telefono.local.ext = e.target.value;
                                                        return newState;
                                                    } );
                                                }} 
                                            />
                                        </label>
                                    </div>

                                </div>   
                                
                                { telefonoRequired && <ErrorMessage message={t('registrar.errores.1.telefono_requerido')}/> }
                                { telefonoInvalid && <ErrorMessage message={t('registrar.errores.1.telefono_invalido')}/>}

                            </div>

                    </div>
                    :
                    <div id="usuario_empresa" className="container">
                        <div id="datos_empresa" className="container">
                            <div className="container title_container">
                                <div className="title">
                                    {t('registrar.fases.1.empresa.empresa.titulo')}
                                </div>
                            </div>

                            <div className="field">
                                <span className="label">
                                    <span className="required">*</span> {t('registrar.fases.1.empresa.empresa.nombre')+": "}
                                </span>
                                <input
                                    type="text"
                                    value={registerFormState.phase[1].empresa.nombre_empresa}
                                    onChange={ e => {
                                    setRegisterFormState( prev => {
                                            const newState = {... prev};
                                            newState.phase[1] = {... prev.phase[1]};
                                            newState.phase[1].empresa.nombre_empresa = e.target.value;
                                            return newState;
                                        } );
                                    }} 
                                />
                                { business_required && <ErrorMessage message={t('registrar.errores.1.requerido')}/>  }
                                { business_invalid && <ErrorMessage message={t('registrar.errores.1.minimo')}/> }
              

                            </div>
                            
                            <div className="field">
                                <span className="label">
                                    <span className="required">*</span> {t('registrar.fases.1.empresa.empresa.rif')+": "}
                                </span>
                                <input
                                    type="text"
                                    value={registerFormState.phase[1].empresa.razon_rif}
                                    onChange={ e => {
                                    setRegisterFormState( prev => {
                                            const newState = {... prev};
                                            newState.phase[1] = {... prev.phase[1]};
                                            newState.phase[1].empresa.razon_rif = e.target.value;
                                            return newState;
                                        } );
                                    }} 
                                />
                                { rif_required && <ErrorMessage message={t('registrar.errores.1.requerido')}/>  }
                                { rif_invalid && <ErrorMessage message={t('registrar.errores.1.id')}/> }
                            </div>

                            <div className="field">
                                <span className="label">
                                    <span className="required">*</span> {t('registrar.fases.1.empresa.empresa.pais')+": "}
                                </span>

                                <select 
                                    style={{width: '100%' , boxSizing: 'border-box'}}
                                    name="select" 
                                    value={registerFormState.phase[1].empresa.pais}
                                    onChange={ e => {
                                        const country =  JSON.parse(e.target.options[e.target.selectedIndex].getAttribute('data-country'))
                                        setCountryCode(country.code)
                                        setRegisterFormState( prev => {
                                            const newState = {... prev};
                                            newState.phase[1] = {... prev.phase[1]};
                                            newState.phase[1].empresa.pais = e.target.value;
                                            newState.phase[1].empresa.codigo_pais = countryCode;
                                            return newState;
                                        } )
                                    }}>

                                    {countries?.map( country => {
                                        return (<option key={country.code} value={country.name} data-country={JSON.stringify(country)}> {country.name}</option>);
                                    })}
                                </select>
                            </div>

                            <div className="field">
                                <span className="label">
                                    <span className="required">*</span> {t('registrar.fases.1.empresa.empresa.ciudad')+": "}
                                </span>

                                <select 
                                    style={{width: '100%' , boxSizing: 'border-box'}}
                                    name="select" 
                                    value={registerFormState.phase[1].empresa.ciudad}
                                    onChange={ e => {
                                        setRegisterFormState( prev => {
                                            const newState = {... prev};
                                            newState.phase[1] = {... prev.phase[1]};
                                            newState.phase[1].empresa.ciudad = e.target.value;
                                            return newState;
                                        } );
                                    }}>

                                    {cities?.map( city => {
                                        return (<option key={city} value={city}>{city}</option>);
                                    })}
                                </select>
                            </div>

                            <div className="field">
                                <span className="label">
                                    <span className="required">*</span> {t('registrar.fases.1.empresa.empresa.direccion')+": "}
                                </span>
                                <textarea
                                    type="textarea"
                                    onChange={ e => {
                                    setRegisterFormState( prev => {
                                            const newState = {... prev};
                                            newState.phase[1] = {... prev.phase[1]};
                                            newState.phase[1].empresa.direccion = e.target.value;
                                            return newState;
                                        } );
                                    }} 
                                />

                                { address_required && <ErrorMessage message={t('registrar.errores.1.requerido')}/>  }
                            </div>

                        </div>

                        <div id="datos_representante" className="container">
                            <div className="container title_container">
                                <div className="title">
                                    {t('registrar.fases.1.empresa.representante.titulo')}
                                </div>
                            </div>

                            <div className="field">
                                <span className="label">
                                    <span className="required">*</span> {t('registrar.fases.1.empresa.representante.nombre')+": "}
                                </span>
                                <input
                                    type="text"
                                    value={registerFormState.phase[1].empresa.nombre_representante}
                                    onChange={ e => {
                                    setRegisterFormState( prev => {
                                            const newState = {... prev};
                                            newState.phase[1] = {... prev.phase[1]};
                                            newState.phase[1].empresa.nombre_representante = e.target.value;
                                            return newState;
                                        } );
                                    }} 
                                />

                                { rep_name_required && <ErrorMessage message={t('registrar.errores.1.requerido')}/>  }
                                { rep_name_invalid && <ErrorMessage message={t('registrar.errores.1.minimo')}/> }
                            </div>

                            <div className="field">
                                <span className="label">
                                    <span className="required">*</span> {t('registrar.fases.1.empresa.representante.correo')+": "}
                                </span>
                                <input
                                    type="text"
                                    value={registerFormState.phase[1].empresa.correo}
                                    onChange={ e => {
                                    setRegisterFormState( prev => {
                                            const newState = {... prev};
                                            newState.phase[1] = {... prev.phase[1]};
                                            newState.phase[1].empresa.correo = e.target.value;
                                            return newState;
                                        } );
                                    }} 
                                />

                                { rep_email_required && <ErrorMessage message={t('registrar.errores.1.requerido')}/>  }
                                { rep_email_invalid && <ErrorMessage message={t('registrar.errores.1.email')}/> }
                            </div>

                            <div className="field">
                                
                                <div>
                                    <span className="label">
                                        <span className="required">*</span> {t('registrar.fases.1.telefono.titulo')+": "}
                                    </span>

                                    <div className="note">
                                        {t('registrar.fases.1.telefono.nota')}
                                    </div>
                                    
                                    <div id="telefono_container">
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={registerFormState.phase[1].telefono.select_movil}
                                                onChange={ e => {
                                                    setRegisterFormState( prev => {
                                                            const newState = {... prev};
                                                            newState.phase[1] = {... prev.phase[1]};
                                                            newState.phase[1].telefono.select_movil = e.target.checked;
                                                            return newState;
                                                        } );
                                                }}
                                            />
                                            <div className="tipo_telefono">
                                                {t('registrar.fases.1.telefono.movil')}
                                            </div>
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={registerFormState.phase[1].telefono.select_local}
                                                onChange={ e => {
                                                    setRegisterFormState( prev => {
                                                            const newState = {... prev};
                                                            newState.phase[1] = {... prev.phase[1]};
                                                            newState.phase[1].telefono.select_local = e.target.checked;
                                                            return newState;
                                                        } );
                                                }}
                                            />
                                            <div className="tipo_telefono">
                                                {t('registrar.fases.1.telefono.local')}
                                            </div>
                                        </label>
                                    </div>

                                    <div
                                        className="field"
                                        id="telefono_field"
                                        style={{ display: registerFormState.phase[1].telefono.select_movil? "block":"none" }}
                                    >
                                        <input
                                            id="telefono_codigo"
                                            type="text"
                                            checked={registerFormState.phase[1].telefono.codigo}
                                            onChange={ e => {
                                            setRegisterFormState( prev => {
                                                    const newState = {... prev};
                                                    newState.phase[1] = {... prev.phase[1]};
                                                    newState.phase[1].telefono.movil.codigo = e.target.value;
                                                    return newState;
                                                } );
                                            }} 
                                        />
                                        <input
                                            id="telefono_numero"
                                            type="text"
                                            checked={registerFormState.phase[1].telefono.numero}
                                            onChange={ e => {
                                            setRegisterFormState( prev => {
                                                    const newState = {... prev};
                                                    newState.phase[1] = {... prev.phase[1]};
                                                    newState.phase[1].telefono.movil.numero = e.target.value;
                                                    return newState;
                                                } );
                                            }} 
                                        />
                                    </div>

                                    <div
                                        className="field"
                                        id="telefono_field"
                                        style={{ visibility: registerFormState.phase[1].telefono.select_local? "visible":"hidden" }}
                                    >
                                        <input
                                            id="telefono_codigo"
                                            type="text"
                                            value={registerFormState.phase[1].telefono.codigo}
                                            onChange={ e => {
                                            setRegisterFormState( prev => {
                                                    const newState = {... prev};
                                                    newState.phase[1] = {... prev.phase[1]};
                                                    newState.phase[1].telefono.local.codigo = e.target.value;
                                                    return newState;
                                                } );
                                            }} 
                                        />
                                        <input
                                            id="telefono_numero"
                                            type="text"
                                            value={registerFormState.phase[1].telefono.numero}
                                            onChange={ e => {
                                            setRegisterFormState( prev => {
                                                    const newState = {... prev};
                                                    newState.phase[1] = {... prev.phase[1]};
                                                    newState.phase[1].telefono.local.numero = e.target.value;
                                                    return newState;
                                                } );
                                            }} 
                                        />
                                        <label>
                                            Ext
                                            <input
                                                id="telefono_ext"
                                                type="text"
                                                value={registerFormState.phase[1].telefono.ext}
                                                onChange={ e => {
                                                setRegisterFormState( prev => {
                                                        const newState = {... prev};
                                                        newState.phase[1] = {... prev.phase[1]};
                                                        newState.phase[1].telefono.local.ext = e.target.value;
                                                        return newState;
                                                    } );
                                                }} 
                                            />
                                        </label>
                                    </div>

                                </div>   
                                
                                { telefonoRequired && <ErrorMessage message={t('registrar.errores.1.telefono_requerido')}/> }
                                { telefonoInvalid && <ErrorMessage message={t('registrar.errores.1.telefono_invalido')}/>}

                            </div>

                        </div>
                    </div>
                }

                <div id="nota_final" className="note">
                    <span className="required">*</span> {t('registrar.fases.1.nota_final')}
                </div>

            </div>
        );
    }

// Fase 2: idioma
const Fase2 = () => {
        const { t, i18n } = useTranslation();
        const {registerFormState, setRegisterFormState} = useContext(RegisterFormContext);

        const required = registerFormState.errors[2].option_required

        return(
            <div>
                <div id="fase2">
                    <label>
                        <input
                            type="radio"
                            value="english"
                            checked={ registerFormState.phase[2].idioma === 'english' }
                            onChange={ e => {
                                setRegisterFormState( prev => {
                                        const newState = {... prev};
                                        newState.phase[2].idioma = 'english';
                                        return newState;
                                    } );
                            }}
                        />
                        <div>
                            English
                        </div>
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="español"
                            checked={ registerFormState.phase[2].idioma === 'español' }
                            onChange={ e => {
                                setRegisterFormState( prev => {
                                        const newState = {... prev};
                                        newState.phase[2].idioma = 'español';
                                        return newState;
                                    } );
                            }}
                        />
                        <div>
                            Español
                        </div>
                    </label>
                </div>

                { required && <ErrorMessage message={t('registrar.errores.2.requerido')}/> }
            </div> 
        );
    }

// Fase 3: login data
const Fase3 = () => {
        const { t, i18n } = useTranslation();
        const {registerFormState, setRegisterFormState} = useContext(RegisterFormContext);

        const invalidEmail = registerFormState.errors[3].invalid_mail
        const emailExists = registerFormState.errors[3].mail_exists
        const invalidPassword = registerFormState.errors[3].invalid_password

        return(
            <div id="fase3">
                
                <div className="field">
                    <span className="label">
                        {t('registrar.fases.3.correo')+": "}
                    </span>
                    <input
                        type="text"
                        value={registerFormState.phase[3].correo}
                        onChange={ e => {
                        setRegisterFormState( prev => {
                                const newState = {... prev};
                                newState.phase[3] = {... prev.phase[3]};
                                newState.phase[3].correo = e.target.value;
                                return newState;
                            } );
                        }} 
                    />
                    <div>
                    { invalidEmail && <ErrorMessage message={t('registrar.errores.3.mail_invalido')}/>  }
                    { emailExists && <ErrorMessage message={t('registrar.errores.3.mail_exists')}/>  }
                    </div>
                </div>
                    
                

                <div className="field">
                    <span className="label">
                        {t('registrar.fases.3.clave')+": "}
                    </span>
                    <input
                        type="password"
                        onChange={ e => {
                        setRegisterFormState( prev => {
                                const newState = {... prev};
                                newState.phase[3] = {... prev.phase[3]};
                                newState.phase[3].clave = e.target.value;
                                return newState;
                            } );
                        }} 
                    />

                    { invalidPassword && <ErrorMessage message={t('registrar.errores.3.clave_invalida')}/>  }
                </div>
                <div className="field" id="newsletter">
                    <label>
                        <input
                            type="checkbox"
                            checked={registerFormState.phase[3].newsletter}
                            onChange={ e => {
                                setRegisterFormState( prev => {
                                    const newState = {... prev};
                                    newState.phase[3] = {... prev.phase[3]};
                                    newState.phase[3].newsletter = e.target.checked;
                                    return newState;
                                } );   
                            }}
                        />
                        {t('registrar.fases.3.newsletter')}
                    </label>
                </div>
            </div>
        );
    }

// Fase 4: frecuencia
const Fase4 = () => {
        const { t, i18n } = useTranslation();
        const {registerFormState, setRegisterFormState} = useContext(RegisterFormContext);

        const frecuencia_required = registerFormState.errors[4].frecuencia_required
        const servicio_required = registerFormState.errors[4].servicio_required
        const email_required = registerFormState.errors[4].email_required
        const social_required = registerFormState.errors[4].social_required
        const sms_required = registerFormState.errors[4].sms_required
        const other_required = registerFormState.errors[4].other_required
        const facebook_required = registerFormState.errors[4].facebook_required
        const means_required = registerFormState.errors[4].means_required

        const empty_field = email_required || social_required  || sms_required || other_required || facebook_required

        return(
            <div id="fase4">
                <div className="container title">
                    {t('registrar.fases.4.nota_frecuencia')}
                </div>

                <div id="frecuencias" className="container">

                    <label>
                        <input
                            type="radio"
                            value="semanal"
                            checked={ registerFormState.phase[4].frecuencia === 'semanal' }
                            onChange={ e => {
                                setRegisterFormState( prev => {
                                        const newState = {... prev};
                                        newState.phase[4] = {... prev.phase[4]};
                                        newState.phase[4].frecuencia = 'semanal';
                                        return newState;
                                    } );
                            }}
                        />
                        <div>
                            {t('registrar.fases.4.frecuencias.0')}
                        </div>
                    </label>

                    <label>
                        <input
                            type="radio"
                            value="bisemanal"
                            checked={ registerFormState.phase[4].frecuencia === 'bisemanal' }
                            onChange={ e => {
                                setRegisterFormState( prev => {
                                        const newState = {... prev};
                                        newState.phase[4] = {... prev.phase[4]};
                                        newState.phase[4].frecuencia = 'bisemanal';
                                        return newState;
                                    } );
                            }}
                        />
                        <div>
                            {t('registrar.fases.4.frecuencias.1')}
                        </div>
                    </label>

                    <label>
                        <input
                            type="radio"
                            value="mensual"
                            checked={ registerFormState.phase[4].frecuencia === 'mensual' }
                            onChange={ e => {
                                setRegisterFormState( prev => {
                                        const newState = {... prev};
                                        newState.phase[4] = {... prev.phase[4]};
                                        newState.phase[4].frecuencia = 'mensual';
                                        return newState;
                                    } );
                            }}
                        />
                        <div>
                            {t('registrar.fases.4.frecuencias.2')}
                        </div>
                    </label>

                    <label>
                        <input
                            type="radio"
                            value="otro"
                            checked={ registerFormState.phase[4].frecuencia === 'otro' }
                            onChange={ e => {
                                setRegisterFormState( prev => {
                                        const newState = {... prev};
                                        newState.phase[4] = {... prev.phase[4]};
                                        newState.phase[4].frecuencia = 'otro';
                                        return newState;
                                    } );
                            }}
                        />
                        <div>
                            {t('registrar.fases.4.frecuencias.3')}
                        </div>
                    </label>
                    { frecuencia_required && <ErrorMessage message={t('registrar.errores.4.requerido')}/> }
                </div>

                <div id="servicios" className="container">

                    <div className="title">
                        {t('registrar.fases.4.etiqueta_servicios')+":"}
                    </div>

                    <label>
                        <input
                            type="checkbox"
                            checked={registerFormState.phase[4].servicio_personal}
                            onChange={ e => {
                                setRegisterFormState( prev => {
                                    const newState = {... prev};
                                    newState.phase[4] = {... prev.phase[4]};
                                    newState.phase[4].servicio_personal = e.target.checked;
                                    return newState;
                                } );   
                            }}
                        />
                        {t('registrar.fases.4.servicios.0')}
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            checked={registerFormState.phase[4].servicio_profesional}
                            onChange={ e => {
                                setRegisterFormState( prev => {
                                    const newState = {... prev};
                                    newState.phase[4] = {... prev.phase[4]};
                                    newState.phase[4].servicio_profesional = e.target.checked;
                                    return newState;
                                } );   
                            }}
                        />
                        {t('registrar.fases.4.servicios.1')}
                    </label>
                    
                    { servicio_required && <ErrorMessage message={t('registrar.errores.4.requerido')}/> }

                </div>

                <div id="medios" className="container">
                    <div className="title">
                        {t('registrar.fases.4.etiqueta_medio')+": "}
                    </div>

                    <div className="field">
                        <label>
                            <input
                                type="checkbox"
                                checked={registerFormState.phase[4].usar_correo}
                                onChange={ e => {
                                    setRegisterFormState( prev => {
                                        const newState = {... prev};
                                        newState.phase[4] = {... prev.phase[4]};
                                        newState.phase[4].usar_correo = e.target.checked;
                                        return newState;
                                    } );   
                                }}
                            />
                            {t('registrar.fases.4.correo_personalizado')}
                        </label>
                        <input
                            type="text"
                            value={registerFormState.phase[4].correo}
                            style={{visibility: registerFormState.phase[4].usar_correo? "visible":"hidden"}}
                            onChange={ e => {
                                setRegisterFormState( prev => {
                                    const newState = {... prev};
                                    newState.phase[4] = {... prev.phase[4]};
                                    newState.phase[4].correo = e.target.value;
                                    return newState;
                                } );   
                            }}
                        />
                    </div>

                    <div className="field">
                        <label>
                            <input
                                type="checkbox"
                                checked={registerFormState.phase[4].redes}
                                onChange={ e => {
                                    setRegisterFormState( prev => {
                                        const newState = {... prev};
                                        newState.phase[4] = {... prev.phase[4]};
                                        newState.phase[4].redes = e.target.checked;
                                        return newState;
                                    } );   
                                }}
                            />
                            {t('registrar.fases.4.redes')}
                        </label>
                        
                        <div style={{visibility: registerFormState.phase[4].redes? "visible":"hidden"}}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={registerFormState.phase[4].facebook}
                                    onChange={ e => {
                                        setRegisterFormState( prev => {
                                            const newState = {... prev};
                                            newState.phase[4] = {... prev.phase[4]};
                                            newState.phase[4].facebook = e.target.checked;
                                            return newState;
                                        } );   
                                    }}
                                />
                                Facebook
                            </label>

                            <label>
                                <input
                                    type="checkbox"
                                    checked={registerFormState.phase[4].twitter}
                                    onChange={ e => {
                                        setRegisterFormState( prev => {
                                            const newState = {... prev};
                                            newState.phase[4] = {... prev.phase[4]};
                                            newState.phase[4].twitter = e.target.checked;
                                            return newState;
                                        } );   
                                    }}
                                />
                                Twitter
                            </label>
                        </div>

                    </div>

                    <div className="field">
                        <label>
                            <input
                                type="checkbox"
                                checked={registerFormState.phase[4].usar_sms}
                                onChange={ e => {
                                    setRegisterFormState( prev => {
                                        const newState = {... prev};
                                        newState.phase[4] = {... prev.phase[4]};
                                        newState.phase[4].usar_sms = e.target.checked;
                                        return newState;
                                    } );   
                                }}
                            />
                            {t('registrar.fases.4.sms')}
                        </label>
                        <input
                            style={{visibility: registerFormState.phase[4].usar_sms? "visible":"hidden"}}
                            type="text"
                            value={registerFormState.phase[4].sms}
                            onChange={ e => {
                                setRegisterFormState( prev => {
                                    const newState = {... prev};
                                    newState.phase[4] = {... prev.phase[4]};
                                    newState.phase[4].sms = e.target.value;
                                    return newState;
                                } );   
                            }}
                        />
                    </div>

                    <div className="field">
                        <label>
                            <input
                                type="checkbox"
                                checked={registerFormState.phase[4].usar_otros}
                                onChange={ e => {
                                    setRegisterFormState( prev => {
                                        const newState = {... prev};
                                        newState.phase[4] = {... prev.phase[4]};
                                        newState.phase[4].usar_otros = e.target.checked;
                                        return newState;
                                    } );   
                                }}
                            />
                            {t('registrar.fases.4.otros')}
                        </label>
                        <input
                            style={{visibility: registerFormState.phase[4].usar_otros? "visible":"hidden"}}
                            type="text"
                            value={registerFormState.phase[4].otros}
                            onChange={ e => {
                                setRegisterFormState( prev => {
                                    const newState = {... prev};
                                    newState.phase[4] = {... prev.phase[4]};
                                    newState.phase[4].otros = e.target.value;
                                    return newState;
                                } );   
                            }}
                        />
                    </div>

                    <div className="field">
                        <label>
                            <input
                                type="checkbox"
                                checked={registerFormState.phase[4].usar_facebook}
                                onChange={ e => {
                                    setRegisterFormState( prev => {
                                        const newState = {... prev};
                                        newState.phase[4] = {... prev.phase[4]};
                                        newState.phase[4].usar_facebook = e.target.checked;
                                        return newState;
                                    } );   
                                }}
                            />
                            {t('registrar.fases.4.facebook')}
                        </label>
                        <input
                            type="text"
                            value={registerFormState.phase[4].facebook_spec}
                            style={{visibility: registerFormState.phase[4].usar_facebook? "visible":"hidden"}}
                            onChange={ e => {
                                setRegisterFormState( prev => {
                                    const newState = {... prev};
                                    newState.phase[4] = {... prev.phase[4]};
                                    newState.phase[4].facebook_spec = e.target.value;
                                    return newState;
                                } );   
                            }}
                        />
                    </div>
                
                { means_required && <ErrorMessage message={t('registrar.errores.4.requerido')}/> }
                { empty_field  && <ErrorMessage message={t('registrar.errores.4.especificar_vacio')}/> }

                </div>
            </div>
        );
    }


const Fase5 = () => {
        const { t, i18n } = useTranslation();
        const {registerFormState, setRegisterFormState} = useContext(RegisterFormContext);
        const [banks, setBanks] = useState([]);
        const code = registerFormState.phase[5].client_code
        const countries = registerFormState.countries;
        const bankNameRequired = registerFormState.errors[5].banco_requerido
        const bankNameInvalid = registerFormState.errors[5].banco_minimo
        const bankDestinyInvalid = registerFormState.errors[5].destino_requerido

        let countryCode = registerFormState.phase[5].codigo_pais_banco

        useEffect(() => {
            const fetchBanks = async () => {
                await axios.get('http://127.0.0.1:8000/banks/')
                    .then(({data}) => {
                        setBanks(data); 
                    }); 
            }

            fetchBanks()
        }, [])


        return(
            <div id="fase5">
                
                <div className="container">
                    <div id="codigo_cliente">
                        {t('registrar.fases.5.codigo')}:  <span className="codigo"> {code} </span>
                    </div>

                    <div className="nota">
                        {t('registrar.fases.5.nota.0')} <span>{t('registrar.fases.5.nota.1')}</span> {t('registrar.fases.5.nota.2')}
                    </div>
                </div>


                <div className="title">
                    {t('registrar.fases.5.titulo')}
                </div>
                <div className="descripcion">
                    {t('registrar.fases.5.descripcion')}
                </div>

                <div className="container" id="bancos">
                    <div id="banco_origen" className="container_banco">
                        
                        <label className="field">
                            <div>
                            <div className="etiqueta">
                                {t('registrar.fases.5.banco_origen')}
                            </div>
                            <input
                                type="text"
                                value={registerFormState.phase[5].banco_origen}
                                onChange={ e => {
                                    setRegisterFormState( prev => {
                                        const newState = {... prev};
                                        newState.phase[5] = {... prev.phase[5]};
                                        newState.phase[5].banco_origen = e.target.value;
                                        return newState;
                                    } );   
                                }}
                            />
                            </div>
                        
                        </label>
                        
                        
                        <label className="field">
                            <div className="etiqueta">
                                {t('registrar.fases.5.pais')}
                            </div>

                            <select 
                                    style={{width: '100%' , boxSizing: 'border-box'}}
                                    name="select" 
                                    value={registerFormState.phase[5].pais}
                                    onChange={ e => {
                                        const country =  JSON.parse(e.target.options[e.target.selectedIndex].getAttribute('data-country'))
                                        countryCode = country.code
                                        setRegisterFormState( prev => {
                                            const newState = {... prev};
                                            newState.phase[5] = {... prev.phase[5]};
                                            newState.phase[5].pais = e.target.value;
                                            newState.phase[5].codigo_pais_banco = countryCode;
                                            return newState;
                                        } )
                                    }}>

                                    {countries?.map( country => {
                                        return (<option key={country.code} value={country.name} data-country={JSON.stringify(country)}> {country.name}</option>);
                                    })}
                                </select>
                        </label>
                    </div>

                    <div id="banco_destino" className="container_banco">
                        <label className="field">
                            <div className="etiqueta">
                                {t('registrar.fases.5.banco_destino')}
                            </div>
                            <select 
                                style={{width: '20vw'}}
                                name="select" 
                                value={registerFormState.phase[5].banco_destino}
                                onChange={ e => {
                                    setRegisterFormState( prev => {
                                        const newState = {... prev};
                                        newState.phase[5] = {... prev.phase[5]};
                                        newState.phase[5].banco_destino = e.target.value;
                                        return newState;
                                    } );   
                                }}>
                                
                                <option value="" disabled> {t('registrar.fases.5.seleccionar_destino')} </option>

                                {banks.map( bank => { 
                                    const value = bank.name + " - " + "Cuenta nro: " + bank.account + " - " + "Código SWIFT: " + bank.swift_code
                                    return (<option key={bank.account} value={value}>{value}</option>);
                                })}

                            </select>
                        </label>
                    </div>       
                </div>
                
                { bankNameRequired && <ErrorMessage message={t('registrar.errores.5.requerido')}/> }
                { bankNameInvalid && <ErrorMessage message={t('registrar.errores.5.minimo')}/> }
                { bankDestinyInvalid && <ErrorMessage message={t('registrar.errores.5.seleccion_requerida')}/> } 

                <div className="container" id="info_container">
                    <div id="sugerencias">
                        <p className="cont_title">{t('registrar.fases.5.sugerencia_titulo')}</p>
                        <p>{t('registrar.fases.5.sugerencia_cuerpo')}</p>
                    </div>

                    <div id="horario">
                        <p className="cont_title">{t('registrar.fases.5.horario_titulo')}</p>
                        <p className="cont_subtitle">{t('registrar.fases.5.dias')}</p>
                        <p id="horas">{t('registrar.fases.5.horas')}</p>
                        <br/>
                        <p className="cont_title">{t('registrar.fases.5.telefono')}</p>
                        <p>0414-389-74-44</p>
                        <p>0058-0212-362-82-68</p>
                        <p> <span className="cont_title">{t('registrar.fases.5.correo')}: </span> nirvana01@gmail.com </p>
                    </div>
                </div>


            </div>
        );
    }




const registrarUsuario = () => {
    
    const {registerFormState, setRegisterFormState} = useContext(RegisterFormContext);
    
    const userData = {...registerFormState};
    let postBody = {};

    // De donde nos conoce?
    found_app_by = {
        website: userData.phase[0].website,
        social_network: {
            selected: userData.phase[0].social_network,
            facebook: userData.phase[0].facebook,
            twitter: userData.phase[0].twitter,
            other: userData.phase[0].social_network_other,
            other_spec: userData.phase[0].social_network_other_spec
        },
        friends: userData.phase[0].friends,
        other:{
            selected: userData.phase[0].other,
            radio: userData.phase[0].radio,
            radio_spec: userData.phase[0].radio_spec,
            press: userData.phase[0].press,
            press_spec: userData.phase[0].press_spec,
            other: userData.phase[0].other,
            other_spec: userData.phase[0].other_spec
        }
    };

    postBody.found_app_by = JSON.stringify(found_app_by);

    // Registrar Usuario
    postBody.type_user = userData.phase[1].tipo_usuario;

    if( postBody.type_user == "natural" ){
    
        postBody.country = userData.phase[1].natural.pais;
        postBody.first_name = userData.phase[1].natural.nombre;
        postBody.last_name = userData.phase[1].natural.apellido;
        postBody.dni = userData.phase[1].natural.identification;
        postBody.contact_email = userData.phase[1].natural.correo;

        if(userData.phase[1].telefono.tipo == "movil"){
            postBody.cellphone = userData.phase[1].telefono.codigo + userData.phase[1].telefono.numero;
        }else{
            postBody.telephone = userData.phase[1].telefono.codigo + userData.phase[1].telefono.numero + userData.phase[1].telefono.ext;
        }
    
    }else if( postBody.type_user == "enterprise" ){

        postBody.country = userData.phase[1].empresa.pais;
        postBody.company_name = userData.phase[1].empresa.nombre_empresa;
        postBody.rif = userData.phase[1].empresa.razon_rif;
        postBody.city = userData.phase[1].empresa.ciudad;
        postBody.address = userData.phase[1].empresa.direccion;
        postBody.representant_email = userData.phase[1].empresa.correo;
        postBody.representant_name = userData.phase[1].empresa.nombre_representante;

        if(userData.phase[1].telefono.tipo == "movil"){
            postBody.representant_cellphone = userData.phase[1].telefono.codigo + userData.phase[1].telefono.numero;
        }else{
            postBody.representant_telephone = userData.phase[1].telefono.codigo + userData.phase[1].telefono.numero + userData.phase[1].telefono.ext;
        }

    }

    // Idioma
    postBody.language = userData.phase[2].idioma;

    // Datos de Login
    postBody.email = userData.phase[3].correo;
    postBody.password = userData.phase[3].clave;
    postBody.want_inform = userData.phase[3].newsletter;

    // Newsletter
    postBody.frecuency_to_inform = userData.phase[4].frecuencia;

    postBody.services_interest = {
        available_personal: userData.phase[4].servicio_personal,
        professional_advice: userData.phase[4].servicio_profesional
    };

    postBody.email_to_inform = userData.phase[4].correo;

    postBody.social_media_to_inform = {
        Facebook: userData.phase[4].facebook,
        Twitter: userData.phase[4].twitter
    }
    
    postBody.phone_to_inform = userData.phase[4].sms
    postBody.other_to_inform = userData.phase[4].otros
    postBody.facebook_to_inform = userData.phase[4].facebook_spec

    // Billing
    postBody.bank_origin = userData.phase[5].banco_origen;
    postBody.bank_country = userData.phase[5].pais;

    // send request
    const fetchData = async () => {

        const url = 'http://localhost:8000/users'
        try {
            
            const response = await fetch( url,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(postBody),
                }
            );
    
            if (response.ok) {
                // Request was successful
                console.log('POST request successful');
                console.log(response);
            } else {
                // Request failed
                console.log('POST request failed');
            }
    
        } catch (error) {
            console.log("error registrando");
            console.log(error);
        }

    };

    return null;

}

const botonRegistrar = () => {
    const { t, i18n } = useTranslation();
    const {registerFormState, setRegisterFormState} = useContext(RegisterFormContext);
    const {authState, setAuthState} = useContext(AuthContext);
    const navigate = useNavigate();

    const userData = {...registerFormState};
    let postBody = {};
    
    // De donde nos conoce?
    let found_app_by = {
        website: userData.phase[0].website,
        social_network: {
            selected: userData.phase[0].social_network,
            facebook: userData.phase[0].facebook,
            twitter: userData.phase[0].twitter,
            other: userData.phase[0].social_network_other,
            other_spec: userData.phase[0].social_network_other_spec
        },
        friends: userData.phase[0].friends,
        other:{
            selected: userData.phase[0].other,
            radio: userData.phase[0].radio,
            radio_spec: userData.phase[0].radio_spec,
            press: userData.phase[0].press,
            press_spec: userData.phase[0].press_spec,
            other: userData.phase[0].other,
            other_spec: userData.phase[0].other_spec
        }
    };

    postBody.found_app_by = found_app_by;

    // Registrar Usuario
    postBody.type_user = userData.phase[1].tipo_usuario;

    if( postBody.type_user == "natural" ){
        postBody.country = userData.phase[1].natural.codigo_pais;
        postBody.first_name = userData.phase[1].natural.nombre;
        postBody.last_name = userData.phase[1].natural.apellido;
        postBody.dni = userData.phase[1].natural.identificacion;
        postBody.contact_email = userData.phase[1].natural.correo;

        if(userData.phase[1].telefono.tipo == "movil"){
            postBody.cellphone = userData.phase[1].telefono.codigo + userData.phase[1].telefono.numero;
        }else{
            postBody.telephone = userData.phase[1].telefono.codigo + userData.phase[1].telefono.numero + userData.phase[1].telefono.ext;
        }
    
    }else if( postBody.type_user == "enterprise" ){

        postBody.country = userData.phase[1].empresa.pais;
        postBody.company_name = userData.phase[1].empresa.nombre_empresa;
        postBody.rif = userData.phase[1].empresa.razon_rif;
        postBody.city = userData.phase[1].empresa.ciudad;
        postBody.address = userData.phase[1].empresa.direccion;
        postBody.representant_email = userData.phase[1].empresa.correo;
        postBody.representant_name = userData.phase[1].empresa.nombre_representante;

        if(userData.phase[1].telefono.tipo == "movil"){
            postBody.representant_cellphone = userData.phase[1].telefono.codigo + userData.phase[1].telefono.numero;
        }else{
            postBody.representant_telephone = userData.phase[1].telefono.codigo + userData.phase[1].telefono.numero + userData.phase[1].telefono.ext;
        }

    }

    // Idioma
    postBody.language = userData.phase[2].idioma;
    if(postBody.language === "español")
        postBody.language = "es"
    else if(postBody.language === "english")
        postBody.language = "en"

    // Datos de Login
    postBody.email = userData.phase[3].correo;
    postBody.password = userData.phase[3].clave;
    postBody.want_inform = userData.phase[3].newsletter;

    // Newsletter
    postBody.frecuency_to_inform = userData.phase[4].frecuencia;

    postBody.services_interest = {
        available_personal: userData.phase[4].servicio_personal,
        professional_advice: userData.phase[4].servicio_profesional
    };

    postBody.email_to_inform = userData.phase[4].correo;

    postBody.social_media_to_inform = {
        Facebook: userData.phase[4].facebook,
        Twitter: userData.phase[4].twitter
    }
    
    postBody.phone_to_inform = userData.phase[4].sms
    postBody.other_to_inform = userData.phase[4].otros
    postBody.facebook_to_inform = userData.phase[4].facebook_spec

    // Billing
    postBody.bank_origin = userData.phase[5].banco_origen;
    postBody.bank_country = userData.phase[5].codigo_pais_banco;
    postBody.client_code= userData.phase[5].client_code.toString();

    return(
        <button
            id="boton_registrar"
            
            onClick={
                async () => {

                    // Validar la última fase
                    let valid = true
                    const selection = registerFormState.phase[5]
                    
                    const stringIsValid = (string) => {
                        if(string.length < 2){
                            return false
                        }
                        const regex = new RegExp('^[a-zA-Z]')    
                        return regex.test(string);
                    }

                    // Validar nombre del banco
                    if(!selection.banco_origen){
                        registerFormState.errors[5].banco_requerido = true
                        registerFormState.errors[5].banco_minimo = false
                        valid = false
                    } else if(!stringIsValid(selection.banco_origen)){
                        registerFormState.errors[5].banco_requerido = false
                        registerFormState.errors[5].banco_minimo = true
                        valid = false
                    } else {
                        registerFormState.errors[5].banco_requerido = false
                        registerFormState.errors[5].banco_minimo = false
                    }

                    if(!selection.banco_destino){
                        registerFormState.errors[5].destino_requerido = true
                        valid = false
                    } else {
                        registerFormState.errors[5].destino_requerido = false
                    }

                    if(!valid){
                        setRegisterFormState( prev => {
                            const newState = {... prev};
                            return newState;
                        } );
                        return;
                    }

                    // Enviar datos
                    const url = 'http://127.0.0.1:8000/users/'
                    try {
                        const response = await axios.post(url, postBody)

                        const token = response.data.token 
                        const id = response.data.id
    
                        setAuthState(
                            () => {
                                return {
                                    token: token,
                                    id: id,
                                    logged_in: true,
                                    email: postBody.contact_email,
                                    name: postBody.first_name + " " + postBody.last_name,
                                    lang: postBody.language
                                }
                            }
                        );
    
                        i18n.changeLanguage(authState.lang);
        
                        navigate('/');

                    } catch (error) {
                        console.log(error);
                    }
                }
            }
            >
            {t('multiform.registrar')}
        </button>
    );
}

const useValidarRegistrar = () => {
    const {registerFormState, setRegisterFormState} = useContext(RegisterFormContext);

    useEffect(() => {
        const fetchCountries = async () => {
            const [names, codes] = await getAllCountries();
            const pairs = names.map((name, index) => {
                return {
                    "name": name, 
                    "code": codes[index]
                }
            })
            registerFormState.countries = pairs;

            let cities = await getCitiesInCountry(pairs[0].code)
            cities  = [...new Set(cities)];
            registerFormState.cities = cities
        };


        fetchCountries()
    }, [])

    const uniqueEmail = async (email) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/users/unique_email/', {"email": email })
            registerFormState.phase[5].client_code = response.data.client_code
            return true
        } catch(error) {
            return false
        } 
    }

    const stringIsValid = (string) => {
        if(string.length < 2){
            return false
        }
        const regex = new RegExp('^[a-zA-Z]')    
        return regex.test(string);
    }

    const idIsValid = (string) => {
        if(string.length < 5){
            return false
        }
        const regex = new RegExp('^[0-9a-zA-Z]')    
        return regex.test(string);
    }

    const validPassword = (password) =>{
        if(password.length >= 8)
            return true
        else 
            return false
    }

    const phoneIsValid = (number) => {
        if(number.length < 4)
            return false
        
        const regex = new RegExp('^[0-9]*$')    
        return regex.test(number);
    }

    const validate = async (currentStage) => {

        let valid = true;
        if(currentStage == 0){
            const selection = registerFormState.phase[0]
    
            if(!selection.website && !selection.social_network && !selection.friends && !selection.other){
                // No se seleccionó nada
                registerFormState.errors[0] = Object.values(registerFormState.errors[0]).map(() => false)
                registerFormState.errors[0].option_required = true;
                valid = false;
            } else if((selection.social_network_other && ! selection.social_network_other_spec) 
                    || (selection.other_other && !selection.other_other_spec) || (selection.radio && !selection.radio_spec) || (selection.press && !selection.press_spec)){
                // Se seleccionó un campo a especificar, pero no se escribió nada
                registerFormState.errors[0] = Object.values(registerFormState.errors[0]).map(() => false)
                registerFormState.errors[0].other_empty = true
                valid = false;
            } else if (selection.social_network && !selection.facebook 
                && !selection.twitter && !selection.instagram && !selection.social_network_other ){
                // Se seleccionó "Redes sociales", pero no se selecciono una red social
                registerFormState.errors[0] = Object.values(registerFormState.errors[0]).map(() => false)
                registerFormState.errors[0].social_required = true 
                valid = false;
            } else if (selection.other && !selection.radio && !selection.press && !selection.other_other){
                // Se seleccionó un "Otro", pero no se selecciono una opcion
                registerFormState.errors[0] = Object.values(registerFormState.errors[0]).map(() => false)
                registerFormState.errors[0].other_required = true 
                valid = false;
            }
             else {
                registerFormState.errors[0] = Object.values(registerFormState.errors[0]).map(() => false)
                valid = true;
            }
        } else if(currentStage == 1){
            const selection = registerFormState.phase[1]
            const type = selection.tipo_usuario
            
            if(type === "natural"){
                const user = selection.natural
    
                // Validar nombre
                if(!user.nombre){
                    registerFormState.errors[1].name_required = true
                    registerFormState.errors[1].name_invalid = false
                    valid = false
                } else if (!stringIsValid(user.nombre)) {
                    registerFormState.errors[1].name_required = false
                    registerFormState.errors[1].name_invalid = true
                    valid = false
                } else {
                    registerFormState.errors[1].name_required = false
                    registerFormState.errors[1].name_invalid = false               
                }
    
                // Validar apellido
                if(!user.apellido){
                    registerFormState.errors[1].last_name_required = true
                    registerFormState.errors[1].last_name_invalid = false
                    valid = false
                } else if (!stringIsValid(user.apellido)) {
                    registerFormState.errors[1].last_name_required = false
                    registerFormState.errors[1].last_name_invalid = true
                    valid = false
                } else {
                    registerFormState.errors[1].last_name_required = false
                    registerFormState.errors[1].last_name_invalid = false
                }
                
                //Validar id
                if(!user.identificacion){
                    registerFormState.errors[1].id_required = true
                    registerFormState.errors[1].id_invalid = false
                    valid = false
                } else if (!idIsValid(user.identificacion)) {
                    registerFormState.errors[1].id_required = false
                    registerFormState.errors[1].id_invalid = true
                    valid = false
                } else {
                    registerFormState.errors[1].id_required = false
                    registerFormState.errors[1].id_invalid = false
                }
    
                // Validar email
                if(!user.correo){
                    registerFormState.errors[1].email_required = true
                    registerFormState.errors[1].email_invalid = false
                    valid = false
                } else if(!validator.isEmail(user.correo)){
                    registerFormState.errors[1].email_required = false
                    registerFormState.errors[1].email_invalid = true
                    valid = false
                } else {
                    registerFormState.errors[1].email_required = false
                    registerFormState.errors[1].email_invalid = false
                }

                // Validar telefono
                if(!selection.telefono.numero){
                    registerFormState.errors[1].telefono_required = true
                    registerFormState.errors[1].telefono_invalid = false
                    valid = false
                } else if(!phoneIsValid(selection.telefono.numero)){
                    registerFormState.errors[1].telefono_required= false
                    registerFormState.errors[1].telefono_invalid = true
                    valid = false
                } else {
                    registerFormState.errors[1].telefono_required = false
                    registerFormState.errors[1].telefono_invalid = false
                }
            } else if(type === "enterprise"){
                const user = selection.empresa
    
                // Validar nombre de empresa
                if(!user.nombre_empresa){
                    registerFormState.errors[1].business_required = true
                    registerFormState.errors[1].business_invalid = false
                    valid = false
                } else if (!stringIsValid(user.nombre_empresa)) {
                    registerFormState.errors[1].business_required = false
                    registerFormState.errors[1].business_invalid = true
                    valid = false
                } else {
                    registerFormState.errors[1].business_required = false
                    registerFormState.errors[1].business_invalid = false
                }
    
                // Validar rif
                if(!user.razon_rif){
                    registerFormState.errors[1].rif_required = true
                    registerFormState.errors[1].rif_invalid = false
                    valid = false
                } else if (!stringIsValid(user.razon_rif)) {
                    registerFormState.errors[1].rif_required= false
                    registerFormState.errors[1].rif_invalid = true
                    valid = false
                } else {
                    registerFormState.errors[1].rif_required = false
                    registerFormState.errors[1].rif_invalid = false
                }
                
                //Validar address
                if(!user.direccion){
                    registerFormState.errors[1].address_required = true
                    valid = false
                } else {
                    registerFormState.errors[1].address_required = false
                }
    
                // Validar nombre representante
                if(!user.nombre_representante){
                    registerFormState.errors[1].rep_name_required = true
                    registerFormState.errors[1].rep_name_invalid= false
                    valid = false
                } else if(!stringIsValid(user.nombre_representante)){
                    registerFormState.errors[1].rep_name_required = false
                    registerFormState.errors[1].rep_name_invalid = true
                    valid = false
                } else {
                    registerFormState.errors[1].rep_name_required = false
                    registerFormState.errors[1].rep_name_invalid = false
                }
    
                // Validar email representante
                if(!user.correo){
                    registerFormState.errors[1].rep_email_required = true
                    registerFormState.errors[1].rep_email_invalid= false
                    valid = false
                } else if(!validator.isEmail(user.correo)){
                    registerFormState.errors[1].rep_email_required = false
                    registerFormState.errors[1].rep_email_invalid = true
                    valid = false
                } else {
                    registerFormState.errors[1].rep_email_required = false
                    registerFormState.errors[1].rep_email_invalid = false
                }

                // Validar telefono
                if(!selection.telefono.numero){
                    registerFormState.errors[1].telefono_required = true
                    registerFormState.errors[1].telefono_invalid = false
                    valid = false
                } else if(!phoneIsValid(selection.telefono.numero)){
                    registerFormState.errors[1].telefono_required= false
                    registerFormState.errors[1].telefono_invalid = true
                    valid = false
                } else {
                    registerFormState.errors[1].telefono_required = false
                    registerFormState.errors[1].telefono_invalid = false
                }
            }

        } else if(currentStage == 2){
            const selection = registerFormState.phase[2]
            if(!selection.idioma){
                registerFormState.errors[2].option_required = true
                valid = false
            } else {
                registerFormState.errors[2].option_required = false
            }
        }
        else if(currentStage == 3){
            const email = registerFormState.phase[3].correo
            const password = registerFormState.phase[3].clave

            // Validar correo
            if(validator.isEmail(email)){
                try{
                    const unique = await uniqueEmail(email)
                    if(!unique){
                        registerFormState.errors[3].invalid_mail = false
                        registerFormState.errors[3].mail_exists = true
                        valid = false
                    } else{
                        registerFormState.errors[3].invalid_mail = false
                        registerFormState.errors[3].mail_exists = false
                    }
                } catch (error) {
                    registerFormState.errors[3].mail_exists = false
                    registerFormState.errors[3].invalid_mail = true
                    valid = false
                }
            } else {
                registerFormState.errors[3].invalid_mail = true
                valid = false
            }
    
            // Validar contraseña
            if(!validPassword(password)){
                registerFormState.errors[3].invalid_password = true
                valid = false
            } else {
                registerFormState.errors[3].invalid_password = false
            }

        } else if (currentStage == 4){
            const selection = registerFormState.phase[4]
    
            if(!selection.frecuencia){
                // No se seleccionó una frecuencia
                registerFormState.errors[4].frecuencia_required = true;
                valid = false;
            } else {
                registerFormState.errors[4].frecuencia_required = false;
            }
            
            if(!selection.servicio_personal && !selection.servicio_profesional){
                // No se selecciono un servicio de interes
                registerFormState.errors[4].servicio_required = true
                valid = false;
            } else {
                registerFormState.errors[4].servicio_required = false
            }
            

            if(!selection.usar_correo && !selection.redes && !selection.usar_sms 
                && !selection.usar_otros && !selection.usar_facebook){
                    registerFormState.errors[4].means_required = true
                    valid = false;
            } else {
                registerFormState.errors[4].means_required = false
            }


            if (selection.usar_correo && !selection.correo ){
                // Se seleccionó "Email", pero no se esepecificó
                registerFormState.errors[4].email_required = true 
                valid = false;
            } else{
                registerFormState.errors[4].email_required = false
            } 
            
            if (selection.redes && !selection.facebook && !selection.twitter){
                // Se seleccionó un "Social Networks", pero no se especificó
                registerFormState.errors[4].social_required = true 
                valid = false;
            } else { 
                registerFormState.errors[4].social_required = false
            }
            
            if (selection.usar_sms && !selection.sms){
                // Se seleccionó un "SMS", pero no se especificó
                registerFormState.errors[4].sms_required = true 
                valid = false;
            } else {
                registerFormState.errors[4].sms_required = false
            }
            
            if (selection.usar_otros && !selection.otros){
                // Se seleccionó un "Other", pero no se especificó
                registerFormState.errors[4].other_required = true 
                valid = false;
            } else {
                registerFormState.errors[4].other_required = false
            }
            
            if (selection.usar_facebook && !selection.facebook_spec){
                // Se seleccionó un "Facebook", pero no se especificó
                registerFormState.errors[4].facebook_required = true 
                valid = false;
            } else {
                registerFormState.errors[4].facebook_required = false
            }
        }

        if(!valid){
            setRegisterFormState( prev => {
                const newState = {... prev};
                return newState;
            } );
        }
        
        return valid
    }

    return { validate }
}


const FasesRegistrar = [Fase0, Fase1, Fase2, Fase3, Fase4, Fase5];

export {FasesRegistrar, registrarUsuario, botonRegistrar, useValidarRegistrar};