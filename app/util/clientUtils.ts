import {NextResponse} from "next/server";


interface RouteWithHashKeyOptions {
    char?: string;
}

interface SuccessCodeOptions {
    min?: number;
    max?: number;
}

// Check if a status code is a success code (default: 200-299)
// This function can be used to validate HTTP response codes
// and determine if the request was successful.
const isSuccessCode = (value: number, options: SuccessCodeOptions = {}) => {
    const {min = 200, max = 299} = options;
    return value >= min && value <= max;
}

const getParts = (token: string, index: number, char: string = '_') =>
    token.indexOf(char) > -1 ? token.split(char)[index] : token;

// Convert a string to sentence case
const toSentenceCase = (val: string | number): string => {
    if (typeof val === 'number') return val.toString();

    const trimmed = val.trim();

    // Special case: if it starts with "iPhone" (case-insensitive)
    if (/^iphone/i.test(trimmed)) {
        return 'iPhone';
    }

    // Check if it looks like camelCase or PascalCase
    const needsConversion = /[a-z0-9][A-Z]/.test(trimmed);

    if (!needsConversion) {
        return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
    }

    return trimmed
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .toLowerCase()
        .replace(/^./, match => match.toUpperCase());
};


// Convert each first letter of a string to uppercase
const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

const replaceSpaces = ({str, replace}: {
    str: string,
    replace?: string
}) => str.replace(/\s+/g, replace || '_').toLowerCase(); // Replace spaces with underscores

const removeSpaces = (str: string) => str.replace(/\s+/g, ''); // Remove all spaces

const removeSpecialChars = (str: string) => str.replace(/[^a-zA-Z0-9]/g, ' '); // Remove special characters

const validateName = (value: string) => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(value) && value.length > 2
};
const validateText = (value: string) => {
    const regex = /^[a-zA-Z0-9\s.,'-]+$/;
    return value && regex.test(value) && value.length > 2
};
const validatePrice = (value: string) => {
    const regex = /^\d+(\.\d{1,2})?$/;
    return regex.test(value) && value.length > 2
};
const validateEmail = (value: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(value);
};

const validatePassword = (value: string) => {
    return value.length >= 8; // Example: password must be at least 8 characters long
};


// Helper function to generate a random hash (8-character random string)
const generateRandomHash = (length: number = 32): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

// Helper: Match route with optional dynamic segments
const matchRouteWithParams = (route: string, pathname: string): boolean => {
    const routeParts = route.split('/');
    const pathParts = pathname.split('/');

    // Check if the number of segments match
    if (routeParts.length !== pathParts.length) return false;

    // Compare each segment, allowing for dynamic segments
    /*return routeParts.every((part, index) =>
        part.startsWith(':') || part === pathParts[index]
    );*/
    for (let i = 0; i < routeParts.length; i++) {
        if (routeParts[i].startsWith(':') || routeParts[i] === pathParts[i]) continue;
        return false;
    }
    return true;
};

// Helper: Generate random hash for routes like verification
const routeWithHashKey = (req: string, pathname: string, options: RouteWithHashKeyOptions = {}): NextResponse => {
    const {char = '/'} = options;
    const randomHash = generateRandomHash();

    const newUrl = `${pathname}${char}${randomHash}`;
    return NextResponse.redirect(new URL(newUrl, req));
}


// Is Expired
const isExpired = (dateStr: string) => {

    const endDate = new Date(dateStr);
    const now = new Date();

    return endDate < now;
};

const errorUtils = {
    getError: (error: unknown): string => {
        let errorMessage: { error?: string } | string;

        // Check if the error is an AxiosError or has a response structure
        if (isAxiosError(error)) {
            // Attempt to extract the error message from the response
            const responseData = error.response?.data;

            // If the error response has a custom 'error' key, use that
            if (responseData?.error) {
                errorMessage = responseData.error;
            } else {
                errorMessage = responseData || "An unknown error occurred";
            }
        } else if (error instanceof Error) {
            // If it's a regular JavaScript error, use the message
            errorMessage = error.message;
        } else {
            // Fallback message for other unknown types
            errorMessage = "Steve-Unknown error occurred";
        }

        return <string>errorMessage;
    },
};

// Helper to check if the error is an AxiosError
const isAxiosError = (error: unknown): error is { response?: { data?: { error?: string } } } => {
    return (
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        typeof (error as any).response?.data === 'object'
    );
};


export {
    errorUtils,
    isSuccessCode,
    isExpired,
    getParts,
    toTitleCase,
    toSentenceCase,
    validateName,
    validateText,
    removeSpaces,
    replaceSpaces,
    removeSpecialChars,
    validatePrice,
    validateEmail,
    validatePassword,
    generateRandomHash,
    matchRouteWithParams,
    routeWithHashKey
};
