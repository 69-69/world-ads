'use client';
import React from 'react';
import {Button, Typography, Box} from '@mui/material';
import {ArrowForward} from '@mui/icons-material';
import {styled} from '@mui/material/styles';

interface HeroProps {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
    backgroundImage: string;
}


const StyledBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'bgImage', // Prevent bgImage from being forwarded as a prop to the Box component
})<{ bgImage: string; }>(({bgImage}) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: `url(${bgImage}) no-repeat center center`,
    backgroundSize: 'cover',
    textAlign: 'center',
}));

const Hero: React.FC<HeroProps> = ({title, subtitle, buttonText, buttonLink, backgroundImage}) => {
    return (
        <StyledBox bgImage={backgroundImage}>
            <Box sx={{maxWidth: '600px', color: 'red'}}>
                <Typography variant="h3" sx={{fontWeight: 'bold', mb: 2}}>
                    {title}
                </Typography>
                <Typography variant="h5" sx={{mb: 4, color: 'white'}}>
                    {subtitle}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    href={buttonLink}
                    sx={{
                        padding: '12px 24px',
                        fontSize: '16px',
                        textTransform: 'none',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    {buttonText} <ArrowForward sx={{ml: 1}}/>
                </Button>
            </Box>
        </StyledBox>
    );
};

export default Hero;
