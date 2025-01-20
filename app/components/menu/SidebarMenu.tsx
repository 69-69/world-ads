import {Drawer, Box, Button} from '@mui/material';
import Link from 'next/link';
import {HEADER_LINKS} from "@/app/hooks/useConstants";

// Sidebar Component
const SidebarMenu: React.FC<{ isOpen: boolean, isScrollingUp: boolean, onClose: () => void }> = ({
                                                                                                     isOpen,
                                                                                                     isScrollingUp,
                                                                                                     onClose
                                                                                                 }) => {
    const marginTop = isOpen && isScrollingUp ? 0 : 8;

    return (
        <Drawer
            variant="temporary"
            anchor="left"
            open={isOpen}
            onClose={onClose}
            sx={{
                width: 280,
                flexShrink: 0,
                zIndex: 1, // Ensures Drawer stays behind AppBar
                '& .MuiDrawer-paper': {
                    mt: marginTop,
                    width: 280,
                    boxSizing: 'border-box',
                },
            }}
        >
            <Box sx={{width: 280, mt: 1}}>
                {HEADER_LINKS.map((link: { title: string; url: string; }) => (
                    <Link key={link.title} href={link.url}>
                        <Button fullWidth sx={{p: 1}} onClick={onClose}>
                            {link.title}
                        </Button>
                    </Link>
                ))}
            </Box>
        </Drawer>
    );
};

export default SidebarMenu;
