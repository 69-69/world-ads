'use client';
import React from 'react';
import {Typography, Container, Box} from '@mui/material';
import Hero from '@/app/components/home/Hero';
import HomeContent from "@/app/components/home/HomeContent";
import {APP_NAME, SIGNUP_ROUTE} from "@/app/util/constants";

// import WidgetLoader from "@/app/actions/widgetLoader";

// Importing the local image
const heroImage = '../assets/images/istorezhona-bg.png';

const HomePage = () => {
    return (
        <Box>
            <Hero
                title=""
                subtitle="Shop all your favorite products in one place."
                // subtitle="Global platform to connect advertisers with audiences across various digital channels."
                buttonText="Get Started"
                buttonLink={SIGNUP_ROUTE}
                backgroundImage={heroImage}
            />
            <Container maxWidth='lg' sx={{textAlign: 'center', marginTop: 4}}>
                <Typography variant="h3" gutterBottom> Welcome to {APP_NAME} </Typography>
                {/* Content Section */}
                <HomeContent/>
            </Container>
        </Box>
    );
};

export default HomePage;


/*
// fetch and display client data with filtering from a demo api json server
    const [clients, setClients] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((res) => res.json())
            .then((data) => {
                setClients(data);
                setFiltered(data);
            })
    }, []);

    useEffect(() => {
        const filteredClients = clients.filter((client: any) => client.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setFiltered(filteredClients);
    }, [searchTerm, clients]);
<Box>
    <Container>
        <Typography variant="h3" gutterBottom mb={30}> Welcome to iStoreZhona </Typography>
        <input onChange={(e) => setSearchTerm(e.target.value)}
               value={searchTerm}
               placeholder="Search clients..."
        />
        <button onClick={()=> setSearchTerm('')}>Clear</button>
        <ul>
            {
                filtered.length > 0 ? (
                        filtered.map((client: any) => (
                                <li key={client.id}>{client.name}</li>
                            )
                        )) :
                    (
                        <li>No clients found</li>
                    )

            }
            {/!*<WidgetLoader fileName="app/(root)/demo/aryee"/>*!/}

        </ul>

    </Container>

</Box>*/

