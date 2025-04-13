import Container from "@mui/material/Container";
import {HOME_ROUTE} from "@/app/hooks/useConstants";
import fetchWithRetry from "@/app/api/external/fetchWithRetry";
import {Promo} from "@/app/models/Post";
import {promoHandler} from "@/app/api/external/endPoints";
import {Box, Typography} from "@mui/material";
import PromoList from "@/app/components/admin/PromoList";

const PromosPage = async () => {
    const tableHeader = ['Name', 'Promo Price', 'Starts At', 'Ends At', 'Action'];

    const {response, data} = await fetchWithRetry(HOME_ROUTE + promoHandler, {method: 'GET'});
    const promos: Promo[] = data;

    return (
        <Container maxWidth='lg' sx={{flexGrow: 1, pt: 20}}>
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

