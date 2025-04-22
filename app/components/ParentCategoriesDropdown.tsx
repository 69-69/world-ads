'use client';
import CustomDropdown from "@/app/components/CustomDropdown";
import {PARENT_CATEGORIES} from "@/app/actions/useConstants";

interface brandProps {
    onSelectChange?: (value: string) => void;
    isError?: string | null | undefined
    isFullWidth?: boolean;
    label: string;
    name?: string;
    defaultVal?: string;
    sx?: object;
}

const ParentCategoriesDropdown = ({defaultVal, label, name, onSelectChange, isError, isFullWidth, sx}: brandProps) => {

    return (
        <CustomDropdown
            options={PARENT_CATEGORIES}
            label={label}
            name={name}
            defaultVal={defaultVal}
            onSelectChange={onSelectChange}
            isError={isError}
            isFullWidth={isFullWidth}
            sx={sx}
        />
    );
};

export default ParentCategoriesDropdown;

