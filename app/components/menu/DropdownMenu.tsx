import React from "react";
import {Menu, MenuItem} from '@mui/material';
import {userSignOut} from "@/app/hooks/useSocialAuthButton";
import {toTitleCase} from "@/app/hooks/useValidation";

interface RenderDropdownProps {
    user?: Record<string, unknown> | null;
    anchorEl: null | HTMLElement;
    handleMenuToggle: (setter: React.Dispatch<React.SetStateAction<null | HTMLElement>>) => (event: React.MouseEvent<HTMLElement>) => void;
    setAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>;
}

const menu = [
    {label: 'Profile', action: () => console.log('Profile')},
    {label: 'My account', action: () => console.log('My account')},
    {label: 'Settings', action: () => console.log('Settings')},
    {label: 'Sign out', action: userSignOut},
];

const DropdownMenu: React.FC<RenderDropdownProps> = ({anchorEl, setAnchorEl, user}) => {
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
            {menu.map((item, index) => {
                if(item.label.toLowerCase() === 'profile' && user){
                    item.label = (user as {name: string}).name;
                }
                return (
                    <MenuItem key={index} onClick={item.action}>
                        {toTitleCase(item.label)}
                    </MenuItem>
                );
            })}
            {/*<SignOutButton
                size="medium"
                variant="text"
                sx={{mx:0, color: 'inherit', textTransform: 'none'}}
                onSubmit={userSignOut}
            />*/}
        </Menu>
    );
};

export default DropdownMenu;
