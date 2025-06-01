'use server';
import {FormDataModel, to_FormData} from "@/app/models/FormDataModel";
import {isSuccessCode, errorUtils} from "@/app/util/clientUtils";
import fetchWithRetry from "@/app/actions/fetchWithRetry";
import {marketplaceHandler} from "@/app/util/endPoints";
import authOptions from "@/auth";
import {HOME_ROUTE} from "@/app/util/constants";
import {signOut} from "@/app/actions/auth/handleSignOut";

const createProduct = async (form: FormDataModel) => {
    const session = await authOptions.auth();
    if (!session) {
        await signOut();
        return {message: 'Unauthorized. Please sign in.', status: 401};
    }

    try {
        const body = to_FormData(form);
        body.append('user_id', session.user.id); // Append user id to the form data

        const {response, data} = await fetchWithRetry(HOME_ROUTE + marketplaceHandler, {
            method: 'POST',
            body,
        });

        // Check if the response status is within the 2xx range (successful)
        if (isSuccessCode(response.status)) {
            return {
                data: JSON.stringify(data),
                status: response.status,
                message: 'Post submitted successful',
            };
        }

        return {message: 'Post was not successful', status: response.status};
    } catch (error: unknown) {
        const err = errorUtils.getError(error);
        return {message: err, status: 500}
    }
}
export default createProduct;