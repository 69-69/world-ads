'use server';
// export const runtime = 'nodejs';
import axios, {AxiosError, AxiosInstance} from "axios";
import {BACKEND_API_ENDPOINT} from "@/env_config";
import {cookies} from "next/headers";
import authOptions from "@/auth";

declare module 'axios' {
    export interface AxiosRequestConfig {
        _retry?: boolean;
    }
}

export const extractAccessTokenFromRequest = async (
    req?: Request | { headers: Headers | Record<string, string> }
): Promise<string | null> => {
    // 1. Check for token in the session
    const session = await authOptions.auth();
    const sessionToken = session?.user.access_token || null;
    if (sessionToken) {
        return sessionToken;
    }

    // 2. If no request is provided, check cookies directly
    if (!req) {
        const cookieStore = await cookies();
        return cookieStore.get('access_token')?.value ?? null;
    }

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

export async function getApiClientWithAuth(
    req?: Request | { headers: Headers | Record<string, string> }
): Promise<AxiosInstance> {
    let token = await extractAccessTokenFromRequest(req);

    const instance = axios.create({
        baseURL: BACKEND_API_ENDPOINT,
        withCredentials: true,
    });
    // console.log('Steve-API-Client:', instance.defaults.baseURL);

    // Request interceptor to add Authorization header
    instance.interceptors.request.use((config) => {
        if (token) {
            config.headers = config.headers || {};
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    });

    // Response interceptor to refresh token on 401
    instance.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
            const originalRequest = error.config;

            if (
                error.response?.status === 401 && // Unauthorized
                originalRequest && // Original request exists
                !originalRequest._retry // prevent infinite loops
            ) {
                originalRequest._retry = true;

                try {
                    const refreshResponse = await axios.post(
                        `${instance.defaults.baseURL}/refresh-token`, {}, {withCredentials: true}
                    );
                    // console.log('Refresh-steve-Response:', refreshResponse.data);

                    const newAccessToken = refreshResponse.data.access_token;

                    if (newAccessToken) {
                        token = newAccessToken;

                        // Retry the original request with the new token
                        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        // console.log('New Authorization Header:', originalRequest.headers['Authorization']); // Log new token
                        return instance(originalRequest);
                    }
                } catch (refreshError) {
                    console.error('Token refresh failed:', refreshError);
                    throw refreshError;
                }
            }

            return Promise.reject(error);
        }
    );

    return instance;
}


/* Create an Axios instance
const apiClients: AxiosInstance = axios.create({
    baseURL: BACKEND_API_ENDPOINT,
    withCredentials: true,  // Send cookies with cross-origin requests
});

// Interceptor to inject the access token into each request
apiClients.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        // const fullUrl = `${config.baseURL}${config.url}`;
        // console.log('Steve-Full-URL:', fullUrl);
        const cookieStore = await cookies();
        const accessToken = await cookieStore.get('access_token')?.value;

        if (accessToken) {
            config.headers = config.headers || {}; // Ensure headers are initialized
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        } else {
            console.log('Steve-Authorization is missing');
        }

        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);
export {apiClients};

// Response Interceptor for refreshing access token
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
        const originalRequest = error.config;

        // console.log('Steve-api-client-status:', error.response?.status);
        if (originalRequest && error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // console.log('Steve-api-client-Original-Request:', originalRequest.headers.Authorization);
            try {
                const [refreshResponse, cookieStore] = await Promise.all([
                    axios.post(`${apiClient.defaults.baseURL}/refresh-token`, {}, {withCredentials: true}),
                    await cookies(),
                ]);

                // console.log('Steve-api-client-Response:', cookieStore.get('refresh_token'));
                const {access_token} = refreshResponse.data;

                cookieStore.set('access_token', access_token);
                originalRequest.headers['Authorization'] = `Bearer ${access_token}`;

                return apiClient(originalRequest); // Retry the original request with the new token
            } catch (refreshError) {
                window.location.href = '/signin'; // Redirect to signin if refresh fails
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error); // Reject if not a 401 or refresh failed
    }
);

export default apiClient;*/

/*const refreshToken = cookieStore.get('refresh_token')?.value;
                console.log('Refresh token:', refreshToken);

                // If a new access token is returned, update the cookies and retry the request
                const { access_token } = refreshResponse.data;
                if (access_token) {
                    cookieStore.set('access_token', access_token, {
                        path: '/',
                        maxAge: 60 * 60 * 24, // 1 day
                        httpOnly: true,  // for security reasons
                    });

                    originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
                    return apiClient(originalRequest); // Retry the original request
                } else {
                    console.error('No access token returned from refresh.');
                    redirect('/signin'); // Redirect to signin if refresh failed
                }*/