import {Menu, MenuItem, IconButton, Badge} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';

interface RenderMobileMenuProps {
    mobileMoreAnchorEl: null | HTMLElement;
    handleMenuToggle: (setter: React.Dispatch<React.SetStateAction<null | HTMLElement>>) => (event: React.MouseEvent<HTMLElement>) => void;
    setMobileMoreAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>;
}

const menu = [
    {label: 'Messages', icon: MailIcon, badge: 4},
    {label: 'Notifications', icon: NotificationsIcon, badge: 4},
    {label: 'Profile', icon: AccountCircle, badge: 4},
];

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
            {
                menu.map((item, index) => (
                    <MenuItem key={index} onClick={handleMenuToggle(setMobileMoreAnchorEl)}>
                        <IconButton size="large" aria-label={`show ${item.label}`} color="inherit">
                            <Badge badgeContent={item.badge} color="error">
                                <item.icon/>
                            </Badge>
                        </IconButton>
                        <p>{item.label}</p>
                    </MenuItem>
                ))
            }

        </Menu>
    );
};

export default RenderMobileMenu;
