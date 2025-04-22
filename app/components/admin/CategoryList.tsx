'use client';

import React, {useState} from 'react';
import {Category} from "@/app/models/Post";
import {categoryHandler} from "@/app/api/external/endPoints";
import ListTable from "@/app/components/admin/ListTable";
import {ADMIN_CATEGORY_CREATE_ROUTE} from "@/app/actions/useConstants";
import CategoryRow from "@/app/components/admin/CategoryRow";
import {deleteAction} from "@/app/actions/admin/deleteAction";

type ActionProps = {
    categories: Category[];
    tableHeader: string[];
};

const CategoryList: React.FC<ActionProps> = ({categories, tableHeader}) => {
    const [search, setSearch] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | number | undefined>(undefined);
    const [categoryData, setCategoryData] = useState<Category[]>(categories);

    const filtered = Array.isArray(categoryData)
        ? categoryData.filter(p =>
            p.category.toLowerCase().includes(search.toLowerCase())
        )
        : [];


    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedCategoryId(undefined);
    };

    const confirmDeleteCategory = async () => {
        const result = await deleteAction({
            route: categoryHandler,
            id: selectedCategoryId as string,
        });
        if (result?.success) {
            setCategoryData(prev => prev.filter(category => category.hashed_id !== selectedCategoryId));
            handleCloseDialog();
        }else {
            console.error('Failed to delete category:', result?.error);
            alert(`Failed to delete category: ${result?.error}`);
        }
    };

    const handleUserAction = (hashed_id: number | string | undefined, action: string) => {
        if (!hashed_id) return;

        if (action === 'edit') {
            console.log('Edit Category with ID:', hashed_id);
            // handle edit logic (e.g., open modal or redirect)
        } else if (action === 'delete') {
            setSelectedCategoryId(hashed_id); // Save the Category to delete
            setOpenDialog(true);           // Show confirmation dialog
        }
    };


    const categoryRows = filtered.map(category => {
        return (
            <CategoryRow key={category.hashed_id} category={category} onAction={handleUserAction}/>
        );
    });

    return (
        <ListTable
            tableHeader={tableHeader}
            rows={categoryRows}
            openDialog={openDialog}
            onCloseDialog={handleCloseDialog}
            onConfirmAction={confirmDeleteCategory}
            dialogTitle="Delete Confirmation"
            dialogContent="Are you sure you want to delete this category?"
            confirmLabel="Delete"
            cancelLabel="Cancel"
            showSearch
            searchValue={search}
            onSearchChange={setSearch}
            labelLink={{ref: ADMIN_CATEGORY_CREATE_ROUTE, label: 'Add New Category'}}
        />
    );
};

export default CategoryList;
