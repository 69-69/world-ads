// Check if a number is within a specified range: >= min && <= max

const inRange = (value: number, min: number = 200, max: number = 299) => {
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

// Is Expired
const isExpired = (dateStr: string) => {

    const endDate = new Date(dateStr);
    const now = new Date();

    return endDate < now;
};

export {
    inRange,
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
};
