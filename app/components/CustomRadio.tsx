import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Tooltip from '@mui/material/Tooltip';

type CustomRadioProps = {
    label: string;
    name: string;
    defaultValue?: string;
    data: { label: string; value: string; tooltip?: string }[];
    onRadioChange: (event: React.SyntheticEvent, checked: boolean) => void;
};

export default function CustomRadio({ data, name, label, defaultValue, onRadioChange }: CustomRadioProps) {
    return (
        <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">{label}</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name={name || "row-radio-buttons-group"}
                defaultValue={defaultValue}
            >
                {data.map((item, index) => (
                    <Tooltip key={index} title={item.tooltip} arrow>
                        <span> {/* Tooltip should wrap the FormControlLabel */}
                            <FormControlLabel
                                name={name || "row-radio-buttons-group"}
                                value={item.value}
                                control={<Radio />}
                                label={item.label}
                                onChange={onRadioChange}
                                defaultValue={defaultValue}
                                defaultChecked={defaultValue===item.value}
                            />
                        </span>
                    </Tooltip>
                ))}
            </RadioGroup>
        </FormControl>
    );
}
