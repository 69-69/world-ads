import type {NextConfig} from "next";
import {BACKEND_API_BASE_URL, BACKEND_IMAGE_DIR} from "@/env_config";

// Function to extract protocol, hostname and port (if exists)
const extractProtocolHostAndPort = (url: string): {
    protocol?: 'http' | 'https',
    hostname: string,
    port?: string,
    path?: string
} => {
    const regex = /^(?:([a-zA-Z]+):\/\/)?([^:/?#]+)(?::(\d+))?(\/[^?#]*)?/;
    const match = url.match(regex);

    if (match) {
        const protocol = match[1] as 'http' | 'https' | undefined;
        const hostname = match[2];
        const port = match[3];
        const path = match[4];
        return {protocol, hostname, port, path};
    }

    return {hostname: url};
};

// Usage
const urlParts = extractProtocolHostAndPort(BACKEND_API_BASE_URL);
// console.log('steve-urlParts-hostname', urlParts.path ?? 'no-path'); // { protocol: 'https', hostname: 'istorezhona.shop', port: undefined }
const nextConfig: NextConfig = {
    env: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        BACKEND_API_BASE_URL: BACKEND_API_BASE_URL,
        BACKEND_IMAGE_DIR: BACKEND_IMAGE_DIR,
        BACKEND_IMAGE_PATH: BACKEND_API_BASE_URL + BACKEND_IMAGE_DIR,
        BACKEND_MARKETPLACE_IMAGE_PATH: BACKEND_API_BASE_URL + (process.env.NEXT_PUBLIC_BACKEND_MARKETPLACE_IMAGE_PATH || '/marketplace_images'),
        BACKEND_STORE_SETUP_LOGO_PATH: BACKEND_API_BASE_URL + (process.env.NEXT_PUBLIC_BACKEND_STORE_SETUP_LOGO_PATH || '/store_setup_logo'),
        BACKEND_PROMO_IMAGE_PATH: BACKEND_API_BASE_URL + (process.env.NEXT_PUBLIC_BACKEND_PROMO_IMAGE_PATH || '/promo_bg_images'),
    },
    // config hostname for image optimization
    images: {
        remotePatterns: [
            {
                protocol: urlParts.protocol ?? 'http',
                hostname: urlParts.hostname,
                port: urlParts.port ?? '',
                pathname: (urlParts.path ?? '') + BACKEND_IMAGE_DIR + '/**', // The path pattern for your images
                search: '', // Optional
            }
        ],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '1024mb',
            allowedOrigins: ['istorezhona.shop', '*.istorezhona.shop'],
        },
    },
};

export default nextConfig;

