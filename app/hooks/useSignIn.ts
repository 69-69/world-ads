'use server';
// app/hooks/useSignIn.ts
//
import {signIn} from '@/auth';
import {SignIn} from "@/app/models/SignIn";
import {handleFrontendError} from "@/app/hooks/useThrowError";
// import {DEFAULT_POST_ADS_REDIRECT} from "@/app/hooks/useConstants";
import {ApiResponse} from "@/app/models";
import {DEFAULT_POST_ADS_REDIRECT} from "@/app/hooks/useConstants";

export const useSignIn = async (formData: SignIn): Promise<ApiResponse> => {


    try {
        /*
        const [navigate, response]: [ReturnType<typeof useRouter>, SignInResponse] = await Promise.all([useRouter(), signIn("credentials", formData)]);

        // Call the authentication service from AUTH.ts

        if (response.status === 200) {
            console.log('SignIn successful:');
            navigate.push('/posts');
        }*/

        // Call the authentication service from AUTH.ts
        const response: ApiResponse = await signIn("credentials",
            {
                ...formData,
                redirect: false, // Prevent automatic redirect
                redirectTo: DEFAULT_POST_ADS_REDIRECT, // Set custom redirect URL after sign-in
            });


        return {
            data: response,
            status: 200,
            message: 'Sign-in successful',
        };
    } catch (error) {
        handleFrontendError(error, 'Sign-in');
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
            redirectTo: "/posts",
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

