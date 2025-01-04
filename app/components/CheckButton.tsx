// app/components/RememberMe.tsx
//
import React, {useState} from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


type onCheckChange = {
    onCheckChange: (checked: boolean) => void
};
type onToggle = { target: { checked: boolean; }; };

export default function CheckButton({onCheckChange}: onCheckChange) {
    const [checked, setChecked] = useState(false);

    const handleChange = (event: onToggle) => {
        const isChecked = event.target.checked;
        setChecked(isChecked);
        onCheckChange(isChecked);
    };

    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    name="rememberMe"
                    color="success"
                />
            }
            label="Remember me"
        />
    );
}