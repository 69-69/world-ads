'use client';

import {Condition} from "@/app/models/Post";
import CustomDropdown from "@/app/components/CustomDropdown";
import {useState, useEffect} from 'react';
import {toSentenceCase} from "@/app/util/clientUtils";
import {PRODUCT_CONDITIONS} from "@/app/util/constants";
import getAdminData from "@/app/actions/admin/getAdminData";
import {conditionHandler} from "@/app/util/endPoints";

interface conditionParams {
    onSelectChange?: (value: string) => void;
    isError?: string | null | undefined
    isFullWidth?: boolean;
    label: string;
    defaultVal?: string;
    name?: string;
    sx?: object;
}

const ConditionsDropdown = (param: conditionParams) => {
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

export default ConditionsDropdown;

