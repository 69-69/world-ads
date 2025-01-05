'use client';
// app/components/SignInForm.tsx
//
import React from 'react';
import {useSignUp} from '@/app/hooks/useSignUp';
import AuthForm from '@/app/components/AuthForm';
import {ApiResponse, SignUp} from "@/app/models";
import {SignUpResponse} from "@/app/models/SignUp";


const SetupStoreForm = () => {

    return (
        <AuthForm<SignUp, ApiResponse<SignUpResponse>>
            title="Setup Store"
            hasTextArea={true}
            buttonText="Setup Store"
            fields={[
                { name: 'name', label: 'Store name' },
                { name: 'url', label: 'Website / Social' },
                { name: 'address', label: 'Address' },
                { name: 'city', label: 'City' },
                { name: 'state', label: 'State' },
                { name: 'zipcode', label: 'Zip code' },
            ]}
            onSubmit={useSignUp}
        />
    );
}
export default SetupStoreForm;