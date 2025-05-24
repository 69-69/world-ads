'use client';

import {useSignIn} from '@/app/actions/auth/useSignIn';
import AuthForm from '@/app/components/auth/AuthForm';
import {
    ADMIN_DASHBOARD_ROUTE,
    SIGNUP_ROUTE,
} from '@/app/util/constants';
import {ApiResponse, SignIn} from "@/app/models";
import { generateRandomHash } from '@/app/util/clientUtils';


const SignInForm = () => {
    const redirectTo=`${ADMIN_DASHBOARD_ROUTE}?session=${generateRandomHash()}`;

    return (
        <AuthForm<SignIn, ApiResponse>
            title="Sign In"
            buttonText="Sign In"
            isSignUp={false}
            redirectTo={redirectTo}
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