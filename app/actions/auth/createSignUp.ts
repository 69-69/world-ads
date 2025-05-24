import {SignUp, SignUpForm, SignUpResponse} from "@/app/models/SignUp";
import {errorUtils} from "@/app/util/serverUtils";
import fetchWithRetry from "@/app/actions/fetchWithRetry";
import {signupHandler} from "@/app/util/endPoints";
import {inRange} from "@/app/util/clientUtils";

export const createSignUp = async (formData: SignUpForm) => {

    try {
        const sign_up = new SignUp(formData);
        const body = JSON.stringify(sign_up);
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
        const errorMessage = errorUtils.getError(error);
        // Handle errors (e.g., network issues)
        return {
            message: errorMessage,
            status: 500, // Internal Server Error status in case of a catchable exception
        };
    }
};


