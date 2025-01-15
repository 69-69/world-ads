import nookies from 'nookies';

// Convert JSON string to object for use in the UI (or return an error)
const parseJSON = (json: string): any | null => {
    try {
        return JSON.parse(json);
    } catch (error: unknown) {
        console.log(error instanceof Error ? error.message : 'Invalid JSON format');
        return null;
    }
};

// Convert data to JSON string for storage (or return an error)
const stringifyJSON = (data: unknown): string => {
    try {
        return JSON.stringify(data);
    } catch (error: unknown) {
        console.log(error instanceof Error ? error.message : 'Error stringify JSON');
        return '';
    }
};

// Set a cookie with secure settings (expires in 7 days by default, secure, and sameSite: 'Strict')
const setCookie = (ctx: ctxType = null, name: string, value: string, days: number = 7): void => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000); // 7 days by default

    nookies.set(ctx, name, value, {
        path: process.env.COOKIE_PATH || '/',
        expires,
        secure: process.env.COOKIE_SECURE === "production", // Use 'secure' in production only
        sameSite: 'lax',
    });
};

// Retrieve the cookie by name
const getCookie = (ctx: ctxType = null, name: string): string | null => {
    const cookies = nookies.get(ctx); // Works with ctx if provided, otherwise defaults to client-side cookies
    return cookies[name] || null;
};

// Delete a cookie by name
const deleteCookie = (ctx: never | null | undefined, name: string): void => {
    nookies.destroy(ctx, name);
};

type ctxType = null | undefined;

export {
    setCookie,
    getCookie,
    parseJSON,
    stringifyJSON,
    deleteCookie,
};
