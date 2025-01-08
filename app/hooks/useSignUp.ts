// app/hooks/useSignUp.ts
//
'use server';
import {signUpWithCredentials} from "@/app/api/auth/backend";
import {SignUp} from "@/app/models/SignUp";
import {handleFrontendError} from "@/app/hooks/useThrowError";

export const useSignUp = async (formData: SignUp) => {

    // console.log('Sign up response: ', formData.email);
    try {

        // Call the authentication service from BACKEND.ts
        return await signUpWithCredentials(formData);
    } catch (error) {
        handleFrontendError(error, 'Sign-up');
    }
};


