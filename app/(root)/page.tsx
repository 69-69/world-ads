import React from 'react';
import {Typography, Container, Box} from '@mui/material';
import Hero from '@/app/components/home/Hero';
import HomeContent from "@/app/components/home/HomeContent";
import {APP_NAME, SIGNIN_ROUTE, SIGNUP_ROUTE} from "@/app/actions/useConstants";
import {permanentRedirect} from "next/navigation";

// Importing the local image
const heroImage = '../assets/images/ads-bg.png';

const heroBanner = () => {
    return (
        <Hero
            title={APP_NAME}
            subtitle="Global platform to connect advertisers with audiences across various digital channels."
            buttonText="Get Started"
            buttonLink={SIGNUP_ROUTE}
            backgroundImage={heroImage}
        />
    );
};

const HomePage = () => {
    permanentRedirect(SIGNIN_ROUTE); // temporary redirect to sign in page

    return (
        <Box>
            {/* Hero Section */}
            {heroBanner()}
            <Container maxWidth='lg' sx={{textAlign: 'center', marginTop: 4}}>
                <Typography variant="h3" gutterBottom>
                    Welcome to the App!
                </Typography>
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
