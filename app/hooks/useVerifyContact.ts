// app/hooks/useVerifyContact.ts
//
'use server';
import {verifyUserEmail, verifyUserPhone} from "@/app/api/auth/backend";
import {handleFrontendError} from "@/app/hooks/useThrowError";
import {ApiResponse} from "@/app/models";
import {auth} from "@/auth";

const useVerifyContact = async (formData: FormData): Promise<ApiResponse<string>> => {

    // Validate form data
    if (!formData.has('email_code') || !formData.has('phone_code')) {
        throw new Error(`Enter the verification codes for both email and phone.`);
    }
    try {
        const session = await auth();
        if (!session || !session.user) {
            return {status: 401, message: 'Your Sign Up session has expired, please try again.'};
        }
        // Extract and cast verification codes safely
        const emailCode = formData.get('email_code') as string | '';
        const smsCode = formData.get('phone_code') as string | '';

        // Extract user ID from session
        const userId = session.user.id;

        // Call verifyContact function
        const func = emailCode.length > 0 ?
            verifyUserEmail(userId, emailCode)
            : verifyUserPhone(userId, smsCode);

        const response: ApiResponse<string> = await func;

        // Log success on valid response
        if (response.status === 200) {
            console.log('Verification successful:', response.data);
        } else {
            console.error(response.message, response);
        }

        // Return status for further handling
        return response;
    } catch (error: unknown) {
        // Handle errors (validation or API failure)
        handleFrontendError(error, 'Verify-contact');
    }
};

export default useVerifyContact;