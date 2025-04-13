import {FormDataModel, to_FormData} from "@/app/models/FormDataModel";
import {inRange} from "@/app/hooks/useHelper";
import fetchWithRetry from "@/app/api/external/fetchWithRetry";
import {promoHandler} from "@/app/api/external/endPoints";
import {handleApiError} from "@/app/hooks/useThrowError";

const usePostPromo = async (form: FormDataModel, productId: string) => {
    try {
        const body = to_FormData(form);
        body.append('post_id', productId); // Append , product id to the form data

        const {response, data} = await fetchWithRetry(promoHandler, {
            method: 'POST',
            body,
        });

        // Check if the response status is within the 2xx range (successful)
        if (inRange(response.status, 200, 299)) {
            return {
                data: JSON.stringify(data),
                status: response.status,
                message: 'Promo submitted successful',
            };
        }

        return {message: 'Promo was not successful', status: response.status};
    } catch (error: unknown) {
        handleApiError(error);
        return {message: 'An error occurred during sign-in', status: 500}
    }
}
export default usePostPromo;