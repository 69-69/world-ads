'use client';

import {Condition} from "@/app/models/Post";
import CustomDropdown from "@/app/components/CustomDropdown";
import {useState, useEffect} from 'react';
import {toSentenceCase} from "@/app/util/clientUtils";
import {PRODUCT_CONDITIONS} from "@/app/util/constants";
import getAdminData from "@/app/actions/admin/getAdminData";
import {conditionHandler} from "@/app/util/endPoints";

interface conditionProps {
    onSelectChange?: (value: string) => void;
    isError?: string | null | undefined
    isFullWidth?: boolean;
    label: string;
    defaultVal?: string;
    name?: string;
    sx?: object;
}

const ConditionsDropdown = ({defaultVal, label, name, onSelectChange, isError, isFullWidth, sx}: conditionProps) => {
    const [conditions, setConditions] = useState<Condition[]>([]);

    useEffect(() => {
        const fetchConditions = async () => {
            const fetchedConditions = await getAdminData<Condition[]>({ route: conditionHandler });
            setConditions(fetchedConditions);
        };

        fetchConditions();
    }, []);// Only fetch once when component mounts

    const conditionOptions = conditions.map((condition) => ({
        name: toSentenceCase(condition.condition), // Ensure name is always a string
        value: condition.condition,
    }));

    return (
        <CustomDropdown
            options={conditionOptions || PRODUCT_CONDITIONS}
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

export default ConditionsDropdown;

