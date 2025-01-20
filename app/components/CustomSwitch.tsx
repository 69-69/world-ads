import React, {useState, ChangeEvent} from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

interface ControlledSwitchProps {
    onSwitchChange: (checked: boolean) => void;
    label: string;
    name: string;
}

const ControlledSwitch: React.FC<ControlledSwitchProps> = ({onSwitchChange, name, label}) => {
    const [checked, setChecked] = useState<boolean>(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setChecked(isChecked);
        onSwitchChange(isChecked);
    };

    return (
        <FormControlLabel
            control={
                <Switch
                    name={name}
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{'aria-label': 'controlled'}}
                    color={checked ? 'success' : 'secondary'} // Switch color
                />
            }
            name={name}
            label={label}
            labelPlacement="end"
            sx={{
                '& .MuiFormControlLabel-label': {
                    color: 'inherit',
                },
            }}
        />
    );
};

export default ControlledSwitch;
