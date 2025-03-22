'use client';

import React from "react";
import {
    Box,
    Avatar,
    Typography,
    MenuItem,
    Skeleton,
    Grid2 as Grid,
    InputLabel,
    FormHelperText,
    FormControl,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import {AllCountries} from "@/app/models/AllCountries";

const getSubregion = (country: AllCountries) => {
    const suffixes = country.cca2.toLowerCase() === 'us' ? '' : country.idd.suffixes;

    return <>{country.capital || country.region} ({country.idd.root + suffixes})</>;
};

const sortCountries = (a: AllCountries, b: AllCountries) => {
    // Compare country names in alphabetical order (case-insensitive)
    const nameA = a.name.common.toLowerCase();
    const nameB = b.name.common.toLowerCase();
    if (nameA < nameB) return -1; // a comes before b
    if (nameA > nameB) return 1;  // b comes before a
    return 0; // names are equal
}

const UISkeleton = () => {
    return <>
        <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{fontSize: '1rem', position: 'absolute', top: 0, left: 0,}}
        />
        <Typography
            variant="body1"
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,  // Ensures text is on top of the skeleton
                color: 'rgba(0, 0, 0, 0.6)',
            }}
        >
            Loading countries...
        </Typography>
    </>;
}

const CountryGrid = (country: AllCountries) => {
    return (
        <Grid container spacing={2} alignItems="center">
            <Grid>
                <Avatar
                    alt={country.name.common}
                    src={country.flags.png}
                    sx={{width: 20, height: 20}}
                    variant="rounded"
                />
            </Grid>
            <Grid>
                <span>{country.name.common}</span>
                <span style={{fontSize: '0.8rem', color: 'gray', marginLeft: '5px'}}>
                - {getSubregion(country)}
            </span>
            </Grid>
        </Grid>
    );
}


const CountrySelectorUI = (
    {sx, isError, label = 'Country', handleChange, countries}:
    {
        sx: object | undefined;
        label?: string;
        isError: string | null | undefined;
        handleChange: (e: SelectChangeEvent) => void;
        countries: AllCountries[];
    }
) => {

    return (
        <Box sx={{minWidth: 120, ...sx}}>
            <FormControl fullWidth size='small' error={Boolean(isError)}>
                <InputLabel id="country-select-label">{label}</InputLabel>
                <Select
                    labelId="country-select-label"
                    id="country-select"
                    label={isError || label}
                    name='country'
                    defaultValue=""
                    onChange={handleChange}
                    error={Boolean(isError)}
                    size='small'
                >
                    {
                        countries.length > 0 ? (
                            countries.sort(sortCountries)
                                .map((country: AllCountries) => (
                                    <MenuItem key={country.cca3} value={country.cca3}>
                                        {CountryGrid(country)}
                                    </MenuItem>
                                ))
                        ) : (
                            <MenuItem sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2}}>
                                {UISkeleton()}
                            </MenuItem>
                        )
                    }
                </Select>
                {isError && <FormHelperText>{isError || label+' is required.'}</FormHelperText>}
            </FormControl>
        </Box>
    );
}

export default CountrySelectorUI;