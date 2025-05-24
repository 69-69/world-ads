'use client';
import {Brand} from "@/app/models/Post";
import CustomDropdown from "@/app/components/CustomDropdown";
import getAdminData from "@/app/actions/admin/getAdminData";
import {POST_BRANDS} from "@/app/util/constants";
import {useState, useEffect} from 'react';
import {toSentenceCase} from "@/app/util/clientUtils";
import {brandHandler} from "@/app/util/endPoints";

interface brandProps {
    onSelectChange?: (value: string) => void;
    isError?: string | null | undefined
    isFullWidth?: boolean;
    label: string;
    name?: string;
    defaultVal?: string;
    sx?: object;
}

const BrandsDropdown = (props: brandProps) => {
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
            onSelectChange={props.onSelectChange}
            isFullWidth={props.isFullWidth}
            defaultVal={props.defaultVal}
            isError={props.isError}
            label={props.label}
            name={props.name}
            sx={props.sx}
        />
    );
};

export default BrandsDropdown;

