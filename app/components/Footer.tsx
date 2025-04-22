'use client';
import React from 'react';
import Link from 'next/link';
import {Box, Typography, Container, IconButton, Grid2 as Grid} from '@mui/material';
import {Facebook, Twitter, Instagram, LinkedIn} from '@mui/icons-material';
import {APP_NAME, FOOTER_LINKS} from "@/app/actions/useConstants";

const Footer = () => {

    // Group the links by their sections
    const leftLinks = FOOTER_LINKS.slice(0, 4);
    const centerLinks = FOOTER_LINKS.slice(4, 7);
    const rightLinks = FOOTER_LINKS.slice(7);

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
                    {/* Left Section - Links (First Link Group) */}
                    <Grid size={{xs: 12, sm: 6, md: 4}}>
                        <Typography variant="h6" sx={{mb: 2, fontWeight: 'bold'}}>
                            {APP_NAME}
                        </Typography>

                        <Box>
                            {
                                /* First Link Group (Left Aligned) */
                                leftLinks.map((link) => (
                                    <Link key={link.title} href={link.url} passHref>
                                        <Typography variant="body2" sx={{mb: 1}}>
                                            {link.title}
                                        </Typography>
                                    </Link>
                                ))
                            }
                        </Box>
                    </Grid>

                    {/* Center Section - Links (Second Link Group) */}
                    <Grid size={{xs: 12, sm: 6, md: 4}} sx={{textAlign: 'center'}}>
                        <Typography variant="h6" sx={{mb: 2, fontWeight: 'bold'}}>
                            Account Links
                        </Typography>
                        <Box>
                            {
                                /* Second Link Group (Right Aligned) */
                                centerLinks.map((link) => (
                                    <Link key={link.title} href={link.url} passHref>
                                        <Typography variant="body2" sx={{mb: 1}}>
                                            {link.title}
                                        </Typography>
                                    </Link>
                                ))
                            }
                        </Box>
                    </Grid>

                    {/* Right Section - Links (Third Link Group) */}
                    <Grid size={{xs: 12, sm: 6, md: 4}} sx={{textAlign: 'right'}}>
                        <Box>
                            <Typography variant="h6" sx={{mb: 2, fontWeight: 'bold'}}>
                                Other Links
                            </Typography>
                            {
                                /* Second Link Group (Right Aligned) */
                                rightLinks.map((link) => (
                                    <Link key={link.title} href={link.url} passHref>
                                        <Typography variant="body2" sx={{mb: 1}}>
                                            {link.title}
                                        </Typography>
                                    </Link>
                                ))
                            }
                        </Box>
                    </Grid>

                    {/* Center Section - Social Media Icons */}
                    <Grid size={{xs: 12, sm: 12, md: 12}} sx={{textAlign: 'center'}}>
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
                    <Grid size={{xs: 12, sm: 12, md: 12}} sx={{textAlign: 'right'}}>
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




