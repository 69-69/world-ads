import React, {useState, FormEvent} from 'react';
import {Button, Paper, Box, Typography, Divider} from '@mui/material';
import Link from 'next/link';
import ToastMessage from '../ToastMessage';
import CustomSwitch from '../CustomSwitch';
import CheckButton from '../CheckButton';
import CustomTextField from "@/app/components/CustomTextField";
import OrSeparator from "@/app/components/OrSeparator";
import {GitHubSignInButton, GoogleSignInButton} from "@/app/components/auth/SocialAuthButton";
import {githubSignIn, googleSignIn} from "@/app/hooks/useSocialAuthButton";
import {useRouter} from "next/navigation";
import {
    ACC_ROLE,
    HOME_ROUTE,
    POLICY_ROUTE
} from "@/app/hooks/useConstants";
import {ApiResponse} from "@/app/models";
import {inRange} from "@/app/hooks/useHelper";
import {useFormDataChange} from "@/app/hooks/useFormDataChange";
import CountrySelector from "@/app/components/CountrySelector/CountrySelector";
import {FormDataModel} from "@/app/models/FormDataModel";

interface Field {
    name: string;
    label?: string;
    suffix?: string;
    type?: string;
    value?: string;
    isTextArea?: boolean;
}

interface AuxButton {
    title: string;
    link: string;
}

/*NOTE: T is the type of the form data, U is the type of the response data*/
interface AuthFormProps<T = unknown, U = unknown> {
    onSubmit: (formData: T) => Promise<U>;
    title: string;
    buttonText: string;
    fields: Field[];
    redirectTo?: string;
    auxButton?: AuxButton[];
    isSignUp?: boolean;
}


const toFullWidth = '1/-1';

const AuthForm = <T, U extends ApiResponse>({
                                                onSubmit,
                                                title,
                                                buttonText,
                                                fields,
                                                auxButton,
                                                isSignUp,
                                                redirectTo,
                                            }: AuthFormProps<T, U>) => {
    const router = useRouter();

    // Assuming 'fields' is an array that contains the fields for your form
    const [formData, setFormData] = useState<FormDataModel>(
        fields.reduce<FormDataModel>((acc, field) => {
            acc[field.name] = field.name === 'images' ? [] : ''; // Initialize 'images' as an empty array and others as an empty string
            return acc;
        }, {} as FormDataModel) // Initial accumulator type as FormDataModel
    );

    const {errors, setErrors, message, setMessage, handleChange} = useFormDataChange(setFormData);

    const handleSwitchChange = (checked: boolean) => {
        setFormData((prev) => ({...prev, 'account_type': ACC_ROLE[Number(checked)]}));
    };

    const handleCheckButtonChange = (checked: boolean) => {
        setFormData((prev) => ({...prev, 'remember_me': checked.toString()}));
    };

    const handleCountry = (country: string, state_region: string, dial: string) => {
        // Prepend the dial code to the phone number
        const telField = fields.find((field: Field) => field?.type === 'tel');
        if (telField) {
            telField.suffix = dial;
            // Update the hidden dial_code field with the selected country's dial code
            setFormData((prev) => ({...prev, dial_code: dial}));
        }

        setFormData((prev) => ({...prev, country}));

        // Clear error when country is selected
        setErrors((prev) => ({...prev, country: ''}));
    }

    const validateFormFields = () => {
        const errors: Record<string, string> = {};

        fields.forEach((field) => {
            const fieldValue = formData[field.name];

            if (field.name !== 'account_type' && field.name !== 'remember_me') {
                // Check for required fields and empty values in the form data
                if ((typeof fieldValue === 'string' && fieldValue.trim() === '') ||
                    (fieldValue === undefined || fieldValue === null)) {
                    errors[field.name] = `${field.label} is required`;
                }

                // Check for valid email address
                if (field.name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValue as string)) {
                    errors['email'] = 'Please enter a valid email address';
                }

                // Check for valid phone number
                // NOTE: This regex pattern is for a 10-digit phone number plus an optional dial code
                if (field.name === 'phone' && (typeof fieldValue === 'string')) {
                    // Remove leading zeros if any
                    const phone = fieldValue.replace(/^0+/, '');

                    if (!/^\+?[0-9]{1,4}[0-9]{10}$/.test((formData['dial_code'] as string) + phone)) {
                        errors['phone'] = 'Please enter a valid phone number';
                    }
                }

                // Check fo password match for the confirmPassword field
                if (field.name === 'confirmPassword' && formData['password'] !== formData['confirmPassword']) {
                    errors['confirmPassword'] = 'Passwords do not match';
                }
            }
        });
        return errors;
    };

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formErrors = validateFormFields();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setMessage({success: '', error: 'Please fill in all required fields.'});
            return;
        }

        try {
            const response = await onSubmit(formData as T);

            if (response.status && inRange(response.status, 200, 299)) {
                setMessage({success: 'Please wait...'});

                const data = typeof response.data === 'string' ? response.data as string : null;

                // Redirect the user to the specified 'redirectTo' path if provided,
                // or to 'redirectPath' from the response data if available.
                // If neither is provided, fallback to the 'HOME_ROUTE'.
                router.push(redirectTo || (data ?? HOME_ROUTE));
                return;
            }
            setMessage({error: 'Something went wrong, please try again'});


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

                <OrSeparator text={'||'} sxd={{borderColor: '#ddd'}} sx={{my: 0, mx: 20}}/>
                <GitHubSignInButton text={buttonText + ' With GitHub'}
                                    size="medium"
                                    color="info"
                                    variant="contained"
                                    onSubmit={githubSignIn}/>
                <OrSeparator/>
            </Box>
            <Box
                key="form-div"
                component="form"
                onSubmit={handleFormSubmit}
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {xs: '1fr', sm: '1fr 1fr'},
                    gap: 2,
                    width: '100%',
                }}
                noValidate
                autoComplete="off"
            >
                {isSignUp && (
                    <CountrySelector
                        handleChange={handleCountry}
                        isError={errors['country']}
                        sx={{mt: 2, gridColumn: toFullWidth}}
                    />)
                }
                <CustomTextField fields={fields} formData={formData} handleChange={handleChange} errors={errors}/>

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
                                <CustomSwitch label='I am Seller?' onSwitchChange={handleSwitchChange}
                                              name='account_type'/>
                                {renderOptButton({link: POLICY_ROUTE, title: 'Terms & Privacy'}, 0)}
                            </Box>
                        ) : (
                            <CheckButton onCheckChange={handleCheckButtonChange} name='remember_me'/>
                        )}
                    </Box>

                    {message.error && <ToastMessage message={message.error}/>}
                    {message.success && <ToastMessage message={message.success} type="success"/>}

                    <Button type="submit" variant="outlined" color="primary" fullWidth
                            disabled={Boolean(message.success)}>
                        {message.success || buttonText}
                    </Button>

                    <Divider sx={{my: 1}}/>
                    {auxButton && auxButton.map(renderOptButton)}
                </Box>
            </Box>
        </Paper>
    );
};

export default AuthForm;
