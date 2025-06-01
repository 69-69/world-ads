import authOptions from "@/auth";
import {NextResponse} from 'next/server';
import {
    HOME_ROUTE,
    SIGNIN_ROUTE,
    PROTECTED_AUTH_ROUTES,
    PROTECTED_RESOURCES_ROUTES, SIGNUP_ROUTE, VERIFICATION_ROUTE, SETUP_STORE_ROUTE,
} from '@/app/util/constants';
import {matchRouteWithParams, routeWithHashKey} from "@/app/util/clientUtils";

// import {getToken} from '@auth/core/jwt';


// Helper: Protect auth routes from logged-in users
const isProtectedAuthRoute = (pathname: string): boolean =>
    PROTECTED_AUTH_ROUTES.some(route => matchRouteWithParams(route, pathname));

// Helper: Protect resource routes from guests
const isProtectedResourceRoute = (pathname: string): boolean =>
    PROTECTED_RESOURCES_ROUTES.some(route => matchRouteWithParams(route, pathname));


// Auth Middleware (with session checks)
export default authOptions.auth((req) => {
    const session = req.auth; // Get user session token
    const {pathname, searchParams} = req.nextUrl; // Extract pathname and search parameters from the request URL

    // Allow logged-in user to access /signin if it's part of a logout flow
    const isLoggingOut = pathname === SIGNIN_ROUTE && searchParams.get("logout") === "true";

    // Logged-in user
    if (session) {
        // Prevent access to (signin/signup/setup/etc) unless logging out
        if (isProtectedAuthRoute(pathname) && !isLoggingOut) {
            const response = routeWithHashKey(req.url, `${HOME_ROUTE}?logout=true`, {char: '#'});

            // Delete all cookies via response
            req.cookies.getAll().forEach(cookie => response.cookies.delete(cookie.name));

            return response;
        }
    }

    // Guest user
    if (!session) {
        // If user is not authenticated, protect resource routes (e.g. settings, posts,...)
        if (isProtectedResourceRoute(pathname)) {
            return NextResponse.redirect(new URL(SIGNIN_ROUTE, req.url));
        }

        if ([VERIFICATION_ROUTE, SETUP_STORE_ROUTE].includes(pathname)) {
            // console.log('signup_token missing: ' + removeParams(pathname) + '--' + req.cookies.has('signup_token'));

            // If signup token is missing and user tries to access the (verification, setup-store) route, redirect to sign-up
            if (!req.cookies.has('signup_token')) {
                return NextResponse.redirect(new URL(SIGNUP_ROUTE, req.url));
            }

            // Special case: Handle verify contacts route with dynamic hash generation
            if (pathname === VERIFICATION_ROUTE) {
                return routeWithHashKey(req.url, VERIFICATION_ROUTE);
            }
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

        '/api/:path*', // Apply CORS to all API routes

        // Resource Routes
        '/orders',
        '/checkout',
        '/setup-store',
        '/post/:path*', // Matches /post/anything
        '/admin/:path*', // Matches /admin/anything
        '/admin/:path*/:path*/', // Matches anything under /admin/:path* (e.g., /admin/settings, /admin/users/details)

        // Auth Routes
        '/signin',
        '/signup',
        '/verify-contact',
        '/forgot-password',
        '/reset-password',
    ],
};

/*
const allowedOrigins = [
    'https://istorezhona.shop',
    'https://!*.istorezhona.shop',
    'http://127.0.0.1:5000',
];

function isOriginAllowed(origin: string): boolean {
    return allowedOrigins.some((allowed) => {
        if (allowed.startsWith('https://!*.')) {
            const domain = allowed.replace('https://!*.', '');
            return origin === `https://${domain}` || origin.endsWith(`.${domain}`);
        }
        return origin === allowed;
    });
}

export const corsMiddleware = (request: NextRequest) => {
    const origin = request.headers.get('origin') || '';

    if (isOriginAllowed(origin)) {
        const response = NextResponse.next();
        response.headers.set('Access-Control-Allow-Origin', origin);
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        return response;
    }

    return NextResponse.next();
};
*/
