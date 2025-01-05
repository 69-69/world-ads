import React, {useState, ChangeEvent} from 'react';
import {TextField} from '@mui/material';
import {toSentenceCase} from '@/app/hooks/useValidation';

// Define the types for the props
interface TextAreaFieldProps {
    onChangeText: (value: string) => void;
    name: string;
    isError?: string | null;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({onChangeText, name, isError}) => {
    // State to store form values
    const [formData, setFormData] = useState<string>('');

    // Handle form field changes (text inputs)
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {name, value} = e.target;

        setFormData(value); // Update the form data
        onChangeText(value);
    };

    return (
        <TextField
            key={name}
            label={toSentenceCase(name)}
            name={name}
            multiline
            rows={3}
            variant="outlined"
            fullWidth
            value={formData}  // Bind formData to the value of the TextField
            onChange={handleChange}
            error={Boolean(isError)}
            helperText={typeof isError === 'string' ? isError : ''}
            sx={{mt: 2}}
        />
    );
};

export default TextAreaField;
