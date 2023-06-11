import React, { useContext } from "react";
import { useTranslation } from 'react-i18next';

import { FieldDropdownCheckbox } from "./search/FieldDropdownCheckbox";
import { useState } from "react";
import { OfferDomesticFormContext } from "../context/OfferDomesticFormContext";
import { getAllCountries, getCountriesInRegion, getStatesInCountry, getCitiesInStates, getContinents } from "../components/dataFetchers/PaisDataFetcher";
import { useEffect } from 'react';
import { FieldDropdown } from "../components/search/FieldDropdown";
import { FieldDropdownSearch } from "../components/search/FieldDropdownSearch";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import "../styles/BuscarPersonalDomestico.scss"
 


const Fase0 = () => {
    
    const { t, i18n } = useTranslation();
    const {offerDomesticFormState, setOfferDomesticFormState} = useContext(OfferDomesticFormContext);
    

    return ( 
        <div id="fase0">
            <div id="small">
                <p>{t('OfrecermeNiñera.fases.0.mensaje')}</p>                        
                <span className="red">*  </span>= <span className="blue">{t('OfrecermeNiñera.fases.0.campos-obligatorios')}</span>
            </div>
            <div >
                <p>{t('OfrecermeNiñera.fases.0.condiciones')}</p>
                <span className="red" >*  </span><h3 className="blue"> {t('OfrecermeNiñera.fases.0.edad')}</h3>
                <input  type="text"
                        onChange={ e =>{
                            setOfferDomesticFormState ( prev => {
                                const newState = {...prev};
                                newState.age = e.target.value;
                                return newState;
                            });
                        }}
                        value={offerDomesticFormState.age}
                        /> {t('OfrecermeNiñera.fases.0.años')}
            <div>
                <span className="red" >*  </span><h3 className="blue">{t('OfrecermeNiñera.fases.0.situacion-familiar')}</h3> <br />
                <div>
                    <input  type="radio"
                            id="o1" 
                            name="situacion-familiar" 
                            value="NO" 
                            onChange={e => {
                                setOfferDomesticFormState (prev =>{
                                    const newState = {... prev};
                                    
                                    newState.have_children = false;
                                    
                                    return newState;
                                });  
                            }}
                            checked={!offerDomesticFormState.have_children}
                    />
                    
                    
                    <label htmlFor="o1">{t('OfrecermeNiñera.fases.0.sin-hijos')}</label>

                    <input  type="radio"
                            id="o2" 
                            className="segundo" 
                            name="situacion-familiar" 
                            value="SI"
                            onChange={ e =>{
                                setOfferDomesticFormState ( prev => {
                                    const newState = {... prev};
                                    newState.have_children = true;
                                    
                                    return newState;
                                });
                            }} 
                            checked={offerDomesticFormState.have_children}
                            />
                    <label htmlFor="o2">{t('OfrecermeNiñera.fases.0.con-hijos')}</label>
                </div>
            </div>

            <div>
                <span className="red" >*  </span><h3 className="blue">{t('OfrecermeNiñera.fases.0.grado-instruccion')}</h3><br />
                <div>
                    <input  type="radio"
                            id="o3" 
                            name="grado-instruccion"
                            value="PRI" 
                            onChange={ e => {
                                setOfferDomesticFormState ( prev => {
                                    const newState = {... prev};
                                    newState.education_level = e.target.value;
                                    
                                    return newState;
                                });
                            }}
                            checked={offerDomesticFormState.education_level === 'PRI'}
                            />

                    
                            
                    <label htmlFor="o3">{t('OfrecermeNiñera.fases.0.grado.0')}</label>

                    <input  type="radio"
                            id="o4" 
                            className="segundo" 
                            name="grado-instruccion" 
                            value="TEC"
                            onChange={ e => {
                                setOfferDomesticFormState ( prev => {
                                    const newState = {... prev};
                                    newState.education_level = e.target.value;
                                    
                                    return newState;
                                });
                            }}
                            checked={offerDomesticFormState.education_level === 'TEC'}
                              />
                    <label htmlFor="o4">{t('OfrecermeNiñera.fases.0.grado.1')}</label>

                    <input  type="radio"
                            id="o5"
                            className="segundo"
                            name="grado-instruccion"
                            value="BAC"
                            onChange={ e => {
                                setOfferDomesticFormState ( prev => {
                                    const newState = {... prev};
                                    newState.education_level = e.target.value;
                                    
                                    return newState;
                                });
                            }}
                            checked={offerDomesticFormState.education_level === 'BAC'}
                            />
                    <label htmlFor="o5">{t('OfrecermeNiñera.fases.0.grado.2')}</label>

                    <input  type="radio"
                            id="o6"
                            className="segundo"
                            name="grado-instruccion"
                            value="UNI"
                            onChange={ e => {
                                setOfferDomesticFormState ( prev => {
                                    const newState = {... prev};
                                    newState.education_level = e.target.value;
                                    
                                    return newState;
                                });
                            }}
                            checked={offerDomesticFormState.education_level == 'UNI'}
                            />
                    <label htmlFor="o6">{t('OfrecermeNiñera.fases.0.grado.3')}</label>
                </div>
            </div>

            </div>

        </div>
     );
}
 



