// app/hooks/useSetupStore.ts
//
import {signUpWithCredentials} from "@/app/api/external/backend";
import {SignUp} from "@/app/models/SignUp";
import {handleFrontendError} from "@/app/hooks/useThrowError";

export const useSetupStore = async (formData: SignUp) => {
    try {
        return await signUpWithCredentials(formData);
    } catch (error) {
        handleFrontendError(error, 'Sign-up');
    }
};


