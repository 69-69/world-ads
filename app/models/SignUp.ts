// models/SignUp.ts
//
type SignUpForm = {
    email: string;
    phone: string;
    password: string;
    firstname: string;
    lastname: string;
    account_type: string;
};

class SignUp {
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

type SignUpResponse = {
    message?: string;
    signupToken?: string;
    accessToken?: unknown;
    email?: Record<string, string>;
    sms?: Record<string, string>;
}

/*class SignUpResponse {
    signupToken?: string;
    message?: string;
    accessToken?: unknown;
    email?: Record<string, unknown>;
    sms?: Record<string, unknown>;

    constructor(successData: string) {

        const data = JSON.parse(successData);

        this.signupToken = data.signup_token;
        this.accessToken = data.access_token;
        this.message = data.message;
        this.email = data.email;
        this.sms = data.sms;
    }
}*/

export {SignUp, type SignUpResponse, type SignUpForm};
