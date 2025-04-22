'use server';
import {getApiClientWithAuth} from "@/app/api/external/apiClient";
import {NextRequest, NextResponse} from "next/server";
import axios from "axios";

// General API handler for GET, POST, PUT, DELETE
async function handleRequest(request: NextRequest, method: 'GET' | 'POST' | 'PUT' | 'DELETE') {
    const setupEndpoint = '/setup-seller';
    // console.log('Steve-Setup-Store-routeHandler:', request);
    try {
        const body = method === 'POST' || method === 'PUT' ? await request.formData() : undefined;

        const apiClient = await getApiClientWithAuth();
        const response = await apiClient.request({
            method,
            url: setupEndpoint,
            data: body,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        const {data} = response;

        return NextResponse.json(data, { status: response.status });
    } catch (error: unknown) {
        // Type-guarding the error to ensure it's an AxiosError
        if (axios.isAxiosError(error)) {
            // console.log('Steve-Axios-error:', error.message, 'steve-res-error', error.response?.data);
            const errorMessage = error.response?.data?.message || 'Something went wrong';
            const statusCode = error.response?.status || 500; // Use status from the error response or default to 500

            return NextResponse.json({ error: errorMessage }, { status: statusCode });
        } else {
            // Handle non-Axios errors (if any)
            return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
        }
    }
}

// Route Handlers
export const POST = async (request: NextRequest) => await handleRequest(request, 'POST');
export const PUT = async (request: NextRequest) => await handleRequest(request, 'PUT');
export const GET = async (request: NextRequest) => await handleRequest(request, 'GET');
export const DELETE = async (request: NextRequest) => await handleRequest(request, 'DELETE');

