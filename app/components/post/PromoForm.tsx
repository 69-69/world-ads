import React, {useState, FormEvent} from 'react';
import {Button, Paper, Box, Typography, Divider, Stack, Tooltip} from '@mui/material';
import ImageUpload from './ImageUpload';
import CustomTextField from "@/app/components/CustomTextField";
import ToastMessage from "@/app/components/ToastMessage";
import {useFormDataChange} from "@/app/util/formDataChange";
import MulticolorSelector from "@/app/components/post/MulticolorSelector";
import {FormDataModel} from "@/app/models/FormDataModel";
import PromoSchedule from "@/app/components/admin/PromoSchedule";
import {Field} from "@/app/models/TextField";
import {useRouter} from "next/navigation";
import RefreshIcon from "@mui/icons-material/Refresh";
import {ADMIN_PROMO_ROUTE} from "@/app/util/constants";
import {inRange} from "@/app/util/clientUtils";
import {ApiResponse} from "@/app/models";

interface PromoFormProps {
    onSubmit: (formData: FormDataModel, productId: string) => Promise<ApiResponse>;
    title: string;
    product_id: string;
    buttonText: string;
    fields: Field[];
}

const toFullWidth = '1/-1';

const PromoForm: React.FC<PromoFormProps> = (props) => {

    const router = useRouter();
    const [formKey, setFormKey] = useState(0);
    const [formData, setFormData] = useState<FormDataModel>(
        props.fields.reduce<FormDataModel>((acc, field) => {
            acc[field.name] = field.name === 'bg_image' ? [] : ''; // Initialize 'images' as an empty array and others as an empty string
            return acc;
        }, {} as FormDataModel)
    );

    const {errors, setErrors, message, setMessage, handleChange} = useFormDataChange(setFormData);

    // Handle changes to file input (images)
    const handleFileChange = (files: File[]) => {
        if (JSON.stringify(formData.bg_image) === JSON.stringify(files)) return; // Only update if the files array is different
        setFormData((prev) => ({...prev, bg_image: files[0]}));
        setErrors((prev) => ({...prev, bg_image: ''})); // Clear error
    };

    // Handle product colors selection
    const handleProductColors = (colors: string) => {
        if (formData.bg_color === colors) return; // Only update if the colors have changed
        setFormData((prev) => ({...prev, bg_color: colors}));
        setErrors((prev) => ({...prev, bg_color: ''})); // Clear error
    };

    const handleScheduleChange = (data: { start: string; end: string }) => {
        // console.log('Send this to backend:', data);
        if (formData.start_at === data.start && formData.end_at === data.end) return; // Only update if the colors have changed
        setFormData((prev) => ({...prev, start_at: data.start, end_at: data.end}));
        setErrors((prev) => ({...prev, start_at: '', end_at: ''})); // Clear error
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

        if (!formData.bg_color && !formData.bg_image) {
            errors.bg_color = 'Background color or image is required';
            errors.bg_image = 'Background color or image is required';
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
            props.fields.forEach((field) => resetFormData[field.name] = field.name === 'bg_image' ? [] : '');
            resetFormData.bg_color = '';
            resetFormData.bg_image = [];
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
            const response = await props.onSubmit(formData, props.product_id);

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
        <Paper key={formKey} elevation={1} component={Box} p={2} sx={{width: '100%', maxWidth: 'auto', margin: 'auto'}}>

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
                <PromoSchedule onScheduleChange={handleScheduleChange} errors={errors}/>
                <CustomTextField fields={props.fields} formData={formData} handleChange={handleChange} errors={errors}/>

                <Box key="color-selector" sx={{gridColumn: toFullWidth}}>
                    <Typography variant="body2" align='center' gutterBottom>
                        Add background color or image
                    </Typography>
                </Box>
                <MulticolorSelector onColorChange={handleProductColors} label='Add Background color'
                                    isError={errors['bg_color']}/>
                <ImageUpload onFileChange={handleFileChange} isError={errors['bg_image']}
                             warningMsg='Add background image'/>

                <Box key="btn-group" sx={{gridColumn: toFullWidth, mb: 2}}>
                    {message.error && <ToastMessage message={message.error}/>}
                    {message.success &&
                        <ToastMessage href={ADMIN_PROMO_ROUTE} message={message.success} type="success"/>}

                    <Stack
                        spacing={2}
                        direction= {{ xs: 'column', sm: 'row', md: 'row', lg: 'row' }}
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
    )
        ;
};

export default PromoForm;
