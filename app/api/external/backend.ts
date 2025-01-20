import {AxiosResponse} from 'axios';
import fetchWithRetry from "./fetchWithRetry";
import {ApiResponse, Profile, SignUp} from '@/app/models';
import {Post} from "@/app/models/Post";
import {getSignupToken} from "@/app/hooks/useCookies";
import {SignUpResponse} from "@/app/models/SignUp";
import {handleApiError} from "@/app/hooks/useThrowError";
import {inRange} from "@/app/hooks/useValidation";
import {VerifyContactResponse} from "@/app/models/VerifyContactResponse";
import {AllCountries} from "@/app/models/AllCountries";
import {
    apiHandler,
    adsEndpoint,
    postAdEndpoint,
    restCountriesAPI,
    sendVerifyEmail,
    sendVerifyPhone,
    verifyEmailEndpoint,
    verifyPhoneEndpoint, signupHandler, verifyHandler
} from "@/app/api/external/endPoints";

// Parse the Signup Token to get the User ID or Role
const parseSignupToken = (token: string, index: number) =>
    token.indexOf('_') > -1 ? token.split('_')[index] : token;

// Sign Up API Call
const signUpWithCredentials = async (formData: SignUp): Promise<ApiResponse<SignUpResponse>> => {
    try {
        const body = JSON.stringify(formData);
        const response = await fetchWithRetry(signupHandler, {
            method: 'POST',
            body,
        });

        const data = await response.json();

        if (inRange(response.status, 200, 299)) {
            return {data: (data as SignUpResponse), status: response.status, message: 'Sign-up successful'};
            // if (data.signupToken) data.headers.set('signup_id', `${data.signupToken}`);
        } else {
            return {message: 'backend-Sign-up failed', status: response.status};
        }
    } catch (error: unknown) {
        handleApiError(error);
        // Handle errors (e.g., network issues)
        const errorMessage = error instanceof Error ? error.message : 'An error occurred during sign-in';
        return {
            message: errorMessage,
            status: 500, // Internal Server Error status in case of a catchable exception
        };
    }
};

// Verify Email code API Call
const verifyUserEmail = async (emailCode: string): Promise<ApiResponse<VerifyContactResponse>> => {
    try {
        const signupToken = await getSignupToken() ?? '';
        if (!signupToken) {
            return {status: 401, message: 'Sign Up session has expired, please try Forgot Password.'};
        }

        // Extract the User ID from the Signup-signupToken
        const user_id = parseSignupToken(signupToken, 0);


        console.log('Steve-V-Response:', user_id);
        const response = await fetchWithRetry(verifyHandler, {
            method: 'POST',
            endpoint: `${verifyEmailEndpoint}&verify=email`,
            body: JSON.stringify({user_id, code: emailCode}),
        });

        if (inRange(response.status, 200, 299)) {
            console.log('success...')
            // Get the User Role from the Signup-signupToken
            const userRole = parseSignupToken(signupToken, 1);

            return {
                data: {fieldName: 'email_code', role: userRole},
                status: response.status,
                message: 'Email verification successful',
            };
        }

        return {
            data: {fieldName: 'email_code', role: ''},
            status: response.status,
            message: 'Email verification failed',
        };

    } catch (error: unknown) {
        handleApiError(error);
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

        const signupToken = await getSignupToken() ?? '';
        if (!signupToken) {
            return {status: 401, message: 'Your Sign Up session has expired, please try again.'};
        }

        // Extract the User ID from the Signup-signupToken
        const user_id = parseSignupToken(signupToken, 0);

        const response: AxiosResponse = await fetchWithRetry(apiHandler, {
            method: 'POST',
            endpoint: `${verifyPhoneEndpoint}verify=phone`,
            body: JSON.stringify({user_id, code: smsCode}),
        });

        if (inRange(response.status, 200, 299)) {
            // Get the User Role from the Signup-signupToken
            const userRole = parseSignupToken(signupToken, 1);

            return {
                data: {fieldName: 'phone_code', role: userRole},
                status: response.status,
                message: 'Phone verification successful',
            };
        }

        return {
            data: {fieldName: 'phone_code', role: ''},
            status: response.status,
            message: 'Phone verification failed',
        };

    } catch (error: unknown) {
        handleApiError(error);
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
        const response: AxiosResponse = await fetchWithRetry(apiHandler, {
            method: 'POST',
            endpoint: sendVerifyEmail,
            body: JSON.stringify({email}),
        });

        // Check if the response status is within the 2xx range (successful)
        if (inRange(response.status, 200, 299)) {
            return {
                data: JSON.stringify(response.data) ?? '',
                status: response.status,
                message: 'Email verification code sent successfully',
            };
        }

        return {message: 'Email verification code resend failed', status: response.status};
    } catch (error: unknown) {
        handleApiError(error);
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
        const response: AxiosResponse = await fetchWithRetry(apiHandler, {
            method: 'POST',
            endpoint: sendVerifyPhone,
            body: JSON.stringify({phone}),
        });

        // Check if the response status is within the 2xx range (successful)
        if (inRange(response.status, 200, 299)) {
            return {
                data: JSON.stringify(response.data) ?? '',
                status: response.status,
                message: 'Phone verification code sent successfully',
            };
        }

        return {message: 'Phone verification code resend failed', status: response.status};
    } catch (error: unknown) {
        handleApiError(error);
        // Handle errors (e.g., network issues)
        const errorMessage = error instanceof Error ? error.message : 'An error occurred during phone verification code resend';
        return {
            message: errorMessage,
            status: 500, // Internal Server Error status in case of a catchable exception
        };
    }
};

