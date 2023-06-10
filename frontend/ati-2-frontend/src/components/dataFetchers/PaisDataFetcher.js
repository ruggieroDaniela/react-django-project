import axios from 'axios';

const API_KEY = "M3F5RW5Hb1dkWFpNN2kwN1k1eEhNYlRYZUJuQW5Wb3NETlF6YTd5cg=="

export const getContinents = () => ["north america", "south america", "europe", "asia", "oceania"]

export const getAllCountries = async () => {
    
    try {
        const response = await axios.get("https://api.countrystatecity.in/v1/countries", {
            headers: {
                'X-CSCAPI-KEY': API_KEY
            }
        });

        // console.log(response.data);

        const names = response.data.map( x => x.name );
        const values = response.data.map( x => x.iso2 );
        return [names, values];
        
    } catch (error) {
        console.error(error);
    }

};

export const getCountriesInRegion = async (reg) => {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/region/${reg}`);
        const names = response.data.map( x => x.name.common );
        const values = response.data.map( x => x.cca2 );

        return [names, values];
        
    } catch (error) {
        console.error(error);
    }
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
                values.push( `${codes[i]}/${response.data[j].iso2}` );
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

