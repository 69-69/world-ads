'use client';
// app/components/Footer.tsx
//
import React from 'react';
import {Box, Typography, Link, Container, IconButton, Grid2 as Grid} from '@mui/material';
import {Facebook, Twitter, Instagram, LinkedIn} from '@mui/icons-material';

const Footer = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#332',
                color: 'white',
                py: 4,
                mt: 6,
                mb: 0,
            }}
        >
            <Container>
                <Grid container spacing={4} justifyContent="space-between">
                    {/* Left Section - Links */}
                    <Grid size={{xs: 12, sm: 6, md: 4}}>
                        <Typography variant="h6" sx={{mb: 2}}>
                            World Ads Center
                        </Typography>
                        <Box>
                            <Link href="/" color="inherit" sx={{display: 'block', mb: 1}}>
                                Home
                            </Link>
                            <Link href="#" color="inherit" sx={{display: 'block', mb: 1}}>
                                About Us
                            </Link>
                            <Link href="#" color="inherit" sx={{display: 'block', mb: 1}}>
                                Careers
                            </Link>
                            <Link href="#" color="inherit" sx={{display: 'block', mb: 1}}>
                                Blog
                            </Link>
                        </Box>
                    </Grid>

                    {/* Center Section - Social Media Icons */}
                    <Grid size={{xs: 12, sm: 6, md: 4}} sx={{textAlign: 'center'}}>
                        <Typography variant="h6" sx={{mb: 2}}>
                            Follow Us
                        </Typography>
                        <Box>
                            <IconButton color="inherit" href="https://facebook.com" target="_blank" sx={{mx: 1}}>
                                <Facebook/>
                            </IconButton>
                            <IconButton color="inherit" href="https://twitter.com" target="_blank" sx={{mx: 1}}>
                                <Twitter/>
                            </IconButton>
                            <IconButton color="inherit" href="https://instagram.com" target="_blank" sx={{mx: 1}}>
                                <Instagram/>
                            </IconButton>
                            <IconButton color="inherit" href="https://linkedin.com" target="_blank" sx={{mx: 1}}>
                                <LinkedIn/>
                            </IconButton>
                        </Box>
                    </Grid>

                    {/* Right Section - Copyright */}
                    <Grid size={{xs: 12, sm: 6, md: 4}} sx={{textAlign: 'right'}}>
                        <Typography variant="body2">
                            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;




