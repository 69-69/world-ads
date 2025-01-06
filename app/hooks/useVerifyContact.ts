// app/hooks/useVerifyContact.ts
//
'use server';
import {confirmSignup} from "@/app/api/auth/backend";
import {handleFrontendError} from "@/app/hooks/useThrowError";

const useVerifyContact = async (formData: FormData) => {
    const verificationCode = formData.get('verificationCode');

    console.log('Form Data:', formData);

    if (!verificationCode) {
        throw new Error('Verification code is required');
    }

    try {

        const response = await confirmSignup(verificationCode.toString());
        console.log('Sign up successful', response);

        if (response.status === 200) {
            console.log('SignUp was successful:', response.data);
        }
        return response.status;
    } catch (error) {
        handleFrontendError(error, 'Verify-contact');
    }
};

export default useVerifyContact;