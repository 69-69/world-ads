'use server';
import {signIn, signOut, signOutServer} from "@/auth";
import {getSignedInVia} from "@/app/hooks/useCache";
import {handleFrontendError} from "@/app/hooks/useThrowError";

// Google Sign-In function
const googleSignIn = async () => {
    try {
        const response = await signIn("google");
        console.log('Google Sign-In response:', response);
        return response;
    } catch (error) {
        handleFrontendError(error, 'Google Sign-In');
    }
}

// GitHub Sign-In function
const githubSignIn = async () => {
    try {
        const response = await signIn("github");
        console.log('GitHub Sign-In response:', response);
        return response;
    } catch (error) {
        handleFrontendError(error, 'GitHub Sign-In');
    }
}

// Social (Google & GitHub) Sign-Out function
const socialSignOut = async () => {
    try {
        const response = await signOut();
        console.log('Social Sign-Out response:', response);
        return response;
    } catch (error) {
        handleFrontendError(error, 'Social Sign-Out');
    }
}

// Backend Account (credentials) Sign-Out function
const accountSignOut = async () => {
    try {
        const response = await signOutServer();
        console.log("Account Sign-Out response:", response);
        return response;
    } catch (error) {
        handleFrontendError(error, 'Account Sign-Out');
    }
}

// Determine and execute the appropriate sign-out action
const userSignOut = async () => {
    const signInMethod = getSignedInVia(); // Retrieve the sign-in method (credentials or social)

    // Handle sign-out based on the sign-in method
    if (signInMethod === 'credentials') {
        return accountSignOut();  // If signed in via credentials, call account sign-out
    }

    // Default to Social (Google & GitHub) sign-out if no specific sign-in method is identified
    return socialSignOut();
}

export {googleSignIn, githubSignIn, userSignOut};
