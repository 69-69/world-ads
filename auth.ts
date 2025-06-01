import NextAuth from "next-auth";
import Google from "@auth/core/providers/google";
import GitHub from "@auth/core/providers/github";
import Credentials from "@auth/core/providers/credentials";
import {Profile} from "@/app/models/Profile";
import {isSuccessCode} from "@/app/util/clientUtils";
import {createApiClient} from "@/app/api/createApiClient";
import {setCookie, extractRefreshToken} from "@/app/util/serverUtils";

async function _findUser(credentials: Partial<Record<"email" | "password", unknown>>) {
    const {email, password} = credentials;

    const signinEndpoint = 'auth/signin';
    const apiClient = await createApiClient();

    const response = await apiClient.request({
        method: 'POST',
        url: `/${signinEndpoint}`,
        data: {email, password},
        headers: {'Content-Type': 'application/json'},
    });

    if (!isSuccessCode(response.status)) {
        console.error('Invalid status code:', response.status);
        throw new Error('Login failed with status: ' + response.status);

        // return errorUtils.getError(response);
    }

    const refreshTokenValue = await extractRefreshToken(response.headers['set-cookie']);
    if (refreshTokenValue) {
        await setCookie({name: 'refresh_token', value: refreshTokenValue});
    }
    await setCookie({name: 'access_token', value: response.data.access_token});
    // await new Promise(resolve => setTimeout(resolve, 10)); // Simulate delay for testing

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
            // console.log('Credentials:', credentials);
            try {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required.");
                    // return {};
                }

                const user = await _findUser(credentials);
                const profile = new Profile(user);
                return {
                    id: profile.id,
                    role: profile.role,
                    email: profile.email,
                    name: `${profile.firstname} ${profile.lastname}`,
                    store_id: profile.store_id,
                    image: profile.imageUrl,
                    access_token: profile.access_token,
                    remember_me: credentials.remember_me as boolean,
                    signin_method: "credentials",
                };
            } catch (err) {
                console.error('Authorize error:', err);
                throw new Error('Invalid email or password'); // This will show up on the error page
            }
        },
    }),
];
//
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
            // const cookieStore = await cookies();

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
