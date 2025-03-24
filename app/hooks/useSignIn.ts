'use server';

import {authOptions} from '@/auth';
import {SignIn} from "@/app/models/SignIn";
import {handleUIError} from "@/app/hooks/useThrowError";
import {ApiResponse} from "@/app/models/ApiResponse";

export const useSignIn = async (formData: SignIn): Promise<ApiResponse> => {
    try {
        const response = await authOptions.signIn("credentials", {
            ...formData,
            redirect: false,
        });

        const str = typeof response === 'string';
        return {
            data: response,
            status: str ? 200 : 400,
            message: str ? 'Sign-in successful' : 'Sign-in failed',
        };
    } catch (error) {
        handleUIError(error, 'Sign-in');
    }
};


/*
export const useSignIn = () => {
    const handleSignIn = async (formData: FormData): Promise<void> => {
        const { email_address, pass_word } = formData;

        // Client-side validation
        if (!email_address || !pass_word) {
            throw new Error('Please fill out both fields.');
        }

        if (!validateEmail(email_address)) {
            throw new Error('Please enter a valid email.');
        }

        if (!validatePassword(pass_word)) {
            throw new Error('Password must be at least 8 characters long.');
        }

        // Call the authentication service
        const response: SignInResponse = await signIn("credentials", {
            redirect: false,
            redirectTo: "/marketplace",
            email: email_address,
            password: pass_word,
        });

        if (response.success) {
            console.log('SignIn successful:', response.access_token);
        } else {
            throw new Error(response.message);
        }
    };

    // Return an object containing handleSignIn
    return { handleSignIn };
}; */



