// app/components/ControlledSwitch.tsx
//
import React, {useState} from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

type onSwitchChange = {
    onSwitchChange: (checked: boolean) => void
};
type onToggle = { target: { checked: boolean; }; };

export default function SwitchButton({onSwitchChange}: onSwitchChange) {
    const [checked, setChecked] = useState(false);

    const handleChange = (event: onToggle) => {
        const isToggled = event.target.checked;
        setChecked(isToggled);
        onSwitchChange(isToggled);
    };
    // Define the color of the label based on checked state
    const labelColor = checked ? 'green' : 'inherit';

    return (
        <FormControlLabel
            control={
                <Switch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{'aria-label': 'controlled'}}
                    color={checked ? 'success' : 'secondary'} // Switch color
                />}
            label="Seller"
            labelPlacement="end"  // Label position if needed
            sx={{
                '& .MuiFormControlLabel-label': {
                    color: labelColor,  // Change label color based on checked state
                },
            }}
        />
    );
}
