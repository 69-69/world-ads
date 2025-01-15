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

        // Set cache control headers
        // res.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate');

        // Set CORS headers
        // res.headers.set('Access-Control-Allow-Origin', '*');

        // Set Cookie headers
        // res.cookies.set('cookieName', 'cookieValue', {httpOnly: true, maxAge: 30 * 24 * 60 * 60, path: '/'});

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

        const body = await request.json();
        const response = await apiClient.post(`/${endpoint}`, body);

        const res = NextResponse.json(response.data);

        // Set cache control headers
        // res.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate');

        // Set CORS headers
        // res.headers.set('Access-Control-Allow-Origin', '*');

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
export {GET, POST, PUT, DELETE};