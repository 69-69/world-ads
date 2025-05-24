// app/actions/getAdminData.ts
'use server';

import authOptions from "@/auth";
import {HOME_ROUTE} from "@/app/util/constants";
import fetchWithRetry from "@/app/actions/fetchWithRetry";
import {inRange} from "@/app/util/clientUtils";

type AdminDataParams = {
    route: string;
    endpoint?: string;
};

const getAdminData = async <T>(x: AdminDataParams): Promise<T | []> => {
    const session = await authOptions.auth();
    if (!session?.user) {
        return [];
    }

    try {
        const extra = x.endpoint ? x.endpoint : '';

        const {response, data} = await fetchWithRetry(HOME_ROUTE + x.route, {
            method: 'GET',
            endpoint: `/${extra}${session?.user.store_id}`,
            headers: {Authorization: `Bearer ${session?.user.access_token}`}
        });
        if (inRange(response.status, 200, 299)) {
            return data as T;
        }

        return [] as T;
    } catch (error) {
        console.error(`Failed to fetch data from :`, error);
        return [];
    }
}

export default getAdminData;


/*
'use server';
import authOptions from "@/auth";
import fetchWithRetry from "@/app/api/external/fetchWithRetry";
import {HOME_ROUTE} from "@/app/actions/useConstants";
import {brandHandler} from "@/app/api/external/endPoints";
import {Brand} from "@/app/models/Post";

const getBrands = async () => {
    const session = await authOptions.auth();
    if (!session?.user) {
        return [];
    }

    const {data} = await fetchWithRetry(HOME_ROUTE + brandHandler, {
        method: 'GET',
        endpoint: `/${session?.user.store_id}`,
        headers: {Authorization: `Bearer ${session?.user.access_token}`}
    });
    const brands: Brand[] = data;

    return brands;
}
export default getBrands;*/
