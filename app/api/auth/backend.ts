// app/api/auth/backend.ts: authentication API calls to the backend server
//
import {AxiosResponse} from 'axios';
import apiClient from './apiClient';
import {ApiResponse, Profile, SignIn, SignUp, User} from '@/app/models';
import {Post} from "@/app/models/Post";
import {
    deleteAccessToken,
    deleteProfile,
    deleteSignedInVia,
    getProfile,
    setAccessToken,
    setProfile,
    setSignedInVia,
    stringifyJSON,
} from "@/app/hooks/useCookies";
import {SignUpResponse} from "@/app/models/SignUp";
import {handleBackendError} from "@/app/hooks/useThrowError";
import {inRange} from "@/app/hooks/useValidation";

const signupEndpoint = '/signup';
const signinEndpoint = '/signin';
const signOutEndpoint = '/sign-out';
const autoSigninEndpoint = '/auto-signin';
const postAdEndpoint = '/post-ad';
const adsEndpoint = '/ads';
const sendVerifyEmail = '/send-verify-email';
const sendVerifyPhone = '/send-verify-phone';
const verifyEmailEndpoint = '/verify-email';
const verifyPhoneEndpoint = '/verify-sms';

// Post Ad API Call
export const postAd = async (formData: FormData): Promise<ApiResponse> => {
    try {
        const response = await apiClient.post(postAdEndpoint, formData);
        // Check if the response status is within the 2xx range (successful)
        if (inRange(response.status, 200, 299)) {
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

        const response = await apiClient.post(signupEndpoint, {
            phone: phone,
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname,
            role: role,
        });

        if (inRange(response.status, 200, 299)) {
            // Store the verification code in the local storage
            const data = response.data as SignUpResponse;

            return {
                data: data,
                status: response.status,
                message: 'Sign-up successful',
            };
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
        const response: AxiosResponse = await apiClient.post(signinEndpoint, {email, password});

        // Check if the response status is within the 2xx range (successful)
        if (inRange(response.status, 200, 299)) {
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

// Verify Email code API Call
export const verifyUserEmail = async (userId: string, emailCode: string): Promise<ApiResponse<string>> => {
    try {
        const response = await apiClient.post(verifyEmailEndpoint, {
            user_id: userId,
            code: emailCode,
        });

        if (inRange(response.status, 200, 299)) {
            return {
                status: response.status,
                message: 'Email verification successful',
            };
        }
        // Handle unsuccessful status codes (non-2xx), return error message instead of throwing
        return {message: 'Email verification failed', status: response.status};

    } catch (error: unknown) {
        handleBackendError(error);
        return {
            data: 'An error occurred during verification',
            status: 500,
            message: 'An error occurred during verification',
        };
    }
};

// Verify Phone/SMS code API Call
export const verifyUserPhone = async (userId: string, smsCode: string): Promise<ApiResponse<string>> => {
    try {
        const response = await apiClient.post(verifyPhoneEndpoint, {
            user_id: userId,
            code: smsCode,
        });

        if (inRange(response.status, 200, 299)) {
            return {
                status: response.status,
                message: 'Phone verification successful',
            };
        }
        // Handle unsuccessful status codes (non-2xx), return error message instead of throwing
        return {message: 'Phone verification failed', status: response.status};

    } catch (error: unknown) {
        handleBackendError(error);
        return {
            data: 'An error occurred during verification',
            status: 500,
            message: 'An error occurred during verification',
        };
    }
};

// Send/Resend Email Verification Code API Call
export const sendEmailVerificationCode = async (email: string): Promise<ApiResponse<string>> => {
    try {
        const response = await apiClient.post(sendVerifyEmail, {email: email});
        // Check if the response status is within the 2xx range (successful)
        if (inRange(response.status, 200, 299)) {
            return {
                data: stringifyJSON(response.data) ?? '',
                status: response.status,
                message: 'Email verification code sent successfully',
            };
        }
        // Handle unsuccessful status codes (non-2xx), return error message instead of throwing
        return {message: 'Email verification code resend failed', status: response.status};
    } catch (error: unknown) {
        handleBackendError(error);
        // Handle errors (e.g., network issues)
        const errorMessage = error instanceof Error ? error.message : 'An error occurred during email verification code resend';
        return {
            message: errorMessage,
            status: 500, // Internal Server Error status in case of a catchable exception
        };
    }
};

// Send/Resend Phone/SMS Verification Code API Call
export const sendPhoneVerificationCode = async (phone: string): Promise<ApiResponse<string>> => {
    try {
        const response = await apiClient.post(sendVerifyPhone, {phone: phone});
        // Check if the response status is within the 2xx range (successful)
        if (inRange(response.status, 200, 299)) {
            return {
                data: stringifyJSON(response.data) ?? '',
                status: response.status,
                message: 'Phone verification code sent successfully',
            };
        }
        // Handle unsuccessful status codes (non-2xx), return error message instead of throwing
        return {message: 'Phone verification code resend failed', status: response.status};
    } catch (error: unknown) {
        handleBackendError(error);
        // Handle errors (e.g., network issues)
        const errorMessage = error instanceof Error ? error.message : 'An error occurred during phone verification code resend';
        return {
            message: errorMessage,
            status: 500, // Internal Server Error status in case of a catchable exception
        };
    }
};

// log-out user from the backend server
export const signOutFromCredentials = async (): Promise<void> => {
    try {
        const response = await apiClient.post(signOutEndpoint, {});
        if (response.status === 200) {
            deleteAccessToken();
            deleteProfile();
            deleteSignedInVia();
            window.location.href = signinEndpoint;
        }
    } catch (error: unknown) {
        handleBackendError(error);
    }
};

// Auto Login after Auto Logout (Refresh Token) API Call
export const autoSignIn = async (): Promise<unknown> => {
    try {
        const response: AxiosResponse = await apiClient.post(autoSigninEndpoint, {});

        const {access_token, user} = response.data;

        setAccessToken(access_token);
        setProfile(user);

        return response.data;
    } catch (error: unknown) {
        console.error('Error reactivating session:', error);
        window.location.href = signinEndpoint;
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

// Simulating async fetch of profile from cookies
export const getProfileFromCookies = async (): Promise<Profile | null> => {
    return await new Promise<Profile | null>((resolve) =>
        setTimeout(() => resolve(getProfile()), 1)
    );
};

// Function to check if user is Verified
export const isVerified = async (): Promise<boolean> => (await getProfileFromCookies())?.is_verified ?? false;

// Function to check if user is Seller
export const isSeller = async (): Promise<boolean> => (await getProfileFromCookies())?.role === 'seller';

// Function to check if user is Admin
export const isAdmin = async (): Promise<boolean> => (await getProfileFromCookies())?.role === 'admin';

// Function to check if user is Buyer
export const isBuyer = async (): Promise<boolean> => (await getProfileFromCookies())?.role === 'buyer';

// Function to check if user is SuperAdmin
export const isSuperAdmin = async (): Promise<boolean> => (await getProfileFromCookies())?.role === 'super_admin';

// Function to get all ads
export const getAds = async (): Promise<unknown> => {
    try {
        const response: AxiosResponse<Post[]> = await apiClient.get(adsEndpoint);
        return response.data;
    } catch (error: unknown) {
        handleBackendError(error);
    }
};
