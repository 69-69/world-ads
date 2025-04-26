'use server';

import Container from "@mui/material/Container";
import {Brand} from "@/app/models/Post";
import {Box, Typography} from "@mui/material";
import BrandList from "@/app/components/admin/BrandList";
import getAdminData from "@/app/actions/admin/getAdminData";
import {brandHandler} from "@/app/api/external/endPoints";
import NoItemFound from "@/app/components/NoItemFound";
import {ADMIN_BRAND_CREATE_ROUTE} from "@/app/actions/useConstants";

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
                        <NoItemFound
                            route={ADMIN_BRAND_CREATE_ROUTE}
                            message={'No Brand Found'}
                            label={'Add Brand'}
                        /> :
                        <BrandList brands={brands} tableHeader={tableHeader}/>
                }
            </Box>
        </Container>
    )
}

export default BrandPage;

