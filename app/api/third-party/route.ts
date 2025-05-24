'use server';
import axios from "axios";
import {NextRequest, NextResponse} from "next/server";
import {setCookie, setCookiesFromResponse} from "@/app/util/serverUtils";

// General API handler for GET, POST, PUT, DELETE
async function handleRequest(request: NextRequest, method: 'GET' | 'POST' | 'PUT' | 'DELETE') {
    const {searchParams} = new URL(request.url);
    const endpoint = searchParams.get('endpoint');

    if (!endpoint) {
        return NextResponse.json({error: 'Endpoint is required'}, {status: 400});
    }

    try {
        const body = method === 'POST' || method === 'PUT' ? await request.json() : undefined;

        const response = await axios({method, url: endpoint, data: body})

        const res = NextResponse.json(response.data);

        // Set cookies based on headers
        const cookieName = request.headers.get('Cookie_Name');
        const dataKey = request.headers.get('Data-Key');

        if (cookieName) {
            setCookiesFromResponse(res, response, cookieName, dataKey);
        }

        // Optionally set additional cookies like Custom_Cookie
        const defaultCookie = request.headers.get('Custom_Cookie');
        if (defaultCookie) {
            const [key, value] = defaultCookie.split('=');
            setCookie(res, key, value);
        }

        return res;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
        return NextResponse.json({error: errorMessage}, {status: 500});
    }
}

// Route Handlers
export const GET = async (request: NextRequest) => await handleRequest(request, 'GET');
