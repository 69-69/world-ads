import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {replaceSpaces, toSentenceCase} from '@/app/actions/useHelper';

type data = { name: string; value: string };

interface CustomDropdownProps {
    options: data[];
    onSelectChange?: (value: string) => void;
    label: string;
    defaultVal?: string;
    name?: string;
    isError?: string | null;
    sx?: object;
    isFullWidth?: boolean;
}


const sortList = (a: data, b: data) => {
    // Compare names in alphabetical order (case-insensitive)
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) return -1; // a comes before b
    if (nameA > nameB) return 1;  // b comes before a
    return 0; // names are equal
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
                                                           options = [],
                                                           onSelectChange,
                                                           defaultVal,
                                                           label,
                                                           name,
                                                           isError,
                                                           sx,
                                                           isFullWidth
                                                       }) => {
    const [selectedOption, setSelectedOption] = React.useState('');

    const handleChange = (e: SelectChangeEvent<string>) => {
        const {value} = e.target as HTMLInputElement;
        setSelectedOption(value);
        if (onSelectChange) {
            onSelectChange(value);
        }
    };

    return (
        <FormControl fullWidth={isFullWidth || true} size='small' error={Boolean(isError)} sx={sx}>
            <InputLabel id="select-dropdown-label">{toSentenceCase(label)}</InputLabel>
            <Select
                labelId="select-dropdown-label"
                id="select-dropdown"
                label={toSentenceCase(label) || 'Select Option'}
                defaultValue={defaultVal || ''}
                name={name || replaceSpaces({str: label})}
                fullWidth
                value={selectedOption}
                onChange={handleChange}
                error={Boolean(isError)}
                size='small'
            >
                {options.length > 0 ? (
                    options.sort(sortList).map(({name, value}: data) => (
                        <MenuItem key={value} value={value}>{name}</MenuItem>
                    ))
                ) : (
                    <MenuItem value="" disabled>No options available</MenuItem>
                )}
            </Select>
            {isError && <FormHelperText>{isError || 'This field is required.'}</FormHelperText>}
        </FormControl>
    );
};

export default CustomDropdown;
