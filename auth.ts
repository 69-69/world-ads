import NextAuth from "next-auth";
import Google from "@auth/core/providers/google";
import GitHub from "@auth/core/providers/github";
import Credentials from "@auth/core/providers/credentials";
import {Profile} from "@/app/models/Profile";
import {inRange} from "@/app/hooks/useValidation";
import apiClient from "@/app/api/external/apiClient";
import {signinEndpoint, signOutEndpoint} from "@/app/api/external/endPoints";
import {cookies} from "next/headers";


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

    return response.data as Profile;
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
                access_token: profile.access_token,
                image: profile.image ?? 'https://via.placeholder.com/150/0000FF/808080?text=Profile+Image',
                remember_me: credentials.remember_me as boolean,
                signin_method: "credentials",
            };
        },
    }),
];

export const authOptions = NextAuth({
    providers: authConfig,
    session: {strategy: "jwt"},
    pages: {signIn: '/signin', error: '/error'},
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
                token.access_token = user.access_token;
                token.signin_method = user.signin_method;
                token.remember_me = user.remember_me;
            }
            return token;
        },

        async session({session, token}) {
            // If not remember me, set session to expire in 24 hours
            if (!token?.remember_me) {
                // console.log('Session expires in 24 hours');
                session.expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
            }

            // Attach token data to session
            if (token) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.sessionToken = token.access_token as string;
                session.user.access_token = token.access_token as string;
                session.user.signin_method = token.signin_method as string;
                session.user.remember_me = token.remember_me as boolean;
            }
            return session;
        },
    },
});

// Sign out from the backend-account server via API
export const accountSignOut = async () => {
    try {
        const response = await apiClient({method: 'POST', url: `/${signOutEndpoint}`});

        // Check if the response status is within the 2xx range (successful)
        if (inRange(response.status, 200, 299)) {
            const cookieStore = await cookies();
            cookieStore.delete('access_token');
            cookieStore.delete('profile');
            cookieStore.delete('signin_method');
            cookieStore.delete('signup_token');

            window.location.href = '/signin';
        }
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : "Something went wrong, please try again"
        );
    }
};


/*import NextAuth from "next-auth";
import Google from "@auth/core/providers/google";
import Credentials from "@auth/core/providers/credentials";
import {signInWithCredentials, signOutFromCredentials} from "@/app/api/external/backend";
import {ApiResponse, User, Profile} from "@/app/models";


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
            email: {label: "Email", type: "text"},
            password: {label: "Password", type: "password"},
        },
        authorize: async (credentials) => {
            if (!credentials?.email || !credentials?.password) {
                throw new Error("Email and password are required.");
            }

            // Logic to verify if the user exists
            const email = credentials.email as string;
            const password = credentials.password as string;

            const result: ApiResponse<User | string> = await signInWithCredentials({
                email,
                password,
            });

            if (result.status !== 200) {
                throw new Error("Invalid email or password.");
            }

            const user = result.data as Profile;
            const profile = new Profile(user);

            // Return user object with their profile data
            return {
                id: profile.id,
                role: profile.role,
                email: profile.email,
                name: profile.fullName(),
                access_token: profile.access_token,
                image: profile.image,
                signin_method: "credentials",
            };
        },
    }),
];

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: authConfig,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/signin', // Custom sign-in page
        error: '/error', // Custom error page
    },
    callbacks: {
        async redirect({url, baseUrl}) {
            // Ensure that the redirect URL is valid and points to a safe location
            if (url.startsWith(baseUrl)) return url; // If the URL starts with the base URL, allow redirection

            // Allows callback URLs on the same origin
            if (new URL(url).origin === baseUrl) return url

            return baseUrl;  // Otherwise, fall back to the base URL
        },

        async jwt({token, user}) {
            // Add user to token on first sign-in
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.access_token = user.access_token;
                token.signin_method = user.signin_method;
            }
            return token;
        },
        async session({session, token}) {
            // Attach token data to session
            if (token) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.sessionToken = token.access_token as string;
            }
            return session;
        },
    },
});

// Sign out from the backend-account server via API
export const signOutServer = async () => {
    try {
        const response = await signOutFromCredentials();
        console.log("Sign out response: ", response);
        return response;
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : "Something went wrong, please try again"
        );
    }
};
*/
