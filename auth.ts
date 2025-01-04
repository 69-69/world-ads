import NextAuth from "next-auth";
import Google from "@auth/core/providers/google";
import Credentials from "@auth/core/providers/credentials";
import {signInWithCredentials, signOutFromCredentials} from "@/app/api/auth/backend";
import {ApiResponse, User, Profile} from "@/app/models";

const authOptions = [
    Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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

            if (result.status !== 200) {
                throw new Error("Invalid email or password.");
            }

            const user = result.data as Profile;

            // Return user object with their profile data
            return {
                id: user.id,
                role: user.role,
                email: user.email,
                name: user.fullName(),
                image: user.image,
                access_token: user.access_token,
            };
        },
    }),
];

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: authOptions,
    session: {
        strategy: "jwt",
    },
    callbacks: {
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
