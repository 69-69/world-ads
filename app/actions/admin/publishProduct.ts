'use server';
import fetchWithRetry from "@/app/actions/fetchWithRetry";
import {marketplaceHandler} from "@/app/util/endPoints";
import {handleApiError} from "@/app/util/serverUtils";
import authOptions from "@/auth";
import {HOME_ROUTE} from "@/app/util/constants";
import {signOut} from "@/app/actions/auth/handleSignOut";

const publishProduct = async (hashed_id: string) => {
    const session = await authOptions.auth();
    if (!session) {
        await signOut();
        console.log('Unauthorized. Please sign in.', 401);
    }

    try {
        await fetchWithRetry(HOME_ROUTE + marketplaceHandler, {
            method: 'PUT',
            endpoint: `/publish/${hashed_id}`,
        });

    } catch (error: unknown) {
        handleApiError(error);
        return {message: 'An error occurred during publishing', status: 500}
    }
}
export default publishProduct;