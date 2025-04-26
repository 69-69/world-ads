'use client';

import React, {useState, useEffect} from "react";
import {useRouter} from 'next/navigation';
import {
    Box,
    ImageList,
    ImageListItem,
    Popover
} from "@mui/material";
import Image from "next/image";

import ListTable from "@/app/components/admin/ListTable";
import ProductRow from "@/app/components/admin/ProductRow";
import {ADMIN_PRODUCT_CREATE_ROUTE, ADMIN_PRODUCT_ROUTE} from "@/app/actions/useConstants";
import {deleteAction} from "@/app/actions/admin/deleteAction";
import {Product} from "@/app/models/Post";
import {marketplaceHandler} from "@/app/api/external/endPoints";
import {BACKEND_MARKETPLACE_IMAGE_PATH} from "@/env_config";
import StatusSnackbar from "@/app/components/StatusSnackbar";

type ProProps = {
    products: Product[];
    tableHeader: string[];
};

const ProductList = ({products, tableHeader}: ProProps) => {
    const router = useRouter();

    const [search, setSearch] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | number | undefined>(undefined);
    const [productData, setProductData] = useState<Product[]>(products);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [getImg, setImg] = useState<string[]>([]);
    const [editRedirect, setEditRedirect] = useState(false);

    const open = Boolean(anchorEl);

    const filtered = productData.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        if (open && selectedProductId) {
            const product = productData.find(p => p.hashed_id === selectedProductId);
            if (product) {
                setImg(product.images);
            }
        }
    }, [open, selectedProductId, productData]);

    const handlePopoverOpen = (
        event: React.MouseEvent<HTMLElement>,
        productId: string | number
    ) => {
        setSelectedProductId(productId);
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => setAnchorEl(null);

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedProductId(undefined);
    };

    const confirmDeleteProduct = async () => {
        const result = await deleteAction({
            route: marketplaceHandler,
            id: selectedProductId as string,
        });

        if (result?.success) {
            setProductData(prev => prev.filter(product => product.hashed_id !== selectedProductId));
            handleCloseDialog();
        } else {
            console.error('Failed to delete product:', result?.error);
            alert(`Failed to delete product: ${result?.error}`);
        }
    };

    const goToEditProduct = (product: Product) => {
        const url = `${ADMIN_PRODUCT_ROUTE}/${product.hashed_id}?product=${encodeURIComponent(
            JSON.stringify(product)
        )}`;
        router.push(url);
    };
    const handleClose = () => setEditRedirect(false);

    const handleUserAction = (hashed_id: string | number | undefined, action: string) => {
        if (!hashed_id) return;

        if (action === 'edit') {
            const product = productData.find(p => p.hashed_id === hashed_id);
            if (product) {
                setEditRedirect(true);
                goToEditProduct(product);
            }
        } else if (action === 'delete') {
            setSelectedProductId(hashed_id);
            setOpenDialog(true);
        }
    };

    const imgPath = `${BACKEND_MARKETPLACE_IMAGE_PATH}/resize/`;

    const productRows = filtered.map(product => (
        <ProductRow
            key={product.hashed_id}
            product={product}
            open={open}
            handlePopoverOpen={(e) => handlePopoverOpen(e, product.hashed_id)}
            onAction={handleUserAction}
            handlePopoverClose={handlePopoverClose}
        />
    ));

    return (
        <Box>
            <ListTable
                tableHeader={tableHeader}
                rows={productRows}
                openDialog={openDialog}
                onCloseDialog={handleCloseDialog}
                onConfirmAction={confirmDeleteProduct}
                dialogTitle="Delete Confirmation"
                dialogContent="Are you sure you want to delete this product?"
                confirmLabel="Delete"
                cancelLabel="Cancel"
                showSearch
                searchValue={search}
                onSearchChange={setSearch}
                labelLink={{ref: ADMIN_PRODUCT_CREATE_ROUTE, label: 'Add New Product'}}
            />

            <Popover
                id="mouse-over-popover"
                sx={{pointerEvents: 'none'}}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <ImageList variant="masonry" cols={3} gap={8}>
                    {getImg.map((image) => (
                        <ImageListItem key={image}>
                            <Image
                                src={imgPath+image}
                                alt={image}
                                width={100}
                                height={100}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Popover>

            <StatusSnackbar
                open={editRedirect}
                onClose={handleClose}
                message='Opening product editor, please wait...'
                sx={{ bottom: { xs: 90, sm: 0 } }}
            />
        </Box>
    );
};

export default ProductList;
