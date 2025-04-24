'use server';

import authOptions from '@/auth';
import {SignIn} from "@/app/models/SignIn";
import {handleUIError} from "@/app/actions/useThrowError";
import {ApiResponse} from "@/app/models/ApiResponse";

export const useSignIn = async (formData: SignIn): Promise<ApiResponse> => {
    try {
        const response = await authOptions.signIn("credentials", {
            ...formData,
            redirect: false,
        });
        // console.log('Sign-in response:', response);

        const isSuccess = response.includes('signin');
        return {
            data: response,
            status: isSuccess ? 200 : 400,
            message: isSuccess ? 'Sign-in successful' : 'Sign-in failed',
        };
    } catch (error) {
        console.error('Error during sign-in:', error);
        handleUIError(error, 'Sign-in');
    }
};



