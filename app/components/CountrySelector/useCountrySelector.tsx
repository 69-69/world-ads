'use client';
import React, {useEffect, useState} from "react";
import {SelectChangeEvent} from "@mui/material";
import {AllCountries} from "@/app/models/AllCountries";
import CountrySelectorUI from "@/app/components/CountrySelector/CountrySelectorUI";


type CountrySelectorProps = {
    sx?: object;
    label?: string;
    isError?: string | null;
    fetchCountries: () => Promise<AllCountries[]>;
    handleChange: (country: string, state_region: string, dial: string) => void;
};

const UseCountrySelector = (
    {handleChange, sx, isError, fetchCountries, label}: CountrySelectorProps
) => {
    const [countries, setCountries] = useState<AllCountries[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const countriesData = await fetchCountries();
                setCountries(countriesData);
            } catch (error) {
                console.error("Error fetching countries:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [fetchCountries]);  // Dependency to ensure re-fetching if fetchCountries changes

    const onSelectionChange = (e: SelectChangeEvent) => {
        const selectedCountry = countries.find((country: AllCountries) => country.cca3 === e.target.value);

        if (selectedCountry) {
            const c = selectedCountry as AllCountries;
            const state_region = Array.isArray(c.capital) ? c.capital[0] : c.capital || c.region || 'No capital';
            const suffixes = c.cca2.toLowerCase() === 'us' ? '' : c.idd.suffixes;

            handleChange(c.name.common, state_region, c.idd.root + suffixes);
        }
    };

    if (loading) {
        /*return <div style={{'textAlign': 'center', 'border': '1px solid gray !important'}}>
                Loading countries...
            </div>;*/
    }

    return <CountrySelectorUI
        sx={sx}
        label={label}
        isError={isError}
        handleChange={onSelectionChange}
        countries={countries}
    />;
};

export default UseCountrySelector;
