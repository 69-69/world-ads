// app/actions/createCategory.ts
'use server';
import fetchWithRetry from "@/app/actions/fetchWithRetry";
import {marketplaceHandler} from "@/app/util/endPoints";
import {HOME_ROUTE, SIGNIN_ROUTE} from "@/app/util/constants";
import authOptions from "@/auth";
import {redirect} from "next/navigation";


export async function handleEdit(formData: FormData) {
    const session = await authOptions.auth();
    if (!session) {
        redirect(SIGNIN_ROUTE);
        console.log('Unauthorized. Please sign in.', 401);
    }

    const key = formData.get('key') as string;
    const value = formData.get('value');
    const hashed_id = formData.get('hashed_id');
    const body = JSON.stringify({[key]: value});

    await fetchWithRetry(HOME_ROUTE + marketplaceHandler, {
        method: 'PUT',
        body,
        endpoint: `/${hashed_id}`,
        headers: {Authorization: `Bearer ${session?.user.access_token}`}
    });
    /*if (response?.status === 200) {
        const product = data as Partial<Product>;
        await router.replace({
            pathname: `${ADMIN_PRODUCT_ROUTE}/${product.hashed_id}`,
            search: new URLSearchParams({product: JSON.stringify(product)}).toString(),
        })
    }*/

}

