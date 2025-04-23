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
    /* config options here */

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
            bodySizeLimit: '3mb',
        },
    },
};

export default nextConfig;

