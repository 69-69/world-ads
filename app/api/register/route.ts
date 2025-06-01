'use server';
import {createApiClient} from "@/app/api/createApiClient";
import {NextRequest, NextResponse} from "next/server";
import {setCookie} from "@/app/util/serverUtils";


// General API handler for GET, POST, PUT, DELETE
async function handleRequest(request: NextRequest, method: 'GET' | 'POST' | 'PUT' | 'DELETE') {
    const signupEndpoint = '/auth/signup';
    try {
        const body = method === 'POST' || method === 'PUT' ? await request.json() : undefined;

        const apiClient = await createApiClient();
        const axiosResponse = await apiClient.request({method, url: signupEndpoint, data: body});

        const {data} = axiosResponse;

        const response = NextResponse.json(data);
        // console.log('Route-Steve-Response:', data, '\nRoute-Steve-Status:', response.status, '\nRoute-res: ', res, '\n');

        // Set a signup token from the API response if available
        if (data.signup_token && data.access_token) {
            await Promise.all([
                setCookie({response, name: 'signup_token', value: data.signup_token}),
                setCookie({response, name: 'access_token', value: data.access_token})
            ]);
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

