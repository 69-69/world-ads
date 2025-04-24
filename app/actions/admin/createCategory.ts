'use server';
import fetchWithRetry from "@/app/api/external/fetchWithRetry";
import {categoryHandler} from "@/app/api/external/endPoints";
import {HOME_ROUTE, SIGNIN_ROUTE} from "@/app/actions/useConstants";
import authOptions from "@/auth";
import {redirect} from "next/navigation";

export async function handleSubmit(formData: FormData) {
    const session = await authOptions.auth();
    if (!session) {
        redirect(SIGNIN_ROUTE);
        console.log('Unauthorized. Please sign in.', 401);
    }

    const data = {
        store_id: session?.user.store_id,
        category: formData.get('category'),
        parent_category: formData.get('parent_category'),
    };

    await fetchWithRetry(HOME_ROUTE + categoryHandler, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {Authorization: `Bearer ${session?.user.access_token}`}
    });

    // // Check if the response status is within the 2xx range (successful)
    // if (inRange(response.status, 200, 299)) {
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
