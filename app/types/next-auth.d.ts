
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession, DefaultUser, JWT } from "next-auth";

// Extending the User type to include `access_token`
declare module "next-auth" {

    interface User extends DefaultUser {
        access_token?: string;
        signin_method?: string;
    }

    interface Session extends DefaultSession {
        user: {
            id: string;
            email: string;
            name: string;
            access_token?: string;  // Add `access_token` to session user object
        };
    }

    // Extending the JWT type to include `access_token`
    interface JWT extends DefaultSession {
        access_token?: string;  // Add `access_token` to the JWT token
    }
}
