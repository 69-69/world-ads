// app/hooks/useSignUp.ts
//
import {signUpWithCredentials} from "@/app/api/auth/backend";
import {SignUp} from "@/app/models/SignUp";

export const useSignUp = async (formData: SignUp) => {

    console.log('Sign up response: ', formData.email);
    try {

        // Call the authentication service from BACKEND.ts
        const response = await signUpWithCredentials(formData);
        console.log('Sign up response: ', response);

        return response;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Something went wrong, please try again');
    }
};


/*
import { validateEmail, validatePassword } from '@/app/hooks/useValidation';
// Form submission handler
interface FormData {
    email_address: string;
    pass_word: string;
}

interface SignInResponse {
    success: boolean;
    message: string;
    id: string;
    slug: string;
    role: string;
    email: string;
    phone: string;
    firstname: string;
    lastname: string;
    access_token?: string;
}

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