// Get Profile API Call
const getUserProfile = async ({user_id}: { user_id: string }): Promise<unknown> => {
    try {
        const response: AxiosResponse<Profile> = await fetchWithRetry(apiHandler, {
            method: 'GET',
            endpoint: `/user/${user_id}`,
        });

        // cacheProfile({profile: response.data});
        return response.data; // Ensure this always returns a Profile
    } catch (error: unknown) {
        handleApiError(error);
    }
};

// Post Ad API Call
const postAd = async (formData: FormData): Promise<ApiResponse> => {
    try {
        const response = await fetchWithRetry(apiHandler, {
            method: 'POST',
            endpoint: postAdEndpoint,
            body: JSON.stringify(formData),
        });

        // Check if the response status is within the 2xx range (successful)
        if (inRange(response.status, 200, 299)) {
            return {
                data: JSON.stringify(response.data),
                status: response.status,
                message: 'Post successful',
            };
        }

        return {message: 'Sign-in failed', status: response.status};
    } catch (error: unknown) {
        handleApiError(error);
        return {
            message: 'An error occurred during sign-in',
            status: 500, // Internal Server Error status in case of a catchable exception
        }
    }
};

// Function to get all ads
const getAds = async (): Promise<unknown> => {
    try {
        const response: AxiosResponse<Post[]> = await fetchWithRetry(apiHandler, {
            method: 'GET',
            endpoint: adsEndpoint,
        });

        return response.data;
    } catch (error: unknown) {
        handleApiError(error);
    }
};

// Use it in your `allCountries` function
const getCountries = async (): Promise<AllCountries[]> => {
    let countries: AllCountries[] = [];

    try {
        // Fetch with retry logic
        countries = await fetchWithRetry(apiHandler, {
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
    postAd,
    signUpWithCredentials,
    verifyUserEmail,
    verifyUserPhone,
    sendEmailVerificationCode,
    sendPhoneVerificationCode,
    getUserProfile,
    getAds,
    getCountries,
};


/*  Sign In API Call
const signInWithCredentials = async ({email, password}: SignIn): Promise<ApiResponse<User | string>> => {
    try {
        // Make the API call with the retry logic
        const response = await fetchWithRetry(apiHandler, {
            method: 'POST',
            endpoint: signinEndpoint,
            body: JSON.stringify({email, password}), // You can use JSON.stringify directly
            headers: {'Content-Type': 'application/json'}, // Make sure headers are correct
        });

        console.log('Steve-Response:', response.toString());

        if (inRange(response.status, 200, 299)) {
            return {data: response.data as User, status: response.status, message: 'Sign-in successful'};
        }

        return {data: 'Sign-in failed', status: response.status};
    } catch (error: unknown) {
        /!*{
            "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczNzA1ODMzOSwianRpIjoiNGMwODJhOWUtN2IzOC00ZDJmLTk1ZmItYzdkZjM4Mzg2MDYzIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjIxNGJhMzZjMWQ3ODhiZDg3YTQ2MWE3MDY4MzUwMDhhYjdmZTM1OTdmOTlmOTgyMTk5N2FjNzJiOTMyY2Y4OTEiLCJuYmYiOjE3MzcwNTgzMzksImNzcmYiOiI3OWNkYWU4NS03ODIyLTQ3YTEtYWI4Yi1lYmE4ZGU5NDc0YmYiLCJleHAiOjE3MzcwNjE5MzksInJvbGUiOiJ1c2VyIn0.tHkKYjtSQGp_aJVvZJQPRtb8J4i-oN9xTbjb8voYMUM",
            "email": "admin@gmail.com",
            "firstname": "admin",
            "id": "214ba36c1d788bd87a461a706835008ab7fe3597f99f9821997ac72b932cf891",
            "image": null,
            "is_verified": true,
            "lastname": "danny",
            "phone": "9873672378",
            "role": "user",
            "username": "admin_danny-8f03a7"
        }*!/
        const errorMessage = error instanceof Error ? error.message : 'An error occurred during sign-in';
        return {data: errorMessage, status: 500};
    }
};*/

