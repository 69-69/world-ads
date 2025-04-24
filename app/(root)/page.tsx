import React from 'react';
import {Typography, Container, Box} from '@mui/material';
import Hero from '@/app/components/home/Hero';
import HomeContent from "@/app/components/home/HomeContent";
import {APP_NAME, SIGNUP_ROUTE} from "@/app/actions/useConstants";

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
import Image from "next/image";
import styles from "../page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
        <h1>Home</h1>
        <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js logo"
            priority={true}
            width={200}
            height={200}
        />
    </div>
  );
}*/
