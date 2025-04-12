import Container from "@mui/material/Container";
import {HOME_ROUTE} from "@/app/hooks/useConstants";
import fetchWithRetry from "@/app/api/external/fetchWithRetry";
import {Product} from "@/app/models/Post";
import {marketplaceHandler} from "@/app/api/external/endPoints";
import {Box, Typography} from "@mui/material";
import ProductList from "@/app/components/admin/ProductList";

const ProductsPage = async () => {
    const tableHeader = ['Name', 'Category', 'Sub', 'Brand', 'Price', 'Published', 'Promo', 'Action'];

    const {response, data} = await fetchWithRetry(HOME_ROUTE + marketplaceHandler, {method: 'GET'});
    const products: Product[] = data;

    return (
        <Container maxWidth='lg' sx={{flexGrow: 1, pt: 20}}>
            <Typography variant="h5" gutterBottom>
                Deal of the Day
            </Typography>
            <Box>
                <ProductList products={products} tableHeader={tableHeader}/>
            </Box>
        </Container>
    )
}

export default ProductsPage;

/*const products: Product[] = [
    {
        title: 'Blue Premium T-shirt',
        category: 'Fashion',
        sub_category: 'T-shirts',
        brand: 'Raymond',
        regular_price: 21.0,
        sales_price: 21.0,
        published: true,
        product_colors: 'blue, red',
        condition: 'new',
        slug: 'blue-premium-tshirt',
        hashed_id: '138942f0',
        store_id: '1',
        description: 'A premium quality blue t-shirt made from 100% cotton.',
        images: ['tshirt.png'],
    },
    {
        title: 'Blue Premium T-shirt',
        category: 'Fashion',
        sub_category: 'T-shirts',
        brand: 'Raymond',
        regular_price: 21.0,
        sales_price: 21.0,
        published: false,
        product_colors: 'blue, red',
        condition: 'new',
        slug: 'blue-premium-tshirt',
        hashed_id: '738942f0',
        store_id: '1',
        description: 'A premium quality blue t-shirt made from 100% cotton.',
        images: ['tshirt.png'],
    },
];*/


