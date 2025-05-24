'use server';

import {inRange} from "@/app/util/clientUtils";
import {AllCountries} from "@/app/models/AllCountries";
import fetchWithRetry from "@/app/actions/fetchWithRetry";
import {restCountriesHandler} from "@/app/util/endPoints";

const getCountries = async (): Promise<AllCountries[]> => {
    let countries: AllCountries[] = [];
    const restCountriesAPI = 'https://restcountries.com/v3.1/all?fields=name,tld,cca2,ccn3,cca3,currencies,idd,capital,region,subregion,languages,flags';

    try {
        // Fetch with retry logic
        const {response, data} = await fetchWithRetry(restCountriesHandler, {
            method: 'GET',
            endpoint: restCountriesAPI,
            headers: {
                'Cookie_Name': 'rest_countries',
                'Cache-Control': 'public, s-maxage=604800, stale-while-revalidate=60',
            },
        });

        if (inRange(response.status, 200, 299)) {
            countries = data as AllCountries[];
        }

        // cacheAllCountries({countries: countries}); // Cache the fetched data
    } catch (error) {
        console.error(error instanceof Error ? error.message : 'Unknown error');
    }

    return countries;
};

export default getCountries;
