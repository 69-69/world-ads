'use client';
// components/Navbar.tsx
//
import React, {useState, MouseEvent} from 'react';
import {AppBar, Toolbar, Box, IconButton} from '@mui/material';
import {styled} from '@mui/material/styles';
import Link from 'next/link';
import {
    DropdownMenu,
    MobileMenu,
    WebMenu,
    HideOnScroll,
    SidebarMenu,
    CartButton,
    MailButton,
    NotificationButton,
} from './menu';
import {APP_NAME_SHORT, DEFAULT_HOME_REDIRECT} from '@/app/hooks/useConstants';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuIcon from '@mui/icons-material/Menu';
import SessionStatusSnackbar from "@/app/components/SessionStatusSnackbar";

// Styled components
const StyledLink = styled(Link)(({theme}) => ({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: theme.palette.primary.main,
    },
    '&:visited': {
        color: theme.palette.primary.dark,
    },
    '&:focus': {
        color: theme.palette.primary.light,
    },
}));

interface NavbarProps {
    user?: {
        id: string;
        email: string;
        name: string;
        access_token?: string | undefined;
    } | null;
}

const Navbar: React.FC<NavbarProps> = ({user}) => {
    if (user) {
        console.log('User session:', user);
    }

    const [isScrollUp, setIsScrollUp] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
    const [openSidebar, setOpenSidebar] = useState<boolean>(false);

    const handleMenuToggle = (setter: React.Dispatch<React.SetStateAction<null | HTMLElement>>) => (event: MouseEvent<HTMLElement>) => {
        setter(event.currentTarget);
    };

    const handleScrollUp = (isScrollUp: boolean) => setIsScrollUp(isScrollUp)

    const handleSidebarToggle = () => setOpenSidebar((prev) => !prev);

    return (
        <Box sx={{flexGrow: 1}}>
            <HideOnScroll isDrawerOpen={openSidebar} onScrollUp={handleScrollUp}>
                <AppBar color="secondary">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{mr: 2}}
                            onClick={handleSidebarToggle}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <StyledLink href={DEFAULT_HOME_REDIRECT}>
                            <Box sx={{flexGrow: 1, fontFamily: 'monospace', fontSize: '2rem', fontWeight: 1000}}>
                                {APP_NAME_SHORT}
                            </Box>
                        </StyledLink>
                        {/* Web menu */}
                        <WebMenu/>
                        {/* Cart, Mail, Notification, Account */}
                        <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                            <CartButton count={5}/>
                            {
                                user &&
                                <>
                                    <MailButton count={3}/>
                                    <NotificationButton count={2}/>
                                    <MailButton count={2}/>
                                    <NotificationButton count={4}/>
                                    <IconButton
                                        size="large"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls="primary-search-account-menu"
                                        aria-haspopup="true"
                                        onClick={handleMenuToggle(setAnchorEl)}
                                        color="inherit"
                                    >
                                        <AccountCircle/>
                                    </IconButton>
                                </>
                            }
                        </Box>
                        {
                            /* Dropdown menu */
                            !user &&
                            <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}, justifyContent: 'flex-end'}}>
                                <IconButton
                                    size="large"
                                    aria-label="show more"
                                    aria-controls="primary-search-account-menu-mobile"
                                    aria-haspopup="true"
                                    onClick={handleMenuToggle(setMobileMoreAnchorEl)}
                                    color="inherit"
                                >
                                    <MoreIcon/>
                                </IconButton>
                            </Box>
                        }

                    </Toolbar>
                </AppBar>
            </HideOnScroll>

            {/* Sidebar */}
            <SidebarMenu isOpen={openSidebar} onClose={handleSidebarToggle} isScrollingUp={isScrollUp}/>
            {/* Render Menu Components */}
            <DropdownMenu anchorEl={anchorEl} handleMenuToggle={handleMenuToggle} setAnchorEl={setAnchorEl}/>
            <MobileMenu mobileMoreAnchorEl={mobileMoreAnchorEl} handleMenuToggle={handleMenuToggle}
                        setMobileMoreAnchorEl={setMobileMoreAnchorEl}/>

            {/* Snackbar */}
            <SessionStatusSnackbar isSignIn={Boolean(user)}/>
        </Box>
    );
};

export default Navbar;

