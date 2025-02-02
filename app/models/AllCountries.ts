interface AllCountries {
    name: {
        common: string;
        official: string;
        nativeName: {
            eng: {
                official: string;
                common: string;
            };
        };
    };
    tld: string[]; // Top-level domain (e.g., '.gh' for Ghana)
    cca2: string; // 2-letter country code (ISO 3166-1 alpha-2)
    ccn3: string; // Numeric country code (ISO 3166-1 numeric code)
    cca3: string; // 3-letter country code (ISO 3166-1 alpha-3)
    currencies: {
        [key: string]: {
            name: string; // Name of the currency
            symbol: string; // Currency symbol (e.g., '₵' for Ghanaian cedi)
        };
    };
    idd: {
        root: string; // Root of the international dialing code (e.g., "+2" for Ghana)
        suffixes: string | string[]; // Dialing code suffix (e.g., "33" for Ghana)
    };
    capital: string; // List of capitals (e.g., ["Accra"] for Ghana)
    region: string; // Geographical region (e.g., "Africa")
    subregion: string; // Subregion (e.g., "Western Africa")
    languages: {
        [key: string]: string; // Languages spoken (e.g., {"eng": "English"})
    };
    flags: {
        png: string; // PNG flag URL
        svg: string; // SVG flag URL
    };
}

type CountrySelectorProps = {
    sx?: object;
    isError?: string | null;
    countries?: Promise<AllCountries[]>;
    handleChange: (country: string, state_region: string) => void;
};

export type {AllCountries, CountrySelectorProps};

