'use client';
import React, {use} from "react";
import {SelectChangeEvent} from "@mui/material";
import {AllCountries, CountrySelectorProps} from "@/app/models/AllCountries";
import CountrySelectorUI from "@/app/components/CountrySelector/CountrySelectorUI";


const UseCountrySelector = (
    {handleChange, sx, isError, countries}: CountrySelectorProps
) => {
    const allCountries = use(countries!) || [];

    const onSelectionChange = (e: SelectChangeEvent) => {
        const selectedCountry = allCountries.find((country: AllCountries) => country.cca3 === e.target.value);

        // If country is found, trigger onCountryChange
        if (selectedCountry) {
            const c = selectedCountry as AllCountries;
            handleChange(c.name.common, c.capital || c.region || 'No capital');
        }
    };

    return <CountrySelectorUI
        sx={sx}
        isError={isError}
        handleChange={onSelectionChange}
        countries={allCountries}
    />;
};

export default UseCountrySelector;
