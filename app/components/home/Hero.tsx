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

const StyledButton = styled(Button)(() => ({
    padding: '12px 24px',
    fontSize: '16px',
    textTransform: 'none',
    display: 'flex',
    alignItems: 'center',
}));

interface StyledBoxProps {
    bgImage: string;
}

const StyledBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'bgImage', // Prevent bgImage from being forwarded as a prop to the Box component
})<StyledBoxProps>(({bgImage}) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '40vh',
    background: `url(${bgImage}) no-repeat center center`,
    backgroundSize: 'cover',
    textAlign: 'center',
}));

const Hero: React.FC<HeroProps> = ({title, subtitle, buttonText, buttonLink, backgroundImage}) => {
    return (
        <StyledBox bgImage={backgroundImage}  sx={{my:8, height: '100vh'}}>
            <Box sx={{maxWidth: '600px', color: 'red'}}>
                <Typography variant="h3" sx={{fontWeight: 'bold', mb: 2}}>
                    {title}
                </Typography>
                <Typography variant="h5" sx={{mb: 4, color: 'white'}}>
                    {subtitle}
                </Typography>
                <StyledButton
                    variant="contained"
                    color="primary"
                    size="small"
                    href={buttonLink}
                >
                    {buttonText} <ArrowForward sx={{ml: 1}}/>
                </StyledButton>
            </Box>
        </StyledBox>
    );
};

export default Hero;
