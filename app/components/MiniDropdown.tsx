import React from "react";
import {MenuItem, TextField} from "@mui/material";

type MiniDropdownParams = {
    options: { name: string; value: string }[];
    label: string;
    isError?: boolean;
    isFullWidth?: boolean;
    name: string;
    helperText?: string;
    defaultValue?: string;
};

const MiniDropdown = (param: MiniDropdownParams) => {
    return (
        <TextField
            select
            name={param.name}
            label={param.label}
            defaultValue={param.defaultValue ?? ""}
            variant="outlined"
            fullWidth={param.isFullWidth}
            error={param.isError}
            helperText={param.helperText}
            size="small"
        >
            <MenuItem value="" disabled>
                Select a category
            </MenuItem>
            {param.options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.name}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default MiniDropdown;