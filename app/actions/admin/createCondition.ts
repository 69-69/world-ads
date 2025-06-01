// app/actions/createCategory.ts
'use server';
import fetchWithRetry from "@/app/actions/fetchWithRetry";
import {conditionHandler} from "@/app/util/endPoints";
import {HOME_ROUTE} from "@/app/util/constants";
import authOptions from "@/auth";
import {signOut} from "@/app/actions/auth/handleSignOut";

export async function handleSubmit(formData: FormData) {
    const session = await authOptions.auth();
    if (!session) {
        await signOut();
        console.log('Unauthorized. Please sign in.', 401);
    }

    const rawFormData = {
        store_id: session?.user.store_id,
        condition: formData.get('condition'),
    };

    await fetchWithRetry(HOME_ROUTE + conditionHandler, {
        method: 'POST',
        body: JSON.stringify(rawFormData),
    });
}
