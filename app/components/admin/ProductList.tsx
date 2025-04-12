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
import {ADMIN_PRODUCT_ROUTE} from "@/app/hooks/useConstants";
import ProductRow from "@/app/components/admin/ProductRow";
import {Product} from "@/app/models/Post";
import {Search} from "@mui/icons-material";

type Props = {
    products: Product[];
    tableHeader: string[];
};

export default function ProductList({ products, tableHeader }: Props) {
    const [search, setSearch] = useState('');

    const filtered = products.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
    );

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
                <Link href={`${ADMIN_PRODUCT_ROUTE}/create`}>
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
                            <ProductRow key={product.hashed_id} product={product} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
