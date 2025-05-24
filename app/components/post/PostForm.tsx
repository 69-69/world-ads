import React, {useState, FormEvent} from 'react';
import {Button, Paper, Box, Typography, Divider, Stack, Tooltip} from '@mui/material';
import ImageUpload from './ImageUpload';
import CustomTextField from "@/app/components/CustomTextField";
import ToastMessage from "@/app/components/ToastMessage";
import {useFormDataChange} from "@/app/util/formDataChange";
import MulticolorSelector from "@/app/components/post/MulticolorSelector";
import {FormDataModel} from "@/app/models/FormDataModel";
import {Field} from "@/app/models/TextField";
import BrandsDropdown from "@/app/components/BrandsDropdown";
import SubCategoriesDropdown from "@/app/components/SubCategoriesDropdown";
import ConditionsDropdown from "@/app/components/ConditionsDropdown";
import ParentCategoriesDropdown from "@/app/components/ParentCategoriesDropdown";
import {useRouter} from 'next/navigation';
import RefreshIcon from '@mui/icons-material/Refresh';
import {ADMIN_PRODUCT_ROUTE} from "@/app/util/constants";
import {ApiResponse} from "@/app/models";
import {inRange} from "@/app/util/clientUtils";

interface PostFormProps {
    onSubmit: (formData: FormDataModel) => Promise<ApiResponse>;
    title: string;
    buttonText: string;
    fields: Field[];
}

const toFullWidth = '1/-1';

const PostForm: React.FC<PostFormProps> = (props) => {
    /*State to store form values
    const [formData, setFormData] = useState<FormDataModel>(
        fields.reduce<FormDataModel>((acc, field) => {
            acc[field.name] = '';
            return acc;
        }, {images: [] as File[]})
    );*/
    const router = useRouter();
    const [formKey, setFormKey] = useState(0);
    const [formData, setFormData] = useState<FormDataModel>(
        props.fields.reduce<FormDataModel>((acc, field) => {
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

    const conditionChange = (value: string) => {
        if (formData.condition === value) return;  // Only update if the value has changed
        setFormData((prev) => ({...prev, condition: value}));
        setErrors((prev) => ({...prev, condition: ''}));// Clear error
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

        props.fields.forEach((field) => {
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
        if (!formData.condition) {
            errors.condition = 'Condition is required';
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

    function refreshPage() {
        router.refresh();       // Refreshes server data
        setFormKey(prev => prev + 1);  // Forces client component remount
    }

    const resetForm = () => {
        setFormData((prev) => {
            const resetFormData = {...prev};
            props.fields.forEach((field) => resetFormData[field.name] = field.name === 'images' ? [] : '');
            resetFormData.product_colors = '';
            resetFormData.category = '';
            resetFormData.sub_category = '';
            resetFormData.images = [];
            return resetFormData;
        });

        setErrors({}); // Clear all errors
        setMessage({success: '', error: ''}); // Clear messages
        refreshPage();
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
            const response = await props.onSubmit(formData);

            if (typeof response === 'object' && response !== null && 'message' in response) {
                if (response.status && inRange(response.status, 200, 299)) {
                    setMessage({success: (response as { message: string }).message});
                    // Reset form data after successful submission
                    resetForm();
                    return;
                }
                setMessage({error: (response as { message: string }).message});
            }
        } catch (err) {
            setMessage({error: err instanceof Error ? err.message : 'Something went wrong, please try again'});
        }
    };

    return (
        <Paper id={props.title+formKey} key={formKey} elevation={1} component={Box} p={2} sx={{width: '100%', maxWidth: 'auto', margin: 'auto'}}>

            <Box key={props.title} sx={{mb: 2}} display="flex" justifyContent="space-between" alignItems="center">
                <Typography fontWeight="bold" variant="h6" align="center" gutterBottom>
                    {props.title}
                </Typography>
                <Tooltip title="Refresh data">
                    <Button variant="outlined" onClick={() => refreshPage()} size='small' startIcon={<RefreshIcon/>}>
                        Refresh
                    </Button>
                </Tooltip>
            </Box>
            <Divider sx={{mb: 2}}/>
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
                <ParentCategoriesDropdown
                    label="Post Category"
                    onSelectChange={postCategoryChange}
                    isError={errors['category']}
                    isFullWidth={false}
                />
                <BrandsDropdown
                    label="Brand"
                    onSelectChange={brandChange}
                    isError={errors['brand']}
                    isFullWidth={false}
                />
                {formData.category && (
                    <>
                        <SubCategoriesDropdown
                            /*options={
                                SUB_CATEGORIES[formData.category as keyof typeof SUB_CATEGORIES] || []
                            }*/
                            label="Item Category"
                            onSelectChange={postSubCategoryChange}
                            isError={errors['sub_category']}
                            isFullWidth={false}
                        />
                        <ConditionsDropdown
                            label="Condition"
                            onSelectChange={conditionChange}
                            isError={errors['condition']}
                            isFullWidth={false}
                        />
                    </>
                )}
                <CustomTextField fields={props.fields} formData={formData} handleChange={handleChange} errors={errors}/>
                <MulticolorSelector onColorChange={handleProductColors} isError={errors['product_colors']}/>
                <ImageUpload onFileChange={handleFileChange} isError={errors['images']}/>

                <Box key="btn-group" sx={{gridColumn: toFullWidth, mb: 2}}>
                    {message.error && <ToastMessage message={message.error}/>}
                    {message.success &&
                        <ToastMessage href={ADMIN_PRODUCT_ROUTE} message={message.success} type="success"/>}
                    <Stack
                        spacing={2}
                        direction={{xs: 'column', sm: 'row', md: 'row', lg: 'row'}}
                        sx={{display: 'flex', justifyContent: 'space-between'}}
                    >
                        <Tooltip title="Reset the form">
                            <Button
                                variant="outlined"
                                sx={{width: {lg: 'auto'}}}
                                color="error" onClick={() => resetForm()}
                                fullWidth
                            >
                                Reset
                            </Button>
                        </Tooltip>
                        <Button type="submit" variant="outlined" sx={{width: {lg: 'auto'}}} fullWidth>
                            {props.buttonText}
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Paper>
    );
};

export default PostForm;
