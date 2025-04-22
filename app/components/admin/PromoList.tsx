'use client';

import React, {useState} from 'react';
import {Promo} from "@/app/models/Post";
import PromoRow from "@/app/components/admin/PromoRow";
import {promoHandler} from "@/app/api/external/endPoints";
import ListTable from "@/app/components/admin/ListTable";
import {ADMIN_PRODUCT_ROUTE} from "@/app/actions/useConstants";
import {deleteAction} from "@/app/actions/admin/deleteAction";
import {Box} from "@mui/material";
import UpdateDialogPage from "@/app/(protected)/admin/deal-of-the-day/updateDialogPage";
import {handlePromoEdit} from "@/app/actions/admin/editPromo";

type ActionProps = {
    promos: Promo[];
    tableHeader: string[];
};

const PromoList: React.FC<ActionProps> = ({promos, tableHeader}) => {
    const [search, setSearch] = useState('');
    const [openAlert, setOpenAlert] = useState<{ open: boolean, id?: string | number | undefined }>({
        open: false,
        id: undefined
    });
    const [openEditDialog, setOpenEditDialog] = useState<{ open: boolean, id?: string | number | undefined }>({
        open: false,
        id: undefined
    });

    const [promoData, setPromoData] = useState<Promo[]>(promos);

    const filtered = Array.isArray(promoData)
        ? promoData.filter(p =>
            p.title.toLowerCase().includes(search.toLowerCase())
        )
        : [];


    const handleCloseAlert = () => setOpenAlert({open: false, id: undefined});
    const handleCloseDialog = () => setOpenEditDialog({open: false, id: undefined});

    const confirmDeletePromo = async () => {
        const result = await deleteAction({
            route: promoHandler,
            id: openAlert.id as string,
        });
        if (result?.success) {
            setPromoData(prev => prev.filter(promo => promo.hashed_id !== openAlert.id));
            handleCloseAlert();
        } else {
            console.error('Failed to delete promo:', result?.error);
            alert(`Failed to delete promo: ${result?.error}`);
        }
    };

    const handleUserAction = (hashed_id: number | string | undefined, action: string) => {
        if (!hashed_id) return;

        if (action === 'edit') {
            setOpenEditDialog({open: true, id: hashed_id}); // Save the deal-of-the-day to edit
            console.log('Edit deal-of-the-day with ID:', hashed_id);
            // handle edit logic (e.g., open modal or redirect)
        } else if (action === 'delete') {
            setOpenAlert({open: true, id: hashed_id});           // Show confirmation dialog
        }
    };

      const handleUpdate = async (formData: FormData) => {
          const hashed_id = openEditDialog.id;
          if (!hashed_id) return;

          const result = await handlePromoEdit(formData, hashed_id as string);

          if (result?.success) {
              setPromoData(prev => prev.map(promo => promo.hashed_id === hashed_id ? {...promo, ...formData} : promo));
              handleCloseDialog();
          } else {
              console.error('Failed to update promo:', result?.error);
              // alert(`Failed to update promo: ${result?.error}`);
          }
      };

    const promoRows = filtered.map(promo => {
        return (
            <PromoRow key={promo.hashed_id} promo={promo} onAction={handleUserAction}/>
        );
    });

    return (
        <Box>
            <ListTable
                tableHeader={tableHeader}
                rows={promoRows}
                openDialog={openAlert.open}
                onCloseDialog={handleCloseDialog}
                onConfirmAction={confirmDeletePromo}
                dialogTitle="Delete Confirmation"
                dialogContent="Are you sure you want to delete this promo?"
                confirmLabel="Delete"
                cancelLabel="Cancel"
                showSearch
                searchValue={search}
                onSearchChange={setSearch}
                labelLink={{ref: ADMIN_PRODUCT_ROUTE, label: 'Add New Promo'}}
            />
            <UpdateDialogPage
                open={openEditDialog.open}
                handleClose={handleCloseDialog}
                handleSubmit={handleUpdate}
                id={openEditDialog.id as string}
            />
        </Box>
    );
};

export default PromoList;
