'use client';

import {Category} from "@/app/models/Post";
import CustomDropdown from "@/app/components/CustomDropdown";
import {useState, useEffect} from 'react';
import {toSentenceCase} from "@/app/actions/useHelper";
import {SUB_CATEGORIES} from "@/app/actions/useConstants";
import getAdminData from "@/app/actions/admin/getAdminData";
import {categoryHandler} from "@/app/api/external/endPoints";

interface categoryProps {
    onSelectChange?: (value: string) => void;
    isError?: string | null | undefined
    isFullWidth?: boolean;
    label: string;
    defaultVal?: string;
    name?: string;
    sx?: object;
}

const SubCategoriesDropdown = ({ defaultVal, label, name, onSelectChange, isError, isFullWidth, sx }: categoryProps) => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const fetchedCategories = await getAdminData<Category[]>({ route: categoryHandler });
            setCategories(fetchedCategories);
        };

        fetchCategories();
    }, []);// Only fetch once when component mounts

    const categoryOptions = categories.map((category) => ({
        name: toSentenceCase(category.category),
        value: category.category
    }));

    return (
        <CustomDropdown
            options={categoryOptions || SUB_CATEGORIES}
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

export default SubCategoriesDropdown;

