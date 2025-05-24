'use server';

import {FormDataModel, to_FormData} from "@/app/models/FormDataModel";
import {inRange} from "@/app/util/clientUtils";
import {BACKEND_API_ENDPOINT} from "@/env_config";
import {errorUtils} from "@/app/util/serverUtils";
import authOptions from "@/auth";
import {NextResponse} from "next/server";
import {SIGNIN_ROUTE} from "@/app/util/constants";
import {redirect} from "next/navigation";

const alternativeCreateProduct = async (form: FormDataModel) => {
    const session = await authOptions.auth();

    if (!session) {
        redirect(SIGNIN_ROUTE);
        return NextResponse.json({error: 'Unauthorized. Please sign in.'}, {status: 401});
    }

    try {
        const body = to_FormData(form);
        body.append('user_id', session.user.id); // Append user ID

        const response = await fetch(`${BACKEND_API_ENDPOINT}/market-place`, {
            method: 'POST',
            headers: {Authorization: `Bearer ${session.user.access_token}`},
            body,
            // include credentials if backend requires cookies
            credentials: 'include',
        });

        const data = await response.json();

        if (inRange(response.status, 200, 299)) {
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
