'use client';

import React, {useState} from 'react';
import {Brand} from "@/app/models/Post";
import {brandHandler} from "@/app/api/external/endPoints";
import ListTable from "@/app/components/admin/ListTable";
import {ADMIN_BRAND_CREATE_ROUTE} from "@/app/actions/useConstants";
import BrandRow from "@/app/components/admin/BrandRow";
import {deleteAction} from "@/app/actions/admin/deleteAction";

type ActionProps = {
    brands: Brand[];
    tableHeader: string[];
};

const BrandList: React.FC<ActionProps> = ({brands, tableHeader}) => {
        const [search, setSearch] = useState('');
        const [openDialog, setOpenDialog] = useState(false);
        const [selectedBrandId, setSelectedBrandId] = useState<string | number | undefined>(undefined);
        const [brandData, setBrandData] = useState<Brand[]>(brands);

        const filtered = Array.isArray(brandData)
            ? brandData.filter(p =>
                p.brand.toLowerCase().includes(search.toLowerCase())
            )
            : [];


        const handleCloseDialog = () => {
            setOpenDialog(false);
            setSelectedBrandId(undefined);
        };

        const confirmDeleteBrand = async () => {
            const result = await deleteAction({
                route: brandHandler,
                id: selectedBrandId as string,
            });
            if (result?.success) {
                // Update Brand data to reflect deletion
                setBrandData(prev => prev.filter(brand => brand.hashed_id !== selectedBrandId));
                handleCloseDialog();
            }else {
                console.error('Failed to delete Brand:', result?.error);
                alert(`Failed to delete Brand: ${result?.error}`);
            }
        };

        const handleUserAction = (hashed_id: number | string | undefined, action: string) => {
            if (!hashed_id) return;

            if (action === 'edit') {
                console.log('Edit Brand with ID:', hashed_id);
                // handle edit logic (e.g., open modal or redirect)
            } else if (action === 'delete') {
                setSelectedBrandId(hashed_id); // Save the Brand to delete
                setOpenDialog(true);           // Show confirmation dialog
            }
        };


        const brandRows = filtered.map(brand => {
            return (
                <BrandRow key={brand.hashed_id} brand={brand} onAction={handleUserAction}/>
            );
        });

        return (
            <ListTable
                tableHeader={tableHeader}
                rows={brandRows}
                openDialog={openDialog}
                onCloseDialog={handleCloseDialog}
                onConfirmAction={confirmDeleteBrand}
                dialogTitle="Delete Confirmation"
                dialogContent="Are you sure you want to delete this brand?"
                confirmLabel="Delete"
                cancelLabel="Cancel"
                showSearch
                searchValue={search}
                onSearchChange={setSearch}
                labelLink={{ref: ADMIN_BRAND_CREATE_ROUTE, label: 'Add New Brand'}}
            />
        );
    };

export default BrandList;
