import axios from 'axios';

const API_KEY = "M3F5RW5Hb1dkWFpNN2kwN1k1eEhNYlRYZUJuQW5Wb3NETlF6YTd5cg=="

export const getAllCountries = async () => {
    
    try {
        const response = await axios.get("https://api.countrystatecity.in/v1/countries", {
            headers: {
                'X-CSCAPI-KEY': API_KEY
            }
        });

        return response.data;
        
    } catch (error) {
        console.error(error);
    }

};

export const getCountriesInContinent = async (continent) => {};

export const getStatesInCountry = async (country) => {};

export const getCitiesInState = async (country, city) => {};
