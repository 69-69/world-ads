import {signUpWithCredentials} from "@/app/api/external/backend";
import {SignUp} from "@/app/models/SignUp";
import {handleUIError} from "@/app/hooks/useThrowError";

export const useSetupStore = async (formData: SignUp) => {
    try {
        return await signUpWithCredentials(formData);
    } catch (error) {
        handleUIError(error, 'Sign-up');
    }
};


