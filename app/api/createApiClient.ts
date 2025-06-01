'use server';
// export const runtime = 'nodejs';
import axios, {AxiosError, AxiosHeaders, AxiosInstance} from "axios";
import {BACKEND_API_ENDPOINT} from "@/env_config";
import {setCookie} from "@/app/util/serverUtils";

declare module 'axios' {
    export interface AxiosRequestConfig {
        _retry?: boolean;
    }
}

let isRefreshing = false;

export async function createApiClient(
    req?: Request | { headers: Headers | Record<string, string> }
): Promise<AxiosInstance> {
    const {accessToken, refreshToken} = extractTokenFromHeaders(req);

    const client = axios.create({
        baseURL: BACKEND_API_ENDPOINT,
        withCredentials: true, // 🔒 Include cookies (e.g. refresh_token)
    });

    // REQUEST INTERCEPTOR: Attach access token
    client.interceptors.request.use(async (config) => {
        if (accessToken) {
            // config.headers = config.headers ?? {};
            // config.headers['Authorization'] = `Bearer ${accessToken}`;

            config.headers = AxiosHeaders.from({
                ...(config.headers || {}),
                Authorization: `Bearer ${accessToken}`,
            });
        }

        return config;
    });

    // RESPONSE INTERCEPTOR (Handle 401 + retry logic = token refresh)
    client.interceptors.response.use(
        (res) => res,
        async (error: AxiosError) => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && originalRequest && !originalRequest?._retry && !isRefreshing) {
                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    const refreshResponse = await axios.post(
                        `${client.defaults.baseURL}/refresh-token`,
                        {refresh_token: refreshToken}, // Use refresh token from header, fallback to cookie if not found
                        {withCredentials: true}
                    );

                    const newAccessToken = refreshResponse.data.access_token;

                    if (newAccessToken) {
                        // Save new access_token in cookie
                        await setCookie({
                            name: 'access_token',
                            value: newAccessToken,
                            maxAge: 60 * 60,
                        });

                        // Retry Original Request with the new Access token
                        originalRequest.headers = AxiosHeaders.from({
                            ...(originalRequest.headers || {}),
                            Authorization: `Bearer ${newAccessToken}`,
                        });

                        return client(originalRequest); // Retry with new token
                    }
                } catch (refreshError) {
                    console.error('Token refresh failed:', refreshError);
                    throw refreshError;
                } finally {
                    isRefreshing = false;
                }
            }

            return Promise.reject(error);
        }
    );

    return client;
}

// Token (authorization and X-Refresh-Token) extraction from raw headers (fallback)
const extractTokenFromHeaders = (req?: Request | { headers: Headers | Record<string, string> }) => {
    let accessToken = null;
    let refreshToken = null;

    if (!req || !req.headers) return {accessToken, refreshToken};

    const headers = req.headers;

    // Case 1: If headers is an instance of Headers (Browser or Fetch API)
    if (headers instanceof Headers) {
        // Extract the access token from the Authorization header
        accessToken = headers.get('authorization')?.replace('Bearer ', '') ?? null;
        // Extract the refresh token from the X-Refresh-Token header (if available)
        refreshToken = headers.get('X-Refresh-Token') ?? null;
    }

    // Case 2: If headers is a plain object (Node.js or Axios request format)
    else if (typeof headers === 'object') {
        accessToken = (headers['authorization'] || headers['Authorization'])?.replace('Bearer ', '') ?? null;
        refreshToken = headers['X-Refresh-Token'] ?? null;
    }
    return {accessToken, refreshToken}
}
