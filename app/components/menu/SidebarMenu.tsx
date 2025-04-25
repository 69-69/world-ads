import {Drawer, Box, ListItemButton, ListItemText, Collapse, List} from '@mui/material';
import Link from 'next/link';
import {HEADER_LINKS} from "@/app/actions/useConstants";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import React, {useState} from "react";
import {AppLinks} from "@/app/models/AppLinks";
import {signOut} from "@/app/actions/auth/handleSignOut";

// Sidebar Component
const SidebarMenu: React.FC<{
    sideMenuLinks?: AppLinks[],
    isOpen: boolean,
    isSession: boolean,
    isScrollingUp: boolean,
    onClose: () => void
}> = ({
          sideMenuLinks = HEADER_LINKS,
          isOpen,
          isSession,
          isScrollingUp,
          onClose,
      }) => {

    const marginTop = isOpen && isScrollingUp ? 0 : 8;

    // const [openDropdown, setOpenDropdown] = useState<{ [key: string]: boolean }>({});
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const toggleDropdown = (title: string) => {
        // setOpenDropdown((prev: { [x: string]: boolean }) => ({...prev, [title]: !prev[title]}));
        setOpenDropdown((prev: string | null): string | null => prev === title ? null : title);
    };

    const renderLink = (link: AppLinks) => {
        // Hide some links when session is active
        if (['My Account', 'Start Selling'].includes(link.title) && isSession) {
            return null;
        }


        const hasDropdown = Array.isArray(link.dropdown) && link.dropdown.length > 0;
        // const isOpen = openDropdown[link.title];
        const isOpen = openDropdown === link.title;

        return (
            <Box key={link.title}>
                <ListItemButton
                    onClick={() => hasDropdown ? toggleDropdown(link.title) : onClose()}
                    component={!hasDropdown ? Link : 'div'}
                    href={!hasDropdown ? link.url : undefined}
                >
                    <ListItemText primary={link.title}/>
                    {hasDropdown && (isOpen ? <ExpandLess/> : <ExpandMore/>)}
                </ListItemButton>

                {hasDropdown && (
                    <Collapse in={isOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding sx={{pl: 2}}>
                            {link.dropdown!.map((sub) => (
                                <ListItemButton
                                    key={sub.title}
                                    component={Link}
                                    href={sub.url}
                                    onClick={onClose}
                                >
                                    <ListItemText primary={sub.title}/>
                                </ListItemButton>
                            ))}
                        </List>
                    </Collapse>
                )}
            </Box>
        );
    };

    const handleSignOut = async () => {
        await signOut();
        onClose(); // Close the sidebar after sign out
    }

    return (
        <Drawer
            variant="temporary"
            anchor="left"
            open={isOpen}
            onClose={onClose}
            sx={{
                width: 280,
                flexShrink: 0,
                zIndex: 1,
                '& .MuiDrawer-paper': {
                    mt: marginTop,
                    width: 280,
                    boxSizing: 'border-box',
                },
            }}
        >
            <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', pl: 2}} role="presentation">
                <List>
                    {sideMenuLinks.map(renderLink)}
                </List>

                {/* Logout button pushed to the bottom */}
                <Box sx={{mt: 'auto', mb: marginTop, display: isSession ? 'block' : 'none'}}>
                    <ListItemButton onClick={handleSignOut} component="div">
                        <ListItemText primary="Logout"/>
                    </ListItemButton>
                </Box>
            </Box>
        </Drawer>
    );
};

export default SidebarMenu;
