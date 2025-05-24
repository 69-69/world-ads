import Container from "@mui/material/Container";
import {Category} from "@/app/models/Post";
import {Box, Typography} from "@mui/material";
import CategoryList from "@/app/components/admin/CategoryList";
import getAdminData from "@/app/actions/admin/getAdminData";
import {categoryHandler} from "@/app/util/endPoints";
import NoItemFound from "@/app/components/NoItemFound";
import {ADMIN_CATEGORY_CREATE_ROUTE} from "@/app/util/constants";

const CategoryPage = async () => {
    const tableHeader = ['Category', 'Parent', 'Action'];

    const data = await getAdminData<Category[]>({ route: categoryHandler });
    const categories: Category[] = data.length ? data : [];

    return (
        <Container maxWidth='lg' sx={{flexGrow: 1, pt: 5}}>
            <Typography variant="h5" gutterBottom>
                Category List
            </Typography>
            <Box>
                {
                    categories.length === 0 ?
                        <NoItemFound
                            route={ADMIN_CATEGORY_CREATE_ROUTE}
                            message={'No Category Found'}
                            label={'Add Category'}
                        /> :
                <CategoryList categories={categories} tableHeader={tableHeader}/>

                }
            </Box>
        </Container>
    )
}

export default CategoryPage;

