'use server';
import apiClient from "@/app/api/external/apiClient";
import {NextRequest, NextResponse} from "next/server";
import axios, {AxiosResponse} from "axios";

// Set Cookies utility function
const setCookie = (res: NextResponse, name: string, value: string, days: number = 7) => {
    res.cookies.set(name, value, {
        httpOnly: true,
        maxAge: days * 24 * 60 * 60, // Default is 7 days
        secure: process.env.COOKIE_SECURE === "production",
        path: '/',
        sameSite: 'lax',
    });
};

// Utility function to select data based on a comma-separated key string
const selectDataFromResponse = (data: Record<string, unknown>, dataKey: string | null): Record<string, unknown> => {
    if (!dataKey) return {};

    return dataKey.split(',').reduce((acc, key) => {
        if (data[key] !== undefined) {
            acc[key] = data[key];
        }
        return acc;
    }, {} as Record<string, unknown>);
};

// Set Cookies from Response Data
const setCookiesFromResponse = (res: NextResponse, response: AxiosResponse, cookieName: string | null, dataKey: string | null, days: number = 7) => {
    if (!cookieName || !dataKey) return;

    const {data} = response;
    const selectedData = selectDataFromResponse(data, JSON.parse(dataKey));

    setCookie(res, cookieName, JSON.stringify(selectedData || data), days);
};

