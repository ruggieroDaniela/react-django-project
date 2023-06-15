import React, { useContext, useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { RequestDomesticFormContext } from "../context/RequestDomesticFormContext";
import { getAllCountries, getCountriesInRegion, getStatesInCountry, getCitiesInStates, getContinents } from "../components/dataFetchers/PaisDataFetcher";
import { FieldDropdown } from "../components/search/FieldDropdown";
import { FieldDropdownCheckbox } from "./search/FieldDropdownCheckbox";
import axios from 'axios';
import "../styles/SolicitarNiñera.scss"
import AuthContext from '../context/AuthContext';
import ErrorMessage from "./ErrorMessage";
import { useNavigate } from 'react-router-dom';

const Fase0 = () => {
  const { t, i18n } = useTranslation();
  const {requestDomesticFormState, setRequestDomesticFormState} = useContext(RequestDomesticFormContext);

  const age_range_invalid = requestDomesticFormState.errors.age_range_invalid

  return (
    <div id="fase0">
          <div id="small">
              <p>{t('SolicitarCuidador.fases.0.mensaje')}</p>
              <span className="red">*  </span> <span>=</span> <span className="blue">{t('SolicitarCuidador.fases.0.campos')}</span>
          </div>

          <div>
              
              <h2 className="rosa"><span className="red">*  </span>{t('SolicitarCuidador.fases.0.solicito')}</h2>
              
              <div className="form">
                      <div>
                          <input 
                            type="radio" 
                            id="c1" 
                            name="solicito" 
                            value="FEM"
                            checked={ requestDomesticFormState.gender === 'FEM' }
                            onChange={ e => {
                                setRequestDomesticFormState( prev => {
                                        const newState = {...prev};
                                        newState.gender = e.target.value;
                                        return newState;
                                    } );
                            }}
                            />
                          <label htmlFor="c1">{t('SolicitarCuidador.fases.0.niñera')}</label>
                      </div>    

                      <div>
                          <input 
                            type="radio" 
                            id="c2" 
                            name="solicito" 
                            value="MAS"
                            checked={ requestDomesticFormState.gender === 'MAS' }
                            onChange={ e => {
                                setRequestDomesticFormState( prev => {
                                        const newState = {...prev};
                                        newState.gender = e.target.value;
                                        return newState;
                                    } );
                            }}
                            />
                          <label htmlFor="c2">{t('SolicitarCuidador.fases.0.niñero')}</label>
                      </div>    

                      <div>
                          <input 
                            type="radio" 
                            id="c3" 
                            name="solicito"
                            value="IDC"
                            checked={ requestDomesticFormState.gender === 'IDC' }
                            onChange={ e => {
                                setRequestDomesticFormState( prev => {
                                        const newState = {...prev};
                                        newState.gender = e.target.value;
                                        return newState;
                                    } );
                            }}
                         />    
                          <label htmlFor="c3">{t('SolicitarCuidador.fases.0.indiferente-sexo')}</label>
                      </div>
              </div>
          </div>

          <div>
              <h2 className="blue"><span className="red">*  </span> {t('SolicitarCuidador.fases.0.edad-solicita')}</h2>
              
              <div className="form">

                      <div>
                      <input 
                            type="radio" 
                            id="c4" 
                            name="edad"
                            checked={ requestDomesticFormState.age_requirement }
                            onChange={ e => {
                                setRequestDomesticFormState( prev => {
                                        const newState = {...prev};
                                        newState.age_requirement= true;
                                        return newState;
                                    } );
                            }}
                        />      

                          <label htmlFor="c4">{t('SolicitarCuidador.fases.0.entre')} 
                                <input 
                                    type="text"
                                    value={requestDomesticFormState.age_required_from}
                                    onChange={ e => {
                                        setRequestDomesticFormState( prev => {
                                                const newState = {...prev};
                                                newState.age_required_from = e.target.value;
                                                return newState;
                                            } );
                                    }}
                                /> 
                                &nbsp;&nbsp;&nbsp;&nbsp;{t('SolicitarCuidador.fases.0.y')} 
                                <input 
                                    type="text"
                                    value={requestDomesticFormState.age_required_to}
                                    onChange={ e => {
                                        setRequestDomesticFormState( prev => {
                                                const newState = {...prev};
                                                newState.age_required_to = e.target.value;
                                                return newState;
                                            } );
                                    }}
                                /> 
                                {t('SolicitarCuidador.fases.0.años')} 
                          </label>
                      </div>    

                      <div>
                      <input 
                            type="radio" 
                            id="c5" 
                            name="edad"
                            checked={ !requestDomesticFormState.age_requirement }
                            onChange={ e => {
                                setRequestDomesticFormState( prev => {
                                        const newState = {...prev};
                                        newState.age_requirement = false;
                                        return newState;
                                    } );
                            }}
                        />     
                          <label htmlFor="c5">{t('SolicitarCuidador.fases.0.indiferente-edad')}</label>
                      </div>    

                      
              </div>
              { age_range_invalid && <ErrorMessage message={t('SolicitarNiñera.errores.rango_edad')}/>  }
          </div>

          <div>
              <h2 className="blue"><span className="red">*  </span> {t('SolicitarCuidador.fases.0.situacion-familiar')}</h2>
              
              <div className="form">
                    <div>
                        <input 
                            type="radio" 
                            id="c6" 
                            name="situacion"
                            value="NO"
                            checked={ requestDomesticFormState.children === 'NO' }
                            onChange={ e => {
                                setRequestDomesticFormState( prev => {
                                        const newState = {...prev};
                                        newState.children = e.target.value;
                                        return newState;
                                    } );
                            }}
                         /> 
                          <label htmlFor="c6">{t('SolicitarCuidador.fases.0.sin-hijos')}</label>
                    </div>    

                    <div>
                        <input 
                            type="radio" 
                            id="c7" 
                            name="situacion"
                            value="SI"
                            checked={ requestDomesticFormState.children === 'SI' }
                            onChange={ e => {
                                setRequestDomesticFormState( prev => {
                                        const newState = {...prev};
                                        newState.children = e.target.value;
                                        return newState;
                                    } );
                            }}
                         />
                          <label htmlFor="c7">{t('SolicitarCuidador.fases.0.con-hijos')}</label>
                    </div>    

                    <div>
                        <input 
                            type="radio" 
                            id="c8" 
                            name="situacion"
                            value="IDC"
                            checked={ requestDomesticFormState.children === 'IDC' }
                            onChange={ e => {
                                setRequestDomesticFormState( prev => {
                                        const newState = {...prev};
                                        newState.children = e.target.value;
                                        return newState;
                                    } );
                            }}
                         />
                          <label htmlFor="c8">{t('SolicitarCuidador.fases.0.indiferente-hijos')}</label>
                    </div>
              </div>
          </div>

          <div>
              <h2 className="blue"><span className="red">*  </span> {t('SolicitarCuidador.fases.0.grado-instruccion')}</h2>
              
              <div className="form">
                      <div>
                        <input 
                            type="radio" 
                            id="c9" 
                            name="grado"
                            value="PRI"
                            checked={ requestDomesticFormState.education_level === 'PRI' }
                            onChange={ e => {
                                setRequestDomesticFormState( prev => {
                                        const newState = {...prev};
                                        newState.education_level = e.target.value;
                                        return newState;
                                    } );
                            }}
                        />
                        <label htmlFor="c9">{t('SolicitarCuidador.fases.0.grado.0')}</label>
                      </div>    

                      <div>
                          <input 
                            type="radio" 
                            id="c10" 
                            name="grado"
                            value="BAC"
                            checked={ requestDomesticFormState.education_level === 'BAC' }
                            onChange={ e => {
                                setRequestDomesticFormState( prev => {
                                        const newState = {...prev};
                                        newState.education_level = e.target.value;
                                        return newState;
                                    } );
                            }}
                          />
                          <label htmlFor="c10">{t('SolicitarCuidador.fases.0.grado.1')}</label>
                      </div>    

                      <div>
                        <input 
                            type="radio" 
                            id="c11" 
                            name="grado"
                            value="TEC"
                            checked={ requestDomesticFormState.education_level === 'TEC' }
                            onChange={ e => {
                                setRequestDomesticFormState( prev => {
                                        const newState = {...prev};
                                        newState.education_level = e.target.value;
                                        return newState;
                                    } );
                            }}
                          />
                          <label htmlFor="c11">{t('SolicitarCuidador.fases.0.grado.2')}</label>
                      </div>

                      <div>
                          <input 
                            type="radio" 
                            id="c12" 
                            name="grado"
                            value="UNI"
                            checked={ requestDomesticFormState.education_level === 'UNI' }
                            onChange={ e => {
                                setRequestDomesticFormState( prev => {
                                        const newState = {...prev};
                                        newState.education_level = e.target.value;
                                        return newState;
                                    } );
                            }}
                          />
                          <label htmlFor="c12">{t('SolicitarCuidador.fases.0.grado.3')}</label>
                      </div>
              </div>
          </div>
    </div>
  )
}

const Fase1 = () => {
  const { t, i18n } = useTranslation();
  const {requestDomesticFormState, setRequestDomesticFormState} = useContext(RequestDomesticFormContext);

  //selected
  const [selectedCountry, setSelectedCountry] = useState(requestDomesticFormState.country);
  const [selectedState, setSelectedState] = useState(requestDomesticFormState.state);
  const [selectedCity, setSelectedCity] = useState(requestDomesticFormState.city);
  
  //Countries,states and cities
  const [countries, setCountries] = useState([[],[]]);
  const [states, setStates] = useState([[],[]]);
  const [cities, setCities] = useState([[],[]]);
  
  //ready
  const [readyCountries,setReadyCountries] = useState(false);
  const [readyStates,setReadyStates] = useState(false);
  const [readyCities,setReadyCities] = useState(false);
  
  //lists
  const [countriesList, setCountriesList] =useState([]);
  const [statesList, setStatesList] =useState([]);
  const [citiesList, setCitiesList] =useState([]);


  const country_required = requestDomesticFormState.errors.country_required
  const state_required = requestDomesticFormState.errors.state_required
  const city_required = requestDomesticFormState.errors.city_required

  //Countries
  useEffect(() => {
      const fetchCountries = async () => {
          try {
              let [names, values] = await ( getAllCountries() );
              setCountries( [names, values] );
              setReadyCountries(true);
          } catch (error) {
              console.error(error);
          } 
      };

      fetchCountries();
  }, []);


  const renderCountryOptions = () => {
      const options = [];
      for (let i = 0; i < countries[0].length; i++) {
        options.push(
          <option key={countries[1][i]} 
                  value={countries[1][i]}
          >
            {countries[0][i]}
          </option>
        );
      }
      setCountriesList (options);
  };
    
    

  useEffect(() => {
      renderCountryOptions();
  }, [countries]);

  //States
  useEffect(() => {
      const fetchStates = async () => {
          try {
                                  
              let [names, values] = await ( selectedCountry!="" ? getStatesInCountry(","+selectedCountry): ["Select a Country","loading"])
              setStates( [names, values] );
              if (selectedCountry !="")
                  setReadyStates(true);
          } catch (error) {
              console.error(error);
          }
      };

      fetchStates();
  }, [selectedCountry]);

  const renderStatesOptions = () => {
      const options = [];
      for (let i = 0; i < states[0].length; i++) {
        options.push(
          <option key={states[1][i]} 
                  value={states[1][i]}
          >
            {states[0][i]}
          </option>
        );
      }
      setStatesList (options);
  };

  useEffect(() => {
      renderStatesOptions();
  }, [states]);

  //Cities
  useEffect(() => {
      const fetchCities = async () => {
          try {
              let [names, values] = await ( selectedState != "" ? getCitiesInStates(","+selectedState): ["Select a State","loading"])
              
              setCities( [names, values] );
              
              if (selectedState !="")
                  setReadyCities(true);
          } catch (error) {
              console.error(error);
          }
      };

      fetchCities();
  }, [selectedState]);

  const renderCitiesOptions = () => {
      const options = [];
      for (let i = 0; i < cities[0].length; i++) {
        options.push(
          <option key={cities[1][i]} 
                  value={cities[1][i]}
          >
            {cities[0][i]}
          </option>
        );
      }
      setCitiesList (options);
  };

  useEffect(() => {
      renderCitiesOptions();
  }, [states]);

  const renderOptions = (objects,object_name) => {
      const options = [];
      let aux = "";



      for (let i = 0; i < objects[0].length; i++) {
        options.push(
          <option key={objects[1][i]} 
                  value={objects[1][i]}
                  selected={objects[1][i] == aux}
          >
            {objects[0][i]}
          </option>
        );
      }
      return (options);
  };




  return ( 
      <div id="fase1">
          <div id="small">
              <span className="red">*  </span><span className="blue">{t('SolicitarCuidador.fases.1.mensaje')}</span>
          </div>

          <div>
              <h2 className="blue">{t('SolicitarCuidador.fases.1.nombre')}</h2>
              <p>{t('SolicitarCuidador.fases.1.prefiero')}</p>
          </div>

          <div id="formulario">
              <div>
                  <label htmlFor="pais" className="bold">{t('SolicitarCuidador.fases.1.pais')}</label> 
              </div>

              <div>
                <select name="pais" 
                        id="pais" 
                        onChange={ 
                            e => {
                                setSelectedCountry(e.target.value);
                                setRequestDomesticFormState ( prev => {
                                    const newState = {... prev};
                                    newState.country = e.target.value;
                                    return newState;
                                });

                            }
                        }
                        value={requestDomesticFormState.country}
                >
                <option disabled selected value="">{t('search.selecciona_pais')}</option>
                {readyCountries && renderOptions(countries,"countries")}
                {!readyCountries && (
                    <option>Loading ...</option>
                )}
                </select>
                { country_required && <ErrorMessage message={t('SolicitarNiñera.errores.pais')}/>  }
              </div>

              <div >
                  <label htmlFor="estados" className="bold">{t('SolicitarCuidador.fases.1.estado')}</label> 
              </div>
              <div>
                    <select name="estados" 
                            id="estados" 
                            disabled={ selectedCountry == ""}
                            onChange={ 
                                e =>{
                                    setSelectedState(e.target.value);
                                    setRequestDomesticFormState ( prev => {
                                        const newState = {... prev};
                                        newState.state = e.target.value;
                                        return newState;
                                    });
                                }
                            }> 
                            <option disabled selected value="">{t('search.selecciona_estado')}</option>
                        {readyStates && renderOptions(states,"states")}
                        {!readyStates && (
                        <option>{t('SolicitarCuidador.fases.1.select-state')}</option>
                        )}
                    </select>
                    { state_required && <ErrorMessage message={t('SolicitarNiñera.errores.estado')}/>  }
              </div>
              <div>
                  <label htmlFor="ciudad" className="bold">{t('SolicitarCuidador.fases.1.ciudad')}</label> 
              </div>
              <div>
                    <select name="ciudad"
                            id="ciudad" 
                            disabled={ selectedState == ""}
                            onChange={ 
                                e => {
                                    setSelectedCity(e.target.value);
                                    setRequestDomesticFormState ( prev => {
                                        const newState = {... prev};
                                        newState.city = e.target.value;
                                        return newState;
                                    });
                                }
                            }
                            > 
                            <option disabled selected value="">{t('search.selecciona_ciudad')}</option>
                        {readyCities && renderOptions(cities,"cities")}
                        {!readyCities && (
                        <option>{t('SolicitarCuidador.fases.1.select-city')}</option>
                        )}
                    </select>
                    { city_required && <ErrorMessage message={t('SolicitarNiñera.errores.ciudad')}/>  }
              </div>

              <div>
                  <label htmlFor="zona" className="bold">{t('SolicitarCuidador.fases.1.zona')}</label> 
              </div>
              <div>
                    <input  type="text"
                            name="zona"
                            id="zona" 
                            disabled={ selectedCity == ""}
                            onChange={
                                e => {
                                    setRequestDomesticFormState ( prev => {
                                        const newState = {... prev};
                                        newState.zone = e.target.value;
                                        return newState;
                                    });
                                } 
                            }
                            value={requestDomesticFormState.zone}
                    />
              </div>

          </div>

      </div> 
  );
}

const Fase2 = () => {
    const { t, i18n } = useTranslation();
    const {requestDomesticFormState, setRequestDomesticFormState} = useContext(RequestDomesticFormContext);

    const number_tco_required = requestDomesticFormState.errors.number_tco_required
    const age_tco_required = requestDomesticFormState.errors.age_tco_required
    const gender_tco_required = requestDomesticFormState.errors.gender_tco_required
    const diseases_required = requestDomesticFormState.errors.diseases_required

  return (
    <div id="fase2">
          <div id="small">
              <span className="red">*  </span><span className="blue">{t('SolicitarCuidador.fases.2.mensaje')}</span><br />
          </div>

          <div>
              <h2 className="blue">{t('SolicitarCuidador.fases.2.titulo')}</h2>

              <div className="form">
                    <div>
                        <span className="red">*  </span><label htmlFor="cantidad">{t('SolicitarCuidador.fases.2.cantidad')}</label>
                        <input  id="cantidad"
                                type="text"
                                value={requestDomesticFormState.number_tco} 
                                onChange={ e => {
                                    setRequestDomesticFormState( prev => {
                                        const newState = {...prev}
                                        newState.number_tco = e.target.value;
                                        return newState;
                                    });
                                }}
                        />
                        { number_tco_required && <ErrorMessage message={t('SolicitarNiñera.errores.numero')}/>  }
                    </div>

                    <div>
                        <div>
                            <label className="bold" htmlFor="edad"><span className="red">*  </span>{t('SolicitarCuidador.fases.2.edad')}</label>
                            <input  id="edad"
                                    type="text"
                                    value={requestDomesticFormState.age_tco} 
                                    onChange={ e => {
                                        setRequestDomesticFormState( prev => {
                                            const newState = {...prev}
                                            newState.age_tco = e.target.value;
                                            return newState;
                                        });
                                    }}
                            />
                        </div>
                        <div>
                            <label className="bold" htmlFor="sexo"> <span className="red">*  </span> {t('SolicitarCuidador.fases.2.sexo')}</label>
                            <input  id="sexo"
                                    type="text"
                                    value={requestDomesticFormState.gender_tco} 
                                    onChange={ e => {
                                        setRequestDomesticFormState( prev => {
                                            const newState = {...prev}
                                            newState.gender_tco = e.target.value;
                                            return newState;
                                        });
                                    }}
                            />
                        </div>
                    </div>
                    { age_tco_required && <ErrorMessage message={t('SolicitarNiñera.errores.edad')}/>  }
                    { gender_tco_required && <ErrorMessage message={t('SolicitarNiñera.errores.genero')}/>  }
                    <div>
                        <span className="red">*  </span><label className="bold">{t('SolicitarCuidador.fases.2.posee-discapacidad')}</label>
                        
                        <input 
                            type="radio" 
                            id="c1" 
                            name="discapacidad"
                            checked={ !requestDomesticFormState.disabilities_tco }
                            onChange={ e => {
                                setRequestDomesticFormState( prev => {
                                        const newState = {...prev};
                                        newState.disabilities_tco = false
                                        return newState;
                                    } );
                            }}
                        />
                        <label htmlFor="c1">{t('SolicitarCuidador.fases.2.no')}</label>

                        <input 
                            type="radio" 
                            id="c2" 
                            name="discapacidad"
                            checked={ requestDomesticFormState.disabilities_tco }
                            onChange={ e => {
                                setRequestDomesticFormState( prev => {
                                        const newState = {...prev};
                                        newState.disabilities_tco = true
                                        return newState;
                                    } );
                            }}
                        />
                        
                        <label htmlFor="c2">{t('SolicitarCuidador.fases.2.si')}</label>
                    </div>

                    <div>
                        <label className="bold" htmlFor="discapacidades">{t('SolicitarCuidador.fases.2.indique-discapacidad')}</label>
                        <textarea  id="discapacidades"
                                type="textarea"
                                value={requestDomesticFormState.disabilities_tco_decrip} 
                                onChange={ e => {
                                    setRequestDomesticFormState( prev => {
                                        const newState = {...prev}
                                        newState.disabilities_tco_decrip = e.target.value;
                                        return newState;
                                    });
                                }}
                        />
                    </div>

                    <div>
                        <p className="bold">{t('SolicitarCuidador.fases.2.enfermedades-que-presenta')}</p>
                        <p className="ml">{t('SolicitarCuidador.fases.2.enfermedades')}</p>
                        <textarea
                            type="textarea"
                            onChange={ e => {
                                setRequestDomesticFormState( prev => {
                                        const newState = {...prev}
                                        newState.diseases_tco_descrip = e.target.value;
                                        return newState;
                                    });
                                }} 
                        />
                    </div>
                    { diseases_required && <ErrorMessage message={t('SolicitarNiñera.errores.enfermedad')}/>  }
              </div>
          </div>
    </div>
  )
}

const Fase3 = () => {
    const { t, i18n } = useTranslation();
    const {requestDomesticFormState, setRequestDomesticFormState} = useContext(RequestDomesticFormContext);
    const travel_desc_required = requestDomesticFormState.errors.travel_desc_required
  
    return (     
    <div id="fase3">
  
        <div id="small">
            <span className="red">*  </span><span className="blue">{t('SolicitarNiñera.fases.3.mensaje')}</span><br />
        </div>
        <div id="titulos">
            <span className="red">* </span>
            <h4 style={{display: "inline"}} >{t('SolicitarNiñera.fases.3.pregunta')}</h4>
            <div id="form">
                    <div>
                          <input  type="radio"
                                  name="interest"
                                  id="c1"
                                  onChange={
                                      e => {
                                          setRequestDomesticFormState ( prev => {
                                              const newState = {... prev};
                                              newState.travel = false;
                                              return newState;
                                          });
                                      } 
                                  }
                                  checked={!requestDomesticFormState.travel}
                          />
                        <label for="c1">{t('SolicitarNiñera.fases.3.no')}</label>
                    </div>
  
                    <div>
                          <input  type="radio"
                                  className="segundo" 
                                  name="interest" 
                                  id="c2"
                                  onChange={
                                      e => {
                                          setRequestDomesticFormState ( prev => {
                                              const newState = {... prev};
                                              newState.travel = true;
                                              return newState;
                                          });
                                      } 
                                  }
                                  checked={requestDomesticFormState.travel}        
                          />
                        <label for="c2">{t('SolicitarNiñera.fases.3.si')}</label>
                    </div>
            </div>
        </div>
        { requestDomesticFormState.travel && (
          <div id="form" >
          <div >
              <div id="peq">{t('OfrecermeNiñera.fases.3.especifique')}</div>
          </div>
              <textarea 
                      onChange={
                          e => {
                              setRequestDomesticFormState ( prev => {
                                  const newState = {... prev};
                                  newState.travel_decription = e.target.value;
                                  return newState;
                              });
                          } 
                      }
                      value={requestDomesticFormState.travel_decription}
              ></textarea>
  
          { travel_desc_required && <ErrorMessage message={t('OfrecermeNiñera.errores.requerido')}/>  }
          </div>
          )}
  
    </div>
  );
  }

const Fase4 = () => {
  const { t, i18n } = useTranslation();
  const {requestDomesticFormState, setRequestDomesticFormState} = useContext(RequestDomesticFormContext);
  const activities_required = requestDomesticFormState.errors.activities_required

  return ( 
  <div id="fase4">

      <div id="small">
          <span className="red">*  </span><span className="blue">{t('SolicitarCuidador.fases.4.mensaje')}</span><br />
      </div>

      <div id="titulo">
          <h2 className="blue" >{t('SolicitarCuidador.fases.4.titulo')}</h2><br />
      </div>
      <div id="contenido">
          <div id="titulos">
              <p>{t('SolicitarCuidador.fases.4.indique')} </p>
              <h2>{t('SolicitarCuidador.fases.4.ejemplo')}</h2>
              <ul>
                  <li>{t('SolicitarCuidador.fases.4.ejemplos.0')}</li>
                  <li>{t('SolicitarCuidador.fases.4.ejemplos.1')}</li>
                  <li>{t('SolicitarCuidador.fases.4.ejemplos.2')}</li>
                  <li>{t('SolicitarCuidador.fases.4.ejemplos.3')}</li>
                  <li>{t('SolicitarCuidador.fases.4.ejemplos.4')}</li>
                  <li>{t('SolicitarCuidador.fases.4.ejemplos.5')}</li>
                  <li>{t('SolicitarCuidador.fases.4.ejemplos.6')}</li>
              </ul>
          </div>
          <div >
              <div id="peq"><span className="red">* </span><h2>{t('SolicitarCuidador.fases.4.especifique')}</h2></div>
          </div>

            <div id="form">
                <textarea
                        onChange={
                            e => {
                                setRequestDomesticFormState ( prev => {
                                    const newState = {... prev};
                                    newState.activities = e.target.value;
                                    return newState;
                                });
                            } 
                        }
                        value={requestDomesticFormState.activities}                        
                ></textarea>

                { activities_required && <ErrorMessage message={t('SolicitarNiñera.errores.requerido')}/>  }
            </div>
            
      </div>
      
  </div>

   );
}


const Fase5 = () => {
    const { t, i18n } = useTranslation();
    const {requestDomesticFormState, setRequestDomesticFormState} = useContext(RequestDomesticFormContext);

    // variables to make the checkboxes behave like radiobuttons
    const [workdays, setWorkdays] =useState(requestDomesticFormState.workday);
    const [schedule, setSchedule] =useState(requestDomesticFormState.schedule);

    const [salaryType, setSalaryType] = useState("");

    //dropdown currency
    let currency = ["USD","EUR",t('SolicitarCuidador.fases.5.otro')];
    const [selectedCurrency,setSelectedCurrency] = useState(switchCurrency());
    

    //dropdown salary
    let salary = [t('SolicitarCuidador.fases.5.salario-opciones.0'), t('SolicitarCuidador.fases.5.salario-opciones.1'), t('SolicitarCuidador.fases.5.salario-opciones.2'), t('SolicitarCuidador.fases.5.salario-opciones.3'), t('SolicitarCuidador.fases.5.salario-opciones.4')];
    const [selectedSalary, setSelectedSalary] = useState(switchSalary());

    const [selectedServices, setSelectedServices] = useState("");

    const workday_required = requestDomesticFormState.errors.workday_required
    const workday_other_required = requestDomesticFormState.errors.workday_other_required
    const schedule_required = requestDomesticFormState.errors.schedule_required
    const schedule_other_required = requestDomesticFormState.errors.schedule_other_required
    const salary_option_required = requestDomesticFormState.errors.salary_option_required
    const salary_required = requestDomesticFormState.errors.salary_required
    const salary_other_required = requestDomesticFormState.errors.salary_other_required
    const benefits_required = requestDomesticFormState.errors.benefits_required


    function setTheWorkdays (e){

        setRequestDomesticFormState ( prev => {
            const newState = {... prev};
            newState.workday = e.target.id;
            return newState;
        })
        
    } 

    
    function setTheSchedule (e){

        setRequestDomesticFormState ( prev => {

            const newState = {... prev}

            let pos = (newState.schedule).indexOf( e.target.id );
            
            if(e.target.checked){
                if( pos == -1 ) (newState.schedule).push(e.target.id);
            }else{
                if( pos != -1 ) (newState.schedule).splice(pos,1) 
            }
            return newState;
        })
        
    } 



    useEffect(() => {
        setRequestDomesticFormState ( prev => {
            const newState = {... prev}
            selectedCurrency ==2 ? newState.currency =  "OTRA" : newState.currency =  currency[selectedCurrency]
            
            return newState;
        });
    }, [selectedCurrency]);

    useEffect(() => {
        setRequestDomesticFormState ( prev => {
            const newState = {... prev}
            let aux=""
            
            switch(selectedSalary){
                case 0:
                    aux="HORA";
                    break;
                case 1:
                    aux="DIA";
                    break;
                case 2:
                    aux="SEMANAL";
                    break;
                case 3:
                    aux="QUINCENAL";
                    break;
                case 4:   
                    aux="MENSUAL";
                    break;                         
            }
            
            
            newState.salary_offered = aux;
            return newState;
        });
    }, [selectedSalary]);


    //just for the switches
    function switchCurrency (){
        let aux = -1
        switch(requestDomesticFormState.currency){
            case "USD":
                aux = 0;
                break;
            case "EUR":
                aux = 1;
                break;
            case "OTRA":
                aux = 2;
                break;
        }

        return aux;
    }

    function switchSalary (){
        let aux = -1
        switch(requestDomesticFormState.salary_offered){
            case "HORA":
                aux = 0;
                break;
            case "DIA":
                aux = 1;
                break;
            case "SEMANAL":
                aux = 2;
                break;
            case "QUINCENAL":
                aux = 3;
                break;
            case "MENSUAL":   
                aux = 4;
                break;      
        }

        return aux;
    }

    return ( 
        <div id="fase5">
            <div className="small">
                <span className="red">* </span><span className="blue">{t('SolicitarCuidador.fases.5.mensaje')}</span>
            </div>

            <div>
                <h1 className="blue">{t('SolicitarCuidador.fases.5.nombre')}</h1>
            </div>

            
                <div>
                    <div className="titulos">
                        <span className="red">* </span><h2>{t('SolicitarCuidador.fases.5.salidas-jornada')}</h2>
                    </div>
                    <div className="form" >
                        <div>
                            <input  type="radio"
                                    id="SEMANAL"
                                    className="workdays"
                                    checked={(requestDomesticFormState.workday) == ('SEMANAL')}
                                    onChange={e => setTheWorkdays(e)}
                            />
                            <label htmlFor="SEMANAL">{t('OfrecermeNiñera.fases.5.salidas-jornada-opciones.0')}</label>
                        </div>    
                        
                        <div>
                            <input  type="radio"
                                    id="QUINCENAL"
                                    className="workdays"
                                    checked={requestDomesticFormState.workday == ('QUINCENAL')}
                                    onChange={e => {setTheWorkdays(e)}}
                            />
                            <label htmlFor="QUINCENAL">{t('OfrecermeNiñera.fases.5.salidas-jornada-opciones.1')}</label>
                        </div>    

                        <div>
                            <input  type="radio"
                                    id="MENSUAL"
                                    className="workdays"
                                    checked={requestDomesticFormState.workday == ('MENSUAL')}
                                    onChange={e => {setTheWorkdays(e)}}
                            />
                            <label htmlFor="MENSUAL">{t('OfrecermeNiñera.fases.5.salidas-jornada-opciones.2')}</label>
                        </div>

                        <div>
                            <input  type="radio"
                                    id="INTERDIARIO"
                                    className="workdays"
                                    checked={requestDomesticFormState.workday == ('INTERDIARIO')}
                                    onChange={e => {setTheWorkdays(e)}}
                            />
                            <label htmlFor="INTERDIARIO">{t('OfrecermeNiñera.fases.5.salidas-jornada-opciones.3')}</label>
                        </div>

                        <div>
                            <input  type="radio"
                                    id="MEDIO_TIEMPO"
                                    className="workdays"
                                    checked={requestDomesticFormState.workday == ('MEDIO_TIEMPO')}
                                    onChange={e => {setTheWorkdays(e)}}
                            />
                            <label htmlFor="MEDIO_TIEMPO">{t('OfrecermeNiñera.fases.5.salidas-jornada-opciones.4')}</label><br/>
                        </div>

                        <div>
                            <input  type="radio"
                                    id="FIN_SEMANA"
                                    className="workdays"
                                    checked={requestDomesticFormState.workday == ('FIN_SEMANA')}
                                    onChange={e => {setTheWorkdays(e)}}
                            />
                            <label htmlFor="FIN_SEMANA">{t('OfrecermeNiñera.fases.5.salidas-jornada-opciones.5')}</label>
                        </div>

                        <div>
                            <input  type="radio"
                                    id="NOCHE"
                                    className="workdays"
                                    checked={requestDomesticFormState.workday == ('NOCHE')}
                                    onChange={e => {setTheWorkdays(e)}}
                            />
                            <label htmlFor="NOCHE">{t('OfrecermeNiñera.fases.5.salidas-jornada-opciones.6')}</label>
                        </div>

                        {/* <div>
                            <input  type="checkbox"
                                    id="HORAS"
                                    className="workdays"
                                    
                                    onChange={e => {setTheWorkdays(e)}}
                            />
                            <label for="HORAS">{t('OfrecermeNiñera.fases.5.salidas-jornada-opciones.7')}</label>
                        </div> 
                        */}
                        <div>
                            <input  type="radio"
                                    id="HORAS"
                                    className="workdays"
                                    checked={requestDomesticFormState.workday == ('HORAS')}
                                    onChange={e => {setTheWorkdays(e)}}
                            />
                            <label htmlFor="HORAS">{t('OfrecermeNiñera.fases.5.salidas-jornada-opciones.8')}</label>
                        </div>

                        <div>
                            <input  type="radio"
                                    id="OTRO"
                                    className="workdays"
                                    checked={requestDomesticFormState.workday == ('OTRO')}
                                    onChange={e => {setTheWorkdays(e)}}
                            />
                            <label htmlFor="OTRO">{t('OfrecermeNiñera.fases.5.salidas-jornada-opciones.9')}</label>                    
                        </div>
                        <br />
                        
                        <div hidden={!(requestDomesticFormState.workday).includes('OTRO')}>
                        {t('OfrecermeNiñera.fases.5.salidas-jornada-opciones.10')}: <input type="text" value={requestDomesticFormState.workday_other} 
                            onChange={ e =>{
                                setRequestDomesticFormState( prev =>{
                                    const newState = {...prev};
                                    newState.workday_other = e.target.value;
                                    return newState;
                                });
                            }}/>
                        </div>
                        { workday_required && <ErrorMessage message={t('OfrecermeNiñera.errores.option_required')}/>  }
                        { workday_other_required && <ErrorMessage message={t('OfrecermeNiñera.errores.especificar')}/>  }
                    </div>
                </div>
                
                <div>
                    <div className="titulos">
                        <span className="red">* </span><h2>{t('OfrecermeNiñera.fases.5.horario')}</h2>
                    </div>
                    <p>{t('OfrecermeNiñera.fases.5.horario-mensaje')}</p>

                    <div className="form">
                        <div>
                            <input  type="checkbox"
                                    id="LUN"
                                    checked={requestDomesticFormState.schedule.includes('LUN')}
                                    onChange={e => {setTheSchedule(e)}}

                                    />
                            <label htmlFor="cd1">{t('OfrecermeNiñera.fases.5.horario-opciones.0')}</label>
                        </div>

                        <div>
                            <input  type="checkbox"
                                    id="MAR"
                                    checked={requestDomesticFormState.schedule.includes('MAR')}
                                    onChange={e => {setTheSchedule(e)}}
                                    />
                            <label htmlFor="cd2">{t('OfrecermeNiñera.fases.5.horario-opciones.1')}</label>
                        </div>

                        <div>
                            <input  type="checkbox"
                                    id="MIE"
                                    checked={requestDomesticFormState.schedule.includes('MIE')}
                                    onChange={e => {setTheSchedule(e)}}
                                    />
                            <label htmlFor="MIE">{t('OfrecermeNiñera.fases.5.horario-opciones.2')}</label>
                        </div>

                        <div>
                            <input  type="checkbox"
                                    id="JUE"
                                    checked={requestDomesticFormState.schedule.includes('JUE')}
                                    onChange={e => {setTheSchedule(e)}}
                                    />
                            <label htmlFor="JUE">{t('OfrecermeNiñera.fases.5.horario-opciones.3')}</label>
                        </div>

                        <div>
                            <input  type="checkbox"
                                    id="VIE"
                                    checked={requestDomesticFormState.schedule.includes('VIE')}
                                    onChange={e => {setTheSchedule(e)}}
                                    />
                            <label htmlFor="VIE">{t('OfrecermeNiñera.fases.5.horario-opciones.4')}</label>
                        </div>

                        <div>
                            <input  type="checkbox"
                                    id="SAB"
                                    checked={requestDomesticFormState.schedule.includes('SAB')}
                                    onChange={e => {setTheSchedule(e)}}
                                    />
                            <label htmlFor="SAB">{t('OfrecermeNiñera.fases.5.horario-opciones.5')}</label>
                        </div>

                        <div>
                            <input  type="checkbox"
                                    id="DOM"
                                    checked={requestDomesticFormState.schedule.includes('DOM')}
                                    onChange={e => {setTheSchedule(e)}}
                                    />
                            <label htmlFor="cd7">{t('OfrecermeNiñera.fases.5.horario-opciones.6')}</label>
                        </div>

                        <div>
                            <input  type="checkbox"
                                    id="LUN_VIE"
                                    checked={requestDomesticFormState.schedule.includes('LUN_VIE')}
                                    onChange={e => {setTheSchedule(e)}}
                                    />
                            <label htmlFor="LUN_VIE">{t('OfrecermeNiñera.fases.5.horario-opciones.7')}</label>
                        </div>

                        <div>
                            <input  type="checkbox"
                                    id="FIN"
                                    checked={requestDomesticFormState.schedule.includes('FIN')}
                                    onChange={e => {setTheSchedule(e)}}
                                    />
                            <label htmlFor="FIN">{t('OfrecermeNiñera.fases.5.horario-opciones.8')}</label>
                        </div>

                        <div>
                            <input  type="checkbox"
                                    id="OTRO"
                                    checked={requestDomesticFormState.schedule.includes('OTRO')}
                                    onChange={e => {setTheSchedule(e)}}
                                    />
                            <label htmlFor="cd10">{t('OfrecermeNiñera.fases.5.horario-opciones.9')}</label>
                        </div>

                        <div hidden={!(requestDomesticFormState.schedule).includes('OTRO')}>
                        {t('OfrecermeNiñera.fases.5.horario-opciones.10')}: <input type="text" value={requestDomesticFormState.schedule_other} 
                            onChange={ e =>{
                                setRequestDomesticFormState( prev =>{
                                    const newState = {...prev};
                                    newState.schedule_other = e.target.value;
                                    return newState;
                                });
                            }} />
                        </div>

                        { schedule_required && <ErrorMessage message={t('OfrecermeNiñera.errores.option')}/>  }
                    { schedule_other_required && <ErrorMessage message={t('OfrecermeNiñera.errores.especificar')}/>  }
                    </div>

                </div>

                <div>
                    <div className="titulos">
                        <span className="red">* </span><h2>{t('OfrecermeNiñera.fases.5.salario-deseado')}</h2>
                    </div>
                    
                    <div id="column">
                        <div id="form-vertical">
                            <div>
                                <input  type="radio"
                                        name="salary"
                                        id="d1"
                                        checked={requestDomesticFormState.payment === "MONTO"}
                                        onChange={
                                            e => {
                                                setRequestDomesticFormState( prev => {
                                                    const newState = {...prev}
                                                    newState.payment = "MONTO";
                                                    return newState
                                                });
                                            } 
                                        }
                                        />
                                <label htmlFor="d1">{t('OfrecermeNiñera.fases.5.salario-deseado-opciones.0')}</label> 
                            </div>

                            <div>
                                <input  type="radio"
                                        name="salary" 
                                        id="d2"
                                        checked={requestDomesticFormState.payment === "CONVENIR"}
                                        onChange={
                                            e => {
                                                setRequestDomesticFormState( prev => {
                                                    const newState = {...prev}
                                                    newState.payment = "CONVENIR";
                                                    return newState
                                                });
                                            } 
                                        }

                                        />
                                <label htmlFor="d2">{t('OfrecermeNiñera.fases.5.salario-deseado-opciones.1')}</label> 
                            </div>
                        </div>
                        
                        
                        <div id="texto" style={{ visibility: requestDomesticFormState.payment == "MONTO" ? 'visible' : 'hidden' }} >
                            <input type="text" onChange={ e =>{
                                setRequestDomesticFormState( prev =>{
                                    const newState = {...prev};
                                    newState.payment_amount = e.target.value;
                                    return newState;
                                });
                            }} value={requestDomesticFormState.payment_amount} />
                        </div>

                        <div className="dropdown-content" style={{ visibility: requestDomesticFormState.payment == "MONTO" ? 'visible' : 'hidden' }}>
                            <FieldDropdown
                                title={t('SolicitarCuidador.fases.5.moneda')}
                                placeholder={
                                    selectedCurrency != -1?
                                        currency[selectedCurrency]:t('SolicitarCuidador.fases.5.selecciona-moneda')
                                }
                                items={currency}
                                setSelectedState={setSelectedCurrency}
                            />
                            
                            {selectedCurrency==2 && 
                                <div>
                                    <label htmlFor="especifique">{t('SolicitarCuidador.fases.5.especifique')}</label>    
                                    <input  id="especifique"
                                            type="text"
                                            value={requestDomesticFormState.currency_other} 
                                            onChange={ e => {
                                                setRequestDomesticFormState( prev => {
                                                    const newState = {...prev}
                                                    newState.currency_other = e.target.value;
                                                    return newState;
                                                });
                                            }}
                                            />
                                </div>    
                            }
                            
                        </div>
                        

                        <div className="dropdown-content" style={{ visibility: requestDomesticFormState.payment == "MONTO" ? 'visible' : 'hidden' }}>
                            <FieldDropdown
                                    title={t('SolicitarCuidador.fases.5.salario-ofrecido')}
                                    placeholder={
                                        selectedSalary != -1?
                                            salary[selectedSalary]:t('SolicitarCuidador.fases.5.seleccione-salario')
                                    }
                                    items={salary}
                                    setSelectedState={setSelectedSalary}
                            />
                        </div>

                        

                    </div>

                    { salary_option_required && <ErrorMessage message={t('OfrecermeNiñera.errores.option_required')}/>  }
                        { salary_required && <ErrorMessage message={t('OfrecermeNiñera.errores.salario')}/>  }
                        { salary_other_required && <ErrorMessage message={t('OfrecermeNiñera.errores.especificar')}/>  }

                </div>

                <div id="beneficio-laboral">
                    <div className="titulos">
                        <span className="red">* </span><h2 className="blue">{t('SolicitarCuidador.fases.5.beneficio-laboral')}</h2>
                    </div>
                    <div id="row">
                        <div>
                            <h2>{t('SolicitarCuidador.fases.5.ejemplo')}</h2>
                            <p> {t('SolicitarCuidador.fases.5.ejemplos.0')}<br/>
                                {t('SolicitarCuidador.fases.5.ejemplos.1')}<br/>
                                {t('SolicitarCuidador.fases.5.ejemplos.2')}<br/>
                                {t('SolicitarCuidador.fases.5.ejemplos.3')}</p>
                        </div>
                        
                        <div id="form-horizontal">
                                <div>
                                    <input  type="radio"
                                            name="beneficio"
                                            id="e1"
                                            checked={!requestDomesticFormState.benefits}
                                            onChange={
                                                e => {
                                                    setRequestDomesticFormState( prev => {
                                                        const newState = {...prev}
                                                        newState.benefits = 0;
                                                        return newState
                                                    });
                                                } 
                                            }
                                            />
                                    <label htmlFor="e1">{t('OfrecermeNiñera.fases.5.no')}</label> 
                                </div>

                                <div>
                                    <input  type="radio"
                                            name="beneficio" 
                                            id="e2"
                                            checked={requestDomesticFormState.benefits}
                                            onChange={
                                                e => {
                                                    setRequestDomesticFormState( prev => {
                                                        const newState = {...prev}
                                                        newState.benefits = 1;
                                                        return newState
                                                    });
                                                } 
                                            }

                                            />
                                    <label htmlFor="e2">{t('OfrecermeNiñera.fases.5.si')}</label> 
                                </div>
                        </div>

                        <div style={{ visibility: requestDomesticFormState.benefits ? 'visible' : 'hidden' }}>
                            <div id="der">
                                <div id="peq">{t('OfrecermeNiñera.fases.3.especifique')}</div>
                            </div>

                            <div id="der" >
                                <textarea 
                                value={requestDomesticFormState.benefits_description}
                                onChange={ e =>{
                                    setRequestDomesticFormState( prev => {
                                        const newState = {...prev}
                                        newState.benefits_description = e.target.value;
                                        return newState
                                    });    
                                }}>
                                </textarea>
                            </div>
                        </div>
                        { benefits_required && <ErrorMessage message={t('OfrecermeNiñera.errores.especificar')}/>  }
                    </div>
                    
                </div>
        </div>
     );
}

const  Fase6= () => {
  const { t, i18n } = useTranslation();
  const {requestDomesticFormState, setRequestDomesticFormState} = useContext(RequestDomesticFormContext);

  const date_required = requestDomesticFormState.errors.date_required
  const date_opt_required = requestDomesticFormState.errors.date_opt_required 

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
                            <input  type="radio" 
                                    id="c1"
                                    checked={requestDomesticFormState.availability == "FECHA"}
                                    onChange={ e=>{
                                        setRequestDomesticFormState( prev => {
                                            const newState = {...prev};
                                            newState.availability = "FECHA";
                                            return newState;
                                        });

                                    }}

                            />
                            <label htmlFor="c1">{t('OfrecermeNiñera.fases.6.fecha-inicio')}</label> 
                      </div>

                      <div>
                            <input  type="radio" 
                                    id="c2"
                                    checked={requestDomesticFormState.availability == "CONVENIR"}
                                    onChange={ e=>{
                                        setRequestDomesticFormState( prev => {
                                            const newState = {...prev};
                                            newState.availability = "CONVENIR";
                                            return newState;
                                        });

                                    }}
                            />
                            <label htmlFor="c2">{t('OfrecermeNiñera.fases.6.fecha-convenir')}</label> 
                      </div>
                  </div>
                    {requestDomesticFormState.availability == "FECHA" &&
                        <div>
                            <input  type="date" 
                                    value={requestDomesticFormState.availability_date}
                                    onChange={
                                        e=>{
                                            setRequestDomesticFormState( prev => {
                                                const newState = {...prev};
                                                newState.availability_date = e.target.value;
                                                return newState;
                                            });
                                        }
                                    }
                            />   
                        </div>
                    }
              </div>
                { date_opt_required && <ErrorMessage message={t('OfrecermeNiñera.errores.option_required')}/>  }
                { date_required && <ErrorMessage message={t('OfrecermeNiñera.errores.fecha')}/>  }
      </div>
  </div>
  );
}

