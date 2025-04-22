'use client';

import React from 'react';
import StoreForm from '@/app/components/store-setup/StoreForm';
import {ApiResponse} from "@/app/models";
import {createStore} from "@/app/actions/auth/createStore";
import {SIGNIN_ROUTE} from "@/app/actions/useConstants";
import {FormDataModel} from "@/app/models/FormDataModel";


const SetupStoreForm = () => {

    return (
        <StoreForm<FormDataModel, ApiResponse<string>>
            title="Setup Your Store"
            buttonText="Setup Store"
            redirectTo={SIGNIN_ROUTE}
            fields={[
                {name: 'name', label: 'Store name'},
                {name: 'website', label: 'Website / Social'},
                {name: 'city', label: 'City / Capital'},
                {name: 'state_region', label: 'State or Region'},
                {name: 'zipcode', label: 'Zip code'},
                {name: 'address', label: 'Address'},
                {name: 'description', label: 'Description', isTextArea: true},
                // logo is a file upload field for the store logo image file (jpg, png, etc.)
            ]}
            onSubmit={createStore}
        />
    );
}

export default SetupStoreForm;