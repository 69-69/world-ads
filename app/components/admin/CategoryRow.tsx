'use client';

import {
    TableRow,
    TableCell,
    IconButton, Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {CategoryProps} from "@/app/models/Post";
import {toSentenceCase} from "@/app/actions/useHelper";

const CategoryRow = ({category, onAction}: CategoryProps) => {
    const items = [category.category, category.parent_category];
    return <TableRow hover>
        {items.map((item, index) => (
            <TableCell key={index}>
                <Typography variant="body2" color="text.secondary">
                    {toSentenceCase(item)}
                </Typography>
            </TableCell>
        ))}

        <TableCell>
            <IconButton color="info" onClick={() => onAction(category.hashed_id, 'edit')}>
                <EditIcon/>
            </IconButton>
            <IconButton color="error" onClick={() => onAction(category.hashed_id, 'delete')}>
                <DeleteIcon/>
            </IconButton>
        </TableCell>
    </TableRow>;
};

export default CategoryRow;

