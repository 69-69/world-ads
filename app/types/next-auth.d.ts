// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession, DefaultUser, JWT as DefaultJWT } from "next-auth";

// Extending the User type to include `access_token`
declare module "next-auth" {

    // Extending the User type to include custom properties
    interface User extends DefaultUser {
        remember_me?: boolean;
        access_token?: string;
        signin_method?: string;
    }

    // Extending the Session type to include custom user properties
    interface Session extends DefaultSession {
        expires: Date | string;
        user: {
            id: string;
            email: string;
            name: string;
            access_token?: string;
            remember_me?: boolean;
            signin_method?: string;
        };
    }

    // Extending the JWT type to include custom properties
    interface JWT extends DefaultJWT {
        access_token?: string;  // Add `access_token` to the JWT token
    }
    /*interface JWT extends DefaultSession {
        access_token?: string;
    }*/
}
