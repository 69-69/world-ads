'use client';

import {
    TableRow,
    TableCell,
    IconButton, Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {ConditionProps} from "@/app/models/Post";
import {toSentenceCase} from "@/app/util/clientUtils";

const ConditionRow = ({condition, onAction}: ConditionProps) => {

    return <TableRow hover>
        <TableCell key={condition.hashed_id}>
            <Typography variant="body2" color="text.secondary">
                {toSentenceCase(condition.condition)}
            </Typography>
        </TableCell>

        <TableCell>
            <IconButton color="info" onClick={() => onAction(condition.hashed_id, 'edit')}>
                <EditIcon/>
            </IconButton>
            <IconButton color="error" onClick={() => onAction(condition.hashed_id, 'delete')}>
                <DeleteIcon/>
            </IconButton>
        </TableCell>
    </TableRow>;
};

export default ConditionRow;

