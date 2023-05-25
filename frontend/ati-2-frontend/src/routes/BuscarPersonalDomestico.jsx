import React from "react";

import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { FieldDropdown } from "../components/search/FieldDropdown";
import { FieldDropdownCheckbox } from "../components/search/FieldDropdownCheckbox";
import { FieldRadioButtons } from "../components/search/FieldRadioButtons";

import { getAllCountries, getCountriesInRegion, getStatesInCountry, getCitiesInStates } from "../components/PaisDataFetcher";

import "../styles/BuscarPersonalDomestico.scss"

export const BuscarPersonalDomestico = () => {

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    
    const navigate = useNavigate();
    
    const regions = ["north america", "south america", "europe", "asia", "oceania"];
    const [selectedContinent, setSelectedContinent] = useState(-1);
    const [selectedCountries, setSelectedCountries] = useState("");
    const [selectedStates, setSelectedStates] = useState("");
    const [selectedCities, setSelectedCities] = useState("");
    
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                let [names, values] = await ( selectedContinent == -1? getAllCountries(): getCountriesInRegion( regions[selectedContinent])  )
                console.log(names);
                console.log(values);
                setCountries( [names, values] );
            } catch (error) {
                console.error(error);
            } 
        };

        fetchCountries();
    }, [selectedContinent]);

    useEffect(() => {
        const fetchStates = async () => {
            try {
                // const 
                console.log(selectedCountries);
                let [names, values] = await ( selectedCountries.length > 0? getStatesInCountry(selectedCountries): [[], []])
                setStates( [names, values] );
            } catch (error) {
                console.error(error);
            }
        };

        fetchStates();
    }, [selectedCountries]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                // const 
                let [names, values] = await ( selectedStates.length > 0? getCitiesInStates(selectedStates): [[], []])
                setCities( [names, values] );
            } catch (error) {
                console.error(error);
            }
        };

        fetchCities();
    }, [selectedStates]);
    
    const [busquedaRapida, setBusquedaRapida] = useState(false);
    const [busquedaDetallada, setBusquedaDetallada] = useState(false);

    const { t, i18n } = useTranslation();

    
    const salida_personal = [];
    for (let i = 0; i < 10; i++) 
        salida_personal.push( t('search.salida_personal_opciones.'+i) )
        
    const tipos_personal = [];
    for (let i = 0; i < 13; i++) 
        tipos_personal.push( t('search.tipos_personal.'+i) )
    
    const dias = [];
    for (let i = 0; i < 7; i++) 
        dias.push( t('search.dias_semana.'+i) )
    
    const remuneracion_frecuencia = [];
    for (let i = 0; i < 5; i++) 
        remuneracion_frecuencia.push( t('search.remuneracion_frecuencia_opciones.'+i) )

    const continentes = [];
    for (let index = 0; index < 5; index++) 
    continentes.push( t('continentes.'+index) )
    
    const monedas = [];
    for (let index = 0; index < 3; index++) 
        monedas.push( t('search.monedas.'+index) )
        
    const ordenes = [];
    for (let index = 0; index < 3; index++){
        ordenes.push( t('search.listar_opciones.'+index) + " " + t('search.ascendente') );
        ordenes.push( t('search.listar_opciones.'+index) + " " + t('search.descendente') );
    }
    

    return <main>
        <div id="buscar-personal-domestico">
            <div className="dropdown">
                <div
                    className="dropdown-title"
                    onClick={ () => setBusquedaRapida( (prev) => !prev ) }
                >
                    <span className="dropdown-arrow">
                        {busquedaRapida?"▾":"▸"}
                    </span>
                    {t('search.busqueda_rapida')}
                </div>
                {busquedaRapida?
                
                    <div className="dropdown-content">
                        <FieldDropdown
                            title={t('search.continente')}
                            placeholder={
                                selectedContinent>=0?
                                    continentes[selectedContinent]:t('search.selecciona_continente')
                            }
                            items={continentes}
                            setSelectedState={setSelectedContinent}
                        />
                        <FieldDropdownCheckbox
                            title={t('search.pais')}
                            placeholder="placeholder 1"
                            items={countries[0]}
                            values={countries[1]}
                            state={selectedCountries}
                            setState={setSelectedCountries}
                        />
                        <FieldDropdownCheckbox
                            title={t('search.estado')}
                            placeholder="placeholder 1"
                            items={states[0]}
                            values={states[1]}
                            state={selectedStates}
                            setState={setSelectedStates}
                        />
                        <FieldDropdownCheckbox
                            title={t('search.personal_solicitado')}
                            placeholder="placeholder 1"
                            items={tipos_personal}
                        />
                        
                        <div></div>
                        <button>
                            {t('search.buscar')}
                        </button>
                        <button
                            onClick={() => navigate("/")}
                        >
                            {t('search.cancelar')}
                        </button>
                        <div></div>
                    </div>
                
                : ""}
            </div>

            <div className="dropdown">
                <div
                    className="dropdown-title"
                    onClick={ () => setBusquedaDetallada( (prev) => !prev ) }
                >
                    <span className="dropdown-arrow">
                        {busquedaDetallada?"▾":"▸"}
                    </span>
                    {t('search.busqueda_detallada')}
                </div>
                {busquedaDetallada?
                
                    <div className="dropdown-content">
                        <FieldDropdown
                            title={t('search.continente')}
                            placeholder={
                                selectedContinent>=0?
                                    continentes[selectedContinent]:t('search.selecciona_continente')
                            }
                            items={continentes}
                            setSelectedState={setSelectedContinent}
                        />

                        <FieldDropdownCheckbox
                            title={t('search.pais')}
                            placeholder="placeholder 1"
                            items={countries[0]}
                            values={countries[1]}
                            state={selectedCountries}
                            setState={setSelectedCountries}
                        />
                        <FieldDropdownCheckbox
                            title={t('search.estado')}
                            placeholder="placeholder 1"
                            items={states[0]}
                            values={states[1]}
                            state={selectedStates}
                            setState={setSelectedStates}
                        />
                        <FieldDropdownCheckbox
                            title={t('search.ciudad')}
                            placeholder="placeholder 1"
                            items={cities[0]}
                            values={cities[1]}
                            state={selectedCities}
                            setState={setSelectedCities}
                        />
                        <FieldDropdownCheckbox
                            title={t('search.salida_personal')}
                            placeholder="placeholder 1"
                            items={salida_personal}
                        />
                        <FieldDropdownCheckbox
                            title={t('search.personal_solicitado')}
                            placeholder="placeholder 1"
                            items={tipos_personal}
                        />

                        <FieldDropdownCheckbox
                            title={t('search.horario')}
                            placeholder="placeholder 1"
                            items={dias}
                        />

                        <div className="field">
                            <FieldRadioButtons
                                title={t('search.remuneracion')}
                                placeholder="placeholder 1"
                                items={[t('search.a_convenir'), t('search.rango')]}
                            />
                            
                            <div className="field-range-input">
                                <input type="text"/>
                                <span> - </span>
                                <input type="text"/>
                            </div>
                            
                        </div>

                        <FieldDropdown
                            title={t('search.remuneracion_frecuencia')}
                            placeholder="placeholder 1"
                            items={remuneracion_frecuencia}
                        />

                        <div className="field">
                            <FieldDropdown
                                title={t('search.moneda')}
                                placeholder="placeholder 1"
                                items={monedas}
                            />
                            
                            <div className="field-spec">
                                {t('search.especificar')+": "}
                                <input type="text"/>
                            </div>
                            
                        </div>

                        <FieldRadioButtons
                            title={t('search.beneficio')}
                            placeholder="placeholder 1"
                            items={[t('search.si'), t('search.no')]}
                        />

                        <FieldRadioButtons
                            title={t('search.disponibilidad')}
                            placeholder="placeholder 1"
                            items={[t('search.disponibilidad_opciones.0'), t('search.disponibilidad_opciones.1')]}
                        />

                        <FieldRadioButtons
                            title={t('search.listar')}
                            items={ordenes}
                        />
                        
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <button>
                            {t('search.buscar')}
                        </button>
                        <button
                            onClick={() => navigate("/")}
                        >
                            {t('search.cancelar')}
                        </button>
                        <div></div>
                    </div>
                
                : ""}
            </div>
        </div>
    </main>

};