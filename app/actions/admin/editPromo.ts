// app/actions/createCategory.ts
'use server';
import fetchWithRetry from "@/app/api/external/fetchWithRetry";
import {promoHandler} from "@/app/api/external/endPoints";
import {HOME_ROUTE, SIGNIN_ROUTE} from "@/app/actions/useConstants";
import authOptions from "@/auth";
import {redirect} from "next/navigation";


export async function handlePromoEdit(formData: FormData, hashed_id: string) {
    const session = await authOptions.auth();
    if (!session) {
        redirect(SIGNIN_ROUTE);
        console.log('Unauthorized. Please sign in.', 401);
    }

    const start_at = new Date(formData.get('start_at') as string);
    const end_at = new Date(formData.get('end_at') as string);
    // console.log('start_at', start_at, 'end_at', end_at);
    const body = JSON.stringify({start_at, end_at});

    const {response} = await fetchWithRetry(HOME_ROUTE + promoHandler, {
        method: 'PUT',
        body,
        endpoint: `/${hashed_id}`,
        headers: {Authorization: `Bearer ${session?.user.access_token}`}
    });
    return {success: response?.ok, error: response?.statusText};

    /*if (response?.status === 200) {
        const product = data as Partial<Product>;
        await router.replace({
            pathname: `${ADMIN_PRODUCT_ROUTE}/${product.hashed_id}`,
            search: new URLSearchParams({product: JSON.stringify(product)}).toString(),
        })
    }*/

}

