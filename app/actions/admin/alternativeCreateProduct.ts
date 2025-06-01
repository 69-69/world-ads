'use server';

import {FormDataModel, to_FormData} from "@/app/models/FormDataModel";
import {isSuccessCode, errorUtils} from "@/app/util/clientUtils";
import {BACKEND_API_ENDPOINT} from "@/env_config";
import authOptions from "@/auth";
import {signOut} from "@/app/actions/auth/handleSignOut";

const alternativeCreateProduct = async (form: FormDataModel) => {
    const session = await authOptions.auth();

    if (!session) {
        await signOut();
        return {message: 'Unauthorized. Please sign in.', status: 401};
    }

    try {
        const body = to_FormData(form);
        body.append('user_id', session.user.id); // Append user ID

        const response = await fetch(`${BACKEND_API_ENDPOINT}/market-place`, {
            method: 'POST',
            body,
            // include credentials if backend requires cookies
            credentials: 'include',
        });

        const data = await response.json();

        if (isSuccessCode(response.status)) {
            return {
                data: JSON.stringify(data),
                status: response.status,
                message: 'Post submitted successfully',
            };
        }

        return {
            message: 'Post was not successful',
            status: response.status,
        };
    } catch (error: unknown) {
        const err = errorUtils.getError(error);
        return {message: err, status: 500};
    }
};

export default alternativeCreateProduct;
