// app/api/auth/backend.ts: authentication API calls to the backend server
//

import {AxiosResponse} from 'axios';
import fetchWithRetry from "./fetchWithRetry";
import {ApiResponse, Profile, SignIn, SignUp, User} from '@/app/models';
import {Post} from "@/app/models/Post";
import {
    cacheAccessToken,
    cacheIsVerified,
    cacheProfile,
    deleteAccessToken,
    deleteProfile,
    deleteSignedInVia,
    deleteSignupToken,
    getProfile,
    getSignupToken,
} from "@/app/hooks/useCache";
import {stringifyJSON} from "@/app/hooks/useCookies";
import {SignUpResponse} from "@/app/models/SignUp";
import {handleBackendError} from "@/app/hooks/useThrowError";
import {inRange} from "@/app/hooks/useValidation";
import {VerifyContactResponse} from "@/app/models/VerifyContactResponse";
import {AllCountry} from "@/app/models/AllCountries";

const signupEndpoint = 'signup';
const signinEndpoint = 'signin';
const signOutEndpoint = 'sign-out';
const autoSigninEndpoint = 'auto-signin';
const postAdEndpoint = 'post-ad';
const adsEndpoint = 'ads';
const sendVerifyEmail = 'send-verify-email';
const sendVerifyPhone = 'send-verify-phone';
const verifyEmailEndpoint = 'verify-email';
const verifyPhoneEndpoint = 'verify-sms';
const restCountriesAPI = 'https://restcountries.com/v3.1/all?fields=name,tld,cca2,ccn3,cca3,currencies,idd,capital,region,subregion,languages,flags';


// Parse the Signup Token to get the User ID or Role
const parseSignupToken = (token: string, index: number) =>
    token.indexOf('_') > -1 ? token.split('_')[index] : token;


