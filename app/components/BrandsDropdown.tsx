'use client';
import {Brand} from "@/app/models/Post";
import CustomDropdown from "@/app/components/CustomDropdown";
import getAdminData from "@/app/actions/admin/getAdminData";
import {POST_BRANDS} from "@/app/actions/useConstants";
import {useState, useEffect} from 'react';
import {toSentenceCase} from "@/app/actions/useHelper";
import {brandHandler} from "@/app/api/external/endPoints";

interface brandProps {
    onSelectChange?: (value: string) => void;
    isError?: string | null | undefined
    isFullWidth?: boolean;
    label: string;
    name?: string;
    defaultVal?: string;
    sx?: object;
}

const BrandsDropdown = ({defaultVal, label, name, onSelectChange, isError, isFullWidth, sx}: brandProps) => {
    const [brands, setBrands] = useState<Brand[]>([]);

    useEffect(() => {
        const fetchBrands = async () => {
            const fetchedBrands = await getAdminData<Brand[]>({route: brandHandler});
            setBrands(fetchedBrands);
        };

        fetchBrands();
    }, []);// Only fetch once when component mounts

    const brandOptions = brands.map((brand) => ({
        name: toSentenceCase(brand.brand),
        value: brand.brand
    }));

    return (
        <CustomDropdown
            options={brandOptions || POST_BRANDS}
            onSelectChange={onSelectChange}
            isFullWidth={isFullWidth}
            defaultVal={defaultVal}
            isError={isError}
            label={label}
            name={name}
            sx={sx}
        />
    );
};

export default BrandsDropdown;

