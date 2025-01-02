// models/User.ts

type UserInterface = {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    role?: string;
    phone?: string;
    image?: string;
    is_verified?: boolean;
    access_token?: string;
};

export class User {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    role?: string;
    phone?: string;
    image?: string;
    is_verified?: boolean;
    access_token?: string;

    constructor({
                    id,
                    username,
                    first_name,
                    last_name,
                    email,
                    role,
                    phone,
                    image,
                    is_verified,
                    access_token,
                }: UserInterface) {
        this.id = id;
        this.username = username;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.role = role;
        this.phone = phone;
        this.image = image;
        this.is_verified = is_verified;
        this.access_token = access_token;
    }

    fullName(): string {
        return `${this.first_name} ${this.last_name}`;
    }
}

