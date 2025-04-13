'use client';

import React, {useState} from 'react';
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Paper,
    InputAdornment
} from '@mui/material';
import Link from 'next/link';
import {ADMIN_PRODUCT_ROUTE, HOME_ROUTE} from "@/app/hooks/useConstants";
import {Promo} from "@/app/models/Post";
import {Search} from "@mui/icons-material";
import PromoRow from "@/app/components/admin/PromoRow";
import fetchWithRetry from "@/app/api/external/fetchWithRetry";
import {promoHandler} from "@/app/api/external/endPoints";
import AlertDialog from "@/app/components/AlertDialog";

type ActionProps = {
    promos: Promo[];
    tableHeader: string[];
};

const PromoList: React.FC<ActionProps> = ({promos, tableHeader}) => {
    const [search, setSearch] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedPromoId, setSelectedPromoId] = useState<string | number | undefined>(undefined);
    const [promoData, setPromoData] = useState<Promo[]>(promos);

    const filtered = Array.isArray(promoData)
        ? promoData.filter(p =>
            p.title.toLowerCase().includes(search.toLowerCase())
        )
        : [];


    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedPromoId(undefined);
    };

    const confirmDeletePromo = async () => {
        try {
            await fetchWithRetry(HOME_ROUTE + promoHandler, {
                method: 'DELETE',
                endpoint: `/${selectedPromoId}`,
            });
            // Update promo data to reflect deletion
            setPromoData(prev => prev.filter(promo => promo.hashed_id !== selectedPromoId));
            handleCloseDialog();
        } catch (error) {
            console.error('Failed to delete promo:', error);
            alert('Failed to delete promo. Try again later.');
        }
    };

    const handleUserAction = (hashed_id: number | string | undefined, action: string) => {
        if (!hashed_id) return;

        if (action === 'edit') {
            console.log('Edit promo with ID:', hashed_id);
            // handle edit logic (e.g., open modal or redirect)
        } else if (action === 'delete') {
            setSelectedPromoId(hashed_id); // Save the promo to delete
            setOpenDialog(true);           // Show confirmation dialog
        }
    };

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" mb={2}>
                <TextField
                    variant="outlined"
                    placeholder="Search Product..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    size="small"
                    sx={{width: 'auto'}}
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start"><Search/></InputAdornment>,
                        },
                    }}
                />
                <Link href={ADMIN_PRODUCT_ROUTE}>
                    <Button variant="contained" color="primary">
                        + Add Promo
                    </Button>
                </Link>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {tableHeader.map((header, index) => (
                                <TableCell key={index}><b>{header}</b></TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filtered.map(promo => (
                            <PromoRow key={promo.hashed_id} promo={promo} onAction={handleUserAction}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Confirmation Dialog */}
            <AlertDialog
                open={openDialog}
                handleClose={handleCloseDialog}
                handleAction={confirmDeletePromo}
                title='Delete Confirmation'
                content='Are you sure you want to delete this promo?'
                firstLabel="Delete"
                secLabel="Cancel"
            />
        </Box>
    );
};

export default PromoList;
