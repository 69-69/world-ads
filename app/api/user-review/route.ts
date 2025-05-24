'use server';
import {getApiClientWithAuth} from "@/app/api/apiClient";
import {NextRequest, NextResponse} from "next/server";
import authOptions from "@/auth";
import axios from "axios";
import {redirect} from "next/navigation";
import {SIGNIN_ROUTE} from "@/app/util/constants";

// General API handler for GET, POST, PUT, DELETE
async function handleRequest(request: NextRequest, method: 'GET' | 'POST' | 'PUT' | 'DELETE') {
    const endpoint = new URL(request.url).searchParams.get('endpoint');
    const reviewEndpoint = `/review${endpoint ?? ''}`;

    // console.log(`Steve-- ${method} REQUEST --`);

    try {
        // Get session from NextAuth
        const session = await authOptions.auth();
        if (!session) {
            redirect(SIGNIN_ROUTE);
            return NextResponse.json({error: 'You must be logged in to perform this action'}, {status: 401});
        }

        // Get the user_id from the session
        const userId = session.user.id;
        if (!userId) {
            return NextResponse.json({error: 'User ID is missing from session'}, {status: 400});
        }

        // Prepare body and headers for the request
        let headers: Record<string, string> | undefined = undefined;
        const body = (method === 'POST' || method === 'PUT') ? await request.json() : undefined;

        if (body) {
            // Dynamically assign user_id from the session
            body.user_id = userId;
            headers = {'Content-Type': 'application/json'};
            console.log('Steve-Prepared headers for POST/PUT');
        }

        // Make the API request using the provided method
        const apiClient = await getApiClientWithAuth();
        const response = await apiClient.request({
            method,
            url: reviewEndpoint,
            data: body,
            headers,
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
