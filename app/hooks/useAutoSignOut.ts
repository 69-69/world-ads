'use server'

// import { cookies } from 'next/headers';

import {handleSignOut} from "@/auth";

export async function handleAutoSignOut() {
    try {
        // sign out using the Backend-API
        await handleSignOut();
    }catch (e) {
        console.error('Error signing out', e);
    }
    // const cookieStore = await cookies();
    //
    // cookieStore.delete('authjs.session-token');
    // cookieStore.delete('access_token');
    // cookieStore.delete('profile');
    // cookieStore.delete('signin_method');
    // cookieStore.delete('signup_token');
}
