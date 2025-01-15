import {ChangeEvent, useState} from "react";


interface CustomFormData {
    [key: string]: string | number | File[];
}

export const useFormDataChange = (setFormData: (value: (((prevState: CustomFormData) => CustomFormData) | CustomFormData)) => void) => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [message, setMessage] = useState<{ success?: string; error?: string }>({success: '', error: ''});

    // Handle changes to form text fields
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        // Update form data with the new value
        setFormData((prev) => ({...prev, [name]: value}));

        // Clear the specific field's error when the user starts typing
        setErrors((prev) => ({...prev, [name]: ''}));
    };
    return {errors, setErrors, message, setMessage, handleChange};
}