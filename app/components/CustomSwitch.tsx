// app/components/CustomSwitch.tsx
//
import React, {ChangeEvent} from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

type CustomSwitchProps = {
    label: string;
    onSwitchChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void
};

const CustomSwitch = ({onSwitchChange, label}: CustomSwitchProps) =>{

    return (
        <FormControlLabel
            control={
                <Switch
                    onChange={onSwitchChange}
                    inputProps={{'aria-label': 'controlled'}}
                />}
            label={label}
            labelPlacement="end"  // Label position if needed
            sx={{
                '& .MuiFormControlLabel-label': {
                    color: 'inherit',  // Change label color based on checked state
                },
            }}
        />
    );
}

export default CustomSwitch;
