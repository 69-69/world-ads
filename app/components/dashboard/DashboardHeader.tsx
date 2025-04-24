import {Box, Paper, Typography} from '@mui/material';
import Image from 'next/image';
import Greeting from "@/app/components/Greeting";
import authOptions from "@/auth";
import {toSentenceCase} from "@/app/actions/useHelper";

export default async function DashboardHeader() {
    const session = await authOptions.auth();

    return (
        <Paper elevation={1} component={Box} display="flex" justifyContent="space-between" alignItems="center" p={3}
               bgcolor="#fff" borderRadius={2}>
            <Box>
                <Greeting username={toSentenceCase(session?.user?.name || 'User')}/>
                <Typography variant="body2">Here’s what’s happening with your store today!</Typography>
                <Box mt={2}>
                    <Typography variant="h5" fontWeight="bold">15,350.25</Typography>
                    <Typography variant="body2" color="text.secondary">Today’s Visit</Typography>
                    <Typography variant="h6" fontWeight="bold" mt={1}>$10,360.66</Typography>
                    <Typography variant="body2" color="text.secondary">Today’s total sales</Typography>
                </Box>
            </Box>
            <Box>
                <Image src='../assets/images/welcome.svg' alt="illustration" width={180} height={140}/>
            </Box>
        </Paper>
    );
}

