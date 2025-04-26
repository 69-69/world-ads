import Container from "@mui/material/Container";
import {Condition} from "@/app/models/Post";
import {conditionHandler} from "@/app/api/external/endPoints";
import {Box, Typography} from "@mui/material";
import ConditionList from "@/app/components/admin/ConditionList";
import getAdminData from "@/app/actions/admin/getAdminData";
import NoItemFound from "@/app/components/NoItemFound";
import {ADMIN_PRO_CONDITION_CREATE_ROUTE} from "@/app/actions/useConstants";

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
                        <NoItemFound
                            route={ADMIN_PRO_CONDITION_CREATE_ROUTE}
                            message={'No Condition Found'}
                            label={'Add Condition'}
                        /> :
                        <ConditionList conditions={conditions} tableHeader={tableHeader}/>
                }
            </Box>
        </Container>
    )
}

export default ConditionPage;

