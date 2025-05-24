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
import {BACKEND_MARKETPLACE_IMAGE_PATH} from "@/env_config";
import {ADMIN_PROMO_CREATE_ROUTE, ADMIN_PROMO_ROUTE} from "@/app/util/constants";
import {useRouter} from "next/navigation";
import {useState} from 'react';
import {ProductRowProps} from "@/app/models/Post";
import publishProduct from "@/app/actions/admin/publishProduct";
import StatusSnackbar from "@/app/components/StatusSnackbar";

interface ProductRowType extends ProductRowProps {
    open: boolean;
    handlePopoverClose: () => void;
    handlePopoverOpen: (event: React.MouseEvent<HTMLElement>) => void;
}

const ProductRow = ({product, onAction, open, handlePopoverOpen, handlePopoverClose}: ProductRowType) => {

    const router = useRouter();
    const [status, setStatus] = useState<{open:boolean, msg?:string}>({open: false});
    const handleClose = () => setStatus({open: false});

    const [switched, setSwitched] = useState<{
        published?: boolean;
        promo?: boolean;
    }>({published: product.published, promo: product.is_promo});

    const subItems = [product.category, product.sub_category, product.brand, product.stock_level];
    const img = BACKEND_MARKETPLACE_IMAGE_PATH + '/resize/' + product.images[0];

    const onPromoChange = () => {
        setSwitched(prev => ({...prev, promo: !prev.promo}));
        const promoMsg = switched.promo ? 'undo':'create';
        setStatus({open: true, msg: `Please wait while we ${promoMsg} your promo`});

        const gotTo = !switched.promo ? ADMIN_PROMO_CREATE_ROUTE + '/' + product.hashed_id : ADMIN_PROMO_ROUTE;
        router.push(gotTo);
    };

    const onPublish = async () => {
        setSwitched(prev => ({...prev, published: !prev.published,}));
        const pubMsg = switched.published ? 'unpublish':'publish';
        setStatus({open: true, msg: `Please wait while we ${pubMsg} your product`});

        await publishProduct(product.hashed_id);
    };

    return <TableRow hover>
        <TableCell>
            <Box display="flex" alignItems="center" gap={2}
                 aria-owns={open ? 'mouse-over-popover' : undefined}
                 aria-haspopup="true"
                 onMouseEnter={handlePopoverOpen}
                 onMouseLeave={handlePopoverClose}
            >
                <Avatar src={img} alt={product.name}/>
                <Box>
                    <Typography variant="body1">{product.name}</Typography>
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
                ${Number(product.regular_price as number).toFixed(2)}
            </Typography>
        </TableCell>

        <TableCell>
            <Switch
                checked={switched.published}
                onChange={async () => await onPublish()}
                color="success"
            />
        </TableCell>

        <TableCell>
            <StatusSnackbar
                open={status.open}
                onClose={handleClose}
                message={status.msg}
                sx={{ bottom: { xs: 90, sm: 0 } }}
            />
            <Switch
                checked={switched.promo}
                onChange={() => onPromoChange()}
                color="warning"
            />
        </TableCell>

        <TableCell>
            <IconButton color="info" onClick={() => onAction(product.hashed_id, 'edit')}>
                <EditIcon/>
            </IconButton>
            <IconButton color="error" onClick={() => onAction(product.hashed_id, 'delete')}>
                <DeleteIcon/>
            </IconButton>
        </TableCell>
    </TableRow>;
};

export default ProductRow;

