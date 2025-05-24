import {ApiResponse} from "@/app/models";
import {errorUtils} from "@/app/util/serverUtils";
import {getSignupToken} from "@/app/actions/useCookies";
import {getParts, inRange} from "@/app/util/clientUtils";
import fetchWithRetry from "@/app/actions/fetchWithRetry";
import {VerifyContactResponse} from "@/app/models/VerifyContactResponse";
import {verifyHandler} from "@/app/util/endPoints";

// Verify Email code API Call
const verifyUserEmail = async (email_code: string): Promise<ApiResponse<VerifyContactResponse>> => {
    try {
        const signupToken = await getSignupToken() ?? '';

        if (!signupToken) {
            return {status: 401, message: 'Sign Up session has expired, please try Forgot Password.'};
        }

        // Extract the User ID from  the Signup-signupToken
        const user_id = getParts(signupToken, 0);
        const verifyEmailEndpoint = 'auth/verify-email';

        const {response} = await fetchWithRetry(verifyHandler, {
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
        const errorMessage = errorUtils.getError(error);
        return {
            status: 500,
            data: {fieldName: 'email_code', role: ''},
            message: errorMessage,
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
        const verifyPhoneEndpoint = 'auth/verify-sms';

        const {response} = await fetchWithRetry(verifyHandler, {
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
        const errorMessage = errorUtils.getError(error);
        return {
            status: 500,
            data: {fieldName: 'phone_code', role: ''},
            message: errorMessage,
        };
    }
};

export const useVerifyContact = async (formData: FormData) => {

    // Validate form data
    if (!formData.has('email_code') || !formData.has('phone_code')) {
        throw new Error(`Enter the verification codes for both email and phone.`);
    }

    // Extract and cast verification codes safely
    const emailCode = formData.get('email_code') as string | '';
    const smsCode = formData.get('phone_code') as string | '';

    // Call verifyContact function
    return emailCode.length > 0 ?
        await verifyUserEmail(emailCode)
        : await verifyUserPhone(smsCode);
};