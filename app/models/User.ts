// models/User.ts

type UserInterface = {
    id: string;
    role?: string;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    phone?: string;
    image?: string;
    is_active?: boolean;
    access_token?: string;
    // [key: string]: string | boolean | undefined;
};

export class User {
    id: string;
    role?: string;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    phone?: string;
    image?: string;
    is_active?: boolean;
    access_token?: string;
    [key: string]: string | unknown | undefined;

    constructor({
                    id,
                    role,
                    username,
                    firstname,
                    lastname,
                    email,
                    phone,
                    image,
                    is_active,
                    access_token,
                }: UserInterface) {
        this.id = id;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.role = role;
        this.phone = phone;
        this.image = image;
        this.is_active = is_active;
        this.access_token = access_token;
    }
}

