import {Drawer, Box, Button} from '@mui/material';
import Link from 'next/link';
import {PAGE_LINKS} from "@/app/hooks/useConstants";

// Sidebar Component
const SidebarMenu: React.FC<{ open: boolean, onClose: () => void }> = ({open, onClose}) => {
    return (
        <Drawer
            variant="temporary"
            anchor="left"
            open={open}
            onClose={onClose}
            sx={{
                width: 280,
                flexShrink: 0,
                zIndex: 1, // Ensures Drawer stays behind AppBar
                '& .MuiDrawer-paper': {
                    mt: 8,
                    width: 280,
                    boxSizing: 'border-box',
                },
            }}
        >
            <Box sx={{width: 280, mt: 1}}>
                {PAGE_LINKS.map((link: { title: string; url: string; }) => (
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
