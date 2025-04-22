import Container from "@mui/material/Container";
import {Promo} from "@/app/models/Post";
import {Box, Typography} from "@mui/material";
import PromoList from "@/app/components/admin/PromoList";
import getAdminData from "@/app/actions/admin/getAdminData";
import {promoHandler} from "@/app/api/external/endPoints";

const PromosPage = async () => {
    const tableHeader = ['Name', 'Promo Price', 'Starts At', 'Ends At', 'Action'];

    const promos: Promo[] = await getAdminData<Promo[]>({route: promoHandler, endpoint: 'store/'});


    return (
        <Container maxWidth='lg' sx={{flexGrow: 1, pt: 5}}>
            <Typography variant="h5" gutterBottom>
                Deal of the Day
            </Typography>
            <Box>
                <PromoList promos={promos} tableHeader={tableHeader}/>
            </Box>
        </Container>
    )
}

export default PromosPage;

