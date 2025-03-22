'use server';

import {cookies} from "next/headers";
import {NextResponse} from "next/server";

// NEXT-JS Cookies
// Next-JS Ref Cookies: https://nextjs.org/docs/app/api-reference/functions/cookies#getting-all-cookies
// const cookieStore = await cookies();
const setNextCookies = async (res: NextResponse, name: string, value: string, days: number = 7) => {
    res.cookies.set(name, value, {
        httpOnly: true,
        maxAge: days * 24 * 60 * 60, // Default is 7 days
        secure: process.env.COOKIE_SECURE === "production",
        path: '/',
        sameSite: 'lax',
    });
};

const getNextCookies = async (name: string) => {

    const cookieStore = await cookies();
    return cookieStore.has(name) ? cookieStore.get(name)?.value : null;
    /*const cookie = headers?.cookie ?? '';
    return cookie.split(';').reduce((cookies: any, current: any) => {
        const [name, value] = current.trim().split('=');
        cookies[name] = value;
        return cookies;
    }, {});*/
}

const deleteNextCookies = async (res: NextResponse, name: string) => {
    res.cookies.delete(name);
}


type VerifyType = { contact: 'email' | 'phone' };

// Cache which contact is being verified
// const cacheIsVerified = ({contact}: VerifyType, ctx: null | undefined = null): void => setCookie(ctx, `verify_${contact}`, contact);

// Check if the user signed in via credentials (not social media)
const getSigninMethod = async () => await getNextCookies('signin_method');

// Retrieve the access token from cookies
const getAccessToken = async () => await getNextCookies('access_token');

// Get the signup token
const getSignupToken = async () => await getNextCookies('signup_token') ?? null;

// Get which contact is being verified
const getIsVerified = async ({contact}: VerifyType) => await getNextCookies(`verified_${contact}`) ?? null;

export {
    setNextCookies,
    getNextCookies,
    deleteNextCookies,
    getSigninMethod,
    getSignupToken,
    getAccessToken,
    getIsVerified,
};

/*// Function to get the value of a specific cookie by name
function getCookie(name) {
    // Decode the cookie string to handle any URL-encoded characters
    const cookieString = decodeURIComponent(document.cookie);

    // Split the cookie string into individual cookies
    const cookies = cookieString.split(';');

    // Loop through the cookies to find the one with the specified name
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim(); // Remove any leading/trailing spaces
        if (cookie.startsWith(name + '=')) {
            // Return the value of the cookie
            return cookie.substring(name.length + 1); // Skip the cookie name and '='
        }
    }
    return null; // Return null if the cookie is not found
}

// Usage
const signupToken = getCookie('signup_token');
console.log(signupToken);
*/
