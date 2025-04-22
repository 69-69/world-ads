'use client';

import {
    TableRow,
    TableCell,
    IconButton, Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {BrandProps} from "@/app/models/Post";
import {toSentenceCase} from "@/app/actions/useHelper";

const BrandRow = ({brand, onAction}: BrandProps) => {

    return <TableRow hover>
        <TableCell key={brand.hashed_id}>
            <Typography variant="body2" color="text.secondary">
                {toSentenceCase(brand.brand)}
            </Typography>
        </TableCell>

        <TableCell>
            <IconButton color="info" onClick={() => onAction(brand.hashed_id, 'edit')}>
                <EditIcon/>
            </IconButton>
            <IconButton color="error" onClick={() => onAction(brand.hashed_id, 'delete')}>
                <DeleteIcon/>
            </IconButton>
        </TableCell>
    </TableRow>;
};

export default BrandRow;