const Fase7 = () => {
    const { t, i18n } = useTranslation();
    const {requestDomesticFormState, setRequestDomesticFormState} = useContext(RequestDomesticFormContext);
    const other_doc_required = requestDomesticFormState.errors.other_doc_required

    function selectDocuments (e){
         
        setRequestDomesticFormState ( prev => {
            const newState = {...prev};

            let pos = requestDomesticFormState.documents.indexOf(e.target.value);

            if(e.target.checked){
                if( pos == -1 ) newState.documents.push( e.target.value )
            }else{
                if( pos != -1 ) newState.documents.splice(pos,1) 
            }

            return newState;
        });

    }

    return ( 
        <div id="fase8">

        <div id="small">
            <span className="red">*  </span><span className="blue">{t('SolicitarCuidador.fases.8.mensaje')}</span><br />
        </div>

        <div id="titulo">
            <h2 className="blue" >{t('SolicitarCuidador.fases.8.titulo')}</h2><br />
        </div>
        <div id="contenido">
            <h2>{t('SolicitarCuidador.fases.8.posee-documentacion')}</h2>

            <div id="form">
                <div id="form-horizontal">
                    <div>
                        <input  type="radio"
                                id="c1"
                                checked={requestDomesticFormState.have_documentation}
                                onChange={ e =>{
                                    setRequestDomesticFormState( prev => {
                                        const newState = {...prev};
                                        newState.have_documentation = true;
                                        return newState;
                                    })
                                }}
                                />
                        <label htmlFor="c1">{t('SolicitarCuidador.fases.8.si')}</label> 
                    </div>

                    <div id="segundo">
                        <input  type="radio"
                                id="c2"
                                checked={!requestDomesticFormState.have_documentation}
                                onChange={ e =>{
                                    setRequestDomesticFormState( prev => {
                                        const newState = {...prev};
                                        newState.have_documentation = false;
                                        return newState;
                                    })
                                }}
                        />
                        <label htmlFor="c2">{t('SolicitarCuidador.fases.8.no')}</label> 
                    </div>
                </div>
                { requestDomesticFormState.have_documentation &&
                <div >
                    <h2>{t('SolicitarCuidador.fases.8.documentos')}</h2>
                    <div id="selects">
                        <div>
                            <input type="checkbox" id="d1" value="PASAPORTE" checked={requestDomesticFormState.documents.includes("PASAPORTE")} onChange={ e => selectDocuments(e)}/>
                            <label htmlFor="d1">{t('SolicitarCuidador.fases.8.documentos-opciones.0')}</label>
                        </div>
                        <div>
                            <input type="checkbox" id="d2" value="CURRICULUM" checked={requestDomesticFormState.documents.includes("CURRICULUM")}  onChange={ e => selectDocuments(e)}/>
                            <label htmlFor="d2">{t('SolicitarCuidador.fases.8.documentos-opciones.1')}</label>
                        </div>    
                        <div>
                            <input type="checkbox" id="d3" value="TITULOS" checked={requestDomesticFormState.documents.includes("TITULOS")} onChange={ e => selectDocuments(e)}/>
                            <label htmlFor="d3">{t('SolicitarCuidador.fases.8.documentos-opciones.2')}</label>
                        </div>
                        <div>
                            <input type="checkbox" id="d4" value="REF_TRABAJO" checked={requestDomesticFormState.documents.includes("REF_TRABAJO")}  onChange={ e => selectDocuments(e)}/>
                            <label htmlFor="d4">{t('SolicitarCuidador.fases.8.documentos-opciones.3')}</label>
                        </div>
                        <div>
                            <input type="checkbox" id="d5" value="REF_FAMILIAR" checked={requestDomesticFormState.documents.includes("REF_FAMILIAR")}  onChange={ e => selectDocuments(e)}/>
                            <label htmlFor="d5">{t('SolicitarCuidador.fases.8.documentos-opciones.4')}</label>
                        </div>
                        <div>
                            <input type="checkbox" id="d6" value="CONST_RESIDENCIA" checked={requestDomesticFormState.documents.includes("CONST_RESIDENCIA")}  onChange={ e => selectDocuments(e)}/>
                            <label htmlFor="d6">{t('SolicitarCuidador.fases.8.documentos-opciones.5')}</label>
                        </div>
                        <div>
                            <input type="checkbox" id="d7" value="CONST_ANTECEDENTES" checked={requestDomesticFormState.documents.includes("CONST_ANTECEDENTES")} onChange={ e => selectDocuments(e)}/>
                            <label htmlFor="d7">{t('SolicitarCuidador.fases.8.documentos-opciones.6')}</label>
                        </div>
                        <div>
                            <input type="checkbox" id="d8" value="SALUD" checked={requestDomesticFormState.documents.includes("SALUD")}  onChange={ e => selectDocuments(e)}/>
                            <label htmlFor="d8">{t('SolicitarCuidador.fases.8.documentos-opciones.7')}</label>
                        </div>
                        <div>
                            <input type="checkbox" id="d9" value="OTRO" checked={requestDomesticFormState.documents.includes("OTRO")}  onChange={ e => selectDocuments(e)}/>
                            <label htmlFor="d9">{t('SolicitarCuidador.fases.8.documentos-opciones.8')}</label>
                        </div>
                        
                        { requestDomesticFormState.documents.includes("OTRO") &&
                        <div>
                            <p> {t('OfrecermeNiñera.fases.3.especifique')} </p> <input  type="text" 
                                                        onChange={ e => {
                                                            setRequestDomesticFormState( prev => {
                                                                const newState = {...prev};
                                                                newState.documents_other = e.target.value;
                                                                return newState;
                                                            });  
                                                        }} 
                                                        value={requestDomesticFormState.documents_other}
                                                />
                        </div>}
                        { other_doc_required && <ErrorMessage message={t('OfrecermeNiñera.errores.especificar')}/>  }
                    </div>
                </div>
                }
            </div>
            

        </div>
    </div>
     );
}

