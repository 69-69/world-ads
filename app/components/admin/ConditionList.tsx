'use client';

import React, {useState} from 'react';
import {Condition} from "@/app/models/Post";
import {conditionHandler} from "@/app/util/endPoints";
import ListTable from "@/app/components/admin/ListTable";
import {ADMIN_PRO_CONDITION_CREATE_ROUTE} from "@/app/util/constants";
import ConditionRow from "@/app/components/admin/ConditionRow";
import {deleteAction} from "@/app/actions/admin/deleteAction";

type ActionProps = {
    conditions: Condition[];
    tableHeader: string[];
};

const ConditionList: React.FC<ActionProps> = ({conditions, tableHeader}) => {
    const [search, setSearch] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedConditionId, setSelectedConditionId] = useState<string | number | undefined>(undefined);
    const [conditionData, setConditionData] = useState<Condition[]>(conditions);

    const filtered = Array.isArray(conditionData)
        ? conditionData.filter(p =>
            p.condition.toLowerCase().includes(search.toLowerCase())
        )
        : [];


    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedConditionId(undefined);
    };

    const confirmDeleteCondition = async () => {
        const result = await deleteAction({
            route: conditionHandler,
            id: selectedConditionId as string,
        });
        if (result?.success) {
            setConditionData(prev => prev.filter(condition => condition.hashed_id !== selectedConditionId));
            handleCloseDialog();
        } else {
            console.error('Failed to delete condition:', result?.error);
            alert(`Failed to delete condition: ${result?.error}`);
        }
    };

    const handleUserAction = (hashed_id: number | string | undefined, action: string) => {
        if (!hashed_id) return;

        if (action === 'edit') {
            console.log('Edit condition with ID:', hashed_id);
            // handle edit logic (e.g., open modal or redirect)
        } else if (action === 'delete') {
            setSelectedConditionId(hashed_id); // Save the condition to delete
            setOpenDialog(true);           // Show confirmation dialog
        }
    };


    const conditionRows = filtered.map(condition => {
        return (
            <ConditionRow key={condition.hashed_id} condition={condition} onAction={handleUserAction}/>
        );
    });

    return (
        <ListTable
            tableHeader={tableHeader}
            rows={conditionRows}
            openDialog={openDialog}
            onCloseDialog={handleCloseDialog}
            onConfirmAction={confirmDeleteCondition}
            dialogTitle="Delete Confirmation"
            dialogContent="Are you sure you want to delete this condition?"
            confirmLabel="Delete"
            cancelLabel="Cancel"
            showSearch
            searchValue={search}
            onSearchChange={setSearch}
            labelLink={{ref: ADMIN_PRO_CONDITION_CREATE_ROUTE, label: 'Add New Condition'}}
        />
    );
};

export default ConditionList;
