'use server';
import {signIn, signOut, signOutServer} from "@/auth";
import {getSignedInVia} from "@/app/hooks/useStorageUtils";

// Helper function to throw a standardized error
function throwError(error: unknown): never {
    const pleaseTryAgain = 'Something went wrong, please try again';
    const errorMessage = error instanceof Error ? error.message : pleaseTryAgain;
    console.error("Error occurred:", errorMessage); // Optionally log the error for debugging
    throw new Error(errorMessage);
}

// Google Sign-In function
const googleSignIn = async () => {
    try {
        const response = await signIn("google");
        console.log('Google Sign-In response:', response); // Optional: remove in production
        return response;
    } catch (error) {
        throwError(error);
    }
}

// Google Sign-Out function
const googleSignOut = async () => {
    try {
        const response = await signOut();
        console.log('Google Sign-Out response:', response); // Optional: remove in production
        return response;
    } catch (error) {
        throwError(error);
    }
}

// Account (credentials) Sign-Out function
const accountSignOut = async () => {
    try {
        const response = await signOutServer();
        console.log("Account Sign-Out response:", response); // Optional: remove in production
        return response;
    } catch (error) {
        throwError(error);
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