const Fase8 = () => {
  const { t, i18n } = useTranslation();
  const {requestDomesticFormState, setRequestDomesticFormState} = useContext(RequestDomesticFormContext);

  return ( 
      <div id="fase11">
          <div id="small">
              <span className="red">*  </span><span className="blue">{t('SolicitarCuidador.fases.11.mensaje')}</span><br />
          </div>
          <h2 className="blue">{t("SolicitarCuidador.fases.11.titulo")}</h2>
          <div>
              <h2>{t("SolicitarCuidador.fases.11.titulos.0")}</h2>
              <p>{t("SolicitarCuidador.fases.11.parrafos.1")}</p>
              <p>{t("SolicitarCuidador.fases.11.parrafos.2")}</p>
              <p>{t("SolicitarCuidador.fases.11.parrafos.3")}</p>
              <p>{t("SolicitarCuidador.fases.11.parrafos.4")}</p>
          </div>
          <div>
              <h2>{t("SolicitarCuidador.fases.11.titulos.1")}</h2>
              <p>{t("SolicitarCuidador.fases.11.parrafos.5")}</p>
              <p>{t("SolicitarCuidador.fases.11.parrafos.12")}</p>
              <p>{t("SolicitarCuidador.fases.11.parrafos.6")}</p>
          </div>
          
          <div>
              <h2>{t("SolicitarCuidador.fases.11.titulos.4")}</h2>
              <p>{t("SolicitarCuidador.fases.11.parrafos.9")}</p>
          </div>
          <div>
              <h2>{t("SolicitarCuidador.fases.11.titulos.6")}</h2>
              <p>{t("SolicitarCuidador.fases.11.parrafos.11")}</p>
          </div>

      </div>
   );
}

