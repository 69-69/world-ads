import {Box, Button} from '@mui/material';
import Link from 'next/link';
import {HEADER_LINKS} from "@/app/util/constants";


const WebMenu = ({isSession}: { isSession: boolean }) => {
    return (
        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}, justifyContent: 'flex-end'}}>
            {HEADER_LINKS.map((link) => {
                // Hide some links when session is true/false
                const isRestrictedLink = isSession
                    ? ['My Account', 'Start Selling'].includes(link.title)
                    : link.title.toLowerCase() === 'settings';

                if (isRestrictedLink) {
                    return null;
                }

                return (
                    <Link key={link.title} href={link.url}>
                        <Button sx={{fontWeight: 600}}>{link.title}</Button>
                    </Link>
                );
            })}
        </Box>
    );
};

export default WebMenu;
