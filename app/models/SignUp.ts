// models/SignUp.ts
//
export type SignUpForm = {
    email: string;
    phone: string;
    password: string;
    firstname: string;
    lastname: string;
    account_type: string;
};

export class SignUp {
    role: string;
    email: string;
    phone: string;
    password: string;
    firstname: string;
    lastname: string;

    constructor(form: SignUpForm) {
        this.role = form.account_type || 'user';
        this.email = form.email;
        this.password = form.password
        this.firstname = form.firstname;
        this.lastname = form.lastname;
        this.phone = form.phone;
    }
}

export interface SignUpResponse {
    signupToken?: string;
    status?: number;
    message?: string;
    emailStatus?: string;
    emailMessage?: string;
    smsStatus?: string;
    smsMessage?: string;
}
