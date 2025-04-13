'use client';

import {
    TableRow,
    TableCell,
    Switch,
    Avatar,
    Box,
    Typography,
    Chip,
    IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useState} from 'react';
import {Product} from "@/app/models/Post";
import {
    BACKEND_BASE_URL,
    BACKEND_IMAGE_PATH,
    BACKEND_MARKETPLACE_IMAGE_PATH,
} from "@/env_config";
import {ADMIN_PROMO_CREATE_ROUTE} from "@/app/hooks/useConstants";
import {useRouter} from "next/navigation";

const ProductRow = ({product}: { product: Product }) => {
    const router = useRouter();
    const [switched, setSwitched] = useState<{
        published?: boolean;
        promo?: boolean;
    }>({published: product.published, promo: product.is_promo});

    const subItems = [product.category, product.sub_category, product.brand];
    const img =
        BACKEND_BASE_URL +
        BACKEND_IMAGE_PATH +
        BACKEND_MARKETPLACE_IMAGE_PATH +
        '/resize/' +
        product.images[0];

    const onPromoChange = (value: boolean, post_id: string) => {
        product.is_promo = value;
        if(value) {
            router.push(ADMIN_PROMO_CREATE_ROUTE + '/' + post_id);
            return;
        }
        setSwitched(
            prev => ({...prev, promo: value})
        );
    };

    const onPublish = () => {
        setSwitched(
            prev => ({...prev, published: !prev.published,})
        );
    };


    return <TableRow hover>
        <TableCell>
            <Box display="flex" alignItems="center" gap={2}>
                <Avatar src={img} alt={product.title}/>
                <Box>
                    <Typography variant="body1">{product.title}</Typography>
                    <Typography variant="caption" color="text.secondary">
                        {product.slug}
                    </Typography>
                </Box>
            </Box>
        </TableCell>

        {subItems.map((item, index) => <TableCell key={index}>
            <Chip label={item}/>
        </TableCell>)}

        <TableCell>
            <Typography fontWeight="medium">
                ${product.regular_price.toFixed(2)}
            </Typography>
        </TableCell>

        <TableCell>
            <Switch
                checked={switched.published}
                onChange={() => onPublish()}
                color="success"
            />
        </TableCell>

        <TableCell>
            <Switch
                checked={switched.promo}
                onChange={() => onPromoChange(!switched.promo, product.hashed_id)}
                color="warning"
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

