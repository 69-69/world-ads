'use client';

import React from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    InputAdornment, Button
} from '@mui/material';
import {Search} from '@mui/icons-material';
import Link from "next/link";
import AlertDialog from "@/app/components/AlertDialog";

type Props = {
    tableHeader: string[];
    rows: React.ReactNode;
    openDialog: boolean;
    onCloseDialog: () => void;
    onConfirmAction: () => void;
    dialogTitle?: string;
    dialogContent?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    showSearch?: boolean;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    labelLink?: Record<string, string>;
};

const ListTable = ({
                       tableHeader,
                       rows,
                       openDialog,
                       onCloseDialog,
                       onConfirmAction,
                       dialogTitle = 'Confirm Action',
                       dialogContent = 'Are you sure you want to proceed?',
                       confirmLabel = 'Confirm',
                       cancelLabel = 'Cancel',
                       showSearch = false,
                       searchValue = '',
                       onSearchChange,
                       labelLink,
                   }: Props) => (
    <Box>
        {showSearch && (
            <Box display="flex" justifyContent="space-between" mb={2}>
                <TextField
                    variant="outlined"
                    placeholder="Search..."
                    value={searchValue}
                    onChange={(e) => onSearchChange?.(e.target.value)}
                    size="small"
                    sx={{width: 'auto'}}
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start"><Search/></InputAdornment>,
                        },
                    }}
                />

                {labelLink && (
                    <Link href={labelLink?.ref}>
                        <Button variant="contained" color="primary">{labelLink?.label}</Button>
                    </Link>
                )}
            </Box>
        )}

        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {(tableHeader || []).map((header, index) => (
                            <TableCell key={index}><b>{header}</b></TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>{rows}</TableBody>
            </Table>
        </TableContainer>

        <AlertDialog
            open={openDialog}
            handleClose={onCloseDialog}
            handleAction={onConfirmAction}
            title={dialogTitle}
            content={dialogContent}
            firstLabel={confirmLabel}
            secLabel={cancelLabel}
        />
    </Box>
)

export default ListTable;


/*
'use client';

import React, { useState } from 'react';
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
import {ADMIN_PRODUCT_ROUTE, HOME_ROUTE} from "@/app/actions/useConstants";
import ProductRow from "@/app/components/admin/ProductRow";
import {Product} from "@/app/models/Post";
import {Search} from "@mui/icons-material";
import fetchWithRetry from "@/app/api/external/fetchWithRetry";
import AlertDialog from "@/app/components/AlertDialog";
import {marketplaceHandler} from "@/app/api/external/endPoints";

type Props = {
    products: Product[];
    tableHeader: string[];
};

export default function ProductList({ products, tableHeader }: Props) {
    const [search, setSearch] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | number | undefined>(undefined);
    const [productData, setProductData] = useState<Product[]>(products);

    const filtered = Array.isArray(productData)
        ? productData.filter(p =>
            p.title.toLowerCase().includes(search.toLowerCase())
        )
        : [];


    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedProductId(undefined);
    };

    const confirmDeleteProduct = async () => {
        try {
            await fetchWithRetry(HOME_ROUTE + marketplaceHandler, {
                method: 'DELETE',
                endpoint: `/${selectedProductId}`,
            });
            // Update product data to reflect deletion
            setProductData(prev => prev.filter(product => product.hashed_id !== selectedProductId));
            handleCloseDialog();
        } catch (error) {
            console.error('Failed to delete product:', error);
            alert('Failed to delete product. Try again later.');
        }
    };

    const handleUserAction = (hashed_id: number | string | undefined, action: string) => {
        if (!hashed_id) return;

        if (action === 'edit') {
            console.log('Edit product with ID:', hashed_id);
            // handle edit logic (e.g., open modal or redirect)
        } else if (action === 'delete') {
            setSelectedProductId(hashed_id); // Save the product to delete
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
                    sx={{ width: 'auto' }}
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start"><Search/></InputAdornment>,
                        },
                    }}
                />
                <Link href={ADMIN_PRODUCT_ROUTE+'/create'}>
                    <Button variant="contained" color="primary">
                        + Add Product
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
                        {filtered.map(product => (
                            <ProductRow key={product.hashed_id} product={product} onAction={handleUserAction} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/!* Confirmation Dialog *!/}
            <AlertDialog
                open={openDialog}
                handleClose={handleCloseDialog}
                handleAction={confirmDeleteProduct}
                title='Delete Confirmation'
                content='Are you sure you want to delete this product?'
                firstLabel="Delete"
                secLabel="Cancel"
            />
        </Box>
    );
}
*/
