import React from 'react';
import {Typography, Container, Box} from '@mui/material';
import Hero from '@/app/components/Hero';
import HomeContent from "@/app/components/HomeContent";

// Importing the local image
const heroImage = '../assets/images/ads-bg.png';

const heroBanner = () => {
    return (
        <Box sx={{mt:8}}>
            <Hero
                title="World Ads Center (WAC)"
                subtitle="We are glad to have you here. Explore our platform and get started."
                buttonText="Get Started"
                buttonLink="/signup" // Replace with your target link
                backgroundImage={heroImage}
            />

            <Container>
                <h2>Your App Content</h2>
                <p>This is the content below the hero section.</p>
            </Container>
        </Box>
    );
};

const HomePage = () => {
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
