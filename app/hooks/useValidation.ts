// Convert JSON string to object for use in the UI (or return an error)
const parseJSON = (json: string): unknown | Error => {
    try {
        return JSON.parse(json);
    } catch (error: unknown) {
        return error instanceof Error ? error : new Error('Invalid JSON format');
    }
};

// Convert data to JSON string for storage (or return an error)
const stringifyJSON = (data: unknown): string | Error => {
    try {
        return JSON.stringify(data);
    } catch (error: unknown) {
        return error instanceof Error ? error : new Error('Failed to stringify');
    }
};

// Convert a string to sentence case
const toSentenceCase = (str: string) => {
    return str
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2') // Adds space before capital letters in camelCase
        .toLowerCase() // Convert to lowercase
        .replace(/^./, (match) => match.toUpperCase()); // Capitalize the first letter
};

// Simple validation for name, email and password
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

export {
    parseJSON,
    stringifyJSON,
    toSentenceCase,
    validateName,
    validateText,
    validatePrice,
    validateEmail,
    validatePassword,
};
