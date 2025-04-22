import {signUpWithCredentials} from "@/app/api/external/backend";
import {SignUp, SignUpForm} from "@/app/models/SignUp";
import {handleUIError} from "@/app/actions/useThrowError";

export const createSignUp = async (formData: SignUpForm) => {
    try {
        const data = new SignUp(formData);
        return await signUpWithCredentials(data);
    } catch (error) {
        handleUIError(error, 'Sign-up');
    }
};


