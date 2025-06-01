'use client';
import CustomDropdown from "@/app/components/CustomDropdown";
import {IMAGE_DISPLAY_MODE} from "@/app/util/constants";

interface brandParams {
    onSelectChange?: (value: string) => void;
    isError?: string | null | undefined
    isFullWidth?: boolean;
    label: string;
    name?: string;
    defaultVal?: string;
    sx?: object;
}

// Promo background Image Display Mode Dropdown
const ImageDisplayModeDropdown = (param: brandParams) => {

    return (
        <CustomDropdown
            options={IMAGE_DISPLAY_MODE}
            label={param.label}
            name={param.name}
            defaultVal={param.defaultVal}
            onSelectChange={param.onSelectChange}
            isError={param.isError}
            isFullWidth={param.isFullWidth}
            sx={param.sx}
        />
    );
};

export default ImageDisplayModeDropdown;

