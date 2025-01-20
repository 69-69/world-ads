'use client';
import React, {ReactElement, useState, useEffect} from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';

interface HideOnScrollProps {
    children: ReactElement;
    window?: () => Window;
    isDrawerOpen: boolean;
    onScrollUp?: (onScrollUp: boolean) => void;
}

const HideOnScroll: React.FC<HideOnScrollProps> = ({children, window, isDrawerOpen, onScrollUp}) => {
    // Use the scroll trigger to check if user has scrolled past a certain point
    const trigger = useScrollTrigger({target: window ? window() : undefined});

    const [scrollState, setScrollState] = useState<boolean>(false);

    useEffect(() => {
        if (onScrollUp && trigger !== scrollState) {
            onScrollUp(trigger);
            setScrollState(trigger); // Update local state to avoid unnecessary calls
        }
    }, [trigger, scrollState, onScrollUp]);

    const child = React.isValidElement(children) ? children : <div>{children}</div>;

    // Slide the component based on scroll direction and trigger
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {React.cloneElement(child as React.ReactElement<{ elevation: number }>, {elevation: isDrawerOpen ? 0 : 4})}
        </Slide>
    );
};

export default HideOnScroll;
