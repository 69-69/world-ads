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
import { Promo} from "@/app/models/Post";
import {Search} from "@mui/icons-material";
import PromoRow from "@/app/components/admin/PromoRow";

type Props = {
    promos: Promo[];
    tableHeader: string[];
};

export default function PromoList({ promos, tableHeader }: Props) {
    const [search, setSearch] = useState('');

    const filtered = promos.filter(p =>
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
                            <PromoRow key={promo.hashed_id} promo={promo} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
