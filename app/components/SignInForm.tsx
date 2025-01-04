'use client';
// app/components/SignInForm.tsx
//
import React from 'react';
import {useSignIn} from '@/app/hooks/useSignIn';
import AuthForm from '@/app/components/AuthForm';
import {
    DEFAULT_SIGNUP_REDIRECT,
    DEFAULT_VERIFICATION_REDIRECT
} from '@/app/hooks/useConstants';
import {ApiResponse, SignIn} from "@/app/models";


const SignInForm = () => {

    return (
        <AuthForm<SignIn, ApiResponse>
            title="Sign In"
            buttonText="Sign In"
            isSignUp={false}
            redirectTo={DEFAULT_VERIFICATION_REDIRECT}
            auxButton={[{link: DEFAULT_SIGNUP_REDIRECT, title: 'Sign Up'}]}
            fields={[
                {name: 'email', label: 'Email', type: 'email'},
                {name: 'password', label: 'Password', type: 'password'},
            ]}
            onSubmit={useSignIn}
        />
    );
}
export default SignInForm;