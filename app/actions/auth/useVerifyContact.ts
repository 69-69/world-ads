import {verifyUserEmail, verifyUserPhone} from "@/app/api/external/backend";
import {handleUIError} from "@/app/actions/useThrowError";

export const useVerifyContact = async (formData: FormData) => {

    // Validate form data
    if (!formData.has('email_code') || !formData.has('phone_code')) {
        throw new Error(`Enter the verification codes for both email and phone.`);
    }

    try {
        // Extract and cast verification codes safely
        const emailCode = formData.get('email_code') as string | '';
        const smsCode = formData.get('phone_code') as string | '';

        // Call verifyContact function
        return emailCode.length > 0 ?
            await verifyUserEmail(emailCode)
            : await verifyUserPhone(smsCode);
    } catch (error) {
        handleUIError(error, 'Signup-Verification');
    }
};