// Sign In API Call
const signInWithCredentials = async ({email, password}: SignIn): Promise<ApiResponse<User | string>> => {
    try {
        const response: AxiosResponse = await fetchWithRetry('/api/external', {
            method: 'POST',
            endpoint: signinEndpoint,
            body: stringifyJSON({email, password}),
            headers: {
                'Cookie': 'signed_type=credentials',
                // 'Custom_Cookie': 'signin_method=credentials',
            },
        });

        // Check if the response status is within the 2xx range (successful)
        if (inRange(response.status, 200, 299)) {
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

// Sign Up API Call
const signUpWithCredentials = async (formData: SignUp): Promise<ApiResponse<SignUpResponse>> => {
    try {
        const {firstname, lastname, phone, email, password, role} = formData;

        const response = await fetchWithRetry('/api/external', {
            method: 'POST',
            endpoint: signupEndpoint,
            headers: {
                'Data-Key': stringifyJSON(['id', 'role']),
            },
            body: stringifyJSON({
                phone,
                email,
                password,
                firstname,
                lastname,
                role,
            }),
        });

        if (inRange(response.status, 200, 299)) {
            // Store the verification code in the local storage
            const data = response.data as SignUpResponse;
            if (data.id) response.headers.set('signup_id', `${data.id}_${role}`);

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

/*const steve = (): ApiResponse<SignUpResponse> => {
    try {
        cacheSignupToken({signupId: '4354657867887876-steve'});

        return {
            data: {id: '4354657867887876-steve'},
            status: 200,
            message: 'Sign-up successful',
        };
    } catch (error: unknown) {
        handleBackendError(error);
        return {
            message: 'An error occurred during sign-in',
            status: 500, // Internal Server Error status in case of a catchable
        }
    }
}*/

// Verify Email code API Call
const verifyUserEmail = async (emailCode: string): Promise<ApiResponse<VerifyContactResponse>> => {
    try {
        const signupToken = getSignupToken() ?? '';
        if (!signupToken) {
            return {status: 401, message: 'Your Sign Up session has expired, please try again.'};
        }

        // Extract the User ID from the Signup-signupToken
        const userId = parseSignupToken(signupToken, 0);

        const response: AxiosResponse = await fetchWithRetry('/api/external', {
            method: 'POST',
            endpoint: verifyEmailEndpoint,
            body: stringifyJSON({
                user_id: userId,
                code: emailCode,
            }),
        });

        if (inRange(response.status, 200, 299)) {
            // Get the User Role from the Signup-signupToken
            const userRole = parseSignupToken(signupToken, 1);
            // Set the contact being verified to 'email'
            cacheIsVerified({contact: 'email'});

            return {
                data: {fieldName: 'email_code', role: userRole},
                status: response.status,
                message: 'Email verification successful',
            };
        }
        // Handle unsuccessful status codes (non-2xx), return error message instead of throwing
        return {
            data: {fieldName: 'email_code', role: ''},
            status: response.status,
            message: 'Email verification failed',
        };

    } catch (error: unknown) {
        handleBackendError(error);
        return {
            status: 500,
            data: {fieldName: 'email_code', role: ''},
            message: 'An error occurred during verification',
        };
    }
};

// Verify Phone/SMS code API Call
const verifyUserPhone = async (smsCode: string): Promise<ApiResponse<VerifyContactResponse>> => {
    try {

        const signupToken = getSignupToken() ?? '';
        if (!signupToken) {
            return {status: 401, message: 'Your Sign Up session has expired, please try again.'};
        }

        // Extract the User ID from the Signup-signupToken
        const userId = parseSignupToken(signupToken, 0);

        const response: AxiosResponse = await fetchWithRetry('/api/external', {
            method: 'POST',
            endpoint: verifyPhoneEndpoint,
            body: stringifyJSON({
                user_id: userId,
                code: smsCode,
            }),
        });

        if (inRange(response.status, 200, 299)) {
            // Get the User Role from the Signup-signupToken
            const userRole = parseSignupToken(signupToken, 1);
            // Set the contact being verified to 'phone'
            cacheIsVerified({contact: 'phone'});

            return {
                data: {fieldName: 'phone_code', role: userRole},
                status: response.status,
                message: 'Phone verification successful',
            };
        }
        // Handle unsuccessful status codes (non-2xx), return error message instead of throwing
        return {
            data: {fieldName: 'phone_code', role: ''},
            status: response.status,
            message: 'Phone verification failed',
        };

    } catch (error: unknown) {
        handleBackendError(error);
        return {
            status: 500,
            data: {fieldName: 'phone_code', role: ''},
            message: 'An error occurred during verification',
        };
    }
};

// Send/Resend Email Verification Code API Call
const sendEmailVerificationCode = async (email: string): Promise<ApiResponse<string>> => {
    try {
        const response: AxiosResponse = await fetchWithRetry('/api/external', {
            method: 'POST',
            endpoint: sendVerifyEmail,
            body: stringifyJSON({email}),
        });

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
const sendPhoneVerificationCode = async (phone: string): Promise<ApiResponse<string>> => {
    try {
        const response: AxiosResponse = await fetchWithRetry('/api/external', {
            method: 'POST',
            endpoint: sendVerifyPhone,
            body: stringifyJSON({phone}),
        });

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
const signOutFromCredentials = async (): Promise<void> => {
    try {
        const response: AxiosResponse = await fetchWithRetry('/api/external', {
            method: 'POST',
            endpoint: signOutEndpoint,
        });

        // Check if the response status is within the 2xx range (successful)
        if (inRange(response.status, 200, 299)) {
            deleteAccessToken();
            deleteProfile();
            deleteSignedInVia();
            deleteSignupToken();

            window.location.href = signinEndpoint;
        }
    } catch (error: unknown) {
        handleBackendError(error);
    }
};

// Auto Login after Auto Logout (Refresh Token) API Call
const autoSignIn = async (): Promise<unknown> => {
    try {
        const response: AxiosResponse = await fetchWithRetry('/api/external', {
            method: 'POST',
            endpoint: autoSigninEndpoint,
        });

        const {access_token, user} = response.data;

        cacheAccessToken(access_token);
        cacheProfile(user);
        deleteSignupToken();

        return response.data;
    } catch (error: unknown) {
        console.error('Error reactivating session:', error);
        window.location.href = signinEndpoint;
    }
};

// Get Profile API Call
const getUserProfile = async ({user_id}: { user_id: string }): Promise<unknown> => {
    try {
        const response: AxiosResponse<Profile> = await fetchWithRetry('/api/external', {
            method: 'GET',
            endpoint: `/user/${user_id}`,
        });

        cacheProfile({profile: response.data});
        return response.data; // Ensure this always returns a Profile
    } catch (error: unknown) {
        handleBackendError(error);
    }
};

// Simulating async fetch of profile from cookies
const getProfileFromCookies = async (): Promise<Profile | null> => {
    return await new Promise<Profile | null>((resolve) =>
        setTimeout(() => resolve(getProfile(null)), 1)
    );
};

// Function to check if user is Verified
const isVerified = async (): Promise<boolean> => (await getProfileFromCookies())?.is_verified ?? false;

// Function to check if user is Seller
const isSeller = async (): Promise<boolean> => (await getProfileFromCookies())?.role === 'seller';

// Function to check if user is Admin
const isAdmin = async (): Promise<boolean> => (await getProfileFromCookies())?.role === 'admin';

// Function to check if user is Buyer
const isBuyer = async (): Promise<boolean> => (await getProfileFromCookies())?.role === 'buyer';

// Function to check if user is SuperAdmin
const isSuperAdmin = async (): Promise<boolean> => (await getProfileFromCookies())?.role === 'super_admin';

// Post Ad API Call
const postAd = async (formData: FormData): Promise<ApiResponse> => {
    try {
        const response = await fetchWithRetry('/api/external', {
            method: 'POST',
            endpoint: postAdEndpoint,
            body: stringifyJSON(formData),
        });

        // Check if the response status is within the 2xx range (successful)
        if (inRange(response.status, 200, 299)) {
            return {
                data: stringifyJSON(response.data),
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

// Function to get all ads
const getAds = async (): Promise<unknown> => {
    try {
        const response: AxiosResponse<Post[]> = await fetchWithRetry('/api/external', {
            method: 'GET',
            endpoint: adsEndpoint,
        });

        return response.data;
    } catch (error: unknown) {
        handleBackendError(error);
    }
};

// Use it in your `allCountries` function
const allCountries = async (): Promise<AllCountry[]> => {
    let countries: AllCountry[] = [];

    try {
        // Fetch with retry logic
        countries = await fetchWithRetry('/api/external', {
            method: 'GET',
            endpoint: restCountriesAPI,
            headers: {
                'Is-Third-Api': '1',
                'Cookie_Name': 'rest_countries',
                'Cache-Control': 'public, s-maxage=604800, stale-while-revalidate=60',
            },
        });

        // cacheAllCountries({countries: countries}); // Cache the fetched data
    } catch (error) {
        console.error(error instanceof Error ? error.message : 'Unknown error');
    }

    return countries;
};


export {
    allCountries,
    postAd,
    signUpWithCredentials,
    signInWithCredentials,
    verifyUserEmail,
    verifyUserPhone,
    sendEmailVerificationCode,
    sendPhoneVerificationCode,
    signOutFromCredentials,
    autoSignIn,
    getUserProfile,
    getProfileFromCookies,
    isVerified,
    isSeller,
    isAdmin,
    isBuyer,
    isSuperAdmin,
    getAds,
}
