import Container from "@mui/material/Container";
import {Category} from "@/app/models/Post";
import {Box, Typography} from "@mui/material";
import CategoryList from "@/app/components/admin/CategoryList";
import getAdminData from "@/app/actions/admin/getAdminData";
import {categoryHandler} from "@/app/api/external/endPoints";

const CategoryPage = async () => {
    const tableHeader = ['Category', 'Parent', 'Action'];

    const categories: Category[] = await getAdminData<Category[]>({ route: categoryHandler });

    return (
        <Container maxWidth='lg' sx={{flexGrow: 1, pt: 5}}>
            <Typography variant="h5" gutterBottom>
                Category List
            </Typography>
            <Box>
                <CategoryList categories={categories} tableHeader={tableHeader}/>
            </Box>
        </Container>
    )
}

export default CategoryPage;

