import type {NextConfig} from "next";
import {BACKEND_BASE_URL, BACKEND_IMAGE_BASE_URL} from "@/env_config";

// Function to extract protocol, hostname and port (if exists)
const extractProtocolHostAndPort = (url: string): { protocol?: 'http' | 'https', hostname: string, port?: string } => {
    const regex = /^(?:([a-zA-Z]+):\/\/)?([^:/]+)(?::(\d+))?/;
    const match = url.match(regex);

    if (match) {
        const protocol = match[1] as 'http' | 'https' | undefined;  // Type assertion to ensure protocol is either 'http', 'https', or undefined
        const hostname = match[2];
        const port = match[3];
        return {protocol, hostname, port};
    }

    return {hostname: url};
};

// Usage
const urlParts = extractProtocolHostAndPort(BACKEND_BASE_URL);

const nextConfig: NextConfig = {
    /* config options here */

    // config hostname for image optimization
    images: {
        remotePatterns: [
            {
                protocol: urlParts.protocol ?? 'http',
                hostname: urlParts.hostname,
                port: urlParts.port,
                pathname: BACKEND_IMAGE_BASE_URL+'/**', // The path pattern for your images
                search: '', // Optional
            }
        ],
    }
};

export default nextConfig;

