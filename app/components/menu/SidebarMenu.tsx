import {Drawer, Box, ListItemButton, ListItemText, Collapse, List} from '@mui/material';
import Link from 'next/link';
import {HEADER_LINKS, SIGNIN_ROUTE} from "@/app/actions/useConstants";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {useState} from "react";
import {AppLinks} from "@/app/models/AppLinks";
import {handleAutoSignOut} from "@/app/actions/auth/useAutoSignOut";
import {useRouter} from "next/navigation";

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

    const router = useRouter();
    const handleLogout = async () => {
        await handleAutoSignOut();
        router.push(SIGNIN_ROUTE);
    }
    const marginTop = isOpen && isScrollingUp ? 0 : 8;

    const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});

    const toggleDropdown = (title: string) => {
        setOpenDropdowns((prev: { [x: string]: boolean }) => ({...prev, [title]: !prev[title]}));
    };

    const renderLink = (link: AppLinks) => {
        const hasDropdown = Array.isArray(link.dropdown) && link.dropdown.length > 0;
        const isOpen = openDropdowns[link.title];

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
                    <ListItemButton onClick={handleLogout} component="div">
                        <ListItemText primary="Logout"/>
                    </ListItemButton>
                </Box>
            </Box>
        </Drawer>
    );
};

export default SidebarMenu;
