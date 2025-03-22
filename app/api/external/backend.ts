import {AxiosResponse} from 'axios';
import fetchWithRetry from "./fetchWithRetry";
import {ApiResponse, Profile, SignUp} from '@/app/models';
import {Post} from "@/app/models/Post";
import {getSignupToken} from "@/app/hooks/useCookies";
import {SignUpResponse} from "@/app/models/SignUp";
import {handleApiError} from "@/app/hooks/useThrowError";
import {getParts, inRange} from "@/app/hooks/useValidation";
import {VerifyContactResponse} from "@/app/models/VerifyContactResponse";
import {AllCountries} from "@/app/models/AllCountries";
import {
    adsEndpoint,
    apiHandler,
    restCountriesAPI,
    sendVerifyEmail,
    sendVerifyPhone,
    signupHandler,
    verifyEmailEndpoint,
    verifyHandler,
    verifyPhoneEndpoint
} from "@/app/api/external/endPoints";


// Sign Up API Call
const signUpWithCredentials = async (formData: SignUp): Promise<ApiResponse<SignUpResponse>> => {
    try {
        const body = JSON.stringify(formData);
        console.log('Steve-SignUp-Data:', body);
        const {response, data} = await fetchWithRetry(signupHandler, {
            method: 'POST',
            body,
        });

        if (inRange(response.status, 200, 299)) {
            const successData: SignUpResponse = {
                signupToken: data.signup_token,
                accessToken: data.access_token,
                message: data.message,
                email: data.email,
                sms: data.sms,
            };

            return {data: successData, status: response.status, message: 'Sign-up successful'};
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
const verifyUserEmail = async (email_code: string): Promise<ApiResponse<VerifyContactResponse>> => {
    try {
        const signupToken = await getSignupToken() ?? '';

        if (!signupToken) {
            return {status: 401, message: 'Sign Up session has expired, please try Forgot Password.'};
        }

        // Extract the User ID from the Signup-signupToken
        const user_id = getParts(signupToken, 0);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {response, data} = await fetchWithRetry(verifyHandler, {
            method: 'POST',
            endpoint: `${verifyEmailEndpoint}&verify=email`,
            body: JSON.stringify({user_id, email_code}),
        });

        if (inRange(response.status, 200, 299)) {
            // Get the User Role from the Signup-signupToken
            const userRole = getParts(signupToken, 1);

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
const verifyUserPhone = async (sms_code: string): Promise<ApiResponse<VerifyContactResponse>> => {
    try {
        const signupToken = await getSignupToken() ?? '';
        if (!signupToken) {
            return {status: 401, message: 'Your Sign Up session has expired, please try again.'};
        }

        // Extract the User ID from the Signup-signupToken
        const user_id = getParts(signupToken, 0);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {response, data} = await fetchWithRetry(apiHandler, {
            method: 'POST',
            endpoint: `${verifyPhoneEndpoint}verify=phone`,
            body: JSON.stringify({user_id, sms_code}),
        });

        if (inRange(response.status, 200, 299)) {
            // Get the User Role from the Signup-signupToken
            const userRole = getParts(signupToken, 1);

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
        const {response, data} = await fetchWithRetry(apiHandler, {
            method: 'POST',
            endpoint: sendVerifyEmail,
            body: JSON.stringify({email}),
        });

        console.log('Steve-Response:', response, data);

        // Check if the response status is within the 2xx range (successful)
        if (inRange(response.status, 200, 299)) {
            return {
                data: JSON.stringify(data) ?? '',
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
        const {response, data} = await fetchWithRetry(apiHandler, {
            method: 'POST',
            endpoint: sendVerifyPhone,
            body: JSON.stringify({phone}),
        });

        // Check if the response status is within the 2xx range (successful)
        if (inRange(response.status, 200, 299)) {
            return {
                data: JSON.stringify(data) ?? '',
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
        const {response, data} = await fetchWithRetry(apiHandler, {
            method: 'GET',
            endpoint: `/user/${user_id}`,
        });

        // cacheProfile({profile: response.data});
        if (inRange(response.status, 200, 299)) {
            return data as Profile;
        }
    } catch (error: unknown) {
        handleApiError(error);
    }
};

// Function to get all ads
const getAds = async (): Promise<unknown> => {
    try {
        const {response, data} = await fetchWithRetry(apiHandler, {
            method: 'GET',
            endpoint: adsEndpoint,
        });

        if (inRange(response.status, 200, 299)) {
            return data as AxiosResponse<Post[]>;
        }
    } catch (error: unknown) {
        handleApiError(error);
    }
};

// Use it in your `allCountries` function
const getCountries = async (): Promise<AllCountries[]> => {
    let countries: AllCountries[] = [];

    try {
        // Fetch with retry logic
        const {response, data} = await fetchWithRetry(apiHandler, {
            method: 'GET',
            endpoint: restCountriesAPI,
            headers: {
                'Is-Third-Api': '1',
                'Cookie_Name': 'rest_countries',
                'Cache-Control': 'public, s-maxage=604800, stale-while-revalidate=60',
            },
        });

        if (inRange(response.status, 200, 299)) {
            countries = data as AllCountries[];
        }

        // cacheAllCountries({countries: countries}); // Cache the fetched data
    } catch (error) {
        console.error(error instanceof Error ? error.message : 'Unknown error');
    }

    return countries;
};


export {
    signUpWithCredentials,
    verifyUserEmail,
    verifyUserPhone,
    sendEmailVerificationCode,
    sendPhoneVerificationCode,
    getUserProfile,
    getAds,
    getCountries,
};


