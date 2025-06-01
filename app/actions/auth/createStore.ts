import {getSignupToken} from "@/app/util/serverUtils";
import {setupStoreHandler} from "@/app/util/endPoints";
import {errorUtils, getParts, isSuccessCode} from "@/app/util/clientUtils";
import fetchWithRetry from "@/app/actions/fetchWithRetry";
import {FormDataModel, to_FormData} from "@/app/models/FormDataModel";

// Setup Store API handler
export const createStore = async (form: FormDataModel) => {
    try {
        const signupToken = await getSignupToken() ?? '';
        if (!signupToken) {
            return { status: 401, message: 'Your Sign Up session has expired, please try again.' };
        }

        // Convert the form data to FormData format
        const body = to_FormData(form);
        body.append('user_id', getParts(signupToken, 0));

        const { response, data } = await fetchWithRetry(setupStoreHandler, {
            method: 'POST',
            body,
        });

        if (isSuccessCode(response.status)) {
            return { status: response.status, message: data.message };
        } else {
            return { message: data.message || 'Check your entering', status: response.status };
        }
    } catch (error: unknown) {
        const errorMessage = errorUtils.getError(error);
        return { message: errorMessage, status: 500 }; // Internal Server Error status
    }
};



