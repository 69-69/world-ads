'use client';
import React, {useState, MouseEvent, useEffect} from 'react';
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
import {APP_NAME_SHORT, HOME_ROUTE} from '@/app/hooks/useConstants';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuIcon from '@mui/icons-material/Menu';
import SessionStatusSnackbar from "@/app/components/SessionStatusSnackbar";
import {toTitleCase} from "@/app/hooks/useHelper";
import SessionTimeoutModal from "@/app/(auth)/@modal/(...)auto-sign-out/page";
// import useSessionTimeout from "@/app/hooks/useSessionTimeout";
import {UserSession} from "@/app/models/UserSession";
import useSessionTimeout from "@/app/hooks/useSessionTimeout";
import {AppLinks} from "@/app/models/AppLinks";

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

const Navbar: React.FC<{ userSession: UserSession | null, sideMenuLinks?: AppLinks[], }> = ({userSession, sideMenuLinks}) => {

    // Safely handle the case where session could be null
    const user = userSession?.user;
    const [isSessionExpired, setIsSessionExpired] = useState(false);
    const timeRemaining = useSessionTimeout({userSession}); // 1 hour timeout
    const [isScrollUp, setIsScrollUp] = useState<boolean>(false);
    const [openSidebar, setOpenSidebar] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

    // console.log('time-Remaining ' + timeRemaining);

    useEffect(() => {
        if (timeRemaining <= 0) {
            setIsSessionExpired(true); // Show modal when session expires
        }
    }, [timeRemaining]);

    const handleModalClose = () => setIsSessionExpired(false); // Reset session expired flag;

    const handleMenuToggle = (setter: React.Dispatch<React.SetStateAction<null | HTMLElement>>) => (event: MouseEvent<HTMLElement>) => {
        setter(event.currentTarget);
    };

    const handleScrollUp = (isScrollUp: boolean) => setIsScrollUp(isScrollUp)

    const handleSidebarToggle = () => setOpenSidebar((prev) => !prev);

    const snackBarMsg = isSessionExpired ? 'Session Expired' : "Welcome " + toTitleCase(user?.name ?? 'Guest');

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
                        <StyledLink href={HOME_ROUTE}>
                            <Box sx={{flexGrow: 1, fontFamily: 'monospace', fontSize: '2rem', fontWeight: 1000}}>
                                {APP_NAME_SHORT}
                            </Box>
                        </StyledLink>

                        <Box sx={{
                            flexGrow: 1,
                            display: {xs: 'none', sm: 'flex', md: 'flex'},
                            justifyContent: 'flex-end'
                        }}>
                            {/* Web menu */}
                            <WebMenu/>

                            {/* Cart, Mail, Notification, Account */}
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

                                    {/* Dropdown Mobile menu */}
                                    <IconButton
                                        size="large"
                                        aria-label="show more"
                                        aria-controls="primary-search-account-menu-mobile"
                                        aria-haspopup="true"
                                        onClick={handleMenuToggle(setMobileMoreAnchorEl)}
                                        color="inherit"
                                        sx={{display: {xs: 'flex', md: 'none'}}}
                                    >
                                        <MoreIcon/>
                                    </IconButton>
                                </>
                            }
                        </Box>

                    </Toolbar>
                </AppBar>
            </HideOnScroll>

            {/* Sidebar */}
            <SidebarMenu isOpen={openSidebar} onClose={handleSidebarToggle} isScrollingUp={isScrollUp} sideMenuLinks={sideMenuLinks}/>

            {/* Render Menu Components */}
            <DropdownMenu user={user} anchorEl={anchorEl} setAnchorEl={setAnchorEl}/>
            <MobileMenu mobileMoreAnchorEl={mobileMoreAnchorEl} handleMenuToggle={handleMenuToggle}
                        setMobileMoreAnchorEl={setMobileMoreAnchorEl}/>

            {isSessionExpired &&
                <SessionTimeoutModal
                    open={isSessionExpired}
                    remainingTime={timeRemaining}
                    handleClose={handleModalClose}
                />}
            <SessionStatusSnackbar isSignIn={Boolean(user)} message={snackBarMsg}/>
        </Box>
    );
};

export default Navbar;