const Fase9 = () => {
  const { t, i18n } = useTranslation();
  const {requestDomesticFormState, setRequestDomesticFormState} = useContext(RequestDomesticFormContext);

  return ( 
      <div id="fase10">
          <div id="small">
              <span className="red">*  </span><span className="blue">{t('SolicitarCuidador.fases.10.mensaje')}</span><br />
          </div>
          <div>
              <h2 className="blue">{t("SolicitarCuidador.fases.10.titulo")}</h2>
              
                  <p>{t("SolicitarCuidador.fases.10.sugerencias.0")}</p>
                  <p>{t("SolicitarCuidador.fases.10.sugerencias.1")}</p>
              
          </div>
      </div>
   );
}

const Fase10 = () => {
  const { t, i18n } = useTranslation();
  const {requestDomesticFormState, setRequestDomesticFormState} = useContext(RequestDomesticFormContext);

  return ( 
      <div id="fase12">
          <div id="small">
              <span className="red">*  </span><span className="blue">{t('SolicitarCuidador.fases.12.mensaje')}</span><br />
          </div>
          
          <div className="red">
              <p>{t("SolicitarCuidador.fases.12.parrafos.0")}</p>
              <p>{t("SolicitarCuidador.fases.12.parrafos.1")}</p>

          </div>
      </div>
   );
}

