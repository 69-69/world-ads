import React from "react";
import {MenuItem, TextField} from "@mui/material";

type MiniDropdownProps = {
    options: { name: string; value: string }[];
    label: string;
    isError?: boolean;
    isFullWidth?: boolean;
    name: string;
    helperText?: string;
    defaultValue?: string;
};

const MiniDropdown = ({
                          options,
                          label,
                          isError,
                          isFullWidth,
                          name,
                          helperText,
                          defaultValue
                      }: MiniDropdownProps) => {
    return (
        <TextField
            select
            name={name}
            label={label}
            defaultValue={defaultValue ?? ""}
            variant="outlined"
            fullWidth={isFullWidth}
            error={isError}
            helperText={helperText}
            size="small"
        >
            <MenuItem value="" disabled>
                Select a category
            </MenuItem>
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.name}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default MiniDropdown;