import {signUpWithCredentials} from "@/app/api/external/backend";
import {SignUp, SignUpForm} from "@/app/models/SignUp";
import {handleUIError} from "@/app/hooks/useThrowError";

export const useSignUp = async (formData: SignUpForm) => {
    try {
        const data = new SignUp(formData);
        return await signUpWithCredentials(data);
    } catch (error) {
        handleUIError(error, 'Sign-up');
    }
};


