import {AxiosResponse} from 'axios';
import apiClient from './apiClient';
import {ApiResponse, Profile, SignUp, User, SignIn} from '@/app/models';
import {Post} from "@/app/models/Post";
import {
    getProfile,
    setAccessToken,
    setProfile,
    setSignedInVia,
    deleteSignedInVia,
    deleteAccessToken, deleteProfile
} from "@/app/hooks/useStorageUtils";
import {SignUpResponse} from "@/app/models/SignUp";
import {handleBackendError} from "@/app/hooks/useThrowError";


// Post Ad API Call
export const postAd = async (formData: FormData): Promise<ApiResponse> => {
    try {
        const response = await apiClient.post('/post-ad', formData);
        // Check if the response status is within the 2xx range (successful)
        if (response.status >= 200 && response.status < 300) {
            // Store the access token in the local storage
            setSignedInVia('credentials');

            // Directly return the response data as the User object
            return {
                data: JSON.stringify(response.data),
                status: response.status,
                message: 'Post successful',
            };
        }
        // Handle unsuccessful status codes (non-2xx), return error message instead of throwing
        return {message: 'Sign-in failed', status: response.status};
    } catch (error: unknown) {
        handleBackendError(error);
        return {
            message: 'An error occurred during sign-in',
            status: 500, // Internal Server Error status in case of a catchable exception
        }
    }
};

// Sign Up API Call
export const signUpWithCredentials = async (formData: SignUp): Promise<ApiResponse<SignUpResponse>> => {
    try {
        const {firstname, lastname, phone, email, password, role} = formData;

        const response: AxiosResponse<SignUpResponse> = await apiClient.post('/signup', {
            phone: phone,
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname,
            role: role,
        });

        if (response.status >= 200 && response.status < 300) {
            return response;
        }
        // Handle unsuccessful status codes (non-2xx), return error message instead of throwing
        return {message: 'Sign-up failed', status: response.status};

    } catch (error: unknown) {
        handleBackendError(error);
        // Handle errors (e.g., network issues)
        const errorMessage = error instanceof Error ? error.message : 'An error occurred during sign-in';
        return {
            message: errorMessage,
            status: 500, // Internal Server Error status in case of a catchable exception
        };
    }
};

// Sign In API Call
export const signInWithCredentials = async ({email, password}: SignIn): Promise<ApiResponse<User | string>> => {
    try {
        const response: AxiosResponse = await apiClient.post('/signin', {email, password});

        // Check if the response status is within the 2xx range (successful)
        if (response.status >= 200 && response.status < 300) {
            // Store the access token in the local storage
            setSignedInVia('credentials');

            // Directly return the response data as the User object
            return {
                data: response.data as User,
                status: response.status,
                message: 'Sign-in successful',
            };
        }
        // Handle unsuccessful status codes (non-2xx), return error message instead of throwing
        return {data: 'Sign-in failed', status: response.status};
    } catch (error: unknown) {
        handleBackendError(error);
        // Handle errors (e.g., network issues)
        const errorMessage = error instanceof Error ? error.message : 'An error occurred during sign-in';
        return {
            data: errorMessage,
            status: 500, // Internal Server Error status in case of a catchable exception
        };
    }
};

// Confirm Sign Up API Call (Verification code for Email & Phone)
export const confirmSignup = async (code: string): Promise<ApiResponse<string>> => {
    try {
        const response = await apiClient.post('/confirm-signup', {code: code});
        // Check if the response status is within the 2xx range (successful)
        if (response.status >= 200 && response.status < 300) {
            // Store the access token in the local storage
            setSignedInVia('credentials');

            // Directly return the response data as the User object
            return {
                data: JSON.stringify(response.data),
                status: response.status,
                message: 'Sign-up successful',
            };
        }
        // Handle unsuccessful status codes (non-2xx), return error message instead of throwing
        return {message: 'Sign-in failed', status: response.status};
    } catch (error: unknown) {
        handleBackendError(error);
        // Handle errors (e.g., network issues)
        const errorMessage = error instanceof Error ? error.message : 'An error occurred during signup verification';
        return {
            message: errorMessage,
            status: 500, // Internal Server Error status in case of a catchable exception
        };
    }
};

// log-out user from the backend server
export const signOutFromCredentials = async (): Promise<void> => {
    try {
        const response = await apiClient.post('/sign-out', {});
        if (response.status === 200) {
            deleteAccessToken();
            deleteProfile();
            deleteSignedInVia();
            window.location.href = '/signin';
        }
    } catch (error: unknown) {
        handleBackendError(error);
    }
};

// Auto Login after Auto Logout (Refresh Token) API Call
export const autoSignIn = async (): Promise<unknown> => {
    try {
        const response: AxiosResponse = await apiClient.post('/auto-sign-in');

        const {access_token, user} = response.data;

        setAccessToken(access_token);
        setProfile(user);

        return response.data;
    } catch (error: unknown) {
        console.error('Error reactivating session:', error);
        window.location.href = '/signin';
    }
};

// Get Profile API Call
export const getUserProfile = async ({user_id}: { user_id: string }): Promise<unknown> => {
    try {
        const response: AxiosResponse<Profile> = await apiClient.get(`/user/${user_id}`);
        setProfile(response.data);
        return response.data; // Ensure this always returns a Profile
    } catch (error: unknown) {
        handleBackendError(error);
    }
};

// Get Profile from Local Storage
export const getProfileFromLocalStorage = (): Profile | null => getProfile();

// Function to check if user is Verified
export const isVerified = (): boolean => getProfileFromLocalStorage()?.is_verified ?? false;

// Function to check if user is Seller
export const isSeller = (): boolean => getProfileFromLocalStorage()?.role === 'seller';

// Function to check if user is Admin
export const isAdmin = (): boolean => getProfileFromLocalStorage()?.role === 'admin';

// Function to check if user is Buyer
export const isBuyer = (): boolean => getProfileFromLocalStorage()?.role === 'buyer';

// Function to check if user is SuperAdmin
export const isSuperAdmin = (): boolean => getProfileFromLocalStorage()?.role === 'super_admin';

// Function to get all ads
export const getAds = async (): Promise<unknown> => {
    try {
        const response: AxiosResponse<Post[]> = await apiClient.get('/ads');
        return response.data;
    } catch (error: unknown) {
        handleBackendError(error);
    }
};
