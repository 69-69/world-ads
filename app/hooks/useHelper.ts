// Check if a number is within a specified range: >= min && <= max

const inRange = (value: number, min: number = 200, max: number = 299) => {
    return value >= min && value <= max;
}

const getParts = (token: string, index: number, char: string = '_') =>
    token.indexOf(char) > -1 ? token.split(char)[index] : token;

// Convert a string to sentence case
const toSentenceCase = (str: string) => {
    return str
        .replaceAll(/([a-z0-9])([A-Z])/g, '$1 $2') // Adds space before capital letters in camelCase
        .toLowerCase() // Convert to lowercase
        .replace(/^./, (match) => match.toUpperCase()); // Capitalize the first letter
};

// Convert each first letter of a string to uppercase
const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

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
    validatePrice,
    validateEmail,
    validatePassword,
    generateRandomHash,
};