// General API handler for GET, POST, PUT, DELETE
async function handleRequest(request: NextRequest, method: 'GET' | 'POST' | 'PUT' | 'DELETE') {
    const {searchParams} = new URL(request.url);
    const endpoint = searchParams.get('endpoint');

    if (!endpoint) {
        return NextResponse.json({error: 'Endpoint is required'}, {status: 400});
    }

    try {
        const body = method === 'POST' || method === 'PUT' ? await request.json() : undefined;
        const isThirdParty = request.headers.get('Is-Third-Api');

        console.log('Tony-Request URL:', request.url);

        // Make the actual request depending on whether it's a third-party API or your own backend API
        const response = isThirdParty
            ? await axios({method, url: endpoint, data: body})
            : await apiClient({method, url: `/${endpoint}`, data: body});

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
export const POST = async (request: NextRequest) => await handleRequest(request, 'POST');
export const PUT = async (request: NextRequest) => await handleRequest(request, 'PUT');
export const DELETE = async (request: NextRequest) => await handleRequest(request, 'DELETE');


/*
'use server';
import apiClient from "@/app/api/external/apiClient";
import {NextRequest, NextResponse} from "next/server";
import {parseJSON, stringifyJSON} from "@/app/hooks/useCookies";
import axios, {AxiosResponse} from "axios";

// Set Cookies
const setCookie = (res: NextResponse, name: string, value: string, days: number = 7) => {
    // return `document.cookie = "${name}=${value}; Max-Age=${maxAge}; Path=/";`;
    res.cookies.set(name, value, {
        httpOnly: true,
        maxAge: days * 24 * 60 * 60, // 7 days by default
        secure: process.env.COOKIE_SECURE === "production", // Use 'secure' in production only
        path: '/',
        sameSite: 'lax',
    });
}


// Utility function to select data based on a comma-separated key string
const selectDataFromResponse = (data: { [key: string]: unknown }, dataKey: string | null): {
    [key: string]: unknown
} => {
    if (!dataKey) return {};

    return dataKey.split(',').reduce((acc, key) => {
        if (data[key] !== undefined) {
            acc[key] = data[key];
        }
        return acc;
    }, {} as { [key: string]: unknown });
};

// Set Cookies from Response Data, else set the full response data
const setCookiesFromResponse = (res: NextResponse, response: AxiosResponse, cookieName: string | null, dataKey: string | null, days: number = 7) => {
    if (!cookieName || !dataKey) return;

    let {data} = response;

    // Get the selected data from response based on the dataKey
    const selectedData = selectDataFromResponse(data, parseJSON(dataKey));

    // Check if Object is empty or has no keys, then set the full response data
    if (Object.keys(selectedData).length) {
        data = selectedData;
    }

    // Set Cookie headers with the selected data or the full response data
    setCookie(res, cookieName, stringifyJSON(data), days);
};


// Handle GET requests
async function GET(request: NextRequest) {
    try {
        const {searchParams} = new URL(request.url);

        const endpoint = searchParams.get('endpoint');
        if (!endpoint) {
            return NextResponse.json({error: 'Endpoint is required'}, {status: 400});
        }

        // Check if the request is from a third-party API
        const isThirdApi = request.headers.get('Is-Third-Api');

        const response = isThirdApi && Boolean(isThirdApi)
            ? await axios.get(`${endpoint}`)
            : await apiClient.get(`/${endpoint}`);

        const res = NextResponse.json(response.data);

        // Optionally set cookies if cookieName is provided
        const cookieName = request.headers.get('Cookie_Name');
        if (cookieName) {
            // Set Cookie headers
            setCookie(res, cookieName, stringifyJSON(response.data));
        }

        return res;

    } catch (error) {
        // Log the error details for debugging
        // console.error('Error in GET request:', error);
        const msgError = error instanceof Error ? error.message : 'Something went wrong';
        return NextResponse.json({error: msgError}, {status: 500});
    }
}

// Handle POST requests
async function POST(request: NextRequest) {
    try {
        const {searchParams} = new URL(request.url);
        const endpoint = searchParams.get('endpoint');

        if (!endpoint) {
            return NextResponse.json({error: 'Endpoint is required'}, {status: 400});
        }

        console.log('Steve Request Headers:', searchParams);

        const body = await request.json();
        const response = await apiClient.post(`/${endpoint}`, body);

        const res = NextResponse.json(response.data);

        // Optionally set cookies if cookieName is provided
        const cookieName = request.headers.get('Cookie_Name');
        if (cookieName) setCookie(res, cookieName, cookieName);

        // Extract the data-key from the request headers
        // Data keys are used to set multiple cookies from the Response Data
        const dataKey = request.headers.get('Data-Key');

        // Optionally set cookies from the response data if dataKey is provided
        if (dataKey) {
            setCookiesFromResponse(res, response, cookieName, dataKey);
        }

        // Optionally set cookies if Custom_Cookie is provided
        const defaultCookie = request.headers.get('Custom_Cookie');
        if (defaultCookie) {
            // Get key-value pairs from the defaultCookie string
            const [key, value] = defaultCookie.split('=');
            setCookie(res, key, value);
        }

        return res;
    } catch (error) {
        const msgError = error instanceof Error ? error.message : 'Something went wrong';
        return NextResponse.json({error: msgError}, {status: 500});
    }
}

// Handle PUT requests
async function PUT(request: NextRequest) {
    try {
        const {searchParams} = new URL(request.url);
        const endpoint = searchParams.get('endpoint');

        if (!endpoint) {
            return NextResponse.json({error: 'Endpoint is required'}, {status: 400});
        }

        const body = await request.json();
        const response = await apiClient.put(`/${endpoint}`, body);

        const res = NextResponse.json(response.data);

        // Optionally set cookies if cookieName is provided
        const cookieName = searchParams.get('Cookie_Name');
        if (cookieName) {
            setCookie(res, cookieName, stringifyJSON(response.data), 30);
        }

        return res;
    } catch (error) {
        const msgError = error instanceof Error ? error.message : 'Something went wrong';
        return NextResponse.json({error: msgError}, {status: 500});
    }
}

// Handle DELETE requests
async function DELETE(request: NextRequest) {
    try {
        const {searchParams} = new URL(request.url);
        const endpoint = searchParams.get('endpoint');

        if (!endpoint) {
            return NextResponse.json({error: 'Endpoint is required'}, {status: 400});
        }

        const response = await apiClient.delete(`/${endpoint}`);

        return NextResponse.json(response.data);
    } catch (error) {
        const msgError = error instanceof Error ? error.message : 'Something went wrong';
        return NextResponse.json({error: msgError}, {status: 500});
    }
}

// Export the handlers
export {GET, POST, PUT, DELETE};*/
