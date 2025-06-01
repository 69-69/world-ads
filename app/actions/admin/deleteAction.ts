// app/actions/deleteProduct.ts
'use server';

import fetchWithRetry from "@/app/actions/fetchWithRetry";
import {HOME_ROUTE} from "@/app/util/constants";
import authOptions from "@/auth";
import {signOut} from "@/app/actions/auth/handleSignOut";

export const deleteAction = async (param: { route: string; id: string }) => {
    const session = await authOptions.auth();
    if (!session) {
        await signOut();
        console.log('Unauthorized. Please sign in.', 401);
    }

    try {
        await fetchWithRetry(HOME_ROUTE + param.route, {
            method: 'DELETE',
            endpoint: `/${param.id}`,
        });
        return {success: true};
    } catch (error) {
        console.error(`Failed to delete: ${param.id}`, error);
        return {success: false, error: 'Deletion failed'};
    }
};
