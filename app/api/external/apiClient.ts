import {cookies} from 'next/headers'
import axios, {AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from "axios";


const API_URL = process.env.BACKEND_API_ENDPOINT || 'http://localhost:8080/api';

const apiClient: AxiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,  // Send cookies with cross-origin requests
});

const cookieStores = async () => await cookies();

// Request Interceptor for Authorization Token
apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const fullUrl = `${config.baseURL}${config.url}`;
        console.log('Steve-Full-URL:', fullUrl, 'refresh_token-> ' + config.headers.has('refresh_token'));

        const cookieStore = await cookieStores();
        const accessToken = cookieStore.get('access_token');
        if (accessToken && config.headers) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// Response Interceptor to refresh token if needed
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error/*: AxiosError*/) => {
        const originalRequest = error.config;

        if (originalRequest && error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const [refreshResponse, cookieStore] = await Promise.all([
                    axios.post(`${apiClient.defaults.baseURL}/refresh-token`, {}, {withCredentials: true}),
                    cookieStores(),
                ]);
                const {access_token} = refreshResponse.data;

                cookieStore.set('access_token', access_token);
                originalRequest.headers['Authorization'] = `Bearer ${access_token}`;

                return apiClient(originalRequest);
            } catch (refreshError) {
                window.location.href = '/signin';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;


/*
import axios, {AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError} from "axios";
import {getAccessToken, cacheAccessToken} from "@/app/hooks/useCache";

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
        const fullUrl = `${config.baseURL}${config.url}`;
        console.log('Steve Request URL:', fullUrl);  // Log the full URL here

        const accessToken = getAccessToken(null);
        if (accessToken) {
            if (config.headers) {
                // JWT Authorization: Inject the access token into the Authorization header for each request
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
                cacheAccessToken({access_token: access_token});

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


/!*import axios from 'axios';

const EXTERNAL_API_URL = 'https://external-api.example.com';  // Replace with your external API URL

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        // Fetch data from external API
        const getResponse = await axios.get(EXTERNAL_API_URL);
        return res.status(200).json(getResponse.data);

      case 'POST':
        // Send data to external API
        const postResponse = await axios.post(EXTERNAL_API_URL, req.body);
        return res.status(201).json(postResponse.data);

      case 'PUT':
        // Update data on the external API
        const putResponse = await axios.put(`${EXTERNAL_API_URL}/${req.query.id}`, req.body);
        return res.status(200).json(putResponse.data);

      case 'DELETE':
        // Delete data from the external API
        await axios.delete(`${EXTERNAL_API_URL}/${req.query.id}`);
        return res.status(204).end();

      default:
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

=========

const sendData = async () => {
  const response = await fetch('/api/externalApi', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ key: 'value' }),  // Send data in the request body
  });

  const result = await response.json();
  console.log(result);
};

=========

import axios from 'axios';
import nookies from 'nookies';

const EXTERNAL_API_URL = 'https://external-api.example.com';  // Replace with your external API URL

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        // Fetch data from external API
        const getResponse = await axios.get(EXTERNAL_API_URL);

        // Save some data in cookies
        nookies.set({ res }, 'externalData', JSON.stringify(getResponse.data), {
          maxAge: 30 * 24 * 60 * 60, // Cookie expires in 30 days
          path: '/', // Cookie is available for the entire site
        });

        return res.status(200).json(getResponse.data);

      case 'POST':
        // Send data to external API
        const postResponse = await axios.post(EXTERNAL_API_URL, req.body);

        // Save some data in cookies
        nookies.set({ res }, 'externalData', JSON.stringify(postResponse.data), {
          maxAge: 30 * 24 * 60 * 60, // Cookie expires in 30 days
          path: '/', // Cookie is available for the entire site
        });

        return res.status(201).json(postResponse.data);

      case 'PUT':
        // Update data on the external API
        const putResponse = await axios.put(`${EXTERNAL_API_URL}/${req.query.id}`, req.body);
        return res.status(200).json(putResponse.data);

      case 'DELETE':
        // Delete data from the external API
        await axios.delete(`${EXTERNAL_API_URL}/${req.query.id}`);
        return res.status(204).end();

      default:
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

=========

import { useState, useEffect } from 'react';
import nookies from 'nookies';

export default function Home({ initialData }) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (!data) {
      const cookies = nookies.get();
      if (cookies.externalData) {
        setData(JSON.parse(cookies.externalData));
      }
    }
  }, [data]);

  return (
    <div>
      <h1>External API Data (from cookies)</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);

  // Check if the cookie exists and pass the data to the page
  const externalData = cookies.externalData ? JSON.parse(cookies.externalData) : null;

  return {
    props: {
      initialData: externalData,
    },
  };
}


=========


import axios from 'axios';
import { NextResponse } from 'next/server';

const EXTERNAL_API_URL = 'https://external-api.example.com';

export async function GET() {
  try {
    const response = await axios.get(EXTERNAL_API_URL);

    // Set cookies in the response using NextResponse.cookies.set
    const res = NextResponse.json(response.data);
    res.cookies.set('externalData', JSON.stringify(response.data), {
      httpOnly: true, // Cookie will only be accessible from the server
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/', // Cookie is available for the entire site
    });

    return res;
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const response = await axios.post(EXTERNAL_API_URL, body);

    // Set cookies after POST request
    const res = NextResponse.json(response.data);
    res.cookies.set('externalData', JSON.stringify(response.data), {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    return res;
  } catch (error) {
    return NextResponse.error();
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const response = await axios.put(`${EXTERNAL_API_URL}/update`, body);

    // Set cookies after PUT request
    const res = NextResponse.json(response.data);
    res.cookies.set('externalData', JSON.stringify(response.data), {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    return res;
  } catch (error) {
    return NextResponse.error();
  }
}

=========

NextResponse.cookies.set()
app/api/externalApi.ts

=========


import { cookies } from 'next/headers';

export async function getServerSideProps(ctx) {
  // Access cookies in server-side rendering
  const cookieData = cookies().get('externalData');

  // If cookie exists, parse and pass data as props
  const data = cookieData ? JSON.parse(cookieData.value) : null;

  return {
    props: {
      externalData: data,
    },
  };
}

export default function Page({ externalData }) {
  return (
    <div>
      <h1>External Data</h1>
      <pre>{JSON.stringify(externalData, null, 2)}</pre>
    </div>
  );
}

*!/*/
