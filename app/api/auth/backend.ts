import {AxiosError, AxiosResponse} from 'axios';
import apiClient from './apiClient';
import {ApiResponse, Profile, SignUp, User, SignIn} from '@/app/models';
import {Post} from "@/app/models/Post";
import {getProfile, setAccessToken, setProfile} from "@/app/hooks/useStorageUtils";


function throwError(error: unknown) {
    const msg = 'Something went wrong, please try again';

    if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || msg);
    } else if (error instanceof Error) {
        throw new Error(error.message || msg);
    } else {
        throw new Error('An unexpected error occurred');
    }
}

// Post Ad API Call
export const postAd = async (formData: FormData): Promise<unknown> => {
    try {
        const response: AxiosResponse = await apiClient.post('/post-ad', formData);
        return response.data;
    } catch (error: unknown) {
        throwError(error);
    }
};

// Sign Up API Call
export const signUpWithCredentials = async (formData: SignUp): Promise<ApiResponse> => {
    try {
        const {firstname, lastname, phone, email, password, role} = formData;
        const response: AxiosResponse = await apiClient.post('/signup', {
            phone: phone,
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname,
            role: role,
        });

        if (response.status >= 200 && response.status < 300) {
            return {
                data: {},
                message: 'Sign-up successful',
                status: response.status,
            };
        }
        // Handle unsuccessful status codes (non-2xx), return error message instead of throwing
        return {data: 'Sign-up failed', status: response.status};

    } catch (error: unknown) {
        throwError(error);
        // Handle errors (e.g., network issues)
        const errorMessage = error instanceof Error ? error.message : 'An error occurred during sign-in';
        return {
            data: errorMessage,
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
            // Directly return the response data as the User object
            return {
                data: response.data as User,
                status: response.status,
            };
        }
        // Handle unsuccessful status codes (non-2xx), return error message instead of throwing
        return {data: 'Sign-in failed', status: response.status};
    } catch (error: unknown) {
        throwError(error);
        // Handle errors (e.g., network issues)
        const errorMessage = error instanceof Error ? error.message : 'An error occurred during sign-in';
        return {
            data: errorMessage,
            status: 500, // Internal Server Error status in case of a catchable exception
        };
    }
};

// Confirm Sign Up API Call (Verification code for Email & Phone)
export const confirmSignup = async (code: string): Promise<unknown> => {
    try {
        const response: AxiosResponse = await apiClient.post('/confirm-signup', {code: code});
        return response.data;
    } catch (error: unknown) {
        throwError(error);
    }
};

// Function to log-out user
export const signOut = async (): Promise<void> => {
    try {
        const response = await apiClient.post('/sign-out', {});
        if (response.status === 200) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/signin';
        }
    } catch (error: unknown) {
        throwError(error);
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
        throwError(error); // Properly throw error to terminate execution
        // Note: We never reach this line, as throwError will stop execution
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
        throwError(error);
    }
};
