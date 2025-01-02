// Set Profile in Local Storage
import {Profile} from "@/app/models/Profile";

const setProfile = (profile: Profile): void => localStorage.setItem('profile', JSON.stringify(profile));

const getProfile = (): Profile | null => JSON.parse(localStorage.getItem('profile') || '')

// Set Access Token in Local Storage
const setAccessToken = (access_token: string): void => localStorage.setItem('access_token', access_token);

// Get Access Token from Local Storage
const getAccessToken = (): string | null => localStorage.getItem('access_token');

export {setProfile, getProfile, setAccessToken, getAccessToken};
