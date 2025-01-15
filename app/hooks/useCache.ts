import {Profile} from "@/app/models";
import {AllCountry} from "@/app/models/AllCountries";
import {setCookie, getCookie, deleteCookie, stringifyJSON, parseJSON} from "@/app/hooks/useCookies";


type VerifyType = { contact: 'email' | 'phone' };
type ctxType = null | undefined;

// Cache all countries in a cookie for future requests
const cacheAllCountries = ({countries}: { countries: AllCountry[] }, ctx: ctxType = null): void => {
    setCookie(ctx, 'all_countries', stringifyJSON(countries) ?? '');
};

// Retrieve all countries from cookies
const getAllCountries = (ctx: ctxType = null): AllCountry[] | null => {
    const countriesCookie = getCookie(ctx, 'all_countries');

    return countriesCookie ? parseJSON(countriesCookie) as AllCountry[] : null;
};

const deleteAllCountries = (ctx: ctxType = null): void => deleteCookie(ctx, 'all_countries');

// Cache the sign-in type (either 'credentials' or 'social')
const cacheSignedInVia = (
    {method}: { method: 'credentials' | 'social' },
    ctx: ctxType = null,
): void => setCookie(ctx, 'signed_type', method);


// Check if the user signed in via credentials (not social media)
const getSignedInVia = (ctx: ctxType = null): string | null => getCookie(ctx, 'signed_type');

const deleteSignedInVia = (ctx: ctxType = null): void => deleteCookie(ctx, 'signed_type');

// Cache the access token cookie securely
const cacheAccessToken = (
    {access_token}: { access_token: string }, ctx: ctxType = null,
): void => setCookie(ctx, 'access_token', access_token);


// Retrieve the access token from cookies
const getAccessToken = (ctx: ctxType = null): string | null => getCookie(ctx, 'access_token');

// Delete the access token cookie
const deleteAccessToken = (ctx: ctxType = null): void => deleteCookie(ctx, 'access_token');

// Cache signup token: used to track the user's signup process
const cacheSignupToken = (
    {signupId}: { signupId: string },
    ctx: ctxType = null,
): void => setCookie(ctx, 'signup_id', signupId);

// Get the signup token
const getSignupToken = (ctx: ctxType = null): string | null => getCookie(ctx, 'signup_id');

// Delete signup token
const deleteSignupToken = (ctx: ctxType = null): void => deleteCookie(ctx, 'signup_id');

// Cache which contact is being verified
const cacheIsVerified = ({contact}: VerifyType, ctx: ctxType = null): void => setCookie(ctx, `verify_${contact}`, contact);

// Get which contact is being verified
const getIsVerified = ({contact}: VerifyType, ctx: ctxType = null): string | null => getCookie(ctx, `verify_${contact}`);

// Delete the verification contact cookie
const deleteIsVerified = ({contact}: VerifyType, ctx: ctxType = null): void => deleteCookie(ctx, `verify_${contact}`);

// Cache the profile cookie securely (stringifies)
const cacheProfile = (
    {profile}: { profile: Profile }, ctx: ctxType = null,
): void => setCookie(ctx, 'profile', stringifyJSON(profile) ?? '');

// Retrieve the profile from cookies and parse it back into a Profile object
const getProfile = (ctx: ctxType = null): Profile | null => {
    const profileCookie = getCookie(ctx, 'profile');

    if (profileCookie) {
        try {
            return parseJSON(profileCookie) as Profile;  // Safely parse profile
        } catch (error) {
            console.error('Error parsing profile cookie:', error);
            return null;
        }
    }
    return null;
};

const deleteProfile = (ctx: ctxType = null): void => deleteCookie(ctx, 'profile');

export {
    cacheAllCountries,
    getAllCountries,
    deleteAllCountries,
    cacheSignedInVia,
    getSignedInVia,
    deleteSignedInVia,
    cacheSignupToken,
    getSignupToken,
    deleteSignupToken,
    cacheProfile,
    getProfile,
    deleteProfile,
    cacheAccessToken,
    getAccessToken,
    deleteAccessToken,
    cacheIsVerified,
    getIsVerified,
    deleteIsVerified,
};