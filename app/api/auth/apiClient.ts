import axios, {AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError} from "axios";
import {getAccessToken, setAccessToken} from "@/app/hooks/useStorageUtils";

// Environment variable
const API_URL = process.env.BACKEND_API_ENDPOINT || 'http://localhost:8080/api';

// Create an Axios instance
const apiClient: AxiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,  // Send cookies when cross-origin requests
});

// Interceptor to inject the access token into each request
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const accessToken = getAccessToken();
        if (accessToken) {
            if (config.headers) {
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response Interceptor for refreshing access token
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response, // If the request is successful, return the response
    async (error) => {
        const originalRequest = error.config;

        // Check if the error status is 401 (Unauthorized) and try to refresh the token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Attempt to refresh the access token
                const refreshResponse = await axios.post(`${apiClient.defaults.baseURL}/refresh-token`, {}, {
                    withCredentials: true,
                });
                // await refreshToken();

                const {access_token} = refreshResponse.data;

                // Set new access token in local storage
                setAccessToken(access_token);

                // Retry the original request with the new access token
                originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
                return apiClient(originalRequest);
            } catch (refreshError) {
                console.error('Failed to refresh token:', refreshError);
                // If refresh fails, redirect to sign-in
                window.location.href = '/signin';

                // Reject the promise
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;