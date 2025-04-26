import Container from "@mui/material/Container";
import {Product} from "@/app/models/Post";
import {Box, Typography} from "@mui/material";
import ProductList from "@/app/components/admin/ProductList";
import getAdminData from "@/app/actions/admin/getAdminData";
import {marketplaceHandler} from "@/app/api/external/endPoints";
import NoItemFound from "@/app/components/NoItemFound";
import {ADMIN_PRODUCT_ROUTE} from "@/app/actions/useConstants";

const ProductsPage = async () => {
    const tableHeader = ['Name', 'Category', 'Sub', 'Brand', 'Stock', 'Price', 'Published', 'Promo', 'Action'];
    const data = await getAdminData<Product[]>({route: marketplaceHandler, endpoint: 'store/'});
    const products: Product[] = data.length ? data : [];

    return (
        <Container maxWidth='lg' sx={{flexGrow: 1, pt: 5}}>
            <Typography variant="h5" gutterBottom>
                Product List
            </Typography>
            <Box>
                {
                    products.length === 0 ?
                        <NoItemFound
                            route={ADMIN_PRODUCT_ROUTE}
                            message={'No Product Found'}
                            label={'Add Product'}
                        /> :
                        <ProductList products={products} tableHeader={tableHeader}/>
                }
            </Box>
        </Container>
    )
}

export default ProductsPage;

/* const {data} = await fetchWithRetry(HOME_ROUTE + marketplaceHandler, {method: 'GET'});

    return (
        <Container maxWidth='sm' sx={{flexGrow: 1, pt: 20}}>
            <div>
                All Posts Page
                {
                    data.length &&
                    data.map((post: Product) => (
                        <div key={post.hashed_id}>
                            {
                                post.images.map((image, index) => {
                                    const img = BACKEND_MARKETPLACE_IMAGE_PATH + '/resize/' + image;
                                    return (
                                        <Image key={index} src={img} alt={post.name} width={200} height={200}/>
                                    );
                                })
                            }
                            <h2>{post.name}</h2>
                            <p>{post.description}</p>
                            <StarRatingClient postId={post.hashed_id}/>
                        </div>
                    ))
                }
            </div>
        </Container>
    )*/


