'use client';

import {useSignIn} from '@/app/hooks/useSignIn';
import AuthForm from '@/app/components/auth/AuthForm';
import {
    POST_ADS_ROUTE,
    SIGNUP_ROUTE,
} from '@/app/hooks/useConstants';
import {ApiResponse, SignIn} from "@/app/models";


const SignInForm = () => {

    return (
        <AuthForm<SignIn, ApiResponse>
            title="Sign In"
            buttonText="Sign In"
            isSignUp={false}
            redirectTo={POST_ADS_ROUTE}
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