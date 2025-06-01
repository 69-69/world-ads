'use client';

import React, {ChangeEvent, useEffect, useState} from 'react';
import {TextField, InputAdornment, Button, Paper, Box, Typography} from '@mui/material';
import {useRouter} from 'next/navigation';
import {ACC_ROLE, SETUP_STORE_ROUTE} from "@/app/util/constants";
import {ApiResponse} from "@/app/models";
import ToastMessage from "@/app/components/ToastMessage";
import {isSuccessCode} from "@/app/util/clientUtils";
import {VerifyContactResponse} from "@/app/models/VerifyContactResponse";
import {getIsVerified} from "@/app/util/serverUtils";
import {Field} from "@/app/models/TextField";

interface PostFormProps {
    onSubmit: (formData: FormData) => Promise<ApiResponse<VerifyContactResponse>>;
    title: string;
    buttonText: string;
    fields: Field[];
    redirectTo: string;
}

interface Errors {
    [key: string]: string | undefined;
}

const getNavigateTo = (role: string, redirectTo: string) => role === ACC_ROLE[1] ? SETUP_STORE_ROUTE : redirectTo;

const VerifyContactForm: React.FC<PostFormProps> = ({title, fields, buttonText, onSubmit, redirectTo}) => {
    const router = useRouter();

    // State for error/success messages per field
    const [errors, setErrors] = useState<Errors>({});
    const [shouldFetch, setShouldFetch] = useState<boolean>(false);
    const [verifyStatus, setVerifyStatus] = useState<{ email: string | null, phone: string | null }>({
        email: '',
        phone: ''
    });
    const [message, setMessage] = useState<{ success?: string; error?: string }>({success: '', error: ''});

    // Manage state dynamically for each field
    const [formData, setFormData] = useState<Record<string, string>>(
        fields.reduce<Record<string, string>>((acc, field) => {
            // acc[field.name] = field.value || ''; // Initialize field values
            acc[field.name] = String(field.value || ''); // Initialize field values
            return acc;
        }, {})
    );

    // Get verification status for email and phone
    useEffect(() => {
        const getVerifyStatus = async () => {
            const [email_status, phone_status] = await Promise.all([
                getIsVerified({contact: 'email'}),
                getIsVerified({contact: 'phone'})
            ]);
            // console.log('email_status: ', email_status, 'phone_status: ', phone_status);
            setVerifyStatus({email: email_status, phone: phone_status});
        }

        getVerifyStatus();

        if (shouldFetch) {
            setShouldFetch(false); // Reset trigger after fetch
        }
    }, [shouldFetch]);

    // Update form field value
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    // Handle validation for specific field when button is clicked
    const handleFieldSubmit = async (e: React.FormEvent, field: Field) => {
        e.preventDefault();

        const value = formData[field.name] as string;

        // Simple validation for 6-digit code
        if (!value || value.length !== 6 || isNaN(Number(value))) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [field.name]: `Please enter the 6-digit code sent to your ${field.name.replace('_code', '')}.`
            }));
            return;
        }
        setErrors((prevErrors) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const {[field.name]: removed, ...rest} = prevErrors; // Remove any existing error for this field
            return rest;
        });

        // Convert formData to FormData instance
        const formDataToSubmit = new FormData();

        // Populate FormData with the current form data
        for (const [key, value] of Object.entries(formData)) {
            formDataToSubmit.append(key, value as string);
        }

        // Call onSubmit function with form data when validation passes
        const response = await onSubmit(formDataToSubmit);
        setShouldFetch(true); // Trigger the fetch

        // Redirect to the appropriate page if verification is successful
        if (isSuccessCode(response.status!)) {
            console.log('verifyStatus: ', verifyStatus.email, response.data!.role!);
            if (verifyStatus.email /*&& verifyStatus.phone*/) {
                const navigateTo = getNavigateTo(response.data!.role!, redirectTo);
                router.push(navigateTo);
                return;
            }
            setMessage({success: response.message});
        }
        if (response.data !== null) {
            formDataToSubmit.append(response.data!.fieldName, response.message ?? `${verifyStatus.email || verifyStatus.phone} verification failed`);
        }

    };

    // Render individual text fields dynamically
    const renderTextInput = (field: Field) => {
        const errorMessage = errors[field.name];

        return (
            <div key={field.name} style={{display: 'flex', alignItems: 'center', marginBottom: '16px'}}>
                <TextField
                    type={field.type || 'text'}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    label={field.label}
                    variant="outlined"
                    fullWidth
                    size="small"
                    error={Boolean(errorMessage)}
                    helperText={errorMessage}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end" key={field.label}>
                                    <Button
                                        key={field.label}
                                        variant="contained"
                                        color="primary"
                                        size='small'
                                        onClick={(e) => handleFieldSubmit(e, field)}
                                    >
                                        {buttonText}
                                    </Button>
                                </InputAdornment>
                            ),
                        },
                    }}/>
            </div>
        );
    };

    return (
        <Paper elevation={1} component={Box} p={2} sx={{width: '100%', maxWidth: 'auto', margin: 'auto'}}>
            <Box component="form" sx={{textAlign: 'center', mt: 2}}>
                <Typography variant="h4" align="center" gutterBottom>
                    {title}
                </Typography>

                {/* Render text fields dynamically */}
                {fields.map((field) => renderTextInput(field))}

                {message.error && <ToastMessage message={message.error}/>}
                {message.success && <ToastMessage message={message.success} type="success"/>}

            </Box>
        </Paper>
    );
};

export default VerifyContactForm;
