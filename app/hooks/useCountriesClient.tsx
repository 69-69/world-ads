'use client';

import {Avatar, Typography, MenuItem, Skeleton, Grid2 as Grid} from "@mui/material";
import {AllCountry} from "@/app/models/AllCountries";
import {use} from "react";

const getSubregion = (country: AllCountry) => {
    const suffixes = country.cca2.toLowerCase() === 'us' ? '' : country.idd.suffixes;

    return <>{country.capital || country.region} ({country.idd.root + suffixes})</>;
};

const sortCountries = (a: AllCountry, b: AllCountry) => {
    // Compare country names in alphabetical order (case-insensitive)
    const nameA = a.name.common.toLowerCase();
    const nameB = b.name.common.toLowerCase();
    if (nameA < nameB) return -1; // a comes before b
    if (nameA > nameB) return 1;  // b comes before a
    return 0; // names are equal
}

const uiSkeleton = () => {
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

const uiGrid = (country: AllCountry) => {
    return <Grid container spacing={2} alignItems="center">
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
    </Grid>;
}


const UseCountriesClient = (
    {countries}: { countries: Promise<AllCountry[]> }
) => {
    const allCountries = use(countries);

    return (
        allCountries.length > 0 ? (
            allCountries.sort(sortCountries)
                .map((country: AllCountry) => (
                    <MenuItem key={country.cca3} value={country.cca3}>
                        {uiGrid(country)}
                    </MenuItem>
                ))
        ) : (
            <MenuItem sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2}}>
                {uiSkeleton()}
            </MenuItem>
        )
    );
};

export default UseCountriesClient;
