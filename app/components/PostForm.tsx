'use client';
import React, {useState, ChangeEvent, FormEvent} from 'react';
import {TextField, Button, Paper, Box, Typography} from '@mui/material';
import ImageUpload from './ImageUpload';
import TextAreaField from './TextAreaField';
import SelectDropdown from './SelectDropdown';
import {validateText} from '@/app/hooks/useValidation';

// Types for the form data and error state
interface Field {
    name: string;
    label: string;
    type?: string;
    value?: string;
}

interface Errors {
    [key: string]: string | null;
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

const PostForm: React.FC<PostFormProps> = ({onSubmit, title, buttonText, fields}) => {
    // State to store form values
    const [formData, setFormData] = useState<CustomFormData>(
        fields.reduce<CustomFormData>((acc, field) => {
            acc[field.name] = '';
            return acc;
        }, {images: [] as File[]})
    );

    // State for error messages
    const [errors, setErrors] = useState<Errors>({});

    // Handle changes to form text fields
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value, // Update form data with the new value
        }));
        // Clear the error when the user starts typing
        setErrors((prev) => ({
            ...prev,
            [name]: null, // Clear specific field error
        }));
    };

    const handleSelectChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            category: value, // Update category with the selected value
        }));
        setErrors((prev) => ({
            ...prev,
            category: null, // Clear error when category is selected
        }));
    };

    // Handle text area changes
    const handleTextChange = (value: string) => {
        setFormData({
            ...formData,
            description: value,
        });
        setErrors((prev) => ({
            ...prev,
            description: null, // Clear description error
        }));
    };

    // Handle changes to file input (images)
    const handleFileChange = (files: File[]) => {
        setFormData((prev) => ({
            ...prev, images: files, // Update images with the selected files
        }));
        setErrors((prev) => ({
            ...prev, images: null, // Clear images error
        }));
    };

    // Form validation function
    const validateForm = () => {
        const newErrors: Errors = {};

        if (!validateText(formData.title as string)) {
            newErrors.title = 'Please enter a title';
        }

        if (!formData.price || isNaN(Number(formData.price))) {
            newErrors.price = 'Please enter a valid price (ex: 70 or 9.2)';
        }

        if (!validateText(formData.category as string)) {
            newErrors.category = 'Please select category';
        }

        if (!validateText(formData.description as string)) {
            newErrors.description = 'Please enter a description';
        }

        if ((formData.images as File[]).length === 0) {
            newErrors.images = 'Please upload at least one image';
        }

        return newErrors;
    };

    // Form submission handler
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Validate form fields before submitting
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return; // Prevent submission if there are errors
        }

        const formDataWithFiles = new FormData();
        // Append form data (text fields) to FormData
        Object.keys(formData).forEach((key) => {
            if (key !== 'images') formDataWithFiles.append(key, formData[key] as string);
        });

        // Append selected image files to FormData
        (formData.images as File[]).forEach((file) => {
            formDataWithFiles.append('images', file);
        });

        try {
            const response = await onSubmit(formDataWithFiles);
            setErrors({}); // Clear errors on successful submission
            if (typeof response === 'object' && response !== null && 'message' in response) {
                setErrors({success: (response as { message: string }).message, error: ''});
            }
        } catch (err) {
            setErrors({
                error: err instanceof Error ? err.message : 'Something went wrong, please try again',
                success: ''
            });
        }
    };

    // Render individual text input field with validation errors
    const renderTextInput = (field: Field) => {
        const isError = errors[field.name]; // Check if there's an error for this field

        return (
            <TextField
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type || 'text'}
                variant="outlined"
                fullWidth
                size="small"
                value={formData[field.name] as string}
                onChange={handleChange}
                error={Boolean(isError)} // Show error if exists
                helperText={isError} // Display the error message
                sx={{mb: 2}}
            />
        );
    };

    return (
        <Paper elevation={1} component={Box} p={2} sx={{width: '100%', maxWidth: 'auto', margin: 'auto'}}>
            <Box sx={{mb: 2}}>
                <Typography variant="h4" align="center" gutterBottom>
                    {title}
                </Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit} sx={{textAlign: 'center', mt: 2}}>
                {/* Render text fields dynamically */}
                {fields.map((field) => renderTextInput(field))}

                {/* Render SelectDropdown */}
                <SelectDropdown
                    options={[
                        {name: 'Option 1', value: 'option1'},
                        {name: 'Option 2', value: 'option2'},
                        {name: 'Option 3', value: 'option3'},
                    ]}
                    label="category"
                    onSelectChange={handleSelectChange}
                    isError={errors['category']}
                />

                {/* TextArea field */}
                <TextAreaField onChangeText={handleTextChange} name="description" isError={errors['description']}/>

                {/* Render ImageUpload for handling multiple images */}
                <ImageUpload onFileChange={handleFileChange} isError={errors['images']}/>

                {/* Submit Button */}
                <Button type="submit" variant="outlined" color="primary" fullWidth sx={{mt: 2}}>
                    {buttonText}
                </Button>
            </Box>
        </Paper>
    );
};

export default PostForm;
