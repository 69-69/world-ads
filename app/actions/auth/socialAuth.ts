'use server';
import authOptions from "@/auth";
import {handleUIError} from "@/app/util/serverUtils";

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

export {googleSignIn, githubSignIn};
