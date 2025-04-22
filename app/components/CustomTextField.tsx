import {IconButton, InputAdornment, TextField} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import React, {useState} from "react";
import {toSentenceCase} from "@/app/actions/useHelper";
import {Field} from "@/app/models/TextField";


interface CustomFormData {
    [key: string]: string | number | File | File[];
}

interface CustomTextProp {
    fields: Field[];
    formData: CustomFormData;
    // formData: Record<string, string>;
    errors: Record<string, string>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const toFullWidth = '1/-1';


const CustomTextField = ({fields, formData, handleChange, errors}: CustomTextProp) => {

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    const hiddenFields = fields.filter((f) => f.type === 'hidden');

    const renderTextInput = (field: Field, lastIndexIsOdd: boolean, index: number) => {
        const isError: string = errors[field.name];
        const isPassword: boolean = field.type === 'password';
        const fieldType: string = isPassword
            ? (showPassword ? 'text' : 'password')
            : (field.type || 'text');

        // console.log('steve fieldType:', formData[field.name]);

        return (
            <TextField
                key={index}
                name={field.name}
                label={toSentenceCase(field.value || field.label!)}
                type={fieldType}
                variant="outlined"
                defaultValue={field.value || formData[field.name]}
                onChange={handleChange}
                fullWidth={lastIndexIsOdd}
                multiline={field.isTextArea}
                rows={field.isTextArea ? 3 : 1}
                size="small"
                error={Boolean(isError)}
                helperText={isError}
                hidden={hiddenFields.includes(field)}
                sx={{
                    display: hiddenFields.includes(field) ? 'none' : 'inherit',
                    gridColumn: field.fullWidth || lastIndexIsOdd ? toFullWidth : '',
                }}
                slotProps={isPassword ? {
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={togglePasswordVisibility}>
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        ),
                    },
                } : field.suffix === undefined ? {} : {
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                {field.suffix}
                            </InputAdornment>
                        ),
                    }
                }}
            />
        );
    };


    return fields.map((field: Field, index: number) => {
        const visibleFields = fields.filter((f) => f.type !== 'hidden');
        const isOdd = field.fullWidth ?? true;
        const totalFields = visibleFields.length;
        const isLast = index === totalFields - 1;
        const lastIndexIsOdd = isOdd && (isLast && (totalFields % 2 !== 0));

        return renderTextInput(field, lastIndexIsOdd, index);
    });
}

export default CustomTextField;
