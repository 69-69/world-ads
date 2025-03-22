import {cookies} from 'next/headers'
import axios, {AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from "axios";


const API_URL = process.env.BACKEND_API_ENDPOINT || 'http://127.0.0.1:5000/api';

// Create an Axios instance
const apiClient: AxiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,  // Send cookies with cross-origin requests
});

const cookieStores = async () => await cookies();

// Interceptor to inject the access token into each request
apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        // const fullUrl = `${config.baseURL}${config.url}`;
        // console.log('Steve-Full-URL:', fullUrl);

        const cookieStore = await cookieStores();
        const accessToken = cookieStore.get('access_token')?.value;

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

// Response Interceptor for refreshing access token
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
        const originalRequest = error.config;

        // console.log('Steve-api-client-status:', error.response?.status);
        if (originalRequest && error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // console.log('Steve-api-client-Original-Request:', originalRequest);
            try {
                const [refreshResponse, cookieStore] = await Promise.all([
                    axios.post(`${apiClient.defaults.baseURL}/refresh-token`, {}, {withCredentials: true}),
                    cookieStores(),
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

export default apiClient;

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