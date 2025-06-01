'use server';
import {FormDataModel, to_FormData} from "@/app/models/FormDataModel";
import {handleError, isSuccessCode} from "@/app/util/clientUtils";
import fetchWithRetry from "@/app/actions/fetchWithRetry";
import {promoHandler} from "@/app/util/endPoints";
import authOptions from "@/auth";
import {HOME_ROUTE} from "@/app/util/constants";
import {signOut} from "@/app/actions/auth/handleSignOut";

const createPromo = async (form: FormDataModel, productId: string) => {
    const session = await authOptions.auth();
    if (!session) {
        await signOut();
        console.log('Unauthorized. Please sign in.', 401);
    }

    try {
        // console.log('form start_at', form['start_at'], 'end_at', form['end_at']);
        const body = to_FormData(form);
        body.append('post_id', productId); // Append , product id to the form data

        const {response, data} = await fetchWithRetry(HOME_ROUTE + promoHandler, {
            method: 'POST',
            body,
        });

        // Check if the response status is within the 2xx range (successful)
        if (isSuccessCode(response.status)) {
            return {
                data: JSON.stringify(data),
                status: response.status,
                message: 'Promo submitted successful',
            };
        }

        return {message: 'Promo was not successful', status: response.status};
    } catch (error: unknown) {
        handleError(error);
        return {message: 'An error occurred during sign-in', status: 500}
    }
}
export default createPromo;