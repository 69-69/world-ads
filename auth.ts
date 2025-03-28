import NextAuth from "next-auth";
import Google from "@auth/core/providers/google";
import GitHub from "@auth/core/providers/github";
import Credentials from "@auth/core/providers/credentials";
import {Profile} from "@/app/models/Profile";
import {inRange} from "@/app/hooks/useHelper";
import apiClient from "@/app/api/external/apiClient";
import {signinEndpoint, signOutEndpoint} from "@/app/api/external/endPoints";
import {cookies} from "next/headers";


const _signIn = '/signin';

async function findUser(credentials: Partial<Record<"email" | "password", unknown>>) {
    const {email, password} = credentials;

    const response = await apiClient({
        method: 'POST',
        url: `/${signinEndpoint}`,
        data: {email, password},
    });

    if (!inRange(response.status, 200, 299)) {
        throw new Error("Invalid email or password.");
    }

    const profile = response.data as Profile;
    if (profile.access_token) {
        const cookieStore = await cookies();
        cookieStore.set('access_token', profile.access_token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
            secure: process.env.COOKIE_SECURE === "production",
            path: '/',
            sameSite: 'lax',
        });
    }

    return profile;
}

const authConfig = [
    Google({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
        clientId: process.env.AUTH_GITHUB_ID,
        clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
        credentials: {
            email: {label: "Email", name: 'email', type: "text"},
            password: {label: "Password", name: 'password', type: "password"},
            remember_me: {label: "Remember Me", name: 'remember_me', type: "checkbox"},
        },
        authorize: async (credentials) => {
            if (!credentials?.email || !credentials?.password) {
                throw new Error("Email and password are required.");
            }

            const user = await findUser(credentials);
            const profile = new Profile(user);
            return {
                id: profile.id,
                role: profile.role,
                email: profile.email,
                name: `${profile.firstname} ${profile.lastname}`,
                store_id: profile.store_id,
                image: profile.image,
                access_token: profile.access_token,
                remember_me: credentials.remember_me as boolean,
                signin_method: "credentials",
            };
        },
    }),
];

export const authOptions = NextAuth({
    providers: authConfig,
    session: {strategy: "jwt"},
    pages: {signIn: _signIn, error: '/error'},
    callbacks: {
        async redirect({url, baseUrl}) {
            // Ensure that the redirect URL is valid and points to a safe location
            if (url.startsWith(baseUrl)) return url; // If the URL starts with the base URL, allow redirection

            return baseUrl;  // Otherwise, fallback to the base URL
        },

        async jwt({token, user}) {
            // Add user to token on first sign-in
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.store_id = user.store_id;
                token.access_token = user.access_token;
                token.signin_method = user.signin_method;
                token.remember_me = user.remember_me;
            }
            return token;
        },

        async session({session, token}) {
            // If not remember me, set session to expire in 24 hours
            if (!token?.remember_me) {
                // console.log('Session expires in 1 hour');
                session.expires = new Date(Date.now() + (60 * 60 * 1000)); // 1 hour in milliseconds
            }

            // Attach token data to session
            if (token) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.store_id = token.store_id as string;
                session.sessionToken = token.access_token as string;
                session.user.access_token = token.access_token as string;
                session.user.signin_method = token.signin_method as string;
                session.user.remember_me = token.remember_me as boolean;
            }

            return session;
        },
    },
});

// Handle sign-out based on the sign-in method
export const handleSignOut = async () => {
    try {
        // If Signed in via Social Media, sign out using the Auth provider
        const session = await authOptions.auth();
        if (session?.user.signin_method !== 'credentials') {
            await authOptions.signOut({redirectTo: _signIn});
            return true;
        }

        // Else, sign out using the Backend-API
        const response = await apiClient({method: 'POST', url: `/${signOutEndpoint}`});
        if (inRange(response.status, 200, 299)) {
            const cookieStore = await cookies();
            cookieStore.delete('authjs.session-token');
            cookieStore.delete('access_token');
            cookieStore.delete('profile');
            cookieStore.delete('signin_method');
            cookieStore.delete('signup_token');
            return true;
        }
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : "Something went wrong, please try again"
        );
    }
};

