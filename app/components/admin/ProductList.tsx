'use client';
import ListTable from "@/app/components/admin/ListTable";
import ProductRow from "@/app/components/admin/ProductRow";
import {ADMIN_PRODUCT_CREATE_ROUTE, ADMIN_PRODUCT_ROUTE} from "@/app/actions/useConstants";
import {useState} from "react";
import {Product} from "@/app/models/Post";
import {marketplaceHandler} from "@/app/api/external/endPoints";
import {deleteAction} from "@/app/actions/admin/deleteAction";
import { useRouter } from 'next/navigation';

type ProProps = {
    products: Product[];
    tableHeader: string[];
};

const ProductList = ({products, tableHeader}: ProProps) => {
    const [search, setSearch] = useState('');
    const router = useRouter();
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | number | undefined>(undefined);
    const [productData, setProductData] = useState<Product[]>(products);

    const filtered = Array.isArray(productData)
        ? productData.filter(p =>
            p.name.toLowerCase().includes(search.toLowerCase())
        )
        : [];

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
        const url = new URL(`${ADMIN_PRODUCT_ROUTE}/${product.hashed_id}`, window.location.origin);
        url.searchParams.append('product', JSON.stringify(product));
        router.push(url.toString());
    }

    // Handle user actions (edit, delete)
    const handleUserAction = (hashed_id: number | string | undefined, action: string) => {
        if (!hashed_id) return;

        if (action === 'edit') {
            const product = productData.find(product => product.hashed_id === hashed_id) as Product;
            goToEditProduct(product);
            // console.log('Edit product with ID:', hashed_id);
        } else if (action === 'delete') {
            setSelectedProductId(hashed_id);
            setOpenDialog(true);
        }
    };

    const productRows = filtered.map(product => {
        return (
            <ProductRow key={product.hashed_id} product={product} onAction={handleUserAction}/>
        );
    });

    return (
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
    );
}

export default ProductList;
