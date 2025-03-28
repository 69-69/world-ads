import React from "react";
import {Menu, MenuItem} from '@mui/material';
import {userSignOut} from "@/app/hooks/useSocialAuthButton";
import {toTitleCase} from "@/app/hooks/useHelper";
import {SIGNIN_ROUTE} from "@/app/hooks/useConstants";
import {useRouter} from "next/navigation";

interface RenderDropdownProps {
    user?: Record<string, unknown> | null;
    anchorEl: null | HTMLElement;
    setAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>;
    // handleMenuToggle: (setter: React.Dispatch<React.SetStateAction<null | HTMLElement>>) => (event: React.MouseEvent<HTMLElement>) => void;
}

const DropdownMenu: React.FC<RenderDropdownProps> = ({anchorEl, setAnchorEl, user}) => {
    const isMenuOpen = Boolean(anchorEl);
    const router = useRouter();

    const menuItems = [
        {label: 'Profile', action: () => console.log('Profile')},
        {label: 'My account', action: () => console.log('My account')},
        {label: 'Settings', action: () => console.log('Settings')},
        {
            label: 'Sign out', action: async () => {
                userSignOut().then(() => router.push(SIGNIN_ROUTE));
                return;
            }
        },
    ];

    return (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id="primary-search-account-menu"
            keepMounted
            open={isMenuOpen}
            onClose={() => setAnchorEl(null)}
        >
            {menuItems.map((item, index) => {
                if (item.label.toLowerCase() === 'profile' && user) {
                    item.label = (user as { name: string }).name;
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
