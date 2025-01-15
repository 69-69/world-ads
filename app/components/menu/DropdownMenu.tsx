// app/components/menu/DropdownMenu.tsx
//
import {Menu, MenuItem} from '@mui/material';
import {SignOutButton} from "@/app/components/auth/SocialAuthButton";
import {userSignOut} from "@/app/hooks/useSocialAuthButton";
import {toSentenceCase} from "@/app/hooks/useValidation";

interface RenderDropdownProps {
    anchorEl: null | HTMLElement;
    handleMenuToggle: (setter: React.Dispatch<React.SetStateAction<null | HTMLElement>>) => (event: React.MouseEvent<HTMLElement>) => void;
    setAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>;
}

const menu = [
    {label: 'Profile', action: () => console.log('Profile')},
    {label: 'My account', action: () => console.log('My account')},
];

const DropdownMenu: React.FC<RenderDropdownProps> = ({anchorEl, setAnchorEl}) => {
    const isMenuOpen = Boolean(anchorEl);

    return (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id="primary-search-account-menu"
            keepMounted
            open={isMenuOpen}
            onClose={() => setAnchorEl(null)}
        >
            {menu.map((item, index) => (
                <MenuItem key={index} onClick={item.action}>{toSentenceCase(item.label)}</MenuItem>
            ))}
            <SignOutButton size="medium" color="secondary" variant="text" sx={{mx:0}} onSubmit={userSignOut}/>
        </Menu>
    );
};

export default DropdownMenu;
