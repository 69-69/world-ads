'use client';
// app/components/SignInForm.tsx
//
import React from 'react';
import StoreForm from '@/app/components/store-setup/StoreForm';
import {ApiResponse, SignUp} from "@/app/models";
import {SignUpResponse} from "@/app/models/SignUp";
import {useSetupStore} from "@/app/hooks/useSetupStore";


const SetupStoreForm = () => {

    return (
        <StoreForm<SignUp, ApiResponse<SignUpResponse>>
            title="Setup Online Store"
            buttonText="Setup Store"
            fields={[
                { name: 'name', label: 'Store name' },
                { name: 'url', label: 'Website / Social' },
                { name: 'city', label: 'City' },
                { name: 'state_region', label: 'State or Region' },
                { name: 'zipcode', label: 'Zip code' },
                { name: 'address', label: 'Address' },
                { name: 'description', label: 'Description', isTextArea: true },
                // logo is a file upload field for the store logo image file (jpg, png, etc.)
            ]}
            onSubmit={useSetupStore}
        />
    );
}

export default SetupStoreForm;