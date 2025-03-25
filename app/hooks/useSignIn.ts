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



