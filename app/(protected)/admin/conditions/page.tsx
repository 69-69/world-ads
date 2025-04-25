import Container from "@mui/material/Container";
import {Condition} from "@/app/models/Post";
import {conditionHandler} from "@/app/api/external/endPoints";
import {Box, Typography} from "@mui/material";
import ConditionList from "@/app/components/admin/ConditionList";
import getAdminData from "@/app/actions/admin/getAdminData";

const ConditionPage = async () => {
    const tableHeader = ['Condition', 'Action'];

    const data = await await getAdminData<Condition[]>({route: conditionHandler});
    const conditions: Condition[] = data.length ? data : [];

    return (
        <Container maxWidth='lg' sx={{flexGrow: 1, pt: 5}}>
            <Typography variant="h5" gutterBottom>
                Condition List
            </Typography>
            <Box>
                {
                    conditions.length === 0 ?
                        <Typography variant="h6" gutterBottom sx={{textAlign: 'center', mt: 5}}>
                            No Conditions Found
                        </Typography> :
                        <ConditionList conditions={conditions} tableHeader={tableHeader}/>
                }
            </Box>
        </Container>
    )
}

export default ConditionPage;

