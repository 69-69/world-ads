'use server';
import {createApiClient} from "@/app/api/createApiClient";
import {NextRequest, NextResponse} from "next/server";
import axios from "axios";

// General API handler for GET, POST, PUT, DELETE
async function handleRequest(request: NextRequest, method: 'GET' | 'POST' | 'PUT' | 'DELETE') {
    const endpoint = new URL(request.url).searchParams.get('endpoint');

    try {

        const body = (method === 'POST' || method === 'PUT') ? await request.json() : undefined;

        // Make the API request using the provided method
        const apiClient = await createApiClient(request);
        const response = await apiClient.request({
            method,
            url: `/condition${endpoint ?? ''}`,
            data: body,
            headers: {'Content-Type': 'application/json'},
        });

        // Return the response from the API
        const {data} = response;
        return NextResponse.json(data, {status: response.status});

    } catch (error: unknown) {
        // Enhanced error handling
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || 'Something went wrong';
            const statusCode = error.response?.status || 500; // Fallback to 500 if no status is available
            console.error('API request failed:', errorMessage, error.response?.data); // Log the error for debugging
            return NextResponse.json({error: errorMessage}, {status: statusCode});
        } else {
            // Handle non-Axios errors (e.g., network errors, unexpected errors)
            console.error('Unexpected error occurred:', error);
            return NextResponse.json({error: 'An unexpected error occurred'}, {status: 500});
        }
    }
}

// Route Handlers for different HTTP methods
export const GET = async (request: NextRequest) => await handleRequest(request, 'GET');
export const POST = async (request: NextRequest) => await handleRequest(request, 'POST');
export const PUT = async (request: NextRequest) => await handleRequest(request, 'PUT');
export const DELETE = async (request: NextRequest) => await handleRequest(request, 'DELETE');