const Fase1 = () => {
    const { t, i18n } = useTranslation();
    const {offerDomesticFormState, setOfferDomesticFormState} = useContext(OfferDomesticFormContext);

    //ID of the Nannie that is making the post
        

    //selected
    const [selectedCountry, setSelectedCountry] = useState(offerDomesticFormState.country);
    const [selectedState, setSelectedState] = useState(offerDomesticFormState.state);
    const [selectedCity, setSelectedCity] = useState(offerDomesticFormState.city);
    
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
                                    
                let [names, values] = await ( selectedCountry!="" ? getStatesInCountry(selectedCountry): ["Select a Country","loading"])
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
                let [names, values] = await ( selectedState != "" ? getCitiesInStates(selectedState): ["Select a State","loading"])
                
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

    const renderOptions = (objects,object_name,aux) => {
        const options = [];
        



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
                <span className="red">*  </span><span className="blue">{t('OfrecermeNiñera.fases.1.mensaje')}</span>
            </div>

            <div>
                <h2 className="blue">{t('OfrecermeNiñera.fases.1.nombre')}</h2>
                <p>{t('OfrecermeNiñera.fases.1.prefiero')}</p>
            </div>
            
            
            <div id="formulario">
                <div>
                    <label htmlFor="pais">{t('OfrecermeNiñera.fases.1.pais')}</label> 
                </div>
                <div>
                    <select name="pais" 
                            id="pais" 
                            onClick={ 
                                e => {
                                    setSelectedCountry(e.target.value);
                                    setOfferDomesticFormState ( prev => {
                                        const newState = {... prev};
                                        newState.country = e.target.value;
                                        return newState;
                                    });

                                }
                            }
                    >
                    {console.log(offerDomesticFormState.country)}
                    {readyCountries && renderOptions(countries,"countries",offerDomesticFormState.country)}
                    {!readyCountries && (
                        <option>Loading ...</option>
                    )}
                    </select>
                </div>
                

                <div >
                    <label htmlFor="estados">{t('OfrecermeNiñera.fases.1.estado')}</label> 
                </div>
                <div>
                    <select name="estados" 
                            id="estados" 
                            disabled={ selectedCountry == ""}
                            onClick={ 
                                e =>{
                                    setSelectedState(e.target.value);
                                    setOfferDomesticFormState ( prev => {
                                        const newState = {... prev};
                                        newState.state = e.target.value;
                                        return newState;
                                    });
                                }
                            }> 
                        {readyStates && renderOptions(states,"states")}
                        {!readyStates && (
                        <option>{t('OfrecermeNiñera.fases.1.select-country')}</option>
                        )}
                    </select>
                </div>
                <div>
                    <label htmlFor="ciudad">{t('OfrecermeNiñera.fases.1.ciudad')}</label> 
                </div>
                <div>
                    <select name="ciudad"
                            id="ciudad" 
                            disabled={ selectedState == ""}
                            onClick={ 
                                e => {
                                    console.log(e.target.value);
                                    setSelectedCity(e.target.value);
                                    setOfferDomesticFormState ( prev => {
                                        const newState = {... prev};
                                        newState.city = e.target.value;
                                        return newState;
                                    });
                                }
                            }
                            > 
                        {readyCities && renderOptions(cities,"cities")}
                        {!readyCities && (
                        <option>{t('OfrecermeNiñera.fases.1.select-state')}</option>
                        )}
                    </select>
                </div>

                <div>
                    <label htmlFor="zona">{t('OfrecermeNiñera.fases.1.zona')}</label> 
                </div>
                <div>
                    <input  type="text"
                            name="zona"
                            id="zona" 
                            disabled={ selectedCity == ""}
                            onChange={
                                e => {
                                    setOfferDomesticFormState ( prev => {
                                        const newState = {... prev};
                                        newState.zone = e.target.value;
                                        return newState;
                                    });
                                } 
                            }
                            value={offerDomesticFormState.zone}
                            />
                </div>

            </div>

        </div> 
    );
}

const Fase2 = () => {
    const { t, i18n } = useTranslation();
    const {offerDomesticFormState, setOfferDomesticFormState} = useContext(OfferDomesticFormContext);    

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
                <textarea 
                        onChange={
                            e => {
                                setOfferDomesticFormState ( prev => {
                                    const newState = {... prev};
                                    newState.description = e.target.value;
                                    return newState;
                                });
                            } 
                        }
                        value={offerDomesticFormState.description}
                ></textarea>
            </div>
    </div> 
    );
}

const Fase3 = () => {
    const { t, i18n } = useTranslation();
    const {offerDomesticFormState, setOfferDomesticFormState} = useContext(OfferDomesticFormContext);

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
                        <input  type="radio"
                                
                                name="interest"
                                id="c1"
                                onChange={
                                    e => {
                                        setOfferDomesticFormState ( prev => {
                                            const newState = {... prev};
                                            newState.travel = false;
                                            return newState;
                                        });
                                    } 
                                }
                                checked={!offerDomesticFormState.travel}
                        />
                        <label htmlFor="c1">{t('OfrecermeNiñera.fases.3.no')}</label>
                    </div>

                    <div>
                        <input  type="radio"
                                
                                className="segundo" 
                                name="interest" 
                                id="c2"
                                onChange={
                                    e => {
                                        setOfferDomesticFormState ( prev => {
                                            const newState = {... prev};
                                            newState.travel = true;
                                            return newState;
                                        });
                                    } 
                                }
                                checked={offerDomesticFormState.travel}        
                        />
                        <label htmlFor="c2">{t('OfrecermeNiñera.fases.3.si')}</label>
                    </div>
            </div>
        </div>
        
        { offerDomesticFormState.travel && (
        <div id="form" >
        <div >
            <div id="peq">{t('OfrecermeNiñera.fases.3.especifique')}</div>
        </div>
            <textarea 
                    onChange={
                        e => {
                            setOfferDomesticFormState ( prev => {
                                const newState = {... prev};
                                newState.travel_description = e.target.value;
                                return newState;
                            });
                        } 
                    }
                    value={offerDomesticFormState.travel_description}
            ></textarea>
        </div>
        )}

    </div>
  );
}

