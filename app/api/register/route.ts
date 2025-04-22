'use server';
import {getApiClientWithAuth} from "@/app/api/external/apiClient";
import {NextRequest, NextResponse} from "next/server";

// Set Cookies utility function
// Next-JS Ref Cookies: https://nextjs.org/docs/app/api-reference/functions/cookies#getting-all-cookies
const setCookie = (res: NextResponse, name: string, value: string, days: number = 7) => {
    res.cookies.set(name, value, {
        httpOnly: true,
        maxAge: days * 24 * 60 * 60, // Default is 7 days
        secure: process.env.COOKIE_SECURE === "production",
        path: '/',
        sameSite: 'lax',
    });
};

// General API handler for GET, POST, PUT, DELETE
async function handleRequest(request: NextRequest, method: 'GET' | 'POST' | 'PUT' | 'DELETE') {
    const signupEndpoint = '/signup';
    try {
        const body = method === 'POST' || method === 'PUT' ? await request.json() : undefined;

        const apiClient = await getApiClientWithAuth();
        const response = await apiClient.request({method, url: signupEndpoint, data: body});

        const {data} = response;

        const res = NextResponse.json(data);
        // console.log('Route-Steve-Response:', data, '\nRoute-Steve-Status:', response.status, '\nRoute-res: ', res, '\n');

        // Set a signup token from the API response if available
        if (data.signup_token && data.access_token) {
            setCookie(res, 'access_token', data.access_token);
            setCookie(res, 'signup_token', data.signup_token);
        }

        return res;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
        return NextResponse.json({error: errorMessage}, {status: 500});
    }
}

// Route Handlers
export const POST = async (request: NextRequest) => await handleRequest(request, 'POST');
export const PUT = async (request: NextRequest) => await handleRequest(request, 'PUT');

