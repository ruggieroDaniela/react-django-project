import data from "../../data/countries.json"
import axios from 'axios';

const API_KEY = "M3F5RW5Hb1dkWFpNN2kwN1k1eEhNYlRYZUJuQW5Wb3NETlF6YTd5cg=="

const continents = ["north america", "south america", "europe", "asia", "oceania"]

export const getContinents = () => ["north america", "south america", "europe", "asia", "oceania"]

export const getCountryName = (countryCode, lang = "en") => {

    for (let i = 0; i < continents.length; i++) {
        
        if( countryCode in data[ continents[i] ] ){
            console.log(data[ continents[i] ][countryCode][lang] );
            return data[ continents[i] ][countryCode][lang];
        }
        
    }

    return null;
}

export const getAllCountries = (lang = "en") => {
    
    const names = []
    const values = []

    for (let i = 0; i < continents.length; i++) {
        
        Object.keys( data[ continents[i] ] )
            .forEach(code => {
                names.push( data[ continents[i] ][code][lang] );
                values.push(code);
            });
        
    }

    return [names, values]

};

export const getCountriesInRegion = (reg, lang="en") => {

    if( !reg in continents )
        return null

    const names = []
    const values = []
        
    Object.keys( data[reg] )
        .forEach(code => {
            names.push( data[reg][code][lang] );
            values.push(code);
        });

    return [names, values]

};

export const getStatesInCountry = (countries, lang="en") => {

    const names = [];
    const values = [];

    const codes = countries.split(",");
    
    for(const countryCode of codes){
        for(const reg of continents){
            if( countryCode in data[reg] ){
                Object.keys( data[reg][countryCode]["states"] ).forEach(
                    stateCode => {
                        values.push(`${countryCode}-${stateCode}`);
                        names.push(data[reg][countryCode]["states"][stateCode]["name"])
                    }
                )
                break;
            }
        }
    }

    return [names, values];

};


export const getCitiesInStates = (stateCodes) => {

    let names = [];
    let values = [];

    const codes = stateCodes.split(",");
    
    for(const stateCode of codes){
        for(const reg of continents){
            if( stateCode.substring(0,2) in data[reg] ){
                names = [...names, ...data[reg][stateCode.substring(0,2)]["states"][stateCode.substring(3)]["cities"]];

                data[reg][stateCode.substring(0,2)]["states"][stateCode.substring(3)]["cities"].forEach(
                    city => {
                        values.push(stateCode.substring(0,2)+"-"+city) 
                    }
                )

                break;
            }
        }
    }

    return [names, values];
};


export const getCitiesInCountry = (countryCode) => {

    let names = [];
    let values = [];

    for(const reg of continents){
        if( countryCode in data[reg] ){
            Object.keys( data[reg][countryCode]["states"] ).forEach( stateCode => {
                const state = data[reg][countryCode]["states"][stateCode];
                names = [...names, ...state["cities"]];
                state["cities"].forEach( city => {
                    values.push(countryCode+"-"+city) 
                })

            } );

            break;
        }
    }

    return [names, values];
};

export const getCountryDetails = async countryCode => {

    for(const reg of continents){
        if( countryCode in data[reg] ){
            return [ data[reg][countryCode]["phonecode"], data[reg][countryCode]["flag_emoji"] ]
        }
    }

    return null;
}

export const getStateName = async (stateCode) => {
    try {

        let response;

        const country = stateCode.split("-")[0];
        const state = stateCode.split("-")[1];

        response = await axios.get(`https://api.countrystatecity.in/v1/countries/${country}/states/${state}`, {
            headers: {
                'X-CSCAPI-KEY': API_KEY
            }
        });
        

        return response.data.name;
        
    } catch (error) {
        
        console.error(error);
        return "";
    }
};