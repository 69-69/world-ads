'use client';

import {
    TableRow,
    TableCell,
    Avatar,
    Box,
    Typography,
    Chip,
    IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {PromoRowProps} from "@/app/models/Post";
import {BACKEND_PROMO_IMAGE_PATH} from "@/env_config";
import {isExpired, toSentenceCase} from "@/app/actions/useHelper";
import React, {useMemo} from "react";


const PromoRow: React.FC<PromoRowProps> = ({promo, onAction}) => {

    // Memoize the expiration status to avoid recalculating it multiple times
    const expirationStatus = useMemo(() => isExpired(promo.end_at), [promo.end_at]);

    const subItems = [promo.start_at, promo.end_at];

    // check if promo.background_image a color code or image path
    if (!promo.background_image.includes('#')) {
        promo.background_image = BACKEND_PROMO_IMAGE_PATH + '/resize/' + promo.background_image;
    }

    return <TableRow hover>
        <TableCell>
            <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                    src={promo.background_image}
                    alt={promo.title}
                    sx={{background: promo.background_image}}
                />
                <Box>
                    <Typography variant="body1">{toSentenceCase(promo.title)}</Typography>
                    <Typography variant="caption" color="error" fontWeight='bold'>
                        {expirationStatus ? 'Expired' : 'Active'}
                    </Typography>
                </Box>
            </Box>
        </TableCell>

        <TableCell>
            <Typography fontWeight="medium">
                ${promo.promo_price.toFixed(2)}
            </Typography>
        </TableCell>
        {subItems.map((item, index) => <TableCell key={index}><Chip label={item}/></TableCell>)}

        <TableCell>
            <IconButton color="info" onClick={() => onAction(promo.hashed_id, 'edit')}>
                <EditIcon/>
            </IconButton>
            <IconButton color="error" onClick={() => onAction(promo.hashed_id, 'delete')}>
                <DeleteIcon/>
            </IconButton>
        </TableCell>
    </TableRow>;
};

export default PromoRow;

