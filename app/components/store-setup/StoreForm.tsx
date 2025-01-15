import React, {useState, FormEvent} from 'react';
import {Button, Paper, Box, Typography, Divider} from '@mui/material';
import Link from 'next/link';
import ToastMessage from '../ToastMessage';
import CustomTextField from "@/app/components/CustomTextField";
import {useRouter} from "next/navigation";
import {
    DEFAULT_HOME_REDIRECT,
    DEFAULT_POLICY_REDIRECT, sellerTypes,
    storeCategories
} from "@/app/hooks/useConstants";
import {ApiResponse} from "@/app/models";
import {inRange} from "@/app/hooks/useValidation";
import {useFormDataChange} from "@/app/hooks/useFormDataChange";
import CustomDropdown from "@/app/components/CustomDropdown";
import CountryList from "@/app/components/CountryList";
import CustomRadio from "@/app/components/CustomRadio";

interface Field {
    name: string;
    label?: string;
    type?: string;
    value?: string;
    isTextArea?: boolean;
}

/*NOTE: T is the type of the form data, U is the type of the response data*/
interface StoreFormProps<T = unknown, U = unknown> {
    onSubmit: (formData: T) => Promise<U>;
    title: string;
    buttonText: string;
    fields: Field[];
    redirectTo?: string;
    isSignUp?: boolean;
}

interface CustomFormData {
    [key: string]: string | number | File[];
}

const toFullWidth = '1/-1';

const StoreForm = <T, U extends ApiResponse>({
                                                 onSubmit,
                                                 title,
                                                 buttonText,
                                                 fields,
                                                 redirectTo,
                                             }: StoreFormProps<T, U>) => {
    const router = useRouter();

    // Assuming 'fields' is an array that contains the fields for your form
    const [formData, setFormData] = useState<CustomFormData>(
        fields.reduce<CustomFormData>((acc, field) => {
            acc[field.name] = field.name === 'images' ? [] : ''; // Initialize 'images' as an empty array and others as an empty string
            return acc;
        }, {} as CustomFormData) // Initial accumulator type as CustomFormData
    );

    const {errors, setErrors, message, setMessage, handleChange} = useFormDataChange(setFormData);


    const handleDropdownChange = (value: string) => {
        // Update category with the selected value
        setFormData((prev) => ({...prev, category: value}));

        // Clear error when category is selected
        setErrors((prev) => ({...prev, category: ''}));
    };

    const handleRadioChange = (event: React.SyntheticEvent) => {
        const target = event.target as HTMLInputElement;
        setFormData((prev) => ({...prev, 'seller_type':target.value}));

        // Clear error when seller type is selected
        setErrors((prev) => ({...prev, seller_type: ''}));
    };

    const handleCountry = (country: string, city: string) => {
        setFormData((prev) => ({...prev, country, city}));

        // Clear error when country is selected
        setErrors((prev) => ({...prev, country: '', city: ''}));
    }

    const validateFormFields = () => {
        const errors: Record<string, string> = {};

        fields.forEach((field) => {
            const fieldValue = formData[field.name];

            // Check for required fields and empty values in the form data
            if ((typeof fieldValue === 'string' && fieldValue.trim() === '') || // Ensure it's a string before calling trim
                (fieldValue === undefined || fieldValue === null)) {
                errors[field.name] = `${field.label} is required`;
            }
        });

        // Check if category is empty
        if (!formData.category) {
            errors.category = 'Category is required';
        }

        // Check if country is empty
        if (!formData.category) {
            errors.country = 'Country is required';
        }

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

            /*
                Redirect to the specified `redirectTo` URL if it exists and is truthy.
                If `redirectTo` is falsy (e.g., null, undefined, or empty),
                fall back to `response.data` if it's not null or undefined,
                otherwise, use the default redirection URL `DEFAULT_HOME_REDIRECT`.
            */

            if (response.status && inRange(response.status, 200, 299)) {
                setMessage({success: 'Please wait...'});

                const data = typeof response.data === 'string' ? response.data as string : null;
                router.push(redirectTo || (data ?? DEFAULT_HOME_REDIRECT));
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

    return (
        <Paper elevation={1} component={Box} p={2} sx={{width: '100%', maxWidth: 'auto', margin: 'auto'}}>
            <Box key={title} sx={{mb: 2}}>
                <Typography key="form-title" variant="h4" align="center" gutterBottom>
                    {title}
                </Typography>
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
                <CustomDropdown
                    options={storeCategories}
                    label="Category"
                    onSelectChange={handleDropdownChange}
                    isError={errors['category']}
                    sx={{mt: 2, gridColumn: toFullWidth}}
                />
                <CountryList
                    onCountryChange={handleCountry}
                    isError={errors['country']}
                    sx={{mt: 2, gridColumn: toFullWidth}}
                />
                <Divider sx={{gridColumn: toFullWidth}}/>
                <CustomTextField fields={fields} formData={formData} handleChange={handleChange} errors={errors}/>

                <Box key="btn-group" sx={{gridColumn: toFullWidth, mb: 2}}>
                    <Box key="acc-me"
                         sx={{
                             display: 'flex',
                             justifyContent: 'space-between',
                             alignItems: 'center',
                             width: '100%',
                             mb: 2,
                         }}>
                        <CustomRadio
                            label="Seller Type?"
                            defaultValue={sellerTypes[0].value}
                            data={sellerTypes}
                            onRadioChange={handleRadioChange}
                        />
                        <Link key='go-back' href={DEFAULT_POLICY_REDIRECT}>
                            <Button variant="text" color="primary" fullWidth>Terms & Privacy</Button>
                        </Link>
                    </Box>

                    {message.error && <ToastMessage message={message.error}/>}
                    {message.success && <ToastMessage message={message.success} type="success"/>}

                    <Button type="submit" variant="outlined" color="primary" fullWidth>
                        {buttonText}
                    </Button>

                    <Divider sx={{my: 1}}/>
                    <Link key='go-back' href={DEFAULT_HOME_REDIRECT}>
                        <Button variant="text" color="primary" fullWidth>Go Back</Button>
                    </Link>
                </Box>
            </Box>
        </Paper>
    );
};

export default StoreForm;
