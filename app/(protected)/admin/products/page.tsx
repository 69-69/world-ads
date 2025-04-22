import Container from "@mui/material/Container";
import { Product} from "@/app/models/Post";
import {Box, Typography} from "@mui/material";
import ProductList from "@/app/components/admin/ProductList";
import getAdminData from "@/app/actions/admin/getAdminData";
import { marketplaceHandler} from "@/app/api/external/endPoints";

const ProductsPage = async () => {
    const tableHeader = ['Name', 'Category', 'Sub', 'Brand', 'Stock', 'Price', 'Published', 'Promo', 'Action'];
    const products: Product[] = await getAdminData<Product[]>({route: marketplaceHandler, endpoint: 'store/'});

    return (
        <Container maxWidth='lg' sx={{flexGrow: 1, pt: 5}}>
            <Typography variant="h5" gutterBottom>
                Product List
            </Typography>
            <Box>
                <ProductList products={products} tableHeader={tableHeader}/>
            </Box>
        </Container>
    )
}

export default ProductsPage;


