import NextAuth from "next-auth";
import Google from "@auth/core/providers/google";
import Credentials from "@auth/core/providers/credentials";
import {signInWithCredentials, signOutFromCredentials} from "@/app/api/auth/backend";
import {ApiResponse, User, Profile} from "@/app/models";
import GitHub from "@auth/core/providers/github";

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
                email: email,
                password: password
            });
            // console.log("Sign in with credentials: ", JSON.stringify(result));

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
