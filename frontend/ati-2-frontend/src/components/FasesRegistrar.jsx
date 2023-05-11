import React, { useContext } from "react";
import { RegisterFormContext } from "./context/RegisterFormContext";

import { useTranslation } from 'react-i18next';

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
                            value="empresa"
                            checked={ registerFormState.phase[1].tipo_usuario === 'empresa' }
                            onChange={ e => {
                                setRegisterFormState( prev => {
                                        const newState = {... prev};
                                        newState.phase[1] = {... prev.phase[1]};
                                        newState.phase[1].tipo_usuario = 'empresa';
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
                            <input
                                type="text"
                                onChange={ e => {
                                setRegisterFormState( prev => {
                                        const newState = {... prev};
                                        newState.phase[1] = {... prev.phase[1]};
                                        newState.phase[1].natural.pais = e.target.value;
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
                                <input
                                    type="text"
                                    onChange={ e => {
                                    setRegisterFormState( prev => {
                                            const newState = {... prev};
                                            newState.phase[1] = {... prev.phase[1]};
                                            newState.phase[1].empresa.pais = e.target.value;
                                            return newState;
                                        } );
                                    }} 
                                />
                            </div>

                            <div className="field">
                                <span className="label">
                                    <span className="required">*</span> {t('registrar.fases.1.empresa.empresa.ciudad')+": "}
                                </span>
                                <input
                                    type="text"
                                    onChange={ e => {
                                    setRegisterFormState( prev => {
                                            const newState = {... prev};
                                            newState.phase[1] = {... prev.phase[1]};
                                            newState.phase[1].empresa.ciudad = e.target.value;
                                            return newState;
                                        } );
                                    }} 
                                />
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
                            style={{visibility: registerFormState.phase[4].usar_facebook? "visible":"hidden"}}
                            onChange={ e => {
                                setRegisterFormState( prev => {
                                    const newState = {... prev};
                                    newState.phase[4] = {... prev.phase[4]};
                                    newState.phase[4].facebook = e.target.value;
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
        const {registerFormState, setRegisterFormState} = useContext(RegisterFormContext);

        return(
            <div id="fase5">
                
                <div className="container">
                    <div id="codigo_cliente">
                        codigo <span className="codigo">123</span>
                    </div>

                    <div className="nota">
                        nota
                    </div>
                </div>


                <div className="title">
                    titulo
                </div>
                <div className="descripcion">
                    desc
                </div>

                <div className="container" id="bancos">
                    <div id="banco_origen" className="container_banco">
                        <label className="field">
                            <div className="etiqueta">
                                banco origen
                            </div>
                            <input type="text"/>
                        </label>

                        <label className="field">
                            <div className="etiqueta">
                                pais
                            </div>
                            <input type="text"/>
                        </label>
                    </div>

                    <div id="banco_destino" className="container_banco">
                        <label className="field">
                            <div className="etiqueta">
                                banco destino
                            </div>
                            <input type="text"/>
                        </label>

                        <label className="field">
                            <div className="etiqueta">
                                banco destino
                            </div>
                            <input type="text"/>
                        </label>
                    </div>
                </div>


            </div>
        );
    }

const FasesRegistrar = [Fase0, Fase1, Fase2, Fase3, Fase4, Fase5];

export {FasesRegistrar};