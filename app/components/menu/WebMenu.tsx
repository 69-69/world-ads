// app/components/menu/WebMenu.tsx
//
import {Box, Button} from '@mui/material';
import Link from 'next/link';
import {PAGE_LINKS} from "@/app/hooks/useConstant";

type Nav = {
    name: string;
    path: string;
};

const WebMenu: React.FC = () => {
    return (
        <Box sx={{flexGrow: 1, display: 'flex', justifyContent: 'flex-end'}}>
            {PAGE_LINKS.map((link: Nav) => (
                <Link key={link.name} href={link.path}>
                    <Button sx={{fontWeight: 600}}>{link.name}</Button>
                </Link>
            ))}
        </Box>
    );
};

export default WebMenu;
