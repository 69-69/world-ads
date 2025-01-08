import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import { toSentenceCase } from '@/app/hooks/useValidation';

interface SelectDropdownProps {
    options: { name: string; value: string }[];
    onSelectChange: (value: string) => void;
    label: string;
    isError?: string | null;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({ options = [], onSelectChange, label, isError }) => {
    const [selectedOption, setSelectedOption] = React.useState('');

    const handleChange = (e: SelectChangeEvent<string>) => {
        const { value } = e.target as HTMLInputElement;
        setSelectedOption(value);
        onSelectChange(value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth size='small' error={Boolean(isError)}>
                <InputLabel id="select-dropdown-label">{toSentenceCase(label)}</InputLabel>
                <Select
                    labelId="select-dropdown-label"
                    id="select-dropdown"
                    label={toSentenceCase(label) || 'Select Option'}
                    name={label}
                    value={selectedOption}
                    onChange={handleChange}
                    error={Boolean(isError)}
                    size='small'
                >
                    {options.length > 0 ? (
                        options.map(({ name, value }) => (
                            <MenuItem key={value} value={value}>{name}</MenuItem>
                        ))
                    ) : (
                        <MenuItem value="" disabled>No options available</MenuItem>
                    )}
                </Select>
                {isError && <FormHelperText>{isError || 'This field is required.'}</FormHelperText>}
            </FormControl>
        </Box>
    );
};

export default SelectDropdown;