const Fase111 = () => {
    
    const { t, i18n } = useTranslation();
  const {requestDomesticFormState, setRequestDomesticFormState} = useContext(RequestDomesticFormContext);
  
    var val=[1,2,3];
    
    //radio buttons form
    const [publication_time, setpublication_time] = useState(requestDomesticFormState.publication_time);


    //this is for the dropdowns
    const [banks, setBanks] = useState([]);
    const [bank_countries,setbank_countries] = useState([]);
    
    const [selectedBanks, setSelectedBanks] = useState(-1);
    const [selectedCountry, setSelectedCountry] = useState(-1) 
    // aux haves the values for each bank of the selectedCountry
    const [aux,setaux] = useState([]);
    const [aux2,setaux2] = useState([]);
    
    useEffect(() => {
        const getBanks = async () => {
          try {
            const response = await axios.get(`http://127.0.0.1:8000/banks/`);
            return response.data; // Return the response data instead of the entire response
          } catch (error) {
            console.error(error);
          }
        };
      
        const fetchBanks = async () => {
          const banksData = await getBanks(); // Await the getBanks() function to resolve the Promise
          setBanks(banksData); // Update the banks state with the fetched data
        };
      
        fetchBanks();
      }, []);
    
    
    useEffect(() =>{
        let auxC = []

        for (let i=0; i<banks.length; i++)
            if(!bank_countries.includes(banks[i].country)) auxC.push(banks[i].country);

        setbank_countries(auxC);
        
        
        if (requestDomesticFormState.billing_country !== "" && bank_countries.length > 0) {
            const foundCountry = bank_countries.find(
              (country) => country === requestDomesticFormState.billing_country
            );
            if (foundCountry) {
                setSelectedCountry(foundCountry);
            }
          }

    },[banks]);

    useEffect(()=>{
        let aux1 = [];
        let aux12 = [];
        if (selectedCountry != -1){
            for (let i=0; i<banks.length; i++){
                if ( banks[i].country == bank_countries[selectedCountry] ) aux1.push(banks[i].name+ " - "+ banks[i].account +" - "+ banks[i].swift_code);
                aux12.push(banks[i].name+ " - "+ banks[i].account +" - "+ banks[i].swift_code);
            }
            setaux(aux1);
            setaux2(aux12);
        }
        

        if( bank_countries != undefined && bank_countries.length > 0 ) 
            setRequestDomesticFormState ( prev => {
                const newState = {...prev};
                newState.billing_country = bank_countries[selectedCountry];
                return newState
            });

    },[selectedCountry]);

    useEffect(() => {
        if (aux2 !== undefined && aux2.length > 0 && aux !== undefined) {
            
            const foundBank = aux2.indexOf(aux[selectedBanks]);
          if (foundBank !== undefined) {
            setRequestDomesticFormState((prev) => {
              const newState = { ...prev };
              newState.billing_bank = foundBank;
              return newState;
            });
          }
        }
      }, [selectedBanks, aux2, aux]);

    function changePlan(e){
        
        setRequestDomesticFormState( prev =>{
            const newState = {...prev};
            newState.publication_time = e.target.value;
            newState.publication_plan = e.target.value;
            return newState;
        });
    }

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
                            <input type="radio" value="1" id="c1" checked={requestDomesticFormState.publication_time == "1"} onChange={(e)=>{changePlan(e)}}/>
                            <label htmlFor="c1">1 {t('OfrecermeNiñera.fases.13.mes')}</label>
                        </div>
                        <div>
                            <h3 className="red">10 USD</h3>
                        </div>
                        <div>
                            <input type="radio" value="3" id="c2" checked={requestDomesticFormState.publication_time == "3"} onChange={(e)=>{changePlan(e)}}/>
                            <label htmlFor="c2">3 {t('OfrecermeNiñera.fases.13.meses')}</label>
                        </div>
                        
                        <div>
                            <h3 className="red">25 USD</h3>
                        </div>    

                        <div>
                            <input type="radio" value="6" id="c3" checked={requestDomesticFormState.publication_time == "6"} onChange={(e)=>{changePlan(e)}}/>
                            <label htmlFor="c3">6 {t('OfrecermeNiñera.fases.13.meses')}</label>
                        </div>    

                        <div>
                            <h3 className="red">50 USD</h3>
                        </div>

                        <div>
                            <input type="radio" value="9" id="c4" checked={requestDomesticFormState.publication_time == "9"} onChange={(e)=>{changePlan(e)}}/>
                            <label htmlFor="c4">9 {t('OfrecermeNiñera.fases.13.meses')}</label>
                        </div>    

                        <div>
                            <h3 className="red">70 USD</h3>
                        </div>

                        <div>
                            <input type="radio" value="12" id="c5" checked={requestDomesticFormState.publication_time == "12"} onChange={(e)=>{changePlan(e)}}/>
                            <label htmlFor="c5">12 {t('OfrecermeNiñera.fases.13.meses')}</label>
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
                            <FieldDropdown 
                                title={t('OfrecermeNiñera.fases.13.pais')}
                                placeholder={t('SolicitarCuidador.fases.13.seleccione-pais')}
                                items={bank_countries}
                                setSelectedState={setSelectedCountry}
                            />
                        </div>
                    
                    
                    <div className="blue-box">
                        <p>{t('OfrecermeNiñera.fases.13.cuentas')}</p>
                    </div>
                        <div className="dropdown-content" id="bancos">
                        
                            {selectedCountry != -1 &&
                            
                                <FieldDropdown    
                                    title={t('OfrecermeNiñera.fases.13.banco')}
                                    placeholder={t('OfrecermeNiñera.fases.13.seleccione-banco')}
                                    items= {aux}
                                    setSelectedState={setSelectedBanks}
                                />
                            }
                        </div>

                        { requestDomesticFormState.billing_bank != -1 && banks.length>0 && selectedBanks != -1 && selectedCountry != -1 &&    
                        <div id="bank-info">
                            <div id="azul">
                                {banks[0].name}
                            </div>
                            <div id="columns">
                                <div>
                                    <span className="red">{t('OfrecermeNiñera.fases.13.formadepago')}</span>
                                        <ul>
                                            <li>{t('OfrecermeNiñera.fases.13.deposito')}</li>
                                            <li>{t('OfrecermeNiñera.fases.13.transferencia-bancaria')}</li>
                                        </ul>
                                </div>
                                <div>
                                    <p><span>{t('OfrecermeNiñera.fases.13.pais')}</span>: {banks[0].country}</p>
                                    <p><span>{t('OfrecermeNiñera.fases.13.banco')}</span>: {banks[0].name}</p>
                                    <p><span>{t('OfrecermeNiñera.fases.13.numero-cuenta')}</span>: {banks[0].account}</p>
                                    <p><span>{t('OfrecermeNiñera.fases.13.codigo-swift')}</span>: {banks[0].swift_code}</p>
                                </div>
                            </div>
                        </div>
                        }

                </div>
            </div>
        </div>
     );
}

