import NextAuth from "next-auth";
import Google from "@auth/core/providers/google";
import GitHub from "@auth/core/providers/github";
import Credentials from "@auth/core/providers/credentials";
import {Profile} from "@/app/models/Profile";
import {inRange} from "@/app/util/clientUtils";
import {getApiClientWithAuth} from "@/app/api/apiClient";
import {errorUtils} from "@/app/util/serverUtils";
import {cookies} from "next/headers";


async function findUser(credentials: Partial<Record<"email" | "password", unknown>>) {
    const {email, password} = credentials;

    const signinEndpoint = 'auth/signin';
    const apiClient = await getApiClientWithAuth();

    const response = await apiClient.request({
        method: 'POST',
        url: `/${signinEndpoint}`,
        data: {email, password},
        headers: {'Content-Type': 'application/json'},
    });
    // console.log('Steve-Response:', response.headers);

    if (!inRange(response.status, 200, 299)) {
        return errorUtils.getError(response);
        // throw new Error("Invalid email or password.");
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
                // throw new Error("Email and password are required.");
                return {};
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

const authOptions = NextAuth({
    providers: authConfig,
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60, // 24 hours in seconds
    },
    pages: {signIn: '/signin', error: '/error'},
    callbacks: {
        async redirect({url, baseUrl}) {
            // Ensure that the redirect URL is valid and points to a safe location
            if (url.startsWith(baseUrl)) return url; // If the URL starts with the base URL, allow redirection

            return baseUrl;  // Otherwise, fallback to the base URL
        },

        async jwt({token, user}) {
            const cookieStore = await cookies();

            // Add user to token on first sign-in
            if (user) {
                cookieStore.set({
                    name: 'access_token',
                    value: token.access_token as string,
                    httpOnly: true,
                    secure: process.env.COOKIE_SECURE === 'production',
                    sameSite: 'lax',
                    path: '/',
                    maxAge: 60 * 60, // 1 hour in seconds  * 1000
                });

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
                const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
                session.expires = new Date(Date.now() + oneHour);
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
    secret: process.env.AUTH_SECRET,
});

/*export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [GitHub, Google],
})*/
export default authOptions;
