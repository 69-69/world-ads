'use server';
import apiClient from "@/app/api/external/apiClient";
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
    const {searchParams} = new URL(request.url);
    const endpoint = searchParams.get('endpoint');
    const verify_method = searchParams.get('verify');

    if (!endpoint || !verify_method) {
        return NextResponse.json({error: 'Params required'}, {status: 400});
    }

    try {
        const body = method === 'POST' || method === 'PUT' ? await request.json() : undefined;

        const response = await apiClient({method, url: `/${endpoint}`, data: body});

        const {data} = response;

        const res = NextResponse.json(data);

        if (verify_method) {
            setCookie(res, `verified_${verify_method}`, verify_method);
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

