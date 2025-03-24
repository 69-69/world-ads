// GET request to fetch all posts
import {NextRequest, NextResponse} from "next/server";
import apiClient from "@/app/api/external/apiClient";

export const GET = async (request: NextRequest) => {

    const response = await apiClient({
        method: 'GET',
        url: '/listings',
    });

    const {data} = response;
    // console.log('Steve-Response:', response.status, data);

    return NextResponse.json(data);
}