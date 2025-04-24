'use server';
import fetchWithRetry from "@/app/api/external/fetchWithRetry";
import {marketplaceHandler} from "@/app/api/external/endPoints";
import {handleApiError} from "@/app/actions/useThrowError";
import authOptions from "@/auth";
import {NextResponse} from "next/server";
import {HOME_ROUTE, SIGNIN_ROUTE} from "@/app/actions/useConstants";
import {redirect} from "next/navigation";

const publishProduct = async (hashed_id: string) => {
    const session = await authOptions.auth();
    if (!session) {
        redirect(SIGNIN_ROUTE);
        return NextResponse.json({error: 'Unauthorized. Please sign in.'}, {status: 401});
    }

    try {
        await fetchWithRetry(HOME_ROUTE + marketplaceHandler, {
            method: 'PUT',
            body: JSON.stringify({}),
            endpoint: `/publish/${hashed_id}`,
            headers: {Authorization: `Bearer ${session?.user.access_token}`}
        });

    } catch (error: unknown) {
        handleApiError(error);
        return {message: 'An error occurred during publishing', status: 500}
    }
}
export default publishProduct;