'use server';

import authOptions from '@/auth';
import {SignIn} from "@/app/models/SignIn";
import {errorUtils} from "@/app/actions/useThrowError";
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

        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    } catch (error: any) {
        console.error('Error during sign-in:', errorUtils.getError(error));
        // handleUIError(error, 'Sign-in');
        return {
            data: error.response.data,
            status: 400,
            message: error.response.data.message || 'Sign-in failed',
        };
    }
};



