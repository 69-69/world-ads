// app/components/PostForm.tsx
//
'use client';
import React, {ChangeEvent, useState} from 'react';
import {TextField, InputAdornment, Button, Paper, Box, Typography} from '@mui/material';

// Types for the form data and error state
interface Field {
    name: string;
    label: string;
    type?: string;
    value?: string;
}

interface PostFormProps {
    onSubmit: (formData: FormData) => Promise<unknown>;
    title: string;
    buttonText: string;
    fields: Field[];
}

interface CustomFormData {
    [key: string]: string | number | File[];
}

interface Errors {
    [key: string]: string | undefined;
}

const VerifyContactForm: React.FC<PostFormProps> = ({title, fields, buttonText, onSubmit}) => {
    // Manage state dynamically for each field
    const [formData, setFormData] = useState<CustomFormData>(
        fields.reduce<CustomFormData>((acc, field) => {
            acc[field.name] = field.value || ''; // Initialize field values
            return acc;
        }, {})
    );

    // State for error/success messages per field
    const [errors, setErrors] = useState<Errors>({});

    // Update form field value
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    // Handle validation for specific field when button is clicked
    const handleFieldSubmit = (e: React.FormEvent, field: Field) => {
        e.preventDefault();
        const value = formData[field.name] as string;

        // Simple validation for 6-digit code
        if (!value || value.length !== 6 || isNaN(Number(value))) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [field.name]: `Please enter the 6-digit code sent to your ${field.name}.`
            }));
        } else {
            setErrors((prevErrors) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const {[field.name]: removed, ...rest} = prevErrors; // Remove any existing error for this field
                return rest;
            });

            // Call onSubmit function with form data when validation passes
            onSubmit(new FormData()).then(() => {
                // Do something after successful submission
            });
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
            </Box>
        </Paper>
    );
};

export default VerifyContactForm;
