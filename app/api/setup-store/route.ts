'use server';
import apiClient from "@/app/api/external/apiClient";
import {NextRequest, NextResponse} from "next/server";

// General API handler for GET, POST, PUT, DELETE
async function handleRequest(request: NextRequest, method: 'GET' | 'POST' | 'PUT' | 'DELETE') {

    try {
        const body = method === 'POST' || method === 'PUT' ? await request.json() : undefined;

        const response = await apiClient({method, url: '/setup-seller', data: body});

        const {data} = response;

        return NextResponse.json(data);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
        return NextResponse.json({error: errorMessage}, {status: 500});
    }
}

// Route Handlers
export const POST = async (request: NextRequest) => await handleRequest(request, 'POST');
export const PUT = async (request: NextRequest) => await handleRequest(request, 'PUT');
export const GET = async (request: NextRequest) => await handleRequest(request, 'GET');
export const DELETE = async (request: NextRequest) => await handleRequest(request, 'DELETE');

