// app/components/menu/MobileMenu.tsx
//
import {Menu, MenuItem, IconButton, Badge} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';

interface RenderMobileMenuProps {
    mobileMoreAnchorEl: null | HTMLElement;
    handleMenuToggle: (setter: React.Dispatch<React.SetStateAction<null | HTMLElement>>) => (event: React.MouseEvent<HTMLElement>) => void;
    setMobileMoreAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>;
}

const RenderMobileMenu: React.FC<RenderMobileMenuProps> = ({
                                                               mobileMoreAnchorEl,
                                                               handleMenuToggle,
                                                               setMobileMoreAnchorEl
                                                           }) => {
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    return (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id="primary-search-account-menu-mobile"
            keepMounted
            open={isMobileMenuOpen}
            onClose={() => setMobileMoreAnchorEl(null)}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon/>
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon/>
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleMenuToggle(setMobileMoreAnchorEl)}>
                <IconButton size="large" aria-label="account of current user"
                            aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit">
                    <AccountCircle/>
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );
};

export default RenderMobileMenu;
