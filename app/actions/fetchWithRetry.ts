'use server';

// Fetch data from the API with retries: Retry 3 times with a 2-second delay between each attempt
import authOptions from "@/auth";
import {getCookie} from "@/app/util/serverUtils";

type reqOptionsInterface = {
    method: string,
    endpoint?: string,
    headers?: Record<string, string>,
    body?: FormData | string,
    retries?: number,
    delay?: number
};

// NOTE: This function is not tied to the Axios instance and can be used with any fetch API
const fetchWithRetry = async (
    baseUrl: string,
    {
        method,
        endpoint,
        body,
        retries = 3,
        delay = 2000,
        headers,
    }: reqOptionsInterface,
) => {
    let attempts = 0;
    let lastError: Error | null = null;
    const accessToken = await _extractAccessTokenFromRequest();
    const refreshToken = await getCookie({name: 'refresh_token'});
    const fullUrl = endpoint ? `${baseUrl}?endpoint=${endpoint}` : baseUrl;
    // const next = method === 'GET' ? {revalidate: 3600} : undefined;

    while (attempts < retries) {
        try {
            // console.log('Steve-fetchWithRetry-URL:', fullUrl);
            // console.log('Steve-fetchWithRetry-Data:', body);
            const response = await fetch(fullUrl, {
                method,
                body,
                // include credentials if backend requires cookies
                credentials: 'include',
                headers: {
                    ...headers,
                    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
                    ...(refreshToken ? { 'X-Refresh-Token': refreshToken } : {}),
                },
            });

            if (!response.ok) {
                console.log(`Fetching-error: ${response.status}`);
            }

            const data = await response.json();

            return {response, data};
        } catch (error) {
            lastError = error instanceof Error ? error : new Error('Unknown error');
            if (attempts < retries - 1) {
                await new Promise(resolve => setTimeout(resolve, delay));
            }
            attempts++;
        }
    }

    throw lastError || new Error('Unknown-error');
};


// Access Token extraction from raw headers (fallback)
export const _extractAccessTokenFromRequest = async (
    req?: Request | { headers: Headers | Record<string, string> }
): Promise<string | null> => {
    // 1. Check for token in the session
    const session = await authOptions.auth();
    const sessionToken = session?.user.access_token ?? null;
    if (sessionToken) return sessionToken;

    // 2. If no request is provided, check cookies directly
    if (!req) return await getCookie({name: 'access_token'});

    // 3. Extract headers if the request object is available
    let headers: Headers | Record<string, string> | undefined;
    if (typeof req === 'object') {
        if ('headers' in req && typeof req.headers.get === 'function') {
            headers = req.headers as Headers;
        } else if ('headers' in req) {
            headers = req.headers as Record<string, string>;
        }
    }

    // 4. If no headers were found, return null
    if (!headers) return null;

    // 5. Look for the 'Authorization' header and extract the token
    let authHeader: string | null | undefined;
    if (headers instanceof Headers) {
        authHeader = headers.get('authorization');
    } else {
        authHeader = headers['authorization'] || headers['Authorization'];
    }

    return authHeader?.replace('Bearer ', '') ?? null;
};

export default fetchWithRetry;