const Fase11 = () => {
    
    const { t, i18n } = useTranslation();
    const {requestDomesticFormState, setRequestDomesticFormState} = useContext(RequestDomesticFormContext);

    var val=[1,2,3];
    
    //radio buttons form
    const [publication_time, setpublication_time] = useState(requestDomesticFormState.publication_time);

    const billing_required = requestDomesticFormState.errors.billing_required 

    //this is for the dropdowns
    const [banks, setBanks] = useState([]);
    const [bank_countries,setbank_countries] = useState([]);
    
    const [selectedBanks, setSelectedBanks] = useState(-1);
    const [selectedCountry, setSelectedCountry] = useState(-1) 
    // aux haves the values for each bank of the selectedCountry
    const [aux,setaux] = useState([]);
    const [aux2,setaux2] = useState([]);

    //bank selected
    const [foundBank,setFoundBank] = useState(-1);
    
    useEffect(() => {
        const getBanks = async () => {
          try {
            const response = await axios.get(`http://127.0.0.1:8000/banks/`);
            return response.data; // Return the response data instead of the entire response
          } catch (error) {
            console.error(error);
          }
        };
      
        const fetchBanks = async () => {
          const banksData = await getBanks(); // Await the getBanks() function to resolve the Promise
          setBanks(banksData); // Update the banks state with the fetched data
        };
      
        fetchBanks();
      }, []);
    
    
    useEffect(() =>{
        let auxC = []

        for (let i=0; i<banks.length; i++)
            if(!bank_countries.includes(banks[i].country)) auxC.push(banks[i].country);

        setbank_countries(auxC);
        
        
        if (requestDomesticFormState.billing_country !== "" && bank_countries.length > 0) {
            const foundCountry = bank_countries.find(
              (country) => country === requestDomesticFormState.billing_country
            );
            if (foundCountry) {
                setSelectedCountry(foundCountry);
            }
          }

    },[banks]);

    useEffect(()=>{
        let aux1 = [];
        let aux12 = [];
        if (selectedCountry != -1){
            for (let i=0; i<banks.length; i++){
                if ( banks[i].country == bank_countries[selectedCountry] ) aux1.push(banks[i].name+ " - "+ banks[i].account +" - "+ banks[i].swift_code);
                aux12.push(banks[i].name+ " - "+ banks[i].account +" - "+ banks[i].swift_code);
            }
            setaux(aux1);
            setaux2(aux12);
        }
        

        if( bank_countries != undefined && bank_countries.length > 0 ) 
            setRequestDomesticFormState ( prev => {
                const newState = {...prev};
                newState.billing_country = bank_countries[selectedCountry];
                return newState
            });

    },[selectedCountry]);

    useEffect(() => {
        if (aux2 !== undefined && aux2.length > 0 && aux !== undefined) {
            
        const foundBank1 = aux2.indexOf(aux[selectedBanks]);
            
          if (foundBank1 !== undefined && selectedBanks != -1) {
            setFoundBank(foundBank1);
            setRequestDomesticFormState((prev) => {
              const newState = { ...prev };
              newState.billing_bank = banks[foundBank1].id;
              return newState;
            });
          }
        }
      }, [selectedBanks, aux2, aux]);

    function changePlan(e){
        
        setRequestDomesticFormState( prev =>{
            const newState = {...prev};
            newState.publication_time = e.target.value;
            newState.publication_plan = e.target.value;
            return newState;
        });
    }

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
                            <input type="radio" value="1" id="c1" checked={requestDomesticFormState.publication_time == "1"} onChange={(e)=>{changePlan(e)}}/>
                            <label htmlFor="c1">1 {t('OfrecermeNiñera.fases.13.mes')}</label>
                        </div>
                        <div>
                            <h3 className="red">10 USD</h3>
                        </div>
                        <div>
                            <input type="radio" value="3" id="c2" checked={requestDomesticFormState.publication_time == "3"} onChange={(e)=>{changePlan(e)}}/>
                            <label htmlFor="c2">3 {t('OfrecermeNiñera.fases.13.meses')}</label>
                        </div>
                        
                        <div>
                            <h3 className="red">25 USD</h3>
                        </div>    

                        <div>
                            <input type="radio" value="6" id="c3" checked={requestDomesticFormState.publication_time == "6"} onChange={(e)=>{changePlan(e)}}/>
                            <label htmlFor="c3">6 {t('OfrecermeNiñera.fases.13.meses')}</label>
                        </div>    

                        <div>
                            <h3 className="red">50 USD</h3>
                        </div>

                        <div>
                            <input type="radio" value="9" id="c4" checked={requestDomesticFormState.publication_time == "9"} onChange={(e)=>{changePlan(e)}}/>
                            <label htmlFor="c4">9 {t('OfrecermeNiñera.fases.13.meses')}</label>
                        </div>    

                        <div>
                            <h3 className="red">70 USD</h3>
                        </div>

                        <div>
                            <input type="radio" value="12" id="c5" checked={requestDomesticFormState.publication_time == "12"} onChange={(e)=>{changePlan(e)}}/>
                            <label htmlFor="c5">12 {t('OfrecermeNiñera.fases.13.meses')}</label>
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
                            <FieldDropdown 
                                title={t('OfrecermeNiñera.fases.13.pais')}
                                placeholder={t('OfrecermeNiñera.fases.13.seleccione-pais')}
                                items={bank_countries}
                                setSelectedState={setSelectedCountry}
                            />
                        </div>
                    
                    
                    <div className="blue-box">
                        <p>{t('OfrecermeNiñera.fases.13.cuentas')}</p>
                    </div>
                        <div className="dropdown-content" id="bancos">
                        
                            {selectedCountry != -1 &&
                            
                                <FieldDropdown    
                                    title={t('OfrecermeNiñera.fases.13.banco')}
                                    placeholder={t('OfrecermeNiñera.fases.13.seleccione-banco')}
                                    items= {aux}
                                    setSelectedState={setSelectedBanks}
                                />
                            }
                        </div>
                        
                        { requestDomesticFormState.billing_bank != -1 && banks != undefined &&banks.length>0 && selectedBanks != -1 && selectedCountry != -1 && foundBank != -1 &&   
                        <div id="bank-info">
                            <div id="azul">
                                {console.log(foundBank)}
                                {banks[foundBank].name}
                            </div>
                            <div id="columns">
                                <div>
                                    <span className="red">{t('OfrecermeNiñera.fases.13.formadepago')}</span>
                                        <ul>
                                            <li>{t('OfrecermeNiñera.fases.13.deposito')}</li>
                                            <li>{t('OfrecermeNiñera.fases.13.transferencia-bancaria')}</li>
                                        </ul>
                                </div>
                                <div>
                                    <p><span>{t('OfrecermeNiñera.fases.13.pais')}</span>: {banks[0].country}</p>
                                    <p><span>{t('OfrecermeNiñera.fases.13.banco')}</span>: {banks[0].name}</p>
                                    <p><span>{t('OfrecermeNiñera.fases.13.numero-cuenta')}</span>: {banks[0].account}</p>
                                    <p><span>{t('OfrecermeNiñera.fases.13.codigo-swift')}</span>: {banks[0].swift_code}</p>
                                </div>
                            </div>
                        </div>
                        }
                        { billing_required && <ErrorMessage message={t('OfrecermeNiñera.errores.banco')}/>  }
                </div>
            </div>
        </div>
     );
}