const Fase4 = () => {
    const { t, i18n } = useTranslation();
    const {offerDomesticFormState, setOfferDomesticFormState} = useContext(OfferDomesticFormContext);

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
                <textarea
                        onChange={
                            e => {
                                setOfferDomesticFormState ( prev => {
                                    const newState = {... prev};
                                    newState.activities = e.target.value;
                                    return newState;
                                });
                            } 
                        }
                        value={offerDomesticFormState.activities}                        
                ></textarea>
            </div>
        </div>
    </div>

     );
}

const Fase5 = () => {
    const { t, i18n } = useTranslation();
    const {offerDomesticFormState, setOfferDomesticFormState} = useContext(OfferDomesticFormContext);

    // variables to make the checkboxes behave like radiobuttons
    const [workdays, setWorkdays] =useState(offerDomesticFormState.workday);
    const [schedule, setSchedule] =useState(offerDomesticFormState.schedule);

    const [salaryType, setSalaryType] = useState("");

    //dropdown currency
    let currency = ["USD","EUR",t('OfrecermeNiñera.fases.5.otro')];
    const [selectedCurrency,setSelectedCurrency] = useState(switchCurrency());
    

    //dropdown salary
    let salary = [t('OfrecermeNiñera.fases.5.salario-opciones.0'), t('OfrecermeNiñera.fases.5.salario-opciones.1'), t('OfrecermeNiñera.fases.5.salario-opciones.2'), t('OfrecermeNiñera.fases.5.salario-opciones.3'), t('OfrecermeNiñera.fases.5.salario-opciones.4')];
    const [selectedSalary, setSelectedSalary] = useState(switchSalary());

    const [selectedServices, setSelectedServices] = useState("");

 


    function setTheWorkdays (e){

        setOfferDomesticFormState ( prev => {
            const newState = {... prev};
            newState.workday = e.target.id;
            return newState;
        })
        
    } 

    
    function setTheSchedule (e){

        setOfferDomesticFormState ( prev => {

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
        setOfferDomesticFormState ( prev => {
            const newState = {... prev}
            if(selectedCurrency ==2 )
                 newState.currency =  "OTRA" 
            else{
                newState.currency =  currency[selectedCurrency]
                newState.currency_other =  null; 
            }
            return newState;
        });
    }, [selectedCurrency]);

    useEffect(() => {
        setOfferDomesticFormState ( prev => {
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
        switch(offerDomesticFormState.currency){
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
        switch(offerDomesticFormState.salary_offered){
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
                <span className="red">* </span><span className="blue">{t('OfrecermeNiñera.fases.5.mensaje')}</span>
            </div>

            <div>
                <h1 className="blue">{t('OfrecermeNiñera.fases.5.nombre')}</h1>
            </div>

            
                <div>
                    <div className="titulos">
                        <span className="red">* </span><h2>{t('OfrecermeNiñera.fases.5.salidas-jornada')}</h2>
                    </div>
                    <div className="form" >
                        <div>
                            <input  type="radio"
                                    id="SEMANAL"
                                    className="workdays"
                                    checked={(offerDomesticFormState.workday) == ('SEMANAL')}
                                    onChange={e => setTheWorkdays(e)}
                            />
                            <label htmlFor="SEMANAL">{t('OfrecermeNiñera.fases.5.salidas-jornada-opciones.0')}</label>
                        </div>    
                        
                        <div>
                            <input  type="radio"
                                    id="QUINCENAL"
                                    className="workdays"
                                    checked={offerDomesticFormState.workday == ('QUINCENAL')}
                                    onChange={e => {setTheWorkdays(e)}}
                            />
                            <label htmlFor="QUINCENAL">{t('OfrecermeNiñera.fases.5.salidas-jornada-opciones.1')}</label>
                        </div>    

                        <div>
                            <input  type="radio"
                                    id="MENSUAL"
                                    className="workdays"
                                    checked={offerDomesticFormState.workday == ('MENSUAL')}
                                    onChange={e => {setTheWorkdays(e)}}
                            />
                            <label htmlFor="MENSUAL">{t('OfrecermeNiñera.fases.5.salidas-jornada-opciones.2')}</label>
                        </div>

                        <div>
                            <input  type="radio"
                                    id="INTERDIARIO"
                                    className="workdays"
                                    checked={offerDomesticFormState.workday == ('INTERDIARIO')}
                                    onChange={e => {setTheWorkdays(e)}}
                            />
                            <label htmlFor="INTERDIARIO">{t('OfrecermeNiñera.fases.5.salidas-jornada-opciones.3')}</label>
                        </div>

                        <div>
                            <input  type="radio"
                                    id="MEDIO_TIEMPO"
                                    className="workdays"
                                    checked={offerDomesticFormState.workday == ('MEDIO_TIEMPO')}
                                    onChange={e => {setTheWorkdays(e)}}
                            />
                            <label htmlFor="MEDIO_TIEMPO">{t('OfrecermeNiñera.fases.5.salidas-jornada-opciones.4')}</label><br/>
                        </div>

                        <div>
                            <input  type="radio"
                                    id="FIN_SEMANA"
                                    className="workdays"
                                    checked={offerDomesticFormState.workday == ('FIN_SEMANA')}
                                    onChange={e => {setTheWorkdays(e)}}
                            />
                            <label htmlFor="FIN_SEMANA">{t('OfrecermeNiñera.fases.5.salidas-jornada-opciones.5')}</label>
                        </div>

                        <div>
                            <input  type="radio"
                                    id="NOCHE"
                                    className="workdays"
                                    checked={offerDomesticFormState.workday == ('NOCHE')}
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
                                    checked={offerDomesticFormState.workday == ('HORAS')}
                                    onChange={e => {setTheWorkdays(e)}}
                            />
                            <label htmlFor="HORAS">{t('OfrecermeNiñera.fases.5.salidas-jornada-opciones.8')}</label>
                        </div>

                        <div>
                            <input  type="radio"
                                    id="OTRO"
                                    className="workdays"
                                    checked={offerDomesticFormState.workday == ('OTRO')}
                                    onChange={e => {setTheWorkdays(e)}}
                            />
                            <label htmlFor="OTRO">{t('OfrecermeNiñera.fases.5.salidas-jornada-opciones.9')}</label>                    
                        </div>
                        <br />
                        
                        <div hidden={!(offerDomesticFormState.workday).includes('OTRO')}>
                        {t('OfrecermeNiñera.fases.5.salidas-jornada-opciones.10')}: <input type="text" value={offerDomesticFormState.workday_other} 
                            onChange={ e =>{
                                setOfferDomesticFormState( prev =>{
                                    const newState = {...prev};
                                    newState.workday_other = e.target.value;
                                    return newState;
                                });
                            }}/>
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
                            <input  type="checkbox"
                                    id="LUN"
                                    checked={offerDomesticFormState.schedule.includes('LUN')}
                                    onChange={e => {setTheSchedule(e)}}

                                    />
                            <label htmlFor="cd1">{t('OfrecermeNiñera.fases.5.horario-opciones.0')}</label>
                        </div>

                        <div>
                            <input  type="checkbox"
                                    id="MAR"
                                    checked={offerDomesticFormState.schedule.includes('MAR')}
                                    onChange={e => {setTheSchedule(e)}}
                                    />
                            <label htmlFor="cd2">{t('OfrecermeNiñera.fases.5.horario-opciones.1')}</label>
                        </div>

                        <div>
                            <input  type="checkbox"
                                    id="MIE"
                                    checked={offerDomesticFormState.schedule.includes('MIE')}
                                    onChange={e => {setTheSchedule(e)}}
                                    />
                            <label htmlFor="MIE">{t('OfrecermeNiñera.fases.5.horario-opciones.2')}</label>
                        </div>

                        <div>
                            <input  type="checkbox"
                                    id="JUE"
                                    checked={offerDomesticFormState.schedule.includes('JUE')}
                                    onChange={e => {setTheSchedule(e)}}
                                    />
                            <label htmlFor="JUE">{t('OfrecermeNiñera.fases.5.horario-opciones.3')}</label>
                        </div>

                        <div>
                            <input  type="checkbox"
                                    id="VIE"
                                    checked={offerDomesticFormState.schedule.includes('VIE')}
                                    onChange={e => {setTheSchedule(e)}}
                                    />
                            <label htmlFor="VIE">{t('OfrecermeNiñera.fases.5.horario-opciones.4')}</label>
                        </div>

                        <div>
                            <input  type="checkbox"
                                    id="SAB"
                                    checked={offerDomesticFormState.schedule.includes('SAB')}
                                    onChange={e => {setTheSchedule(e)}}
                                    />
                            <label htmlFor="SAB">{t('OfrecermeNiñera.fases.5.horario-opciones.5')}</label>
                        </div>

                        <div>
                            <input  type="checkbox"
                                    id="DOM"
                                    checked={offerDomesticFormState.schedule.includes('DOM')}
                                    onChange={e => {setTheSchedule(e)}}
                                    />
                            <label htmlFor="cd7">{t('OfrecermeNiñera.fases.5.horario-opciones.6')}</label>
                        </div>

                        <div>
                            <input  type="checkbox"
                                    id="LUN_VIE"
                                    checked={offerDomesticFormState.schedule.includes('LUN_VIE')}
                                    onChange={e => {setTheSchedule(e)}}
                                    />
                            <label htmlFor="LUN_VIE">{t('OfrecermeNiñera.fases.5.horario-opciones.7')}</label>
                        </div>

                        <div>
                            <input  type="checkbox"
                                    id="FIN"
                                    checked={offerDomesticFormState.schedule.includes('FIN')}
                                    onChange={e => {setTheSchedule(e)}}
                                    />
                            <label htmlFor="FIN">{t('OfrecermeNiñera.fases.5.horario-opciones.8')}</label>
                        </div>

                        <div>
                            <input  type="checkbox"
                                    id="OTRO"
                                    checked={offerDomesticFormState.schedule.includes('OTRO')}
                                    onChange={e => {setTheSchedule(e)}}
                                    />
                            <label htmlFor="cd10">{t('OfrecermeNiñera.fases.5.horario-opciones.9')}</label>
                        </div>

                        <div hidden={!(offerDomesticFormState.schedule).includes('OTRO')}>
                        {t('OfrecermeNiñera.fases.5.horario-opciones.10')}: <input type="text" value={offerDomesticFormState.schedule_other} 
                            onChange={ e =>{
                                setOfferDomesticFormState( prev =>{
                                    const newState = {...prev};
                                    newState.schedule_other = e.target.value;
                                    return newState;
                                });
                            }} />
                        </div>
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
                                        checked={offerDomesticFormState.payment === "MONTO"}
                                        onChange={
                                            e => {
                                                setOfferDomesticFormState( prev => {
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
                                        checked={offerDomesticFormState.payment === "CONVENIR"}
                                        onChange={
                                            e => {
                                                setOfferDomesticFormState( prev => {
                                                    const newState = {...prev}
                                                    newState.payment = "CONVENIR";
                                                    newState.payment_amount = null;
                                                    newState.currency = null;
                                                    newState.currency_other = null;
                                                    newState.salary_offered = null;
                                                    return newState
                                                });
                                            } 
                                        }

                                        />
                                <label htmlFor="d2">{t('OfrecermeNiñera.fases.5.salario-deseado-opciones.1')}</label> 
                            </div>
                        </div>
                        
                        
                        <div id="texto" style={{ visibility: offerDomesticFormState.payment == "MONTO" ? 'visible' : 'hidden' }} >
                            <input type="text" onChange={ e =>{
                                setOfferDomesticFormState( prev =>{
                                    const newState = {...prev};
                                    newState.payment_amount = e.target.value;
                                    return newState;
                                });
                            }} value={offerDomesticFormState.payment_amount} />
                        </div>

                        <div className="dropdown-content" style={{ visibility: offerDomesticFormState.payment == "MONTO" ? 'visible' : 'hidden' }}>
                            <FieldDropdown
                                title={t('OfrecermeNiñera.fases.5.moneda')}
                                placeholder={
                                    selectedCurrency != -1?
                                        currency[selectedCurrency]:t('OfrecermeNiñera.fases.5.selecciona-moneda')
                                }
                                items={currency}
                                setSelectedState={setSelectedCurrency}
                            />
                            
                            {selectedCurrency==2 && 
                                <div>
                                    <label htmlFor="especifique">{t('OfrecermeNiñera.fases.5.especifique')}</label>    
                                    <input  id="especifique"
                                            type="text"
                                            value={offerDomesticFormState.currency_other} 
                                            onChange={ e => {
                                                setOfferDomesticFormState( prev => {
                                                    const newState = {...prev}
                                                    newState.currency_other = e.target.value;
                                                    return newState;
                                                });
                                            }}
                                            />
                                </div>    
                            }
                            
                        </div>
                        

                        <div className="dropdown-content" style={{ visibility: offerDomesticFormState.payment == "MONTO" ? 'visible' : 'hidden' }}>
                            <FieldDropdown
                                    title={t('OfrecermeNiñera.fases.5.salario-ofrecido')}
                                    placeholder={
                                        selectedSalary != -1?
                                            salary[selectedSalary]:t('OfrecermeNiñera.fases.5.seleccione-salario')
                                    }
                                    items={salary}
                                    setSelectedState={setSelectedSalary}
                            />
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
                        
                        <div id="form-horizontal">
                                <div>
                                    <input  type="radio"
                                            name="benefits"
                                            id="x1"
                                            checked={offerDomesticFormState.benefits == 0}
                                            onChange={
                                                e => {
                                                    setOfferDomesticFormState( prev => {
                                                        const newState = {...prev}
                                                        newState.benefits = 0;
                                                        return newState
                                                    });
                                                } 
                                            }
                                            />
                                    <label htmlFor="x1">{t('OfrecermeNiñera.fases.5.no')}</label> 
                                </div>

                                <div>
                                    <input  type="radio"
                                            name="benefits" 
                                            id="x2"
                                            checked={offerDomesticFormState.benefits == 1}
                                            onChange={
                                                e => {
                                                    setOfferDomesticFormState( prev => {
                                                        const newState = {...prev}
                                                        newState.benefits = 1;
                                                        return newState
                                                    });
                                                } 
                                            }

                                            />
                                    <label htmlFor="x2">{t('OfrecermeNiñera.fases.5.si')}</label> 
                                </div>
                        </div>

                        <div style={{ visibility: offerDomesticFormState.benefits ? 'visible' : 'hidden' }}>
                            <div id="der">
                                <div id="peq">{t('OfrecermeNiñera.fases.3.especifique')}</div>
                            </div>

                            <div id="der" >
                                <textarea 
                                value={offerDomesticFormState.benefits_description}
                                onChange={ e =>{
                                    setOfferDomesticFormState( prev => {
                                        const newState = {...prev}
                                        newState.benefits_description = e.target.value;
                                        return newState
                                    });    
                                }}>
                                </textarea>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
     );
}
 
const  Fase6= () => {
    const { t, i18n } = useTranslation();
    const {offerDomesticFormState, setOfferDomesticFormState} = useContext(OfferDomesticFormContext);

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
                                    checked={offerDomesticFormState.availability == "FECHA"}
                                    onChange={ e=>{
                                        setOfferDomesticFormState( prev => {
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
                                    checked={offerDomesticFormState.availability == "CONVENIR"}
                                    onChange={ e=>{
                                        setOfferDomesticFormState( prev => {
                                            const newState = {...prev};
                                            newState.availability = "CONVENIR";
                                            newState.availability_date = null;
                                            return newState;
                                        });

                                    }}
                            />
                            <label htmlFor="c2">{t('OfrecermeNiñera.fases.6.fecha-convenir')}</label> 
                        </div>
                    </div>
                    {offerDomesticFormState.availability == "FECHA" &&
                    <div>
                        <input  type="date" 
                                value={offerDomesticFormState.availability_date}
                                onChange={
                                    e=>{
                                        setOfferDomesticFormState( prev => {
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
            

        </div>
    </div>
    );
}

const Fase7 = () => {
    const { t, i18n } = useTranslation();
    const {offerDomesticFormState, setOfferDomesticFormState} = useContext(OfferDomesticFormContext);

    var arr=[1,2,3,4,5];
    var val=[0,1,2,3,4];
    const [selectedServices, setSelectedServices] = useState("");


    const [selectedContinente,setSelectedContinente] = useState(offerDomesticFormState.origin_continent);
    const [selectedPais,setSelectedPais] = useState(offerDomesticFormState.origin_country);
    const [selectedEstado,setSelectedEstado] = useState(offerDomesticFormState.origin_state);
    const [selectedCiudad,setSelectedCiudad] = useState(offerDomesticFormState.origin_city);

    // names and values that need backend fetching
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    // variables that dont need a fetch
    const regions = getContinents();
    const continentes = [];
    for (let index = 0; index < 5; index++) 
    continentes.push( t('continentes.'+index) )

    //Countries
    useEffect(() => {
        setOfferDomesticFormState ( prev => {
            const newState = {...prev};
            newState.origin_continent = selectedContinente ;
            return newState;
        });
        
        console.log(offerDomesticFormState.origin_continent );
        const fetchCountries = async () => {
            try {
                let aux_names=[];
                let aux_values=[];
                let index = selectedContinente.split(",");
                
                for( let i=1 ; i < index.length; i++) {
                    let [names, values] = await ( selectedContinente[i] == -1? getAllCountries(): getCountriesInRegion( regions[index[i]])  );
                    aux_names = aux_names.concat(names);
                    aux_values = aux_values.concat(values);
                }
                
                setCountries( [aux_names, aux_values] );

            } catch (error) {
                console.error(error);
            } 
        };

        fetchCountries();
    }, [selectedContinente]);
    
    //States
    useEffect(() => {
        setOfferDomesticFormState ( prev => {
            const newState = {...prev};
            newState.origin_country = selectedPais ;
            return newState;
        });
        const fetchStates = async () => {
            try {
                
                let [names, values] = await ( selectedPais.length > 0? getStatesInCountry(selectedPais): [[], []])
                setStates( [names, values] );
            } catch (error) {
                console.error(error);
            }
        };

        fetchStates();
    }, [selectedPais]);

    // Cities
    useEffect(() => {

        setOfferDomesticFormState ( prev => {
            const newState = {...prev};
            newState.origin_state = selectedEstado ;
            return newState;
        });
        const fetchCities = async () => {
            try {
                
                let [names, values] = await ( selectedEstado.length > 0? getCitiesInStates(selectedEstado): [[], []])
                setCities( [names, values] );
            } catch (error) {
                console.error(error);
            }
        };

        fetchCities();
    }, [selectedEstado]);

    //
    useEffect( () => {

        setOfferDomesticFormState ( prev => {
            const newState = {...prev};
            newState.origin_city = selectedCiudad ;
            return newState;
        });
        
    },[selectedCiudad]);

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
                            <input  type="radio"
                                    id="d1"
                                    checked={offerDomesticFormState.origin == "NO"}
                                    onChange={
                                        e => {
                                            setOfferDomesticFormState( prev => {
                                                const newState = {...prev};
                                                newState.origin = "NO";
                                                return newState;
                                            });
                                        }
                                    }
                            />
                            <label htmlFor="d1">{t('OfrecermeNiñera.fases.7.lugar-procedencia-opciones.0')}</label> 
                        </div>

                        <div>
                            <input  type="radio"
                                    id="d2"
                                    checked={offerDomesticFormState.origin == "SI"}
                                    onChange={
                                        e => {
                                            setOfferDomesticFormState( prev => {
                                                const newState = {...prev};
                                                newState.origin = "SI";
                                                return newState;
                                            });
                                        }
                                    }
                            />
                            <label htmlFor="d2">{t('OfrecermeNiñera.fases.7.lugar-procedencia-opciones.1')}</label> 
                        </div>
                </div>
            </div>
            <div className="col">
                <h2 >{t('OfrecermeNiñera.fases.7.tipo-cliente')}</h2>
                <div className="form-vertical">
                        <div>
                            <input  type="radio"
                                    id="c1"
                                    checked={offerDomesticFormState.client_type == "NAT"}
                                    onChange={
                                        e => {
                                            setOfferDomesticFormState( prev => {
                                                const newState = {...prev};
                                                newState.client_type = "NAT";
                                                return newState
                                            });
                                        }
                                    }
                            />
                            <label htmlFor="c1">{t('OfrecermeNiñera.fases.7.tipo-cliente-opciones.0')}</label> 
                        </div>
                        <div>
                            <input  type="radio"
                                    id="c2"
                                    checked={offerDomesticFormState.client_type == "EMP"}
                                    onChange={
                                        e => {
                                            setOfferDomesticFormState( prev => {
                                                const newState = {...prev};
                                                newState.client_type = "EMP";
                                                return newState
                                            });
                                        }
                                    }
                                    />
                            <label htmlFor="c2">{t('OfrecermeNiñera.fases.7.tipo-cliente-opciones.1')}</label> 
                        </div>
                        <div>
                            <input  type="radio"
                                    id="c3"
                                    checked={offerDomesticFormState.client_type == "NO"}
                                    onChange={
                                        e => {
                                            setOfferDomesticFormState( prev => {
                                                const newState = {...prev};
                                                newState.client_type = "NO";
                                                return newState;
                                            });
                                        }
                                    }
                            />
                            <label htmlFor="c3">{t('OfrecermeNiñera.fases.7.tipo-cliente-opciones.2')}</label> 
                        </div>

                </div>
            </div>

        </div>

        <div className="dropdown">
            {console.log(continentes)}
            <div className="dropdown-content">
                <FieldDropdownCheckbox 
                    title={t('OfrecermeNiñera.fases.7.continente')}
                    placeholder={t('OfrecermeNiñera.fases.7.select-continente')}
                    items={continentes}
                    values={val}
                    state={selectedContinente}
                    setState={setSelectedContinente}
                />
                
                <FieldDropdownCheckbox 
                    title={t('OfrecermeNiñera.fases.7.pais')}
                    placeholder={t('OfrecermeNiñera.fases.7.select-pais')}
                    items={countries[0]}
                    values={countries[1]}
                    state={selectedPais}
                    setState={setSelectedPais}
                />
                
                <FieldDropdownCheckbox 
                    title={t('OfrecermeNiñera.fases.7.estado')}
                    placeholder={t('OfrecermeNiñera.fases.7.select-estado')}
                    items={states[0]}
                    values={states[1]}
                    state={selectedEstado}
                    setState={setSelectedEstado}
                />
                
                <FieldDropdownCheckbox 
                    title={t('OfrecermeNiñera.fases.7.ciudad')}
                    placeholder={t('OfrecermeNiñera.fases.7.select-ciudad')}
                    items={cities[0]}
                    values={cities[1]}
                    state={selectedCiudad}
                    setState={setSelectedCiudad}
                />
                
            </div>
        </div>
        

        

    </div> );
}

const Fase8 = () => {
    const { t, i18n } = useTranslation();
    const {offerDomesticFormState, setOfferDomesticFormState} = useContext(OfferDomesticFormContext);

    function selectDocuments (e){
         
        setOfferDomesticFormState ( prev => {
            const newState = {...prev};

            let pos = offerDomesticFormState.documents.indexOf(e.target.value);

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
                        <input  type="radio"
                                id="c1"
                                checked={offerDomesticFormState.have_documentation}
                                onChange={ e =>{
                                    setOfferDomesticFormState( prev => {
                                        const newState = {...prev};
                                        newState.have_documentation = true;
                                        return newState;
                                    })
                                }}
                                />
                        <label htmlFor="c1">{t('OfrecermeNiñera.fases.8.si')}</label> 
                    </div>

                    <div id="segundo">
                        <input  type="radio"
                                id="c2"
                                checked={!offerDomesticFormState.have_documentation}
                                onChange={ e =>{
                                    setOfferDomesticFormState( prev => {
                                        const newState = {...prev};
                                        newState.have_documentation = false;
                                        return newState;
                                    })
                                }}
                        />
                        <label htmlFor="c2">{t('OfrecermeNiñera.fases.8.no')}</label> 
                    </div>
                </div>
                { offerDomesticFormState.have_documentation &&
                <div >
                    <h2>{t('OfrecermeNiñera.fases.8.documentos')}</h2>
                    <div id="selects">
                        <div>
                            <input type="checkbox" id="d1" value="PASAPORTE" checked={offerDomesticFormState.documents.includes("PASAPORTE")} onChange={ e => selectDocuments(e)}/>
                            <label htmlFor="d1">{t('OfrecermeNiñera.fases.8.documentos-opciones.0')}</label>
                        </div>
                        <div>
                            <input type="checkbox" id="d2" value="CURRICULUM" checked={offerDomesticFormState.documents.includes("CURRICULUM")}  onChange={ e => selectDocuments(e)}/>
                            <label htmlFor="d2">{t('OfrecermeNiñera.fases.8.documentos-opciones.1')}</label>
                        </div>    
                        <div>
                            <input type="checkbox" id="d3" value="TITULOS" checked={offerDomesticFormState.documents.includes("TITULOS")} onChange={ e => selectDocuments(e)}/>
                            <label htmlFor="d3">{t('OfrecermeNiñera.fases.8.documentos-opciones.2')}</label>
                        </div>
                        <div>
                            <input type="checkbox" id="d4" value="REF_TRABAJO" checked={offerDomesticFormState.documents.includes("REF_TRABAJO")}  onChange={ e => selectDocuments(e)}/>
                            <label htmlFor="d4">{t('OfrecermeNiñera.fases.8.documentos-opciones.3')}</label>
                        </div>
                        <div>
                            <input type="checkbox" id="d5" value="REF_FAMILIAR" checked={offerDomesticFormState.documents.includes("REF_FAMILIAR")}  onChange={ e => selectDocuments(e)}/>
                            <label htmlFor="d5">{t('OfrecermeNiñera.fases.8.documentos-opciones.4')}</label>
                        </div>
                        <div>
                            <input type="checkbox" id="d6" value="CONST_RESIDENCIA" checked={offerDomesticFormState.documents.includes("CONST_RESIDENCIA")}  onChange={ e => selectDocuments(e)}/>
                            <label htmlFor="d6">{t('OfrecermeNiñera.fases.8.documentos-opciones.5')}</label>
                        </div>
                        <div>
                            <input type="checkbox" id="d7" value="CONST_ANTECEDENTES" checked={offerDomesticFormState.documents.includes("CONST_ANTECEDENTES")} onChange={ e => selectDocuments(e)}/>
                            <label htmlFor="d7">{t('OfrecermeNiñera.fases.8.documentos-opciones.6')}</label>
                        </div>
                        <div>
                            <input type="checkbox" id="d8" value="SALUD" checked={offerDomesticFormState.documents.includes("SALUD")}  onChange={ e => selectDocuments(e)}/>
                            <label htmlFor="d8">{t('OfrecermeNiñera.fases.8.documentos-opciones.7')}</label>
                        </div>
                        <div>
                            <input type="checkbox" id="d9" value="OTRO" checked={offerDomesticFormState.documents.includes("OTRO")}  onChange={ e => selectDocuments(e)}/>
                            <label htmlFor="d9">{t('OfrecermeNiñera.fases.8.documentos-opciones.8')}</label>
                        </div>
                        
                        { offerDomesticFormState.documents.includes("OTRO") &&
                        <div>
                            <p> Especifique</p> <input  type="text" 
                                                        onChange={ e => {
                                                            setOfferDomesticFormState( prev => {
                                                                const newState = {...prev};
                                                                newState.documents_other = e.target.value;
                                                                return newState;
                                                            });  
                                                        }} 
                                                        value={offerDomesticFormState.documents_other}
                                                />
                        </div>}

                    </div>
                </div>
                }
            </div>
            

        </div>
    </div>
     );
}

const Fase9 = () => {
    const { t, i18n } = useTranslation();
    const {offerDomesticFormState, setOfferDomesticFormState} = useContext(OfferDomesticFormContext);

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
    const {offerDomesticFormState, setOfferDomesticFormState} = useContext(OfferDomesticFormContext);

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
    const {offerDomesticFormState, setOfferDomesticFormState} = useContext(OfferDomesticFormContext);

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
    const {offerDomesticFormState, setOfferDomesticFormState} = useContext(OfferDomesticFormContext);

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
    const {offerDomesticFormState, setOfferDomesticFormState} = useContext(OfferDomesticFormContext);

    var val=[1,2,3];
    
    //radio buttons form
    const [publication_time, setpublication_time] = useState(offerDomesticFormState.publication_time);


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
            if(!auxC.includes(banks[i].country)) auxC.push(banks[i].country);

        setbank_countries(auxC);
        
        
        if (offerDomesticFormState.billing_country !== "" && bank_countries.length > 0) {
            const foundCountry = bank_countries.find(
              (country) => country === offerDomesticFormState.billing_country
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
            setOfferDomesticFormState ( prev => {
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
            setOfferDomesticFormState((prev) => {
              const newState = { ...prev };
              newState.billing_bank = banks[foundBank1].id;
              return newState;
            });
          }
        }
      }, [selectedBanks, aux2, aux]);

    function changePlan(e){
        
        setOfferDomesticFormState( prev =>{
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
                            <input type="radio" value="1" id="c1" checked={offerDomesticFormState.publication_time == "1"} onChange={(e)=>{changePlan(e)}}/>
                            <label htmlFor="c1">1 {t('OfrecermeNiñera.fases.13.mes')}</label>
                        </div>
                        <div>
                            <h3 className="red">10 USD</h3>
                        </div>
                        <div>
                            <input type="radio" value="3" id="c2" checked={offerDomesticFormState.publication_time == "3"} onChange={(e)=>{changePlan(e)}}/>
                            <label htmlFor="c2">3 {t('OfrecermeNiñera.fases.13.meses')}</label>
                        </div>
                        
                        <div>
                            <h3 className="red">25 USD</h3>
                        </div>    

                        <div>
                            <input type="radio" value="6" id="c3" checked={offerDomesticFormState.publication_time == "6"} onChange={(e)=>{changePlan(e)}}/>
                            <label htmlFor="c3">6 {t('OfrecermeNiñera.fases.13.meses')}</label>
                        </div>    

                        <div>
                            <h3 className="red">50 USD</h3>
                        </div>

                        <div>
                            <input type="radio" value="9" id="c4" checked={offerDomesticFormState.publication_time == "9"} onChange={(e)=>{changePlan(e)}}/>
                            <label htmlFor="c4">9 {t('OfrecermeNiñera.fases.13.meses')}</label>
                        </div>    

                        <div>
                            <h3 className="red">70 USD</h3>
                        </div>

                        <div>
                            <input type="radio" value="12" id="c5" checked={offerDomesticFormState.publication_time == "12"} onChange={(e)=>{changePlan(e)}}/>
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
                        
                        { offerDomesticFormState.billing_bank != -1 && banks != undefined &&banks.length>0 && selectedBanks != -1 && selectedCountry != -1 && foundBank != -1 &&   
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

                </div>
            </div>
        </div>
     );
}
 
const useValidar = () => {
    const validate = (currentStage) => {
        // Empty implementation
        let valid =true;
        return valid
    };

    return { validate };
};

const botonEnviar = () => {
    const { t, i18n } = useTranslation();
    const {offerDomesticFormState, setOfferDomesticFormState} = useContext(OfferDomesticFormContext);
    const navigate = useNavigate();
 

    const postData = {...offerDomesticFormState};
    //console.log(JSON.stringify(postData));
    return(
        <button
            id="boton_registrar"
            

            onClick={
                async () => {
                    
                    const url = 'http://127.0.0.1:8000/api-services/provideService/post_ad/'
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
                            console.log('POST request successful');
                            console.log(response);
                            navigate('/');
                        } else {
                            // Request failed
                            console.log('POST request failed');
                            console.log(response);
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



const FasesOfrecermeNiñera = [Fase0, Fase1, Fase2, Fase3, Fase4, Fase5, Fase6,Fase7,Fase8,Fase9,Fase10,Fase11,Fase12,Fase13];

export {FasesOfrecermeNiñera,botonEnviar, useValidar,};