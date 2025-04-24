// app/actions/deleteProduct.ts
'use server';

import fetchWithRetry from "@/app/api/external/fetchWithRetry";
import {HOME_ROUTE, SIGNIN_ROUTE} from "@/app/actions/useConstants";
import authOptions from "@/auth";
import {redirect} from "next/navigation";

export const deleteAction = async (param: { route: string; id: string }) => {
    const session = await authOptions.auth();
    if (!session) {
        redirect(SIGNIN_ROUTE);
        return {success: false, error: 'Unauthorized. Please login'};
    }

    try {
        await fetchWithRetry(HOME_ROUTE + param.route, {
            method: 'DELETE',
            endpoint: `/${param.id}`,
            headers: {Authorization: `Bearer ${session?.user.access_token}`}
        });
        return {success: true};
    } catch (error) {
        console.error(`Failed to delete: ${param.id}`, error);
        return {success: false, error: 'Deletion failed'};
    }
};
