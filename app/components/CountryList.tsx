import React from 'react'
import {
    Box,
    FormControl, InputLabel, Select,
    FormHelperText, SelectChangeEvent
} from "@mui/material";
import UseCountriesServer from "@/app/hooks/useCountriesServer";

type CountryListProps = {
    sx?: object;
    isError?: string | null;
    onCountryChange: (country: string, city: string) => void;
};

// const sortCountries = (a: Country, b: Country) => {
//     // Compare country names in alphabetical order (case-insensitive)
//     const nameA = a.name.common.toLowerCase();
//     const nameB = b.name.common.toLowerCase();
//     if (nameA < nameB) return -1; // a comes before b
//     if (nameA > nameB) return 1;  // b comes before a
//     return 0; // names are equal
// }


const CountryList = ({onCountryChange, sx, isError}: CountryListProps) => {


    const handleChange = (e: SelectChangeEvent<string>) => {
        // Find the selected country based on the cca3 code
        onCountryChange('c.name.common', 'No capital');
        console.log(e.target.value);
        // const selectedCountry = countries.sort(sortCountries).find((country: Country) => country.cca3 === e.target.value);
        //
        // // If country is found, trigger onCountryChange
        // if (selectedCountry) {
        //     const c = selectedCountry as Country;
        //     onCountryChange(c.name.common, c.capital || c.region || 'No capital');
        // }
    };

    return (
        <Box sx={{minWidth: 120, ...sx}}>
            <FormControl fullWidth size='small' error={Boolean(isError)}>
                <InputLabel id="country-select-label">Country</InputLabel>
                <Select
                    labelId="country-select-label"
                    id="country-select"
                    label={isError || 'country'}
                    name="Country"
                    defaultValue=""
                    onChange={handleChange}
                    error={Boolean(isError)}
                    size='small'
                >
                    <UseCountriesServer/>
                </Select>
                {isError && <FormHelperText>{isError || 'Country is required.'}</FormHelperText>}
            </FormControl>
        </Box>
    );
};

export default CountryList;
