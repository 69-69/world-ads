// app/actions/createCategory.ts
'use server';
import fetchWithRetry from "@/app/actions/fetchWithRetry";
import {conditionHandler} from "@/app/util/endPoints";
import {HOME_ROUTE, SIGNIN_ROUTE} from "@/app/util/constants";
import authOptions from "@/auth";
import {redirect} from "next/navigation";

export async function handleSubmit(formData: FormData) {
    const session = await authOptions.auth();
    if (!session) {
        redirect(SIGNIN_ROUTE);
        console.log('Unauthorized. Please sign in.', 401);
    }

    const rawFormData = {
        store_id: session?.user.store_id,
        condition: formData.get('condition'),
    };

    await fetchWithRetry(HOME_ROUTE + conditionHandler, {
        method: 'POST',
        body: JSON.stringify(rawFormData),
        headers: {Authorization: `Bearer ${session?.user.access_token}`}
    });
}
