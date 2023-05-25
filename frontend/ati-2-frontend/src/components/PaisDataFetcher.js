import axios from 'axios';

const API_KEY = "M3F5RW5Hb1dkWFpNN2kwN1k1eEhNYlRYZUJuQW5Wb3NETlF6YTd5cg=="

export const getAllCountries = async () => {
    
    try {
        const response = await axios.get("https://api.countrystatecity.in/v1/countries", {
            headers: {
                'X-CSCAPI-KEY': API_KEY
            }
        });

        // console.log(response.data);

        const ans = response.data.map( x => x.name );
        return ans;
        
    } catch (error) {
        console.error(error);
    }

};

export const getCountriesInRegion = async (reg) => {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/region/${reg}`);
        const ans = response.data.map( x => x.name.common );

        // console.log(ans);

        return ans;
        
    } catch (error) {
        console.error(error);
    }
};

export const getStatesInCountry = async (countries) => {
    try {
        const response = await axios.get("https://api.countrystatecity.in/v1/countries", {
            headers: {
                'X-CSCAPI-KEY': API_KEY
            }
        });

        // console.log(response.data);
        const ans = [];
        let countryCode;
        let responseStates;
        console.log("yo");
        for (let i = 0; i < response.data.length; i++) {
            if( countries.includes(response.data[i].name) ){
                countryCode = response.data[i].iso2;
                responseStates = await axios.get(`https://api.countrystatecity.in/v1/countries/${countryCode}/states`, {
                    headers: {
                        'X-CSCAPI-KEY': API_KEY
                    }
                });
                
                for (let j = 0; j < responseStates.data.length; j++) {
                    ans.push( responseStates.data[j].name )
                }
            }
        }

        console.log(ans);

        return ans;
        
    } catch (error) {
        console.error(error);
    }
};

export const getCitiesInState = async (country, city) => {};
