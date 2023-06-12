import countries from "../../data/countries.json"
import axios from 'axios';

const API_KEY = "M3F5RW5Hb1dkWFpNN2kwN1k1eEhNYlRYZUJuQW5Wb3NETlF6YTd5cg=="

const continents = ["north america", "south america", "europe", "asia", "oceania"]

export const getContinents = () => ["north america", "south america", "europe", "asia", "oceania"]

export const getCountryName = (countryCode, lang = "en") => {

    for (let i = 0; i < continents.length; i++) {
        
        if( countryCode in countries[ continents[i] ] ){
            console.log(countries[ continents[i] ][countryCode][lang] );
            return countries[ continents[i] ][countryCode][lang];
        }
        
    }

    return null;
}

export const getAllCountries = (lang = "en") => {
    
    const names = []
    const values = []

    for (let i = 0; i < continents.length; i++) {
        
        Object.keys( countries[ continents[i] ] )
            .forEach(code => {
                names.push( countries[ continents[i] ][code][lang] );
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
        
    Object.keys( countries[reg] )
        .forEach(code => {
            names.push( countries[reg][code][lang] );
            values.push(code);
        });
        
    

    return [names, values]

};

export const getStatesInCountry = async (countries) => {
    try {

        let response;

        const names = [];
        const values = [];

        const codes = countries.split(",");
        for (let i = 0; i < codes.length; i++) {
            if(codes[i].length > 0 ){
                response = await axios.get(`https://api.countrystatecity.in/v1/countries/${codes[i]}/states`, {
                    headers: {
                        'X-CSCAPI-KEY': API_KEY
                    }
                });

                for (let j = 0; j < response.data.length; j++) {
                    names.push( response.data[j].name );
                    values.push( `${codes[i]}-${response.data[j].iso2}` );
                }
            }

        }

        return [names, values];
        
    } catch (error) {
        console.error(error);
    }
};

export const getStatesInOneCountry = async (countries) => {
    try {

        let response;

        const names = [];
        const values = [];

        const codes = countries.split(",");
        for (let i = 1; i < codes.length; i++) {
            response = await axios.get(`https://api.countrystatecity.in/v1/countries/${codes[i]}/states`, {
                headers: {
                    'X-CSCAPI-KEY': API_KEY
                }
            });

            for (let j = 0; j < response.data.length; j++) {
                names.push( response.data[j].name );
                values.push( `${codes[i]}-${response.data[j].iso2}` );
            }

        }

        return [names, values];
        
    } catch (error) {
        console.error(error);
    }
};

export const getCitiesInStates = async (stateCodes) => {
    try {

        let response;
        let country = "";
        let state = "";

        const names = [];
        const values = [];

        const codes = stateCodes.split(",");
        for (let i = 0; i < codes.length; i++) {

            if(codes[i].length > 0 ){
                country = codes[i].split("-")[0];
                state = codes[i].split("-")[1];

                response = await axios.get(`https://api.countrystatecity.in/v1/countries/${country}/states/${state}/cities`, {
                    headers: {
                        'X-CSCAPI-KEY': API_KEY
                    }
                });

                for (let j = 0; j < response.data.length; j++) {
                    names.push( response.data[j].name );
                    values.push( `${stateCodes[i]}-${response.data[j].name}` );
                }
            }

        }

        return [names, values];
        
    } catch (error) {
        console.error(error);
    }
};


export const getCitiesInCountry = async (countryCode) => {
    try {

        let response;
        const names = [];
        const values = [];

        response = await axios.get(`https://api.countrystatecity.in/v1/countries/${countryCode}/cities`, {
            headers: {
                'X-CSCAPI-KEY': API_KEY
            }
        });


        for (let j = 0; j < response.data.length; j++) {
            names.push( response.data[j].name );
            values.push( `${countryCode}-${response.data[j].name}` );
        }

        return [names, values];
        
    } catch (error) {
        console.error(error);
    }
};

export const getCountryDetails = async countryCode => {
    try {

        let response;

        response = await axios.get(`https://api.countrystatecity.in/v1/countries/${countryCode}`, {
            headers: {
                'X-CSCAPI-KEY': API_KEY
            }
        });

        return [response.data.phonecode, response.data.emoji];
        
    } catch (error) {
        console.error(error);
        return null;
    }
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