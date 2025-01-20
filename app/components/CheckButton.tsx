import React, {useState} from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


type onCheckChange = {
    name: string,
    onCheckChange: (checked: boolean) => void
};
type onToggle = { target: { checked: boolean; }; };

export default function CheckButton({name, onCheckChange}: onCheckChange) {
    const [checked, setChecked] = useState(false);

    const handleChange = (event: onToggle) => {
        const isChecked = event.target.checked;
        setChecked(isChecked);
        onCheckChange(isChecked);
    };

    return (
        <FormControlLabel
            name={name}
            control={
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    name={name}
                    color="success"
                />
            }
            label="Remember me"
        />
    );
}