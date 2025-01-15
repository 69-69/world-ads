// models/User.ts

type _UserInterface = {
    id: string;
    role?: string;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    phone?: string;
    image?: string;
    is_verified?: boolean;
    access_token?: string;
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
    is_verified?: boolean;
    access_token?: string;

    constructor({
                    id,
                    role,
                    username,
                    firstname,
                    lastname,
                    email,
                    phone,
                    image,
                    is_verified,
                    access_token,
                }: _UserInterface) {
        this.id = id;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.role = role;
        this.phone = phone;
        this.image = image;
        this.is_verified = is_verified;
        this.access_token = access_token;
    }

    fullName(): string {
        return `${this.firstname} ${this.lastname}`;
    }
}

