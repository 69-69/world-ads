import React, {useState, FormEvent} from 'react';
import {Button, Paper, Box, Typography} from '@mui/material';
import ImageUpload from './ImageUpload';
import CustomDropdown from '../CustomDropdown';
import CustomTextField from "@/app/components/CustomTextField";
import ToastMessage from "@/app/components/ToastMessage";
import {useFormDataChange} from "@/app/hooks/useFormDataChange";
import MulticolorSelector from "@/app/components/post/MulticolorSelector";
import {ADS_CATEGORIES} from "@/app/hooks/useConstants";
import {FormDataModel} from "@/app/models/FormDataModel";

// Types for the form data and error state
interface Field {
    name: string;
    label: string;
    type?: string;
    value?: string;
    fullWidth?: boolean;
    isTextArea?: boolean;
}

interface PostFormProps {
    onSubmit: (formData: FormDataModel) => Promise<unknown>;
    title: string;
    buttonText: string;
    fields: Field[];
}

const toFullWidth = '1/-1';

const PostForm: React.FC<PostFormProps> = ({onSubmit, title, buttonText, fields}) => {
    // State to store form values
    // const [formData, setFormData] = useState<FormDataModel>(
    //     fields.reduce<FormDataModel>((acc, field) => {
    //         acc[field.name] = '';
    //         return acc;
    //     }, {images: [] as File[]})
    // );
    const [formData, setFormData] = useState<FormDataModel>(
        fields.reduce<FormDataModel>((acc, field) => {
            acc[field.name] = field.name === 'images' ? [] : ''; // Initialize 'images' as an empty array and others as an empty string
            return acc;
        }, {} as FormDataModel)
    );

    const {errors, setErrors, message, setMessage, handleChange} = useFormDataChange(setFormData);


    const handleDropdownChange = (value: string) => {
        // Update category with the selected value
        setFormData((prev) => ({...prev, category: value}));

        // Clear error when category is selected
        setErrors((prev) => ({...prev, category: ''}));
    };

    // Handle changes to file input (images)
    const handleFileChange = (files: File[]) => {
        // Update images with the selected files
        setFormData((prev) => ({...prev, images: files}));

        // Clear error when images is selected
        setErrors((prev) => ({...prev, images: ''}));
    };

    // Handle product colors selection
    const handleProductColors = (colors: string) => {
        setFormData((prev) => ({...prev, product_colors: colors}));

        // Clear error when colors are selected
        setErrors((prev) => ({...prev, product_colors: ''}));
    };

    // Form validation function
    const validateFormFields = () => {
        const errors: Record<string, string> = {};

        fields.forEach((field) => {
            const fieldValue = formData[field.name];

            // Check for required fields and empty values in the form data
            if ((typeof fieldValue === 'string' && fieldValue.trim() === '') ||
                (fieldValue === undefined || fieldValue === null)) {
                errors[field.name] = `${field.label} is required`;
            }

            // Check if price is a valid number
            if (field.name === 'price' && isNaN(Number(fieldValue))) {
                errors[field.name] = 'Price must be a valid number';
            }
        });

        // Check if category is empty
        if (!formData.category) {
            errors.category = 'Category is required';
        }

        // Check if product colors is selected
        if (!formData.product_colors) {
            errors.category = 'Product color(s) is required';
        }

        // Check if images is empty
        if ((formData.images as File[]).length === 0) {
            errors.images = 'Please select at least one image';
        }

        return errors;
    };

    const resetForm = () => {
        setFormData((prev) => {
            const resetFormData = {...prev};
            fields.forEach((field) => resetFormData[field.name] = field.name === 'images' ? [] : '');
            return resetFormData;
        });
    }

    // Form submission handler
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Validate form fields before submitting
        const formErrors = validateFormFields();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setMessage({success: '', error: 'Please fill in all required fields.'});
            return;
        }

        try {
            const response = await onSubmit(formData);

            if (typeof response === 'object' && response !== null && 'message' in response) {
                setMessage({success: (response as { message: string }).message});
                // Reset form data after successful submission
                resetForm();
            }
        } catch (err) {
            setMessage({error: err instanceof Error ? err.message : 'Something went wrong, please try again'});
        }
    };

    return (
        <Paper elevation={1} component={Box} p={2} sx={{width: '100%', maxWidth: 'auto', margin: 'auto'}}>
            <Box key={title} sx={{mb: 2}}>
                <Typography variant="h4" align="center" gutterBottom>
                    {title}
                </Typography>
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

                {/* Render SelectDropdown */}
                <CustomDropdown
                    options={ADS_CATEGORIES}
                    label="Post Ads Category"
                    onSelectChange={handleDropdownChange}
                    isError={errors['category']}
                    sx={{mt: 2, gridColumn: toFullWidth}}
                />

                {/* Render text fields dynamically */}
                <CustomTextField fields={fields} formData={formData} handleChange={handleChange} errors={errors}/>
                {/*Render Product color selection*/}
                <MulticolorSelector onColorChange={handleProductColors} isError={errors['category']}/>

                {/* Render ImageUpload for handling multiple images */}
                <ImageUpload onFileChange={handleFileChange} isError={errors['images']}/>
                {/* Submit Button */}
                <Box key="btn-group" sx={{gridColumn: toFullWidth, mb: 2}}>

                    {message.error && <ToastMessage message={message.error}/>}
                    {message.success && <ToastMessage message={message.success} type="success"/>}

                    <Button type="submit" variant="outlined" color="primary" fullWidth sx={{mt: 2}}>
                        {buttonText}
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default PostForm;
