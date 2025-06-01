import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {replaceSpaces, toSentenceCase} from '@/app/util/clientUtils';
import {Stack, Tooltip} from "@mui/material";
import {LiveHelpTwoTone} from "@mui/icons-material";

type data = { name: string; value: string; tooltip?: string; };

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

const CustomDropdown: React.FC<CustomDropdownProps> = (props) => {
    const options = props.options === undefined ? [] : props.options;
    const [selectedOption, setSelectedOption] = React.useState('');


    const handleChange = (e: SelectChangeEvent<string>) => {
        const {value} = e.target as HTMLInputElement;
        setSelectedOption(value);
        if (props.onSelectChange) {
            props.onSelectChange(value);
        }
    };

    const selectedTooltip = options.find(option => option.value === selectedOption)?.tooltip;

    return (
        <Stack spacing={1} direction="row">
            <FormControl fullWidth={props.isFullWidth || true} size='small' error={Boolean(props.isError)}
                         sx={props.sx}>
                <InputLabel id="select-dropdown-label">{toSentenceCase(props.label)}</InputLabel>
                <Select
                    labelId="select-dropdown-label"
                    id="select-dropdown"
                    label={toSentenceCase(props.label) || 'Select Option'}
                    defaultValue={props.defaultVal || ''}
                    name={props.name || replaceSpaces({str: props.label})}
                    fullWidth
                    value={selectedOption}
                    onChange={handleChange}
                    error={Boolean(props.isError)}
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
                {props.isError && <FormHelperText>{props.isError || 'This field is required.'}</FormHelperText>}
            </FormControl>
            {selectedTooltip && <Tooltip title={selectedTooltip}><LiveHelpTwoTone fontSize="large" color="primary"/></Tooltip>}
        </Stack>
    );
};

export default CustomDropdown;
