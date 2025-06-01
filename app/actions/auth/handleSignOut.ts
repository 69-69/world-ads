'use server';

import authOptions from "@/auth";
import {createApiClient} from "@/app/api/createApiClient";
import {HOME_ROUTE, SIGNIN_ROUTE} from "@/app/util/constants";
import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import {deleteCookie} from "@/app/util/serverUtils";
import {generateRandomHash, errorUtils} from "@/app/util/clientUtils";

// Clear all relevant auth cookies and redirect
const clearCookiesAndRedirect = async () => {

    await deleteCookie({});
    await deleteCookie({name: '__Secure-authjs.session-token'});
    // Clear cache for relevant routes
    revalidatePath(HOME_ROUTE);
    revalidatePath(SIGNIN_ROUTE);

    const randomChar = `${new Date().getTime()}#${generateRandomHash()}`;
    // Redirect to sign In with logout indicator
    redirect(`${SIGNIN_ROUTE}?logout=true&auth=${randomChar}`);
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

        const signOutEndpoint = 'auth/sign-out';
        // Handle credential-based sign-out via backend API
        const apiClient = await createApiClient();
        await apiClient.request({
                method: 'POST',
                url: `/${signOutEndpoint}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session.user.access_token}`,
                },
            }
        );

        return await clearCookiesAndRedirect();
    } catch (error) {
        const errorMessage = errorUtils.getError(error);
        console.error("Error during sign-out:", errorMessage);
        // Optionally, redirect or notify the user even on failure
        await clearCookiesAndRedirect(); // fallback cleanup
    }
};
