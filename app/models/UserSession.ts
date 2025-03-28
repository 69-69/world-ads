export interface UserSession {
    expires: Date | string;
    user: {
        id: string;
        email: string;
        name: string;
        store_id?: string;
        access_token?: string;
        remember_me?: boolean;
        signin_method?: string;
    } | null; // `user` can be null if session is not valid
}


