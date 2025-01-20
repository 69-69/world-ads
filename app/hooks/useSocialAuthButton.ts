'use server';
import {authOptions, accountSignOut} from "@/auth";
import {handleUIError} from "@/app/hooks/useThrowError";
import {getSigninMethod} from "@/app/hooks/useCookies";

// Google Sign-In function
const googleSignIn = async () => {
    try {
        const response = await authOptions.signIn("google");
        console.log('Google Sign-In response:', response);
        return response;
    } catch (error) {
        handleUIError(error, 'Google Sign-In');
    }
}

// GitHub Sign-In function
const githubSignIn = async () => {
    try {
        const response = await authOptions.signIn("github");
        console.log('GitHub Sign-In response:', response);
        return response;
    } catch (error) {
        handleUIError(error, 'GitHub Sign-In');
    }
}

// Determine and execute the appropriate sign-out action
const userSignOut = async () => {
    try {
        const signinMethod = await getSigninMethod(); // Retrieve the sign-in method (credentials or social)

        console.log('Sign-In Method:', signinMethod);

        // Handle sign-out based on the sign-in method
        if (signinMethod === 'credentials') {
            return await accountSignOut();  // If signed in via credentials, call account sign-out
        }

        // Default to Social (Google & GitHub) sign-out if no specific sign-in method is identified
        return await authOptions.signOut();
    } catch (error) {
        handleUIError(error, 'Sign-Out');
    }
}

export {googleSignIn, githubSignIn, userSignOut};
