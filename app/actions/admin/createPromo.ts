'use server';
import {FormDataModel, to_FormData} from "@/app/models/FormDataModel";
import {inRange} from "@/app/actions/useHelper";
import fetchWithRetry from "@/app/api/external/fetchWithRetry";
import {promoHandler} from "@/app/api/external/endPoints";
import {handleApiError} from "@/app/actions/useThrowError";
import {NextResponse} from "next/server";
import authOptions from "@/auth";
import {HOME_ROUTE, SIGNIN_ROUTE} from "@/app/actions/useConstants";
import {redirect} from "next/navigation";

const createPromo = async (form: FormDataModel, productId: string) => {
    const session = await authOptions.auth();
    if (!session) {
        redirect(SIGNIN_ROUTE);
        return NextResponse.json({error: 'Unauthorized. Please sign in.'}, {status: 401});
    }

    try {
        console.log('form start_at', form['start_at'], 'end_at', form['end_at']);
        const body = to_FormData(form);
        body.append('post_id', productId); // Append , product id to the form data

        const {response, data} = await fetchWithRetry(HOME_ROUTE + promoHandler, {
            method: 'POST',
            body,
            headers: {Authorization: `Bearer ${session?.user.access_token}`}
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
export default createPromo;