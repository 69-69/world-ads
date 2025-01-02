// app/components/HideOnScroll.tsx
//
import React, {ReactElement} from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';

interface HideOnScrollProps {
    children: ReactElement;
    window?: () => Window;
    isOpen: boolean;
}

const HideOnScroll: React.FC<HideOnScrollProps> = ({children, window, isOpen: isDrawerOpen}) => {
    const trigger = useScrollTrigger({target: window ? window() : undefined});
    const child = React.isValidElement(children) ? children : <div>{children}</div>;

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {React.cloneElement(child as React.ReactElement<{ elevation: number }>, {elevation: isDrawerOpen ? 0 : 4})}
        </Slide>
    );
};

export default HideOnScroll;