const botonEnviar = () => {
    const [loading, setLoading] = useState(false)
    const { t, i18n } = useTranslation();
    const {requestDomesticFormState, setRequestDomesticFormState} = useContext(RequestDomesticFormContext);
    const {authState, setAuthState} = useContext(AuthContext);
    const navigate = useNavigate();
    const postData = {...requestDomesticFormState};

    postData.number_tco = parseInt(postData.number_tco)
    postData.age_required_from = parseInt(postData.age_required_from)
    postData.age_required_to = parseInt(postData.age_required_to)
    postData.payment_amount = parseFloat(postData.payment_amount)

    if(!postData.currency){
        postData.currency = ""
    }

    useEffect(() => {
        setRequestDomesticFormState ( prev => {
            const newState = {... prev};
            newState.user = authState.id;
            newState.service = "CUI";
            return newState;
        });
    }, [])

    console.log(JSON.stringify(postData));
    return(
        <button
            id="boton_registrar"
            
            onClick={
                async () => {
                    setLoading(true);
                    //Autenticar última fase
                    if(!requestDomesticFormState.billing_country || !requestDomesticFormState.billing_bank){
                        setRequestDomesticFormState((prev) => {
                            const newState = { ...prev };
                            newState.errors.billing_required = true
                            return newState;
                          })
                          return
                    } else {
                        setRequestDomesticFormState((prev) => {
                            const newState = { ...prev };
                            newState.errors.billing_required = false
                            return newState;
                          })
                    }
                    
                    const url = 'http://127.0.0.1:8000/api-services/requestService/post_ad/'
                    try {
                        
                        const response = await fetch( url,{
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(postData),
                                // body: JSON.stringify(postBody),
                            }
                        );
                
                        if (response.ok) {
                            // Request was successful
                            const data = await response.json(); 
                            console.log('POST request successful');
                            navigate(`/visualizar-publicacion-creada?postType=request&id=${data.post_code}`);
                        } else {
                            // Request failed
                            console.log('POST request failed');
                            console.log(response);
                        }
                
                    } catch (error) {
                        console.log("error registrando");
                        console.log(error);
                    }
                    setLoading(false);
                }
            }
            >
            <span className={loading?"loading-button":""}>
                {loading?"...":t('multiform.registrar')}
            </span>
        </button>
    );
}

