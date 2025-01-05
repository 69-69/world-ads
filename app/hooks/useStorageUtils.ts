import Cookies from 'js-cookie';
import {Profile} from "@/app/models/Profile";

// Set a cookie with secure settings (expires in 7 days by default, secure, and sameSite: 'Strict')
const setCookie = (name: string, value: string, days: number = 7): void => {
    Cookies.set(name, value, {expires: days, secure: true, sameSite: 'Strict'});
};

// Retrieve the cookie by name
const getCookie = (name: string): string | null => {
    return Cookies.get(name) || null;
};

// Delete a cookie by name
const deleteCookie = (name: string): void => {
    Cookies.remove(name);
};

// Check if the user signed in via credentials (not social media)
const getSignedInVia = (): 'credentials' | 'social' | null => {
    const signedType = getCookie('signed_type');
    return signedType === 'credentials' || signedType === 'social' ? signedType : null;
};

// Set the sign-in type (either 'credentials' or 'social')
const setSignedInVia = (signInMethod: 'credentials' | 'social'): void => {
    setCookie('signed_type', signInMethod);
};

const deleteSignedInVia = (): void => deleteCookie('signed_type')

// Set the access token cookie securely
const setAccessToken = (access_token: string): void => {
    setCookie('access_token', access_token);
};

// Retrieve the access token from cookies
const getAccessToken = (): string | null => getCookie('access_token');

// Delete the access token cookie
const deleteAccessToken = (): void => deleteCookie('access_token');

// Set the profile cookie securely (stringifies)
const setProfile = (profile: Profile): void => setCookie('profile', JSON.stringify(profile));

// Retrieve the profile from cookies and parse it back into a Profile object
const getProfile = (): Profile | null => {
    const profileCookie = getCookie('profile');

    if (profileCookie) {
        try {
            return JSON.parse(profileCookie) as Profile;  // Safely parse profile
        } catch (error) {
            console.error('Error parsing profile cookie:', error);
            return null;
        }
    }
    return null;
};

const deleteProfile = (): void => deleteCookie('profile');

export {
    setCookie,
    getCookie,
    deleteCookie,
    setSignedInVia,
    getSignedInVia,
    deleteSignedInVia,
    setProfile,
    getProfile,
    deleteProfile,
    setAccessToken,
    getAccessToken,
    deleteAccessToken,
};
