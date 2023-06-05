import React from "react";
import axios from 'axios';

import { useState, useEffect, useContext } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import AuthContext from "../context/AuthContext";

import { FieldDropdown } from "../components/search/FieldDropdown";
import { FieldDropdownCheckbox } from "../components/search/FieldDropdownCheckbox";
import { FieldRadioButtons } from "../components/search/FieldRadioButtons";

import { getAllCountries, getCountriesInRegion, getStatesInCountry, getCitiesInStates, getContinents } from "../components/dataFetchers/PaisDataFetcher";
import { getAvailability, getBenefits, getCheckout, getHorario, getPayment, getPaymentFreq, getServices, getSortBy } from "../components/dataFetchers/ServicesDataFetcher";

import "../styles/BuscarPersonalDomestico.scss"

export const BuscarPersonalDomestico = () => {

    // some necessary hooks
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const {authState, setAuthState} = useContext(AuthContext);

    // names and values that need backend fetching
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    
    // values that don't need backend fetching
    const regions = getContinents();
    const services = getServices();
    const schedules = getHorario();
    const checkout = getCheckout();
    const paymentFreq = getPaymentFreq();
    const availability = getAvailability();
    const sortBy = getSortBy();
    const benefits = getBenefits();
    const payment = getPayment();

    // display dropdown contents for both search types
    const [busquedaRapida, setBusquedaRapida] = useState(false);
    const [busquedaDetallada, setBusquedaDetallada] = useState(false);
    
    // field values in the frontend
    const [selectedContinent, setSelectedContinent] = useState(-1);
    const [selectedCountries, setSelectedCountries] = useState("");
    const [selectedStates, setSelectedStates] = useState("");
    const [selectedCities, setSelectedCities] = useState("");
    const [selectedServices, setSelectedServices] = useState("");
    const [selectedSchedules, setSelectedShedules] = useState("");
    const [selectedCheckout, setSelectedCheckout] = useState("");
    const [selectedPaymentFreq, setSelectedPaymentFreq] = useState("");
    const [selectedCurrency, setSelectedCurrency] = useState("");
    const [selectedBeneficio, setSelectedBeneficio] = useState("");
    const [selectedPayment, setSelectedPayment] = useState("");
    const [selectedPaymentRange, setSelectedPaymentRange] = useState(["", ""]);
    const [selectedAvailability, setSelectedAvailability] = useState("");
    const [selectedSortBy, setSelectedSortBy] = useState("");

    // fetch values from the backend
        // Countries
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                let [names, values] = await ( selectedContinent == -1? getAllCountries(): getCountriesInRegion( regions[selectedContinent])  );
                setCountries( [names, values] );
            } catch (error) {
                console.error(error);
            } 
        };

        fetchCountries();
    }, [selectedContinent]);

        // States
    useEffect(() => {
        const fetchStates = async () => {
            try {
                let [names, values] = await ( selectedCountries.length > 0? getStatesInCountry(selectedCountries): [[], []])
                setStates( [names, values] );
            } catch (error) {
                console.error(error);
            }
        };

        fetchStates();
    }, [selectedCountries]);

        // Cities
    useEffect(() => {
        const fetchCities = async () => {
            try {
                let [names, values] = await ( selectedStates.length > 0? getCitiesInStates(selectedStates): [[], []])
                setCities( [names, values] );
            } catch (error) {
                console.error(error);
            }
        };

        fetchCities();
    }, [selectedStates]);

    // fill field's items frontend
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
                            values={services}
                            state={selectedServices}
                            setState={setSelectedServices}
                        />
                        
                        <div></div>
                        <button
                            onClick={ () => {
                                let query = "?type=provide&";

                                if(selectedContinent != -1)
                                    query += `continent=${regions[selectedContinent]}&`
                                
                                if(selectedCountries != "")
                                    query += `country__in=${selectedCountries.substring(1)}&`
                                
                                if(selectedStates != "")
                                    query += `state__in=${selectedStates.substring(1)}&`
                                
                                if(selectedServices != "")
                                    query += `service__in=${selectedServices.substring(1)}`
                                
                                query = query.substring(0, query.length-1)

                                navigate(`/show-posts${query}`);
                            } }
                        >
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
                            values={checkout}
                            state={selectedCheckout}
                            setState={setSelectedCheckout}
                        />
                        <FieldDropdownCheckbox
                            title={t('search.personal_solicitado')}
                            placeholder="placeholder 1"
                            items={tipos_personal}
                            values={services}
                            state={selectedServices}
                            setState={setSelectedServices}
                        />

                        <FieldDropdownCheckbox
                            title={t('search.horario')}
                            placeholder="placeholder 1"
                            items={dias}
                            values={schedules}
                            state={selectedSchedules}
                            setState={setSelectedShedules}
                        />

                        <div className="field">
                            <FieldRadioButtons
                                title={t('search.remuneracion')}
                                placeholder="placeholder"
                                items={[t('search.a_convenir'), t('search.rango')]}
                                values={payment}
                                state={selectedPayment}
                                setState={setSelectedPayment}
                            />
                            {selectedPayment.includes("MONTO")?
                                <div className="field-range-input">
                                    <input
                                        type="text"
                                        onChange={ (e) => {
                                            setSelectedPaymentRange( prev => { 
                                                let newState = [...prev];
                                                newState[0] = e.target.value;
                                                return newState;
                                            } )
                                        } }
                                    />
                                    <span> - </span>
                                    <input
                                        type="text"
                                        onChange={ (e) => {
                                            setSelectedPaymentRange( prev => { 
                                                let newState = [...prev];
                                                newState[1] = e.target.value;
                                                return newState;
                                            } )
                                        } }
                                    />
                                </div>
                                :""
                            }
                            
                        </div>

                        <FieldDropdownCheckbox
                            title={t('search.remuneracion_frecuencia')}
                            placeholder="placeholder 1"
                            items={remuneracion_frecuencia}
                            values={paymentFreq}
                            state={selectedPaymentFreq}
                            setState={setSelectedPaymentFreq}
                        />

                        <div className="field">
                            <FieldDropdown
                                title={t('search.moneda')}
                                placeholder={
                                    selectedCurrency !== ""?
                                        monedas[selectedCurrency]:"ph"
                                }
                                items={monedas}
                                setSelectedState={setSelectedCurrency}
                            />
                            {selectedCurrency == 2?
                                <div className="field-spec">
                                    {t('search.especificar')+": "}
                                    <input type="text"/>
                                </div>
                                :
                                ""
                            }
                            
                        </div>

                        <FieldRadioButtons
                            title={t('search.beneficio')}
                            items={[t('search.si'), t('search.no')]}
                            values={benefits}
                            state={selectedBeneficio}
                            setState={setSelectedBeneficio}
                        />

                        <FieldRadioButtons
                            title={t('search.disponibilidad')}
                            items={[t('search.disponibilidad_opciones.0'), t('search.disponibilidad_opciones.1')]}
                            values={availability}
                            state={selectedAvailability}
                            setState={setSelectedAvailability}
                        />

                        <FieldRadioButtons
                            title={t('search.listar')}
                            items={ordenes}
                            values={sortBy}
                            state={selectedSortBy}
                            setState={setSelectedSortBy}
                        />
                        
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <button
                            onClick={ () => {
                                let query = "?type=provide&";

                                if(selectedContinent != -1)
                                    query += `continent=${regions[selectedContinent]}&`
                                
                                if(selectedCountries != "")
                                    query += `country__in=${selectedCountries.substring(1)}&`
                                
                                if(selectedStates != "")
                                    query += `state__in=${selectedStates.substring(1)}&`
                                
                                if(selectedCities != "")
                                    query += `city__in=${selectedCities.substring(1)}&`
                                
                                if(selectedServices != "")
                                    query += `service__in=${selectedServices.substring(1)}&`
                                
                                if(selectedCheckout != "")
                                    query += `workday__in=${selectedCheckout.substring(1)}&`
                                
                                if(selectedSchedules != "")
                                    query += `schedule__in=${selectedSchedules.substring(1)}&`
                                
                                if(selectedPayment != ""){
                                    query += `payment=${selectedPayment}&`
                                    if(selectedPayment == "MONTO" && selectedPaymentRange[0].length != 0 && selectedPaymentRange[1].length != 0)
                                        query += `payment_amount__range=${selectedPaymentRange.join(",")}&`
                                }

                                if(selectedPaymentFreq != "")
                                    query += `salary_offered=${selectedPaymentFreq}&`
                                
                                if(selectedCurrency != "")
                                    query += `currency=${selectedCurrency}&`
                                
                                if(selectedBeneficio != "")
                                    query += `benefits=${selectedBeneficio}&`
                                
                                if(selectedAvailability != "")
                                    query += `availability=${selectedAvailability}&`

                                if(selectedSortBy != "")
                                    query += `ordering=${selectedSortBy} `

                                query = query.substring(0, query.length-1)

                                navigate(`/show-posts${query}`);
                            } }
                        >
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