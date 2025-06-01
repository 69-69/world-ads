'use server';
import {createApiClient} from "@/app/api/createApiClient";
import {NextRequest, NextResponse} from "next/server";
import {setCookie} from "@/app/util/serverUtils";

// General API handler for GET, POST, PUT, DELETE
async function handleRequest(request: NextRequest, method: 'GET' | 'POST' | 'PUT' | 'DELETE') {
    const {searchParams} = new URL(request.url);
    const endpoint = searchParams.get('endpoint');
    const verify_method = searchParams.get('verify');

    if (!endpoint || !verify_method) {
        return NextResponse.json({error: 'Params required'}, {status: 400});
    }

    try {
        const body = method === 'POST' || method === 'PUT' ? await request.json() : undefined;

        const apiClient = await createApiClient();
        const axiosResponse = await apiClient.request({method, url: `/${endpoint}`, data: body});

        const {data} = axiosResponse;

        const response = NextResponse.json(data);

        if (verify_method) {
            await setCookie({response, name: `verified_${verify_method}`, value: verify_method})
        }

        return response;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
        return NextResponse.json({error: errorMessage}, {status: 500});
    }
}

// Route Handlers
export const POST = async (request: NextRequest) => await handleRequest(request, 'POST');
export const PUT = async (request: NextRequest) => await handleRequest(request, 'PUT');

