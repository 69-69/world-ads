'use server';
import {getApiClientWithAuth} from "@/app/api/apiClient";
import {NextRequest, NextResponse} from "next/server";
import axios from "axios";

/*export const config = {
  api: {
    responseLimit: false,
  },
}*/

// General API handler for GET, POST, PUT, DELETE
async function handleRequest(req: NextRequest, method: 'GET' | 'POST' | 'PUT' | 'DELETE') {
    const endpoint = new URL(req.url).searchParams.get('endpoint');

    const fullEndpoint = `/market-place${endpoint ?? ''}`;
    // console.log('Steve-Full-Endpoint-2:', fullEndpoint);
    const isWriteMethod = method === 'POST' || method === 'PUT';

    try {

        const apiClient = await getApiClientWithAuth(req);
        const headers: Record<string, string> = {};

        let data = undefined;
        if (isWriteMethod) {
            // Parse the body differently depending on the method
            if (method === 'PUT') {
                data = await req.json();
                headers['Content-Type'] = 'application/json';
            } else {
                data = await req.formData();
                headers['Content-Type'] = 'multipart/form-data';
            }
        }

        // console.log('Steve-Request-Method-2-2:', method, data.get('user_id'), data.get('name'), data.get('description'), data.get('regular_price'), data.get('sales_price'), data.get('stock_level'));
        const res = await apiClient.request({method, url: fullEndpoint, data, headers});
        return NextResponse.json(res.data, {status: res.status});

    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || error.message || 'Request failed';
            const status = error.response?.status || 500;
            return NextResponse.json({error: message}, {status});
        }

        return NextResponse.json({error: 'Unexpected server error'}, {status: 500});
    }
}

// Route Handlers
export const GET = async (request: NextRequest) => await handleRequest(request, 'GET');
export const POST = async (request: NextRequest) => await handleRequest(request, 'POST');
export const PUT = async (request: NextRequest) => await handleRequest(request, 'PUT');
export const DELETE = async (request: NextRequest) => await handleRequest(request, 'DELETE');

