'use server';

import Container from "@mui/material/Container";
import {Brand} from "@/app/models/Post";
import {Box, Typography} from "@mui/material";
import BrandList from "@/app/components/admin/BrandList";
import getAdminData from "@/app/actions/admin/getAdminData";
import {brandHandler} from "@/app/api/external/endPoints";

const BrandPage = async () => {
    const tableHeader = ['Name', 'Action'];

    const data = await getAdminData<Brand[]>({route: brandHandler});
    const brands: Brand[] = data.length ? data : [];

    return (
        <Container maxWidth='lg' sx={{flexGrow: 1, pt: 5}}>
            <Typography variant="h5" gutterBottom>
                All Brands
            </Typography>
            <Box>
                {
                    brands.length === 0 ?
                        <Typography variant="h6" gutterBottom sx={{textAlign: 'center', mt: 5}}>
                            No Brands Found
                        </Typography> :
                <BrandList brands={brands} tableHeader={tableHeader}/>
                }
            </Box>
        </Container>
    )
}

export default BrandPage;

