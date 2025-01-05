// app/components/menu/WebMenu.tsx
//
import {Box, Button} from '@mui/material';
import Link from 'next/link';
import {PAGE_LINKS} from "@/app/hooks/useConstants";

const WebMenu: React.FC = () => {
    return (
        <Box sx={{flexGrow: 1, display: 'flex', justifyContent: 'flex-end'}}>
            {PAGE_LINKS.map((link) => (
                <Link key={link.title} href={link.url}>
                    <Button sx={{fontWeight: 600}}>{link.title}</Button>
                </Link>
            ))}
        </Box>
    );
};

export default WebMenu;
