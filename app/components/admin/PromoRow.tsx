'use client';

import {
    TableRow,
    TableCell,
    Avatar,
    Box,
    Typography,
    Chip,
    IconButton, Switch,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {Promo} from "@/app/models/Post";
import {BACKEND_BASE_URL, BACKEND_IMAGE_PATH, BACKEND_PROMO_IMAGE_PATH} from "@/env_config";
import {isExpired} from "@/app/hooks/useHelper";
import {useMemo, useState} from "react";


const ProductRow = ({promo}: { promo: Promo }) => {
    console.log('promo', promo.start_at);
    // Check if the promo is expired on the initial render
    const [expired, setExpired] = useState<boolean>(isExpired(promo.end_at));

    // Memoize the expiration status to avoid recalculating it multiple times
    const expirationStatus = useMemo(() => isExpired(promo.end_at), [promo.end_at]);


    const onExpired = (value: boolean) => {
        setExpired(value);
        console.log('Expired:', value);
    };

    const subItems = [promo.start_at, promo.end_at];
    const img =
        BACKEND_BASE_URL +
        BACKEND_IMAGE_PATH +
        BACKEND_PROMO_IMAGE_PATH +
        '/resize/' +
        promo.background_image;

    return <TableRow hover>
        <TableCell>
            <Box display="flex" alignItems="center" gap={2}>
                <Avatar src={img} alt={promo.title}/>
                <Box>
                    <Typography variant="body1">{promo.title}</Typography>
                    <Typography variant="caption" color="text.secondary">
                        {expirationStatus ? 'Expired' : 'Active'}
                    </Typography>
                </Box>
            </Box>
        </TableCell>

        {subItems.map((item, index) => <TableCell key={index}>
            <Chip label={item}/>
        </TableCell>)}

        <TableCell>
            <Typography fontWeight="medium">
                ${promo.promo_price.toFixed(2)}
            </Typography>
        </TableCell>

        <TableCell>
            <Switch
                checked={expired}
                onChange={() => onExpired(!expired)}
                color="error"
            />
        </TableCell>
        <TableCell>
            <IconButton color="info">
                <EditIcon/>
            </IconButton>
            <IconButton color="error">
                <DeleteIcon/>
            </IconButton>
        </TableCell>
    </TableRow>;
};

export default ProductRow;

