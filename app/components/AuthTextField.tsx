// app/components/AuthTextField.tsx
//
import {IconButton, InputAdornment, TextField} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import React, {useState} from "react";

interface Field {
    name: string;
    label?: string;
    type?: string;
}

interface AuthInterface {
    fields: Field[];
    formData: Record<string, string>;
    errors: Record<string, string>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const toFullWidth = '1/-1';


const AuthTextField = ({fields, formData, handleChange, errors}: AuthInterface) => {

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
                label={field.label}
                name={field.name}
                type={fieldType}
                variant="outlined"
                value={formData[field.name]}
                onChange={handleChange}
                fullWidth={lastIndexIsOdd}
                size="small"
                error={Boolean(isError)}
                helperText={isError}
                hidden={hiddenFields.includes(field)}
                sx={{
                    display: hiddenFields.includes(field) ? 'none' : 'inherit',
                    gridColumn: lastIndexIsOdd ? toFullWidth : '',
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
                } : {}}
            />
        );
    };


    return fields.map((field: Field, index: number) => {
        const visibleFields = fields.filter((f) => f.type !== 'hidden');
        const totalFields = visibleFields.length;
        const isLast = index === totalFields - 1;
        const lastIndexIsOdd = isLast && (totalFields % 2 !== 0);

        return renderTextInput(field, lastIndexIsOdd, index);
    });
}

export default AuthTextField;
