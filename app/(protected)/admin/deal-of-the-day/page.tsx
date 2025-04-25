import Container from "@mui/material/Container";
import {Promo} from "@/app/models/Post";
import {Box, Typography} from "@mui/material";
import PromoList from "@/app/components/admin/PromoList";
import getAdminData from "@/app/actions/admin/getAdminData";
import {promoHandler} from "@/app/api/external/endPoints";

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
                        <Typography variant="h6" gutterBottom sx={{textAlign: 'center', mt: 5}}>
                            No Deal of the Day Found
                        </Typography> :
                        <PromoList promos={promos} tableHeader={tableHeader}/>
                }
            </Box>
        </Container>
    )
}

export default PromosPage;

