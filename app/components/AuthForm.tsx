import React, {useState, ChangeEvent, FormEvent} from 'react';
import {Button, Paper, Box, Typography, Divider} from '@mui/material';
import Link from 'next/link';
import ToastMessage from './ToastMessage';
import TextAreaField from './TextAreaField';
import SwitchButton from './SwitchButton';
import CheckButton from './CheckButton';
import AuthTextField from "@/app/components/AuthTextField";
import OrSeparator from "@/app/components/OrSeparator";
import {GoogleSignInButton} from "@/app/components/SocialAuthButton";
import {googleSignIn} from "@/app/hooks/useSocialAuthButton";
import {DEFAULT_POLICY_REDIRECT} from "@/app/hooks/useConstants";

interface Field {
    name: string;
    label?: string;
    type?: string;
}

interface AuxButton {
    title: string;
    link: string;
}

/*type optU = {
    data: string;
    [key: string]: unknown; // This allows to accept extra properties
};*/

/*NOTE: T is the type of the form data, U is the type of the response data*/
interface AuthFormProps<T = unknown, U = unknown> {
    onSubmit: (formData: T) => Promise<U>;
    title: string;
    buttonText: string;
    fields: Field[];
    redirectTo?: string;
    auxButton?: AuxButton[];
    isSignUp?: boolean;
    hasTextArea?: boolean;
}

const toFullWidth = '1/-1';

const AuthForm = <T, U extends { data?: unknown }>({
                                                       onSubmit,
                                                       title,
                                                       buttonText,
                                                       fields,
                                                       auxButton,
                                                       hasTextArea,
                                                       isSignUp,
                                                   }: AuthFormProps<T, U>) => {
    const [formData, setFormData] = useState<Record<string, string>>(
        fields.reduce((acc, field) => {
            acc[field.name] = '';
            return acc;
        }, {} as Record<string, string>)
    );

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [message, setMessage] = useState<{ success: string; error: string }>({success: '', error: ''});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSwitchChange = (checked: boolean) => {
        setFormData((prev) => ({...prev, 'account_type': checked ? 'seller' : 'buyer'}));
    };

    const handleCheckButtonChange = (checked: boolean) => {
        setFormData((prev) => ({...prev, 'remember-me': checked.toString()}));
    };

    const handleTextAreaChange = (value: string) => {
        setFormData((prev) => ({...prev, description: value}));
    };

    const validateFields = () => {
        const errors: Record<string, string> = {};
        fields.forEach((field) => {
            if (field.name !== 'account_type' && field.name !== 'remember-me') {
                if (!formData[field.name] || formData[field.name].trim() === '') {
                    errors[field.name] = `${field.label} is required`;
                }
            }
        });
        return errors;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formErrors = validateFields();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setMessage({success: '', error: 'Please fill in all required fields.'});
            return;
        }

        try {
            const response = await onSubmit(formData as T);
            setMessage({success: response.data as string, error: ''});
        } catch (err: unknown) {
            setMessage({
                success: '',
                error: err instanceof Error ? err.message : 'Something went wrong, please try again'
            });
        }
    };

    const renderOptButton = (button: AuxButton, index: number) => (
        <Link key={index} href={button.link}>
            <Button variant="text" color="primary" fullWidth>
                {button.title}
            </Button>
        </Link>
    );

    return (
        <Paper elevation={1} component={Box} p={2} sx={{width: '100%', maxWidth: 'auto', margin: 'auto'}}>
            <Box key={title} sx={{mb: 2}}>
                <Typography key="form-title" variant="h4" align="center" gutterBottom>
                    {title}
                </Typography>

                <GoogleSignInButton text={buttonText + ' With Google'}
                                    size="medium"
                                    color="primary"
                                    variant="outlined"
                                    onSubmit={googleSignIn}/>
                <OrSeparator/>
            </Box>
            <Box
                key="form-div"
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {xs: '1fr', sm: '1fr 1fr'},
                    gap: 2,
                    width: '100%',
                }}
                noValidate
                autoComplete="off"
            >
                {AuthTextField({fields, formData, handleChange, errors})}

                {hasTextArea && <TextAreaField onChangeText={handleTextAreaChange} name="description"/>}

                <Box key="btn-group" sx={{gridColumn: toFullWidth, mb: 2}}>

                    <Box key="acc-me"
                         sx={{
                             display: 'flex',
                             justifyContent: isSignUp ? 'space-between' : 'right',
                             alignItems: 'center',
                             width: '100%',
                             mb: 2,
                         }}>
                        {isSignUp ? (
                            <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                                <SwitchButton onSwitchChange={handleSwitchChange}/>
                                {renderOptButton({link: DEFAULT_POLICY_REDIRECT, title: 'Terms & Privacy'}, 0)}
                            </Box>
                        ) : (
                            <CheckButton onCheckChange={handleCheckButtonChange}/>
                        )}
                    </Box>

                    {message.error && <ToastMessage message={message.error}/>}
                    {message.success && <ToastMessage message={message.success} type="success"/>}

                    <Button type="submit" variant="outlined" color="primary" fullWidth>
                        {buttonText}
                    </Button>

                    <Divider sx={{my: 1}}/>
                    {auxButton && auxButton.map(renderOptButton)}
                </Box>
            </Box>
        </Paper>
    );
};

export default AuthForm;
