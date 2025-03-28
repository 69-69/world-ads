import {FormDataModel, to_FormData} from "@/app/models/FormDataModel";
import {inRange} from "@/app/hooks/useHelper";
import fetchWithRetry from "@/app/api/external/fetchWithRetry";
import {marketplaceHandler} from "@/app/api/external/endPoints";
import {handleApiError} from "@/app/hooks/useThrowError";

const usePostAd = async (form: FormDataModel) => {
    try {
        const body = to_FormData(form);

        const {response, data} = await fetchWithRetry(marketplaceHandler, {
            method: 'POST',
            body,
        });

        // Check if the response status is within the 2xx range (successful)
        if (inRange(response.status, 200, 299)) {
            return {
                data: JSON.stringify(data),
                status: response.status,
                message: 'Post submitted successful',
            };
        }

        return {message: 'Post was not successful', status: response.status};
    } catch (error: unknown) {
        handleApiError(error);
        return {message: 'An error occurred during sign-in', status: 500}
    }
}
export default usePostAd;