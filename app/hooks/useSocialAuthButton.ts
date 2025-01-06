'use server';
import {signIn, signOut, signOutServer} from "@/auth";
import {getSignedInVia} from "@/app/hooks/useStorageUtils";
import {handleFrontendError} from "@/app/hooks/useThrowError";

// Google Sign-In function
const googleSignIn = async () => {
    try {
        const response = await signIn("google");
        console.log('Google Sign-In response:', response); // Optional: remove in production
        return response;
    } catch (error) {
        handleFrontendError(error, 'Google Sign-In');
    }
}

// Google Sign-Out function
const googleSignOut = async () => {
    try {
        const response = await signOut();
        console.log('Google Sign-Out response:', response); // Optional: remove in production
        return response;
    } catch (error) {
        handleFrontendError(error, 'Google Sign-Out');
    }
}

// Account (credentials) Sign-Out function
const accountSignOut = async () => {
    try {
        const response = await signOutServer();
        console.log("Account Sign-Out response:", response); // Optional: remove in production
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

    // Default to Google sign-out if no specific sign-in method is identified
    return googleSignOut();
}

export {googleSignIn, userSignOut};
