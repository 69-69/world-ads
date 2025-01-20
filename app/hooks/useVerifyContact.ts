import {verifyUserEmail, verifyUserPhone} from "@/app/api/external/backend";
import {handleUIError} from "@/app/hooks/useThrowError";
import {ApiResponse} from "@/app/models/ApiResponse";
import {VerifyContactResponse} from "@/app/models/VerifyContactResponse";

const useVerifyContact = async (formData: FormData): Promise<ApiResponse<VerifyContactResponse>> => {

    // Validate form data
    if (!formData.has('email_code') || !formData.has('phone_code')) {
        throw new Error(`Enter the verification codes for both email and phone.`);
    }
    try {
        // Extract and cast verification codes safely
        const emailCode = formData.get('email_code') as string | '';
        const smsCode = formData.get('phone_code') as string | '';

        // Call verifyContact function
        const response: ApiResponse<VerifyContactResponse> = emailCode.length > 0 ?
            await verifyUserEmail(emailCode)
            : await verifyUserPhone(smsCode);

        // Log success on valid response
        console.log('Verification successful:', response);
        /*if (response.status === 200) {
        } else {
            console.error(response.message, response);
        }*/

        // Return status for further handling
        return response;
    } catch (error: unknown) {
        // Handle errors (validation or API failure)
        handleUIError(error, 'Verify-contact');
    }
};

export default useVerifyContact;