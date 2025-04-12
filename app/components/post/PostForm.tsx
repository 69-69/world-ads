import React, {useState, FormEvent} from 'react';
import {Button, Paper, Box, Typography} from '@mui/material';
import ImageUpload from './ImageUpload';
import CustomDropdown from '../CustomDropdown';
import CustomTextField from "@/app/components/CustomTextField";
import ToastMessage from "@/app/components/ToastMessage";
import {useFormDataChange} from "@/app/hooks/useFormDataChange";
import MulticolorSelector from "@/app/components/post/MulticolorSelector";
import {POST_BRANDS, POST_CATEGORIES, SUB_CATEGORIES} from "@/app/hooks/useConstants";
import {FormDataModel} from "@/app/models/FormDataModel";
import PromoSchedule from "@/app/components/admin/PromoSchedule";

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

    const postCategoryChange = (value: string) => {
        if (formData.category === value) return;  // Only update if the value has changed
        setFormData((prev) => ({...prev, category: value}));
        setErrors((prev) => ({...prev, category: ''}));// Clear error
    };

    const postSubCategoryChange = (value: string) => {
        if (formData.sub_category === value) return;  // Only update if the value has changed
        setFormData((prev) => ({...prev, sub_category: value}));
        setErrors((prev) => ({...prev, sub_category: ''}));// Clear error
    };

    const brandChange = (value: string) => {
        if (formData.brand === value) return;  // Only update if the value has changed
        setFormData((prev) => ({...prev, brand: value}));
        setErrors((prev) => ({...prev, brand: ''}));// Clear error
    };

    // Handle changes to file input (images)
    const handleFileChange = (files: File[]) => {
        if (JSON.stringify(formData.images) === JSON.stringify(files)) return; // Only update if the files array is different
        setFormData((prev) => ({...prev, images: files}));
        setErrors((prev) => ({...prev, images: ''})); // Clear error
    };

    // Handle product colors selection
    const handleProductColors = (colors: string) => {
        if (formData.product_colors === colors) return; // Only update if the colors have changed
        setFormData((prev) => ({...prev, product_colors: colors}));
        setErrors((prev) => ({...prev, product_colors: ''})); // Clear error
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

        if (!formData.category) {
            errors.category = 'Category is required';
        }
        if (!formData.sub_category) {
            errors.sub_category = 'Item category is required';
        }
        if (!formData.brand) {
            errors.brand = 'Brand is required';
        }
        if (!formData.product_colors) {
            errors.product_colors = 'Product color(s) is required';
        }
        const img = formData.images;
        if (!(img && (img as File[]).length > 0)) {
            errors.images = 'Please select at least one image';
        }

        return errors;
    };

    const resetForm = () => {
        setFormData((prev) => {
            const resetFormData = {...prev};
            fields.forEach((field) => resetFormData[field.name] = field.name === 'images' ? [] : '');
            resetFormData.product_colors = '';
            resetFormData.category = '';
            resetFormData.sub_category = '';
            resetFormData.images = [];
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
                <CustomDropdown
                    options={POST_CATEGORIES}
                    label="Post Category"
                    onSelectChange={postCategoryChange}
                    isError={errors['category']}
                    sx={{mt: 2, gridColumn: toFullWidth}}
                />
                <PromoSchedule/>

                {formData.category && (
                    <CustomDropdown
                        options={
                            SUB_CATEGORIES[formData.category as keyof typeof SUB_CATEGORIES] || []
                        }
                        label="Item Category"
                        onSelectChange={postSubCategoryChange}
                        isError={errors['sub_category']}
                        sx={{gridColumn: toFullWidth}}
                    />
                )}
                <CustomDropdown
                    options={POST_BRANDS}
                    label="Brand"
                    onSelectChange={brandChange}
                    isError={errors['brand']}
                    sx={{gridColumn: toFullWidth}}
                />
                <CustomTextField fields={fields} formData={formData} handleChange={handleChange} errors={errors}/>
                <MulticolorSelector onColorChange={handleProductColors} isError={errors['category']}/>
                <ImageUpload onFileChange={handleFileChange} isError={errors['images']}/>
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
