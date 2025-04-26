import Container from "@mui/material/Container";
import {Promo} from "@/app/models/Post";
import {Box, Typography} from "@mui/material";
import PromoList from "@/app/components/admin/PromoList";
import getAdminData from "@/app/actions/admin/getAdminData";
import {promoHandler} from "@/app/api/external/endPoints";
import {ADMIN_PRODUCT_ROUTE} from "@/app/actions/useConstants";
import NoItemFound from "@/app/components/NoItemFound";

const PromosPage = async () => {
    const tableHeader = ['Name', 'Promo Price', 'Starts At', 'Ends At', 'Action'];

    const data = await getAdminData<Promo[]>({route: promoHandler, endpoint: 'store/'});
    const promos: Promo[] = data.length ? data : [];

    return (
        <Container maxWidth='lg' sx={{flexGrow: 1, pt: 5}}>
            <Typography variant="h5" gutterBottom>
                Deal of the Day
            </Typography>
            <Box>
                {
                    promos.length === 0 ?
                        <NoItemFound
                            route={ADMIN_PRODUCT_ROUTE}
                            message={'No Deal of the Day Found'}
                            label={'Add New Deal'}
                        /> :
                        <PromoList promos={promos} tableHeader={tableHeader}/>
                }
            </Box>
        </Container>
    )
}

export default PromosPage;

