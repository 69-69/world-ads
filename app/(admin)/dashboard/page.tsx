import React from 'react'
import {Container, /*Alert, AlertTitle, Box, Card, CardContent, CardMedia, IconButton, Typography*/} from "@mui/material";
import Grid from "@mui/material/Grid2";
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import theme from "@/app/theme";
import DashboardHeader from "@/app/components/dashboard/DashboardHeader";
import StatCard from '@/app/components/dashboard/StatCard';
import ChartCard from "@/app/components/dashboard/ChartCard";
import DoughnutCard from "@/app/components/dashboard/DoughnutCard";

export default function DashboardPage() {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={3}>
                <Grid size={{xs: 12, sm: 6}}>
                    <DashboardHeader />
                </Grid>

                {/* Stats Summary */}
                <Grid size={{xs: 6, sm: 3}}>
                    <StatCard label="Order" value="32,350" sub="9350" percentage={25.25} up />
                </Grid>
                <Grid size={{xs: 6, sm: 3}}>
                    <StatCard label="Sold Items" value="2,360" sub="1350" percentage={2.65} />
                </Grid>

                <Grid size={{xs: 6, sm: 3}}>
                    <StatCard label="Gross Sale" value="$12,460.25" sub="11350" percentage={10.25} up />
                </Grid>
                <Grid size={{xs: 6, sm: 3}}>
                    <StatCard label="Total Shipping Cost" value="$6,240" sub="4350" percentage={13.15} />
                </Grid>

                {/* Lower Cards */}
                <Grid size={{xs: 12, sm: 3}}>
                    <ChartCard label="Weekly Sales" value="$10,240" percentage={25.25} type="bar" />
                </Grid>
                <Grid size={{xs: 12, sm: 3}}>
                    <ChartCard label="Product Share" value="39.56%" percentage={10.25} type="circle" />
                </Grid>
                <Grid size={{xs: 12, sm: 3}}>
                    <ChartCard label="Total Order" value="$12,260" percentage={2.65} type="line" />
                </Grid>
                <Grid size={{xs: 12, sm: 3}}>
                    <DoughnutCard label="Market Share" value="$14,260" percentage={2.65} count={166} />
                </Grid>
            </Grid>
        </Container>
    );
}


/*const cards = [
    {
        id: 1,
        title: "42,3567",
        subtitle: "Today's Visit",
        imageUrl: '../assets/images/welcome.svg',
        description: "Get 50% off your first purchase. Don't miss out!",
        price: "$19.99",
        link: "/offer1"
    },
    {
        id: 2,
        title: "$756889",
        subtitle: "Special Offer",
        imageUrl: '../assets/images/welcome.svg',
        description: "Get 50% off your first purchase. Don't miss out!",
        price: "$19.99",
        link: "/offer1"
    },
    {
        id: 3,
        title: "$756889",
        subtitle: "Special Offer",
        imageUrl: '../assets/images/welcome.svg',
        description: "Get 50% off your first purchase. Don't miss out!",
        price: "$19.99",
        link: "/offer1"
    },
    {
        id: 4,
        title: "$756889",
        subtitle: "Special Offer",
        imageUrl: '../assets/images/welcome.svg',
        description: "Get 50% off your first purchase. Don't miss out!",
        price: "$19.99",
        link: "/offer1"
    },
];*/



/*const DashboardPage = () => {
    return (
        <Box sx={{flexDirection: 'column'}}>

            <Container maxWidth="md" sx={{mt: 4, mb: 4}}>
                <Alert severity="info" icon={false} sx={{mb: 4}}>
                    <AlertTitle>Welcome to the Dashboard</AlertTitle>
                    This is your dashboard where you can manage your account and settings.
                </Alert>

                <Grid container spacing={2} justifyContent="center">
                    {cards.map((card) => (
                        <Grid size={{xs: 12, sm: 6}} key={card.id} sx={{justifyContent: 'center'}}>
                            <Card sx={{display: 'flex'}}>
                                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                    <CardContent sx={{flex: '1 0 auto'}}>
                                        <Typography component="div" variant="h6">
                                            {card.title}
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            component="div"
                                            sx={{color: 'text.secondary'}}
                                        >
                                            {card.subtitle}
                                        </Typography>
                                    </CardContent>
                                    <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                                        <IconButton aria-label="previous">
                                            {theme.direction === 'rtl' ? <PlayArrowIcon/> : <PlayArrowIcon/>}
                                        </IconButton>
                                        <IconButton aria-label="play/pause">
                                            <PlayArrowIcon sx={{height: 38, width: 38}}/>
                                        </IconButton>
                                        <IconButton aria-label="next">
                                            {theme.direction === 'rtl' ? <PlayArrowIcon/> : <PlayArrowIcon/>}
                                        </IconButton>
                                    </Box>
                                </Box>
                                <CardMedia
                                    component="img"
                                    sx={{width: 'auto'}}
                                    image={card.imageUrl}
                                    alt={card.title}
                                />
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

        </Box>
    );
};*/
// export default DashboardPage
