// models/SignIn.ts
//
type SignInForm = {
    email: string;
    password: string;
}

export class SignIn {
    email: string;
    password: string;

    constructor({ email, password }: SignInForm) {
        this.email = email;
        this.password = password;
    }
}
