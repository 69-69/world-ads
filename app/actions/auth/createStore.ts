import {handleApiError, getSignupToken} from "@/app/util/serverUtils";
import {setupStoreHandler} from "@/app/util/endPoints";
import {getParts, isSuccessCode} from "@/app/util/clientUtils";
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
        handleApiError(error);
        const errorMessage = error instanceof Error ? error.message : 'An error occurred during sign-in';
        return { message: errorMessage, status: 500 }; // Internal Server Error status
    }
};

/*// Example in a Next.js component
const fetchData = async () => {
  try {
    const response = await fetch('/api/setup-store', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: 'store setup' }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('API Data:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// You can call fetchData() on some user action, like a button click, or in a useEffect.
*/


