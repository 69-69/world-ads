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

export class SignUp {
    role: string;
    email: string;
    phone: string;
    password: string;
    firstname: string;
    lastname: string;

    constructor(form: SignUpForm) {
        this.email = form.email;
        this.password = form.password
        this.firstname = form.firstname;
        this.lastname = form.lastname;
        this.phone = form.phone;
        this.role = form.account_type;
    }
}
