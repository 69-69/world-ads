'use client';

import {useSignIn} from '@/app/actions/auth/useSignIn';
import AuthForm from '@/app/components/auth/AuthForm';
import {
    ADMIN_DASHBOARD_ROUTE, HOME_ROUTE,
    SIGNUP_ROUTE,
} from '@/app/actions/useConstants';
import {ApiResponse, SignIn} from "@/app/models";


const SignInForm = () => {

    return (
        <AuthForm<SignIn, ApiResponse>
            title="Sign In"
            buttonText="Sign In"
            isSignUp={false}
            redirectTo={HOME_ROUTE+ADMIN_DASHBOARD_ROUTE}
            auxButton={[{link: SIGNUP_ROUTE, title: 'Sign Up'}]}
            fields={[
                {name: 'email', label: 'Email', type: 'email'},
                {name: 'password', label: 'Password', type: 'password'},
            ]}
            onSubmit={useSignIn}
        />
    );
}
export default SignInForm;