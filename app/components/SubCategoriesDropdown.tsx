'use client';

import {Category} from "@/app/models/Post";
import CustomDropdown from "@/app/components/CustomDropdown";
import {useState, useEffect} from 'react';
import {toSentenceCase} from "@/app/util/clientUtils";
import {SUB_CATEGORIES} from "@/app/util/constants";
import getAdminData from "@/app/actions/admin/getAdminData";
import {categoryHandler} from "@/app/util/endPoints";

interface categoryProps {
    onSelectChange?: (value: string) => void;
    isError?: string | null | undefined
    isFullWidth?: boolean;
    label: string;
    defaultVal?: string;
    name?: string;
    sx?: object;
}

const SubCategoriesDropdown = (param: categoryProps) => {
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
            onSelectChange={param.onSelectChange}
            isFullWidth={param.isFullWidth}
            defaultVal={param.defaultVal}
            isError={param.isError}
            label={param.label}
            name={param.name}
            sx={param.sx}
        />
    );
};

export default SubCategoriesDropdown;

