'use server';

import authOptions from "@/auth";
import {getApiClientWithAuth} from "@/app/api/external/apiClient";
import {signOutEndpoint} from "@/app/api/external/endPoints";
import {cookies} from "next/headers";
import {APP_COOKIE_KEYS, HOME_ROUTE, SIGNIN_ROUTE} from "@/app/actions/useConstants";
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Clear all relevant auth cookies and redirect
const clearCookiesAndRedirect = async () => {
    const cookieStore = await cookies();

    for (const key of APP_COOKIE_KEYS) {
        cookieStore.delete(key);
    }

    // Clear cache for relevant routes
    revalidatePath(HOME_ROUTE);
    revalidatePath(SIGNIN_ROUTE);

    // Redirect to sign In with logout indicator
    redirect(`${SIGNIN_ROUTE}?logout=true`);
};

export const signOut = async (): Promise<void> => {
    try {
        const session = await authOptions.auth();

        if (!session || !session.user) {
            return await clearCookiesAndRedirect();
        }

        const {signin_method} = session.user;

        if (signin_method !== 'credentials') {
            await authOptions.signOut({redirectTo: SIGNIN_ROUTE});
            return;
        }

        // Handle credential-based sign-out via backend API
        const apiClient = await getApiClientWithAuth();
        await apiClient.request({method: 'POST', url: `/${signOutEndpoint}`});

        return await clearCookiesAndRedirect();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        // console.error("Error during sign-out:", error);
        // Optionally, redirect or notify the user even on failure
        await clearCookiesAndRedirect(); // fallback cleanup
    }
};
