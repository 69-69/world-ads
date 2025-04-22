'use client';

import {createSignUp} from '@/app/actions/auth/createSignUp';
import AuthForm from '@/app/components/auth/AuthForm';
import {ApiResponse} from "@/app/models";
import {SignUpForm, SignUpResponse} from "@/app/models/SignUp";
import {SIGNIN_ROUTE, VERIFICATION_ROUTE} from '@/app/actions/useConstants';


const SignInForm = () => {

    return (
        <AuthForm<SignUpForm, ApiResponse<SignUpResponse>>
            title="Sign Up"
            buttonText="Sign Up"
            isSignUp={true}
            redirectTo={VERIFICATION_ROUTE}
            auxButton={[{link: SIGNIN_ROUTE, title: 'Sign In'}]}
            fields={[
                {name: 'firstname', label: 'First name'},
                {name: 'lastname', label: 'Last name'},
                {name: 'phone', label: 'Phone number', type: 'tel'},
                {name: 'email', label: 'Email', type: 'email'},
                {name: 'password', label: 'Password', type: 'password'},
                {name: 'confirmPassword', label: 'Confirm Password', type: 'password'},
                {name: 'dial_code', label: 'Dial code', type: 'hidden'},
            ]}
            onSubmit={createSignUp}
        />
    );
}
export default SignInForm;