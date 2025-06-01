// app/actions/createBrand.ts
'use server';

import fetchWithRetry from "@/app/actions/fetchWithRetry";
import {brandHandler} from "@/app/util/endPoints";
import {HOME_ROUTE} from "@/app/util/constants";
import authOptions from "@/auth";
import {signOut} from "@/app/actions/auth/handleSignOut";

export async function handleSubmit(formData: FormData) {
    const session = await authOptions.auth();
    if (!session) {
        await signOut();
        console.log('Unauthorized. Please sign in.', 401);
    }

    const data = {
        brand: formData.get('brand'),
        store_id: session?.user.store_id,
    };
    console.log('Form Data:', data);
    await fetchWithRetry(HOME_ROUTE + brandHandler, {
        method: 'POST',
        body: JSON.stringify(data),
    });

    // // Check if the response status is within the 2xx range (successful)
    // if (inRange(response.status)) {
    //     console.log('Response Data:', data);
    //     return {
    //         data: JSON.stringify(data),
    //         status: response.status,
    //         message: 'Category created successfully',
    //     };
    // }
    // // Handle error response
    // return {
    //     message: 'Category creation failed',
    //     status: response.status,
    // };
}
