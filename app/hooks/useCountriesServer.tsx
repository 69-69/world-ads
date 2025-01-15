/*
import {useEffect, useState} from 'react';

const UseCountries = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // First, check if the countries data exists in localStorage
        const cachedCountries = localStorage.getItem('countries');

        if (cachedCountries) {
            // If cached data exists, load it and set the loading state to false
            setCountries(JSON.parse(cachedCountries));
            setLoading(false);
        } else {
            // If no cached data, fetch from API
            fetch('https://restcountries.com/v3.1/all')
                .then(response => response.json())
                .then(data => {
                    // Save the fetched data to localStorage and set the state
                    localStorage.setItem('countries', JSON.stringify(data));
                    setCountries(data);
                    setLoading(false);
                })
                .catch(error => {
                    // In case of an error, load cached data if available
                    console.error('Failed to load countries', error);
                    setError('Network: Failed to load countries');
                    setLoading(false);

                    // Check if there's cached data, if so, load it
                    const cachedData = localStorage.getItem('countries');
                    if (cachedData) {
                        setCountries(JSON.parse(cachedData));
                    }
                });
        }
    }, []);

    return {loading, countries, error};
};

----------------

use server';

interface Country {
  name: { common: string };
}

export async function UseCountries(): Promise<Country[]> {
  let countries: Country[] = [];

  // Fetch from the API on the server side
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    countries = await response.json();
  } catch (error) {
    console.error('Error loading countries:', error);
    countries = []; // fallback to empty list if API fails
  }

  return countries;
}


======

'use client'

import { use } from 'react'
import { Skeleton, Box, Typography } from '@mui/material'

// Assuming that UseCountries is imported from the server component
import { UseCountries } from './UseCountries' // Adjust path accordingly

// Custom hook to handle caching in localStorage
const useCachedCountries = () => {
  const cachedCountries = localStorage.getItem('countries')
  if (cachedCountries) {
    return JSON.parse(cachedCountries)
  }
  return null
}

export default function CountriesComponent() {
  // First, check if cached data exists
  const cachedCountries = useCachedCountries()

  // If cached countries are available, use them directly
  const countries = use(UseCountries()) || cachedCountries || []

  // If no countries are found (API fails and no cache), show a fallback message
  if (countries.length === 0) {
    return <Typography>No countries available</Typography>
  }

  // Cache countries in localStorage when they are fetched
  if (!cachedCountries && countries.length > 0) {
    localStorage.setItem('countries', JSON.stringify(countries))
  }

  return (
    <Box>
      <Typography variant="h6">Countries List</Typography>
      <ul>
        {countries.map((country, index) => (
          <li key={index}>{country.name?.common || 'Unnamed Country'}</li>
        ))}
      </ul>
    </Box>
  )
}


---------------or 2nd way----------------

// 'use server'; directive for Next.js 15.1.3
'use server';

interface UseCountriesResponse {
  loading: boolean;
  cachedCountries: any[] | null; // Adjust this type based on the structure of the data
  error: string | null;
}

const UseCountries = async (): Promise<UseCountriesResponse> => {
  let loading = true; // Initially assume it's loading
  let error: string | null = null;
  let countries: any[] | null = null; // Could be null or an array, depending on the data format

  // Check if countries data is available in localStorage
  const cachedCountries = localStorage.getItem('countries');
  if (cachedCountries) {
    countries = JSON.parse(cachedCountries);
    loading = false; // If cached data exists, set loading to false
  } else {
    // Fetch countries from the external API
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      localStorage.setItem('countries', JSON.stringify(data)); // Cache data in localStorage
      countries = data;
      loading = false;
    } catch (er) {
      console.error('Failed to load countries', er);
      error = 'Network: Failed to load countries';
      loading = false;

      // Try to fall back to cached data
      const cachedData = localStorage.getItem('countries');
      if (cachedData) {
        countries = JSON.parse(cachedData);
      } else {
        countries = []; // Ensure countries is not null, but empty if no data
      }
    }
  }

  return { loading, cachedCountries: countries, error };
};

export default UseCountries;

----------------

import React, { useEffect, useState } from 'react';
import UseCountries from './UseCountries'; // Assuming UseCountries is in the same directory
import { Skeleton, Box, Typography } from '@mui/material';

const CountriesComponent = () => {
  const [countriesData, setCountriesData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      const result = await UseCountries();
      setLoading(result.loading);
      setCountriesData(result.cachedCountries);
      setError(result.error);
    };

    fetchCountries();
  }, []);

  if (loading) {
    return (
      <Box sx={{ width: '100%', height: 100 }}>
        <Skeleton variant="text" animation="wave" width="100%" height={40} />
        <Skeleton variant="text" animation="wave" width="80%" height={40} sx={{ marginTop: '8px' }} />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      <Typography variant="h6">Countries List</Typography>
      {countriesData && countriesData.length > 0 ? (
        <ul>
          {countriesData.map((country, index) => (
            <li key={index}>{country.name?.common || 'Unnamed Country'}</li>
          ))}
        </ul>
      ) : (
        <Typography>No countries available</Typography>
      )}
    </Box>
  );
};

export default CountriesComponent;

*/

import { Suspense } from 'react';
import {allCountries} from "@/app/api/external/backend";
import {AllCountry} from "@/app/models/AllCountries";
import UseCountriesClient from "@/app/hooks/useCountriesClient";

const UseCountriesServer = () => {
    const countries:Promise<AllCountry[]> = allCountries();

    return (
        <Suspense fallback={<div style={{'textAlign':'center'}}>Loading...</div>}>
            <UseCountriesClient countries={countries} />
        </Suspense>
    );
}

export default UseCountriesServer;
