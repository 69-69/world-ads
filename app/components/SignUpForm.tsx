'use client';
// app/components/SignInForm.tsx
//
import React from 'react';
import {useSignUp} from '@/app/hooks/useSignUp';
import AuthForm from '@/app/components/AuthForm';
import {DEFAULT_SIGNIN_REDIRECT, DEFAULT_VERIFICATION_REDIRECT} from '@/app/hooks/useConstants';
import {ApiResponse, SignUp} from "@/app/models";
import {SignUpResponse} from "@/app/models/SignUp";


const SignInForm = () => {

    return (
        <AuthForm<SignUp, ApiResponse<SignUpResponse>>
            title="Sign Up"
            buttonText="Sign Up"
            isSignUp={true}
            redirectTo={DEFAULT_VERIFICATION_REDIRECT}
            auxButton={[{link: DEFAULT_SIGNIN_REDIRECT, title: 'Sign In'}]}
            fields={[
                {name: 'firstname', label: 'First name'},
                {name: 'lastname', label: 'Last name'},
                {name: 'phone', label: 'Phone number', type: 'tel'},
                {name: 'email', label: 'Email', type: 'email'},
                {name: 'password', label: 'Password', type: 'password'},
                {name: 'account_type', type: 'hidden'},
            ]}
            onSubmit={useSignUp}
        />
    );
}
export default SignInForm;