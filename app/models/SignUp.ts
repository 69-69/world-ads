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

export {SignUp, type SignUpResponse, type SignUpForm};
