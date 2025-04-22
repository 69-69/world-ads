'use server';

import Container from "@mui/material/Container";
import {Brand} from "@/app/models/Post";
import {Box, Typography} from "@mui/material";
import BrandList from "@/app/components/admin/BrandList";
import getAdminData from "@/app/actions/admin/getAdminData";
import {brandHandler} from "@/app/api/external/endPoints";

const BrandPage = async () => {
    const tableHeader = ['Name', 'Action'];

    const brands: Brand[] = await getAdminData<Brand[]>({route: brandHandler});

    return (
        <Container maxWidth='lg' sx={{flexGrow: 1, pt: 5}}>
            <Typography variant="h5" gutterBottom>
                All Brands
            </Typography>
            <Box>
                <BrandList brands={brands} tableHeader={tableHeader}/>
            </Box>
        </Container>
    )
}

export default BrandPage;

