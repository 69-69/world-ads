import {authOptions} from "@/auth";
import {NextResponse} from 'next/server';
import {
    HOME_ROUTE,
    SIGNIN_ROUTE,
    POST_ADS_ROUTE,
    PROTECTED_AUTH_ROUTES,
    PROTECTED_RESOURCES_ROUTES, SIGNUP_ROUTE, VERIFICATION_ROUTE,
} from '@/app/hooks/useConstants';
// import {getToken} from '@auth/core/jwt';

// Helper function to generate a random hash (8-character random string)
const generateRandomHash = (length: number = 32): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

// Function to determine if a route needs to be protected for authenticated users
const isProtectedAuthRoute = (pathname: string): boolean =>
    PROTECTED_AUTH_ROUTES.some(route => route === pathname);

// Function to determine if a route needs to be protected for unauthenticated users
const isProtectedResourceRoute = (pathname: string): boolean =>
    PROTECTED_RESOURCES_ROUTES.some(route => route === pathname);

export default authOptions.auth((req) => {
    // Get user session token
    const session = req.auth;
    // await getToken({req, secret: process.env.AUTH_SECRET});
    const {pathname} = req.nextUrl;

    // If user is authenticated, protect auth routes (e.g. sign-in, sign-up)
    if (session) {
        // If user is signed in, redirect them away from auth routes (e.g. sign-in, sign-up)
        if (isProtectedAuthRoute(pathname)) {
            return NextResponse.redirect(new URL(HOME_ROUTE, req.url));
        }

        // Special case: Handle post ads route with dynamic hash generation
        if (pathname === POST_ADS_ROUTE) {
            const randomHash = generateRandomHash();
            const newUrl = `${POST_ADS_ROUTE}/${randomHash}`;

            return NextResponse.redirect(new URL(newUrl, req.url));
        }
    }

    // If user is not authenticated, protect resource routes (e.g. settings, posts)
    if (!session) {
        if (isProtectedResourceRoute(pathname)) {
            return NextResponse.redirect(new URL(SIGNIN_ROUTE, req.url));
        }

        if (pathname === VERIFICATION_ROUTE) {
            // http://localhost:3000/verify-token?signup_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJzdHJpbmciOiJodHRwczovL3N0ZXZlLmNvbS9zdWJzdHJpbmciLCJpYXQiOjE2MzQwNzQwNzMsImV4cCI6MTYzNDA3NzY3M30.1

            // If signup token is not available and user tries to access the verification route, redirect to sign-up
            if (!req.cookies.has('signup_token')) {
                return NextResponse.redirect(new URL(SIGNUP_ROUTE, req.url));
            }

            // Special case: Handle verify contacts route with dynamic hash generation
            const randomHash = generateRandomHash();
            const newUrl = `${VERIFICATION_ROUTE}/${randomHash}`;

            return NextResponse.redirect(new URL(newUrl, req.url));
        }
    }


    // Continue processing other routes
    return NextResponse.next();
});

// Static config export for Next.js
export const config = {
    matcher: [
        // Match all request paths except for the ones starting with:
        // - api (API routes)
        // - _next/static (static files)
        // - _next/image (image optimization files)
        // - favicon.ico (favicon file)
        '/((?!api|_next/static|_next/image|favicon.ico).*)',

        // Resource Routes
        '/orders',
        '/checkout',
        '/setup-store',
        '/posts/:path*', // Dynamic route

        // Auth Routes
        '/signin',
        '/signup',
        '/verify-contact',
        '/forgot-password',
        '/reset-password',
    ],
};
