'use server';
import apiClient from "@/app/api/external/apiClient";
import {NextRequest, NextResponse} from "next/server";
import {authOptions} from "@/auth";
import axios from "axios";


// General API handler for GET, POST, PUT, DELETE
async function handleRequest(request: NextRequest, method: 'GET' | 'POST' | 'PUT' | 'DELETE') {
    const postAdEndpoint = '/listings';


    try {
        let headers: Record<string, string> | undefined = undefined;
        const body = method === 'POST' || method === 'PUT' ? await request.formData() : undefined;
        if (body) {
            // Get session from NextAuth
            const session = await authOptions.auth();
            if (!session) {
                return NextResponse.json({error: 'You must be logged in to perform this action'}, {status: 401});
            }

            body.append('user_id', session.user.id);
            headers = {
                'Content-Type': 'multipart/form-data',
            };
        }

        const response = await apiClient({
            method,
            url: postAdEndpoint,
            data: body,
            headers,
        });

        const {data} = response;

        return NextResponse.json(data, {status: response.status});
    } catch (error: unknown) {
        // Type-guarding the error to ensure it's an AxiosError
        if (axios.isAxiosError(error)) {
            // console.log('Steve-Axios-error:', error.message, 'steve-res-error', error.response?.data);
            const errorMessage = error.response?.data?.message || 'Something went wrong';
            const statusCode = error.response?.status || 500; // Use status from the error response or default to 500

            return NextResponse.json({error: errorMessage}, {status: statusCode});
        } else {
            // Handle non-Axios errors (if any)
            return NextResponse.json({error: 'Something went wrong'}, {status: 500});
        }
    }
}

// Route Handlers
export const GET = async (request: NextRequest) => await handleRequest(request, 'GET');
export const POST = async (request: NextRequest) => await handleRequest(request, 'POST');
export const PUT = async (request: NextRequest) => await handleRequest(request, 'PUT');
export const DELETE = async (request: NextRequest) => await handleRequest(request, 'DELETE');

/*export const GET = async (request: NextRequest) => {

    try {


        const response = await apiClient({
            method: 'GET',
            url: '/listings',
        });

        const {data} = response;

        return NextResponse.json(data);
    } catch (error: unknown) {
        return NextResponse.json({error: 'Something went wrong'}, {status: 500});
    }
}*/