const useValidar = () => {

    const {requestDomesticFormState, setRequestDomesticFormState} = useContext(RequestDomesticFormContext);

    const validateNumber = (number) => {
        return /^\+?(0|[1-9]\d*)$/.test(number);
    }

    const validFloat = (float) => {
        return /^([1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/.test(float)
    }

    const ageRange = (min, max) => {
        return min >= 0 && max <= 12
    }

    const validate = (currentStage) => {
        // Empty implementation
        let valid =true;

        console.log(requestDomesticFormState)
        if(currentStage === 0){
            if(requestDomesticFormState.age_requirement && (!validateNumber(requestDomesticFormState.age_required_from) 
            || !validateNumber(requestDomesticFormState.age_required_to ) || !ageRange(requestDomesticFormState.age_required_from, requestDomesticFormState.age_required_to))){
                valid = false
                setRequestDomesticFormState( prev => {
                    const newState = {...prev};
                    requestDomesticFormState.errors.age_range_invalid = true
                    return newState;
                } );
                
            } else {
                setRequestDomesticFormState( prev => {
                    const newState = {...prev};
                    requestDomesticFormState.errors.age_range_invalid = false
                    return newState;
                } );    
            }
        }else if (currentStage === 1){
            if(!requestDomesticFormState.country){
                valid = false
                setRequestDomesticFormState((prev) => {
                    const newState = { ...prev };
                    newState.errors.country_required = true
                    return newState;
                  })
            } else {
                setRequestDomesticFormState((prev) => {
                    const newState = { ...prev };
                    newState.errors.country_required = false
                    return newState;
                })
            }

            if(!requestDomesticFormState.state){
                valid = false
                setRequestDomesticFormState((prev) => {
                    const newState = { ...prev };
                    newState.errors.state_required = true
                    return newState;
                  })
            } else {
                setRequestDomesticFormState((prev) => {
                    const newState = { ...prev };
                    newState.errors.state_required = false
                    return newState;
                })
            }

            if(!requestDomesticFormState.city){
                valid = false
                setRequestDomesticFormState((prev) => {
                    const newState = { ...prev };
                    newState.errors.city_required = true
                    return newState;
                  })
            } else {
                setRequestDomesticFormState((prev) => {
                    const newState = { ...prev };
                    newState.errors.city_required = false
                    return newState;
                })
            }
        } else if (currentStage === 2){
            if(!requestDomesticFormState.number_tco || !validateNumber(requestDomesticFormState.number_tco)){
                valid = false
                setRequestDomesticFormState((prev) => {
                    const newState = { ...prev };
                    newState.errors.number_tco_required = true
                    return newState;
                  })
            } else {
                setRequestDomesticFormState((prev) => {
                    const newState = { ...prev };
                    newState.errors.number_tco_required= false
                    return newState;
                })
            }

            if(!requestDomesticFormState.age_tco){
                valid = false
                setRequestDomesticFormState((prev) => {
                    const newState = { ...prev };
                    newState.errors.age_tco_required = true
                    return newState;
                  })
            } else {
                setRequestDomesticFormState((prev) => {
                    const newState = { ...prev };
                    newState.errors.age_tco_required = false
                    return newState;
                })
            }

            if(!requestDomesticFormState.gender_tco){
                valid = false
                setRequestDomesticFormState((prev) => {
                    const newState = { ...prev };
                    newState.errors.gender_tco_required = true
                    return newState;
                  })
            } else {
                setRequestDomesticFormState((prev) => {
                    const newState = { ...prev };
                    newState.errors.gender_tco_required = false
                    return newState;
                })
            }

            if(requestDomesticFormState.disabilities_tco && !requestDomesticFormState.disabilities_tco_decrip && !requestDomesticFormState.diseases_tco_descrip){
                valid = false
                setRequestDomesticFormState((prev) => {
                    const newState = { ...prev };
                    newState.errors.diseases_required = true
                    return newState;
                  })
            } else {
                setRequestDomesticFormState((prev) => {
                    const newState = { ...prev };
                    newState.errors.diseases_required = false
                    return newState;
                })
            }
        } else if (currentStage === 3){
            if(requestDomesticFormState.travel && !requestDomesticFormState.travel_decription)                {
                valid = false
                setRequestDomesticFormState((prev) => {
                    const newState = { ...prev };
                    newState.errors.travel_desc_required = true
                    return newState;
                  })
            } else {
                setRequestDomesticFormState((prev) => {
                    const newState = { ...prev };
                    newState.errors.travel_desc_required = false
                    return newState;
                })
            }
        } else if (currentStage === 4){
            if(!requestDomesticFormState.activities){
                valid = false
                setRequestDomesticFormState((prev) => {
                    const newState = { ...prev };
                    newState.errors.activities_required = true
                    return newState;
                  })
            } else {
                setRequestDomesticFormState((prev) => {
                    const newState = { ...prev };
                    newState.errors.activities_required = false
                    return newState;
                })
            }
        } else if (currentStage === 5){
            if(requestDomesticFormState.workday.length === 0){
                valid = false
                setRequestDomesticFormState((prev) => {
                    const newState = { ...prev };
                    newState.errors.workday_required = true
                    newState.errors.workday_other_required = false
                    return newState;
                  })
            } else if(requestDomesticFormState.workday.includes('OTRO') && !requestDomesticFormState.workday_other){
                valid = false
                setRequestDomesticFormState((prev) => {
                    const newState = { ...prev };
                    newState.errors.workday_required = false
                    newState.errors.workday_other_required = true
                    return newState;
                  })
            } else {
                setRequestDomesticFormState((prev) => {
                    const newState = { ...prev };
                    newState.errors.workday_required = false
                    newState.errors.workday_other_required = false
                    return newState;
                  })
            }

            if(requestDomesticFormState.schedule.length === 0){
                valid = false
                setRequestDomesticFormState((prev) => {
                    const newState = { ...prev };
                    newState.errors.schedule_required = true
                    newState.errors.schedule_other_required = false
                    return newState;
                  })
            } else if(requestDomesticFormState.schedule.includes('OTRO') && !requestDomesticFormState.schedule_other){
                valid = false
                setRequestDomesticFormState((prev) => {
                    const newState = { ...prev };
                    newState.errors.schedule_required = false
                    newState.errors.schedule_other_required = true
                    return newState;
                  })
            } else {
                setRequestDomesticFormState((prev) => {
                    const newState = { ...prev };
                    newState.errors.schedule_required = false
                    newState.errors.schedule_other_required = false
                    return newState;
                  })
            }

            if(!requestDomesticFormState.payment){
                valid = false
                setRequestDomesticFormState((prev) => {
                    const newState = { ...prev };
                    newState.errors.salary_option_required = true
                    newState.errors.salary_required = false
                    newState.errors.salary_other_required = false
                    return newState;
                  })
            }
            else if(requestDomesticFormState.payment === "MONTO" && ((requestDomesticFormState.currency === -1 || !requestDomesticFormState.currency) 
                || (requestDomesticFormState.salary_offered === -1 || !requestDomesticFormState.salary_offered )  ||  !validFloat(requestDomesticFormState.payment_amount))){
                valid = false
                setRequestDomesticFormState((prev) => {
                    const newState = { ...prev };
                    newState.errors.salary_option_required = false
                    newState.errors.salary_required = true
                    newState.errors.salary_other_required = false
                    return newState;
                  })
            } else if(requestDomesticFormState.payment === "MONTO" && requestDomesticFormState.currency === "OTRA" && !requestDomesticFormState.currency_other){
                valid = false
                setRequestDomesticFormState((prev) => {
                    const newState = { ...prev };
                    newState.errors.salary_option_required = false
                    newState.errors.salary_required = false
                    newState.errors.salary_other_required = true
                    return newState;
                  })
            } else {
                setRequestDomesticFormState((prev) => {
                    const newState = { ...prev };
                    newState.errors.salary_option_required = false
                    newState.errors.salary_required = false
                    newState.errors.salary_other_required = false
                    return newState;
                  })
            }

            if(requestDomesticFormState.benefits && !requestDomesticFormState.benefits_description){
                valid = false
                setRequestDomesticFormState((prev) => {
                    const newState = { ...prev };
                    newState.errors.benefits_required = true
                    return newState;
                  })
            } else{
                setRequestDomesticFormState((prev) => {
                    const newState = { ...prev };
                    newState.errors.benefits_required = false
                    return newState;
                  })
            }
        }  else if(currentStage === 6){
            if(!requestDomesticFormState.availability){
                valid = false
                setRequestDomesticFormState((prev) => {
                    const newState = { ...prev };
                    newState.errors.date_opt_required = true
                    newState.errors.date_required = false
                    return newState;
                  })
            }
            else if(requestDomesticFormState.availability === "FECHA" && !requestDomesticFormState.availability_date){
                valid = false
                setRequestDomesticFormState((prev) => {
                    const newState = { ...prev };
                    newState.errors.date_opt_required = false
                    newState.errors.date_required = true
                    return newState;
                  })
            } else{
                setRequestDomesticFormState((prev) => {
                    const newState = { ...prev };
                    newState.errors.date_opt_required = false
                    newState.errors.date_required = false
                    return newState;
                  })
            }
        } else if(currentStage === 7){
            if(requestDomesticFormState.documents.includes('OTRO') && !requestDomesticFormState.documents_other){
                valid = false
                setRequestDomesticFormState((prev) => {
                    const newState = { ...prev };
                    newState.errors.other_doc_required = true
                    return newState;
                  })
            } else {
                setRequestDomesticFormState((prev) => {
                    const newState = { ...prev };
                    newState.errors.other_doc_required = false
                    return newState;
                  })
            }
        }

        return valid
    };

    return { validate };
};

const FasesSolicitarCuidador = [Fase0, Fase1, Fase2, Fase3, Fase4, Fase5, Fase6, Fase7, Fase8, Fase9, Fase10, Fase11];

export {FasesSolicitarCuidador, botonEnviar, useValidar};