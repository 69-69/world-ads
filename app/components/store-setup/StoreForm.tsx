import React, {useState, FormEvent} from 'react';
import {Button, Paper, Box, Typography, Divider} from '@mui/material';
import Link from 'next/link';
import ToastMessage from '../ToastMessage';
import CustomTextField from "@/app/components/CustomTextField";
import {useRouter} from "next/navigation";
import {
    HOME_ROUTE,
    POLICY_ROUTE, SELLER_TYPE, SIGNIN_ROUTE,
    STORE_CATEGORIES
} from "@/app/hooks/useConstants";
import {ApiResponse} from "@/app/models";
import {inRange} from "@/app/hooks/useHelper";
import {useFormDataChange} from "@/app/hooks/useFormDataChange";
import CustomDropdown from "@/app/components/CustomDropdown";
import CustomRadio from "@/app/components/CustomRadio";
import CountrySelector from "@/app/components/CountrySelector/CountrySelector";
import ImageUpload from "@/app/components/post/ImageUpload";
import {FormDataModel} from "@/app/models/FormDataModel";
import AlertDialog from "@/app/components/AlertDialog";

interface Field {
    name: string;
    label?: string;
    type?: string;
    value?: string;
    isTextArea?: boolean;
}

/*
NOTE:
    'T' is the type of the form data,
    'U' is the type of the response data
*/
interface StoreFormProps<T = unknown, U = unknown> {
    onSubmit: (formData: T) => Promise<U>;
    title: string;
    buttonText: string;
    fields: Field[];
    redirectTo?: string;
    isSignUp?: boolean;
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
    const [formData, setFormData] = useState<FormDataModel>(
        fields.reduce<FormDataModel>((acc, field) => {
            acc[field.name] = field.name === 'logo' ? [] : ''; // Initialize 'logo' as an empty array and others as an empty string
            return acc;
        }, {} as FormDataModel)
    );
    const [openDialog, setOpenDialog] = useState(false);
    /**
     * const [formData, setFormData] = useState<CustomFormData>(
     *     fields.reduce<CustomFormData>((acc, field) => {
     *         acc[field.name] = '';
     *         return acc;
     *     }, {logo: null as unknown as File} as CustomFormData)
     * );
     */

    const handleCloseDialog = () => {
        setOpenDialog(false);
        router.push(redirectTo || SIGNIN_ROUTE);
        return;
    };
    const {errors, setErrors, message, setMessage, handleChange} = useFormDataChange(setFormData);

    const handleDropdownChange = (value: string) => {
        if (formData.category === value) return;  // Only update if the value has changed
        setFormData((prev) => ({...prev, category: value}));
        setErrors((prev) => ({...prev, category: ''})); // Clear error
    };

    const handleRadioChange = (event: React.SyntheticEvent) => {
        if (!SELLER_TYPE) return; // Ensure SELLER_TYPE is not empty
        const target = event.target as HTMLInputElement;
        const value = target.value || SELLER_TYPE[0].value;
        setFormData((prev) => ({...prev, s_role: value}));
        setErrors((prev) => ({...prev, s_role: ''})); // Clear error
    };

    const handleCountry = (country: string, state_region: string, dial: string) => {
        if (formData.country === country) return; // Only update if the country has changed
        console.log('steve-country:', dial);
        setFormData((prev) => ({...prev, country, state_region}));
        setErrors((prev) => ({...prev, country: '', state_region: ''})); // Clear error
    }

    // Handle changes to file input (logo)
    const handleFileChange = (files: File[]) => {
        if (JSON.stringify(formData.logo) === JSON.stringify(files)) return; // Only update if the files array is different
        setFormData((prev) => ({...prev, logo: files[0]}));
        setErrors((prev) => ({...prev, logo: ''})); // Clear error
    };

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

        if (!formData.logo) {
            errors.logo = 'Add your store logo';
        }

        return errors;
    };

    const resetForm = () => {
        setFormData((prev) => {
            const resetFormData = {...prev};
            fields.forEach((field) => resetFormData[field.name] = field.name === 'logo' ? [] : '');
            return resetFormData;
        });
    }

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
            // alert('steve-formData1::' + JSON.stringify(formData));

            if (response.status && inRange(response.status, 200, 299)) {
                setMessage({success: 'Please wait...'});

                // const data = typeof response.data === 'string' ? response.data as string : null;
                // router.push(redirectTo || data || SIGNIN_ROUTE);
                setOpenDialog(true);
                resetForm();
            }
            setMessage({error: response.message || 'Something went wrong, please try again'});

        } catch (err: unknown) {
            setMessage({error: err instanceof Error ? err.message : 'Something went wrong, please try again'});
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
                    label="Category"
                    options={STORE_CATEGORIES}
                    onSelectChange={handleDropdownChange}
                    isError={errors['category']}
                    sx={{mt: 2, gridColumn: toFullWidth}}
                />
                <CountrySelector
                    handleChange={handleCountry}
                    isError={errors['country']}
                    label="Store location"
                    sx={{mt: 2, gridColumn: toFullWidth}}
                />
                <Divider sx={{gridColumn: toFullWidth}}/>
                <CustomTextField fields={fields} formData={formData} handleChange={handleChange} errors={errors}/>

                {/* Render ImageUpload for handling multiple logo */}
                <ImageUpload onFileChange={handleFileChange} isError={errors['logo']}/>
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
                            name="s_role"
                            defaultValue={SELLER_TYPE[0].value}
                            data={SELLER_TYPE}
                            onRadioChange={handleRadioChange}
                        />
                        <Link key='go-back' href={POLICY_ROUTE}>
                            <Button variant="text" color="primary" fullWidth>Terms & Privacy</Button>
                        </Link>
                    </Box>

                    {message.error && <ToastMessage message={message.error}/>}
                    {message.success && <ToastMessage message={message.success} type="success"/>}

                    <Button type="submit" variant="outlined" color="primary" fullWidth>
                        {buttonText}
                    </Button>

                    <Divider sx={{my: 1}}/>
                    <Link key='go-back' href={HOME_ROUTE}>
                        <Button variant="text" color="primary" fullWidth>Go Back</Button>
                    </Link>
                </Box>
            </Box>
            {/*Show alert dialog if Registration Successful*/}
            <AlertDialog
                open={openDialog}
                handleClose={handleCloseDialog}
                handleAction={handleCloseDialog}
                title='Registration Successful'
                content='Store setup successful. Continue to sign in.'
                firstLabel="Sign In"
                secLabel="Done"
            />
        </Paper>
    );
};

export default StoreForm;
