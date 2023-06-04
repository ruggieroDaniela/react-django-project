import React, { useContext, useEffect, useState } from "react";
import { RegisterFormContext } from "../context/RegisterFormContext";
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { getAllCountries, getCitiesInCountry} from "../components/dataFetchers/PaisDataFetcher";

import "../styles/Registrar.scss"

// Fase 0: de donde nos conoces?
const Fase0 = () =>
    {

        const { t, i18n } = useTranslation();
        const {registerFormState, setRegisterFormState} = useContext(RegisterFormContext);

        return(
        <>
            <div id="fase0">
                <div className="descripcion">
                    {t('registrar.fases.0.descripcion')}
                </div>

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
                                    value={registerFormState.phase[0].social_network_other}
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

        const [countries, setCountries] = useState([]);
        const [cities, setCities] = useState([]);
        const [countryCode, setCountryCode] = useState("");

        useEffect(() => {
            const fetchCountries = async () => {
                const [names, codes] = await getAllCountries();
                const pairs = names.map((name, index) => {
                    return {
                        "name": name, 
                        "code": codes[index]
                    }
                })
                setCountries( pairs );
            };

            fetchCountries();
        }, [])

        useEffect(() => {
            const fetchCities = async () => {
                if(countryCode != ""){
                    let names = await getCitiesInCountry(countryCode);
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
                                    setRegisterFormState( prev => {
                                        const newState = {... prev};
                                        newState.phase[1] = {... prev.phase[1]};
                                        newState.phase[1].natural.pais = e.target.value;
                                        return newState;
                                    } )
                                }}>
                                
                                <option value="" disabled> {t('registrar.fases.1.seleccionar_pais')} </option>

                                {countries?.map( country => {
                                    return (<option key={country.name} value={country.name}>{country.name}</option>);
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
                                            type="radio"
                                            value="movil"
                                            checked={ registerFormState.phase[1].telefono.tipo === 'movil' }
                                            onChange={ e => {
                                                setRegisterFormState( prev => {
                                                        const newState = {... prev};
                                                        newState.phase[1] = {... prev.phase[1]};
                                                        newState.phase[1].telefono.tipo = 'movil';
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
                                            type="radio"
                                            value="local"
                                            checked={ registerFormState.phase[1].telefono.tipo === 'local' }
                                            onChange={ e => {
                                                setRegisterFormState( prev => {
                                                        const newState = {... prev};
                                                        newState.phase[1] = {... prev.phase[1]};
                                                        newState.phase[1].telefono.tipo = 'local';
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
                                    style={{ visibility: registerFormState.phase[1].telefono.tipo === ""? "hidden":"visible" }}
                                >
                                    <input
                                        id="telefono_codigo"
                                        type="text"
                                        value={registerFormState.phase[1].telefono.codigo}
                                        onChange={ e => {
                                        setRegisterFormState( prev => {
                                                const newState = {... prev};
                                                newState.phase[1] = {... prev.phase[1]};
                                                newState.phase[1].telefono.codigo = e.target.value;
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
                                                newState.phase[1].telefono.numero = e.target.value;
                                                return newState;
                                            } );
                                        }} 
                                    />
                                    <label style={{ visibility: registerFormState.phase[1].telefono.tipo === "local"? "visible":"hidden" }}>
                                        Ext
                                        <input
                                            id="telefono_ext"
                                            type="text"
                                            value={registerFormState.phase[1].telefono.ext}
                                            onChange={ e => {
                                            setRegisterFormState( prev => {
                                                    const newState = {... prev};
                                                    newState.phase[1] = {... prev.phase[1]};
                                                    newState.phase[1].telefono.ext = e.target.value;
                                                    return newState;
                                                } );
                                            }} 
                                        />
                                    </label>
                                </div>
                            </div>   
                            
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
                                            newState.phase[1].empresa.pais = country.name;
                                            return newState;
                                        } )
                                    }}>
                                    
                                    <option value="" disabled> {t('registrar.fases.1.seleccionar_pais')} </option>

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
                                    
                                    <option value="" disabled> {t('registrar.fases.1.seleccionar_ciudad')} </option>

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
                                                type="radio"
                                                value="movil"
                                                checked={ registerFormState.phase[1].telefono.tipo === 'movil' }
                                                onChange={ e => {
                                                    setRegisterFormState( prev => {
                                                            const newState = {... prev};
                                                            newState.phase[1] = {... prev.phase[1]};
                                                            newState.phase[1].telefono.tipo = 'movil';
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
                                                type="radio"
                                                value="local"
                                                checked={ registerFormState.phase[1].telefono.tipo === 'local' }
                                                onChange={ e => {
                                                    setRegisterFormState( prev => {
                                                            const newState = {... prev};
                                                            newState.phase[1] = {... prev.phase[1]};
                                                            newState.phase[1].telefono.tipo = 'local';
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
                                        style={{ visibility: registerFormState.phase[1].telefono.tipo === ""? "hidden":"visible" }}
                                    >
                                        <input
                                            id="telefono_codigo"
                                            type="text"
                                            value={registerFormState.phase[1].telefono.codigo}
                                            onChange={ e => {
                                            setRegisterFormState( prev => {
                                                    const newState = {... prev};
                                                    newState.phase[1] = {... prev.phase[1]};
                                                    newState.phase[1].telefono.codigo = e.target.value;
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
                                                    newState.phase[1].telefono.numero = e.target.value;
                                                    return newState;
                                                } );
                                            }} 
                                        />
                                        <label style={{ visibility: registerFormState.phase[1].telefono.tipo === "local"? "visible":"hidden" }}>
                                            Ext
                                            <input
                                                id="telefono_ext"
                                                type="text"
                                                value={registerFormState.phase[1].telefono.ext}
                                                onChange={ e => {
                                                setRegisterFormState( prev => {
                                                        const newState = {... prev};
                                                        newState.phase[1] = {... prev.phase[1]};
                                                        newState.phase[1].telefono.ext = e.target.value;
                                                        return newState;
                                                    } );
                                                }} 
                                            />
                                        </label>
                                    </div>
                                </div>   
                                
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

        return(
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
        );
    }

// Fase 3: login data
const Fase3 = () => {
        const { t, i18n } = useTranslation();
        const {registerFormState, setRegisterFormState} = useContext(RegisterFormContext);

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

                </div>
            </div>
        );
    }


const Fase5 = () => {
        const { t, i18n } = useTranslation();
        const [banks, setBanks] = useState([]);
        const {registerFormState, setRegisterFormState} = useContext(RegisterFormContext);

        const fetchBanks= async () => {
            const { data } = await axios.get('http://127.0.0.1:8000/banks/'); 
            setBanks(data)  
        }

        useEffect(() => {
            fetchBanks()
        }, []);

        return(
            <div id="fase5">
                
                <div className="container">
                    <div id="codigo_cliente">
                        {t('registrar.fases.5.codigo')}:  <span className="codigo">XXX</span>
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
                        </label>

                        <label className="field">
                            <div className="etiqueta">
                                {t('registrar.fases.5.pais')}
                            </div>
                            <input
                                type="text"
                                value={registerFormState.phase[5].pais}
                                onChange={ e => {
                                    setRegisterFormState( prev => {
                                        const newState = {... prev};
                                        newState.phase[5] = {... prev.phase[5]};
                                        newState.phase[5].pais = e.target.value;
                                        return newState;
                                    } );   
                                }}
                            />
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

                        {/* <label className="field">
                            <div className="etiqueta">
                                banco destino
                            </div>
                            <input type="text"/>
                        </label> */}
                    </div>
                </div>

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
        bank_country: "Venezuela"
    };

    return(
        <button
            id="boton_registrar"
            
            onClick={
                async () => {

                    const url = 'http://127.0.0.1:8000/users/'
                    try {
                        
                        const response = await fetch( url,{
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(data),
                                // body: JSON.stringify(postBody),
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
                }
            }
            >
            {t('multiform.registrar')}
        </button>
    );
}

const FasesRegistrar = [Fase0, Fase1, Fase2, Fase3, Fase4, Fase5];

export {FasesRegistrar, registrarUsuario, botonRegistrar};