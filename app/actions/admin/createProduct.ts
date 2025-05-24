'use server';
import {FormDataModel, to_FormData} from "@/app/models/FormDataModel";
import {inRange} from "@/app/util/clientUtils";
import fetchWithRetry from "@/app/actions/fetchWithRetry";
import {marketplaceHandler} from "@/app/util/endPoints";
import {errorUtils} from "@/app/util/serverUtils";
import authOptions from "@/auth";
import {NextResponse} from "next/server";
import {HOME_ROUTE, SIGNIN_ROUTE} from "@/app/util/constants";
import {redirect} from "next/navigation";

const createProduct = async (form: FormDataModel) => {
    const session = await authOptions.auth();
    if (!session) {
        redirect(SIGNIN_ROUTE);
        return NextResponse.json({error: 'Unauthorized. Please sign in.'}, {status: 401});
    }

    try {
        const body = to_FormData(form);
        body.append('user_id', session.user.id); // Append user id to the form data

        const {response, data} = await fetchWithRetry(HOME_ROUTE + marketplaceHandler, {
            method: 'POST',
            body,
            headers: {Authorization: `Bearer ${session?.user.access_token}`}
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
        const err = errorUtils.getError(error);
        return {message: err, status: 500}
    }
}
export default createProduct;